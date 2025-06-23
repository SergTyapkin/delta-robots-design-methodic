import {rotate2D} from "~/utils/3DUtils";

const tan30 = Math.tan(30 / 180 * Math.PI);
const tan60 = Math.tan(60 / 180 * Math.PI);
const sin30 = Math.sin(30 / 180 * Math.PI);

// ----------- ОБРАТНАЯ КИНЕМАТИКА -------------
/** вспомогательная функция, расчет угла theta1 (в плоскости YZ)
 * (в градусах поворота относительно горизонтального луча по направлению от базы)
 **/
function _calcAngLeYZ(x0: number, y0: number, z0: number, F: number, E: number, Lf: number, Le: number, phi: number = 0){
  if (phi) {
    [x0, y0] = rotate2D(x0, y0, phi);
  }
  const y1 = -F / 2 * tan30;  // сдвигаем центр к краю верхней базы (к приводу)
  y0 -= E / 2 * tan30; // сдвигаем центр к краю нижней платформы
  // z = a + b*y
  if (z0 === 0) {
    return null  // несуществующая точка
  }
  const a = (x0 * x0 + y0 * y0 + z0 * z0 + Lf * Lf - Le * Le - y1 * y1) / (2 * z0)
  const b = (y1 - y0) / z0
  // дискриминант
  const d = -(a + b * y1) * (a + b * y1) + Lf * (b * b * Lf + Lf)
  // print(a, b, y1, y0, E, F, d)
  if (d < 0) {
    return null;  // несуществующая точка
  }
  const yj = (y1 - a * b - Math.sqrt(d)) / (b * b + 1)  // выбираем внешнюю точку
  const zj = a + b * yj
  return Math.atan(-zj / (y1 - yj)) + ((yj > y1) ? Math.PI : 0)
}

/**
* Обратная кинематика: (x0, y0, z0) -> (theta1, theta2, theta3) в градусах
* При этом theta_1 - угол привода, расположенного на оси Y
* theta_2 - угол привода, повернутого от первого против часовой стрелки на 120 градусов
* theta_3 - угол привода, повернутого от первого по часовой стрелке на 120 градусов
* ---
* x, y, z - координаты точки для поиска углов
* F - сторона базы (верхней плиты)
* E - сторона платформы (нижней плиты)
* Lf - длина плеча (верхней перемычки)
* Le - длина рычага (нижней перемычки)
 **/
export function inverseKinematics(x: number, y: number, z: number, F: number, E: number, Lf: number, Le: number): number[] | null {
  const theta_1 = _calcAngLeYZ(x, y, z, F, E, Lf, Le)
  const theta_2 = _calcAngLeYZ(x, y, z, F, E, Lf, Le, 120)  // rotate coords to +120 deg
  const theta_3 = _calcAngLeYZ(x, y, z, F, E, Lf, Le, -120)  // rotate coords to -120 deg
  if (theta_1 === null || theta_2 === null || theta_3 === null) {
    return null;
  }
  return [theta_1, theta_2, theta_3]
}


// ----------- ПРЯМАЯ КИНЕМАТИКА -------------
/**
* Прямая кинематика: (theta1, theta2, theta3) в градусах -> (x, y, z) рабочего органа
* theta_1 - угол привода, расположенного на оси Y
* theta_2 - угол привода, повернутого от первого против часовой стрелки на 120 градусов
* theta_3 - угол привода, повернутого от первого по часовой стрелке на 120 градусов
* F - сторона базы (верхней плиты)
* E - сторона платформы (нижней плиты)
* Lf - длина плеча (верхней перемычки)
* Le - длина рычага (нижней перемычки)
**/
export function straightKinematics(theta_1: number, theta_2: number, theta_3: number, F: number, E: number, Lf: number, Le: number): number[] | null {
  const t = (F - E) * tan30 / 2

  const y1 = -(t + Lf * Math.cos(theta_1))
  const x1 = 0
  const z1 = -Lf * Math.sin(theta_1)

  const y2 = (t + Lf * Math.cos(theta_2)) * sin30
  const x2 = y2 * tan60
  const z2 = -Lf * Math.sin(theta_2)

  const y3 = (t + Lf * Math.cos(theta_3)) * sin30
  const x3 = -y3 * tan60
  const z3 = -Lf * Math.sin(theta_3)

  const dnm = (y2 - y1) * x3 - (y3 - y1) * x2

  const w1 = x1 * x1 + y1 * y1 + z1 * z1
  const w2 = x2 * x2 + y2 * y2 + z2 * z2
  const w3 = x3 * x3 + y3 * y3 + z3 * z3

  // x = (a1*z + b1)/dnm
  const a1 = (z2 - z1) * (y3 - y1) - (z3 - z1) * (y2 - y1)
  const b1 = -((w2 - w1) * (y3 - y1) - (w3 - w1) * (y2 - y1)) / 2

  // y = (a2*z + b2)/dnm
  const a2 = -(z2 - z1) * x3 + (z3 - z1) * x2
  const b2 = ((w2 - w1) * x3 - (w3 - w1) * x2) / 2

  // a*z^2 + b*z + c = 0
  const a = a1 * a1 + a2 * a2 + dnm * dnm
  const b = 2 * (a1 * b1 + a2 * (b2 - y1 * dnm) - z1 * dnm * dnm)
  const c = (b2 - y1 * dnm) * (b2 - y1 * dnm) + b1 * b1 + dnm * dnm * (z1 * z1 - Le * Le)

  // дискриминант
  const d = b * b - 4 * a * c
  if (d < 0) {
    return null;  // несуществующая позиция
  }

  const z0 = -0.5 * (b + Math.sqrt(d)) / a
  const x0 = (a1 * z0 + b1) / dnm
  const y0 = (a2 * z0 + b2) / dnm
  return [x0, y0, z0]
}
