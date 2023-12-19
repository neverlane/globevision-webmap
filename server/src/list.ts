import { readFileSync } from 'fs';

export interface IServerListItem {
  name: string;
  index: number;
}

export const serversList = <IServerListItem[]> JSON.parse(readFileSync('list.json').toString());