import {inverseKinematics} from "~/utils/kinematics";
import {triangleFromHeightPointToSide} from "~/utils/3DUtils";
import {minimize_Powell} from "~/utils/optimization";

export function getWorkingAreaParams(F: number, E: number, Lf: number, Le: number, targetDtoH: number = 1.65) {
  const minZTest = -(Lf + Le);
  const maxZTest = 0;
  const dZTest = 0.1;
  // Find min Z
  let currentZ = minZTest;
  let res = null;
  // console.group('MIN Z');
  do {
    currentZ += dZTest;
    // console.log(currentZ);
    res = inverseKinematics(0, 0, currentZ, F, E, Lf, Le);
  } while (!res && currentZ < 0);
  // console.groupEnd();
  const minZ = currentZ;
  // console.log("1 MINZ", minZ);

  // Find max Z
  currentZ = maxZTest;
  res = null;
  // console.group('MAX Z');
  do {
    currentZ -= dZTest;
    // console.log(currentZ);
    res = inverseKinematics(0, 0, currentZ, F, E, Lf, Le);
  } while (!res && currentZ > minZTest);
  // console.groupEnd();
  const maxZ = currentZ;
  // console.log("2 MAX", maxZ);

  function Foo(targetDtoH: number): number {
    return 1 - 1.32 ** (-targetDtoH);
  }

  const areaMaxZ = maxZ;
  const areaMinZ = minZ + (maxZ - minZ) * Foo(targetDtoH);
  // console.log("MAX Z", areaMaxZ);
  // console.log("MIN Z AREA", areaMinZ);
  // console.log("MIN Z", minZ);

  const minY = -(Lf + Le);
  const dY = 0.1;
  // Find diameter on areaMinZ
  let currentY = minY;
  res = null;
  // console.group('MIN MAX Y');
  do {
    currentY += dY;
    res = inverseKinematics(0, currentY, areaMinZ, F, E, Lf, Le);
    // console.log(currentY);
  } while (!res && currentY < 0);
  // console.groupEnd();
  const maxRadius = -currentY;
  // console.log("2 MAX RAD", maxRadius);

  return {
    minZ: areaMinZ,
    maxZ: areaMaxZ,
    height: areaMaxZ - areaMinZ,
    diameter: maxRadius * 2,
  }
}

// @ts-expect-error
export function getMaxSizeDiameter(F: number, E: number, Lf: number, Le: number, areaDiameter: number, areaMinZ: number, areaMaxZ: number): number {
  // const minZ = areaMinZ;
  // const maxZ = areaMaxZ;
  // const minY = 0;
  // const maxY = areaDiameter * 2;
  // const dZ = 0.1;
  // const dY = 0.1;
  let maxSize = -Infinity;
  // for (let curZ = minZ; curZ < maxZ; curZ += dZ) {
  //   for (let curY = minY; curY < maxY; curY += dY) {
  //     const thetas = inverseKinematics(0, curY, curZ, F, E, Lf, Le);
  //     if (!thetas) {
  //       continue;
  //     }
  //     maxSize = Math.max(curY + triangleFromHeightPointToSide(E), maxSize);
  //   }
  // }
  maxSize = triangleFromHeightPointToSide(F) + Lf + Le + triangleFromHeightPointToSide(E);
  return maxSize;
}

export async function solveKinematics(minAreaDiameter?: number, minAreaHeight?: number, maxRobotDiameter?: number) {
  let targetDtoH: undefined | number = undefined;
  if (minAreaDiameter && minAreaHeight) {
    targetDtoH = (minAreaDiameter / minAreaHeight);
  }

  const optimalSizes = minimize_Powell(
    ([F, E, Lf, Le]: number[]) => {
      const NEGATIVE_PENALTY_FACTOR = 1000;
      const sizesNegativePenaltyFoo = (size: number) => size < 0 ? size * NEGATIVE_PENALTY_FACTOR : 0;
      if (F < 0 || E < 0 || Lf <= 0 || Le <= 0) {
        // console.log("NEGATIVE!", F, E, Lf, Le)
        return -(sizesNegativePenaltyFoo(F) +
          sizesNegativePenaltyFoo(E) +
          sizesNegativePenaltyFoo(Lf) +
          sizesNegativePenaltyFoo(Le) +
          sizesNegativePenaltyFoo(Le - Lf)
        );  // Lf must be < Le
      }
      // console.log("NOT NEGATIVE", F, E, Lf, Le)
      const {height, diameter, minZ, maxZ} = getWorkingAreaParams(F, E, Lf, Le, targetDtoH);
      const maxSize = getMaxSizeDiameter(F, E, Lf, Le, diameter, minZ, maxZ);

      const PENALTY_FACTOR = 10000;
      const maximizingVal = diameter * height; // Working area volume
      const minAreaDiameterPenalty = (minAreaDiameter && diameter < minAreaDiameter) ? - (minAreaDiameter - diameter) * PENALTY_FACTOR : 0;
      const minAreaHeightPenalty = (minAreaHeight && height < minAreaHeight) ? - (minAreaHeight - height) * PENALTY_FACTOR : 0;
      const maxRobotDiameterPenalty = (maxRobotDiameter && maxSize > maxRobotDiameter) ? - (maxSize - maxRobotDiameter) * PENALTY_FACTOR : 0;
      const warnEFRatioPenalty = -Math.abs(0.25 - E / F) * 50 * PENALTY_FACTOR;
      const warnLfFRatioPenalty = -Math.abs(0.5 - Lf / F) * 50 * PENALTY_FACTOR;
      const warnLeFRatioPenalty = -Math.abs(1.3 - Le / F) * 50 * PENALTY_FACTOR;

      return -(maximizingVal +
        minAreaDiameterPenalty +
        minAreaHeightPenalty +
        maxRobotDiameterPenalty +
        warnEFRatioPenalty +
        warnLfFRatioPenalty +
        warnLeFRatioPenalty +
        sizesNegativePenaltyFoo(F) +
        sizesNegativePenaltyFoo(E) +
        sizesNegativePenaltyFoo(Lf) +
        sizesNegativePenaltyFoo(Le) +
        sizesNegativePenaltyFoo(Le - Lf) // Lf must be < Le
      );
    },
    [100, 30, 200, 300],
    // @ts-expect-error
  ).argument;

  return optimalSizes ? {
    F: optimalSizes[0],
    E: optimalSizes[1],
    Lf: optimalSizes[2],
    Le: optimalSizes[3],
  } : null;
}
