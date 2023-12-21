import { createEffect, createEvent, createStore, sample } from 'effector';

import { connectEventSource, disconnectEventSource, type IServersListItem, playerApi } from '~/shared';

export const $serversList = createStore<IServersListItem[]>([]);
export const $currentServer = createStore<IServersListItem | null>(null);

export const setCurrentServer = createEvent<IServersListItem | null>();

export const connectServerFx = createEffect((server: IServersListItem | null) => {
  disconnectEventSource();
  playerApi.updatePlayers([]);
  if (!server) return;
  connectEventSource({
    serverIndex: server.index,
    onUpdate: (players) => playerApi.updatePlayers(players),
  });
});

export const fetchServersFx = createEffect(async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/servers`);
  const json = await response.json();
  if (!json.ok) throw new Error(!json?.error ? 'unknown error' : `${json?.error?.code}: ${json?.error?.message}`);
  return json.result as IServersListItem[];
});

$serversList.on(fetchServersFx.doneData, (_, serversList) => serversList);
$currentServer.on(setCurrentServer, (_, currentServer) => currentServer);

sample({
  source: $currentServer,
  clock: setCurrentServer,
  target: connectServerFx,
});


// select first arizona server if exists
sample({
  source: $currentServer,
  clock: fetchServersFx.doneData,
  filter: (server, payload) => server === null && payload.length > 0 && payload.findIndex(server => server.name.toLowerCase().includes('arizona')) > -1,
  fn: (_, payload) => payload.find(server => server.name.toLowerCase().includes('arizona')) ?? null,
  target: setCurrentServer,
});

fetchServersFx();