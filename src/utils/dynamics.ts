import {diff, dot3, norm} from "~/utils/numberUtils";
import {inverseKinematics} from "~/utils/kinematics";

export function calcMaxMoment(points: {x: number, y: number, z: number}[], timesArr: number[], F: number, E: number, Lf: number, Le: number, Mlf: number, Mle: number, Me: number, additionalPhi: number = 0) {


  const dPoints = diff(points);
  const ddPoints = diff(dPoints);
  const thetas = points.map(point => {
    const result = inverseKinematics(point.x, point.y, point.z, F, E, Lf, Le);
    return {
      t1: result ? result[0] : NaN,
      t2: result ? result[1] : NaN,
      t3: result ? result[2] : NaN,
    }
  });
  const dThetas = diff(thetas);
  const ddThetas = diff(dThetas);

  let maxDS = -Infinity;
  let maxDSTime = NaN;
  let maxDDS = -Infinity;
  let maxDDSTime = NaN;
  let maxDT = -Infinity;
  let maxDTTime = NaN;
  let maxDDT = -Infinity;
  let maxDDTTime = NaN;
  let maxTau = -Infinity;
  let maxTauTime = NaN;

  const G = 9800;
  const taus = ddPoints.map((ddS, i) => {
    const timeCur = timesArr[i];
    const dt = timesArr[i + 1] - timeCur;
    const S = points[i];
    const dS = dPoints[i];
    const T = thetas[i];
    const dT = dThetas[i];
    const ddT = ddThetas[i];

    const dr = (E - F) / 2 * Math.tan(30 / 180 * Math.PI)
    const calcFL = (phi: number, theta: number) => {
      const FactorX = S.x + Math.cos(phi) * (dr - Lf * Math.cos(theta))
      const FactorY = S.y + Math.sin(phi) * (dr - Lf * Math.cos(theta))
      const FactorZ = S.z - Lf * Math.sin(theta)
      const Fx = (Me + 3 * Mle) * ddS.x / dt ** 2 / 2
      const Fy = (Me + 3 * Mle) * ddS.y / dt ** 2 / 2
      const Fz = (Me + 3 * Mle) * (ddS.z / dt ** 2 - G) / 2
      return dot3([FactorX, FactorY, FactorZ], [Fx, Fy, Fz]);
    }

    const first1 = (Mlf / 3 + Mle) * Lf * ddT.t1 / dt ** 2
    const first2 = (Mlf / 3 + Mle) * Lf * ddT.t2 / dt ** 2
    const first3 = (Mlf / 3 + Mle) * Lf * ddT.t3 / dt ** 2
    const second1 = (Mlf / 2 + Mle) * G * Lf * Math.cos(T.t1)
    const second2 = (Mlf / 2 + Mle) * G * Lf * Math.cos(T.t2)
    const second3 = (Mlf / 2 + Mle) * G * Lf * Math.cos(T.t3)
    let phi = 0 + additionalPhi;
    const third1 = -2 * Lf * calcFL(phi, T.t1) * ((S.x * Math.cos(phi) + S.y * Math.sin(phi) + dr) * Math.sin(T.t1) - S.z * Math.cos(T.t1))
    phi = -120 / 180 * Math.PI + additionalPhi;
    const third2 = -2 * Lf * calcFL(phi, T.t2) * ((S.x * Math.cos(phi) + S.y * Math.sin(phi) + dr) * Math.sin(T.t2) - S.z * Math.cos(T.t2))
    phi = 120 / 180 * Math.PI + additionalPhi;
    const third3 = -2 * Lf * calcFL(phi, T.t3) * ((S.x * Math.cos(phi) + S.y * Math.sin(phi) + dr) * Math.sin(T.t3) - S.z * Math.cos(T.t3))

    const tau1 = first1 + second1 + third1;
    const tau2 = first2 + second2 + third2;
    const tau3 = first3 + second3 + third3;

    const dSLen = norm([dS.x/dt, dS.y/dt, dS.z/dt]);
    const ddSLen = norm([ddS.x/dt, ddS.y/dt, ddS.z/dt]);
    const dTLen = norm([dT.t1/dt, dT.t2/dt, dT.t3/dt]);
    const ddTLen = norm([ddT.t1/dt, ddT.t2/dt, ddT.t3/dt]);
    if (dSLen > maxDS) {
      maxDS = dSLen;
      maxDSTime = timeCur;
    }
    if (ddSLen > maxDDS) {
      maxDDS = ddSLen;
      maxDDSTime = timeCur;
    }
    if (dTLen > maxDT) {
      maxDT = dTLen;
      maxDTTime = timeCur;
    }
    if (ddTLen > maxDDT) {
      maxDDT = ddTLen;
      maxDDTTime = timeCur;
    }
    if (Math.abs(tau1) > maxTau) {
      maxTau = tau1;
      maxTauTime = timeCur;
    }
    if (Math.abs(tau2) > maxTau) {
      maxTau = tau2;
      maxTauTime = timeCur;
    }
    if (Math.abs(tau3) > maxTau) {
      maxTau = tau3;
      maxTauTime = timeCur;
    }

    return {
      t1: tau1,
      t2: tau2,
      t3: tau3,
    };
  });

  return {
    times: timesArr,
    taus: taus,

    maxSpeed: maxDS,
    maxAcceleration: maxDDS,
    maxAngleSpeed: maxDT,
    maxAngleAcceleration: maxDDT,
    maxJerk: maxTau,

    maxSpeedTime: maxDSTime,
    maxAccelerationTime: maxDDSTime,
    maxAngleSpeedTime: maxDTTime,
    maxAngleAccelerationTime: maxDDTTime,
    maxJerkTime: maxTauTime,
  }
}
