import { readFileSync } from 'fs';

export interface IServerListItem {
  name: string;
  mapType: string;
  index: number;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const serversList = <IServerListItem[]> JSON.parse(readFileSync('list.json').toString()).map(({name, map_type}, index) => ({
  name,
  mapType: map_type,
  index
}));