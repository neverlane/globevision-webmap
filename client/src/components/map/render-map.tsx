import { Box, Image } from '@mantine/core';

import { convertMapCoord, getMapScale, type IPlayer, type IServersListItem, SA_MAP_SIZE } from '~/shared';

import { containerStyles, mapStyles } from './map.css';
import { Player } from './player';

export interface IRenderMapProps {
  size: number;
  server: IServersListItem;
  players: IPlayer[];
  gameMapSize?: number;
}

export const RenderMap = ({ size, server, players, gameMapSize = SA_MAP_SIZE }: IRenderMapProps) => {
  const scale = getMapScale(size, gameMapSize);

  return (
    <Box className={containerStyles} w={size} h={size}>
      <Image
        className={mapStyles}
        pos={'absolute'}
        fit={'contain'}
        w={size}
        h={size}
        src={`${import.meta.env.BASE_URL}maps/${server.mapType}.webp`}
        onError={() => console.log('loading error')}
        alt={'map'}
      />
      <Box>
        {players.map((player) => {
          const { left, top } = convertMapCoord(scale, player.position, gameMapSize);
          const renderKey = `map-player:${player.nickname}:${player.id}`;
          return <Player key={renderKey} top={top} left={left} player={player} />;
        })}
      </Box>
    </Box>
  );
};