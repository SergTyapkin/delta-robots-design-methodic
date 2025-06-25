export type Material = {
  name: string,
  limitTurnover: number,
  density: number,
};

export const Materials = [
  {
    name: 'Сталь 3',
    limitTurnover: 245,
    density: 7.850,
  },
  {
    name: '09Г2С',
    limitTurnover: 325,
    density: 7.780,
  },
  {
    name: 'Сталь 20',
    limitTurnover: 245,
    density: 7.859,
  },
  {
    name: 'Сталь 45',
    limitTurnover: 355,
    density: 7.810,
  },
  {
    name: 'Сталь 10',
    limitTurnover: 210,
    density: 7.850,
  },
  {
    name: 'Сталь 04Х18Н10',
    limitTurnover: 220,
    density: 7.870,
  },
  {
    name: 'Сталь 08КП',
    limitTurnover: 195,
    density: 7.850,
  },
  {
    name: 'Сталь 40Х',
    limitTurnover: 500,
    density: 7.850,
  },
  {
    name: 'Алюминий 6061',
    limitTurnover: 276,
    density: 2.700,
  },
  {
    name: 'Алюминий 2024',
    limitTurnover: 324,
    density: 2.780,
  },
  {
    name: 'Алюминий 6063',
    limitTurnover: 241,
    density: 2.700,
  },
  {
    name: 'Алюминий 7075',
    limitTurnover: 503,
    density: 2.810,
  },
];
