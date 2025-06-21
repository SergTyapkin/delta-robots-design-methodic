type EnumValues<Enum> = Enum[keyof Enum]
// type EnumKeys<Enum> = Enum[keyof Enum]

export const Modifications = {
  default: 'default',
  rotating: 'rotating',
  linear: 'linear',
};

export const ConnectionTypes = {
  balls: 'balls',
  bearings: 'bearings',
};

export const CrossSectionTypes = {
  rectangle: 'rectangle',
  circle: 'circle',
  rectangleHollow: 'rectangleHollow',
  circleHollow: 'circleHollow',
};

export type Modification = EnumValues<typeof Modifications>
export type ConnectionType = EnumValues<typeof ConnectionTypes>
export type CrossSectionType = EnumValues<typeof CrossSectionTypes>
