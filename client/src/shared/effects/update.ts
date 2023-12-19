import { createEffect, createEvent, restore, sample } from 'effector';

import type { IPlayer } from '~/shared';

export interface IConnectEventSourceParams {
  serverIndex: number;
  onMessage?: (data: unknown) => void;
  onUpdate?: (data: IPlayer[]) => void;
  onError?: (event: Event) => void;
  onClose?: () => void;
}

export const connectEventSource = createEvent<IConnectEventSourceParams>();
export const disconnectEventSource = createEvent();

export const connectEventSourceFx = createEffect((params: IConnectEventSourceParams) => {
  const eventSource = new EventSource(`${import.meta.env.VITE_API_URL}/servers/${params.serverIndex}`);
  console.log('eventsource: opened');
  
  eventSource.addEventListener('update', (event) => {
    console.log('event: update');
    if (params.onUpdate) params.onUpdate(JSON.parse(event.data));
  });

  eventSource.addEventListener('message', (event) => {
    if (params.onUpdate) params.onUpdate(event.data);
  });

  eventSource.addEventListener('error', (event) => {
    console.log('event: error');
    if (params.onError) params.onError(event);
  });

  return eventSource;
});
const closeEventSourceConnectionFx = createEffect((es: EventSource) => {
  es.close();
  console.log('eventsource: closed');
});

export const $eventSource = restore(connectEventSourceFx, null);

sample({
  clock: connectEventSource,
  target: connectEventSourceFx
});

sample({
  source: $eventSource,
  clock: disconnectEventSource,
  filter: (es): es is EventSource => es !== null,
  target: closeEventSourceConnectionFx,
});