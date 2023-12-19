import { createApi, createStore } from 'effector';

import type { IPlayer } from '~/shared';

export const $players = createStore<IPlayer[]>([]);
const sortPlayers = (players: IPlayer[]) => players.sort((a, b) => a.id - b.id);

export const playerApi = createApi($players, {
  updatePlayers: (_, players: IPlayer[]) => sortPlayers([...players]),
});