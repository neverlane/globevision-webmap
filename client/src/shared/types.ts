export interface IPosition {
  x: number;
  y: number;
  z: number;
}

export interface IPlayer {
  id: number;
  nickname: string;
  updated: number;
  health: number;
  armor: number;
  weapon: number;
  skin: number;
  position: IPosition;
  color: number;
}

export interface IServersListItem {
  name: string;
  index: number;
}