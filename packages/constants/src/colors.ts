export enum COLORS {
  GRID_MAIN = '#203d69',
  GRID_SUB = '#2d4c7d',
  EDGE_GRADIENT = '#0dff0d',
}

export enum NodeStatusEnum {
  ON = 'on',
  OFF = 'off',
  ONLOAD = 'onload',
  ALTER = 'alter',
}

export enum NodeStatusColorEnum {
  ON = '#00ff00',
  OFF = '#c3c3c3',
  ONLOAD = '#ff00ff',
  ALTER = '#ff0000',
}

export const predefineColors = [
  NodeStatusColorEnum.ON,
  NodeStatusColorEnum.OFF,
  NodeStatusColorEnum.ALTER,
  NodeStatusColorEnum.ONLOAD,
  '#0909ff',
  '#fd1410',
  '#0dff0d',
  '#ffff05',
  '#ff18fe',
]
