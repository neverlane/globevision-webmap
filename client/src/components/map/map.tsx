import { useEffect, useRef, useState } from 'react';
import { Popover, Box, Image, Text, Space } from '@mantine/core';
import { useUnit } from 'effector-react';

import saMapImage from '~/assets/samap.webp';
import { $players } from '~/shared';

const SA_MAP_WH = 6000;

const minmax = (min: number, value: number, max: number) => Math.min(Math.max(value, min), max);

export const Map = () => {
  const mapRef = useRef<HTMLImageElement>(null);
  const [mapScale, setMapScale] = useState<number>(0);
  const [selectedNickname, setSelectedNickname] = useState<string | null>(null);
  const players = useUnit($players);

  const convertCoord = (coord: {x: number, y: number}) => ({
    left: `${mapScale * minmax(0, coord.x + 3000, SA_MAP_WH)}px`,
    top: `${mapScale * minmax(0, 3000 - coord.y, SA_MAP_WH)}px`,
  });

  useEffect(() => {
    if (!mapRef.current) return;
    setMapScale(mapRef.current.height / SA_MAP_WH);
  }, [mapRef]);

  return (
    <Box pos={'relative'} h={'100%'} style={{ overflow: 'hidden' }}>
      <Image
        ref={mapRef}
        h={'100%'}
        src={saMapImage} 
        alt={'sa map'}
        style={{aspectRatio: 1}}
      />
      <Box>
        {players.map((player) => {
          const {left, top} = convertCoord(player.position);
          const color = `#${player.color.toString(16).slice(0, 6)}`;
          return (
            <Popover key={`map-player:${player.nickname}:${player.id}`} width={200} position={'bottom'} withArrow shadow={'md'} opened={selectedNickname === player.nickname}>
              <Popover.Target>
                <span
                  onMouseEnter={() => setSelectedNickname(player.nickname)}
                  onMouseLeave={() => setSelectedNickname(null)}
                  style={{
                    display: 'block',
                    position: 'absolute',
                    left,
                    top,
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: color,
                    border: '1px solid black',
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%' 
                  }}
                />
              </Popover.Target>
              <Popover.Dropdown style={{ pointerEvents: 'none' }}>
                <Text fw={'bold'}>Player info</Text>
                <Text c={color} style={{ textShadow: '1px 1px 1px #000' }}>{player.nickname} [{player.id}]</Text>
                <Space h={'xs'} />
                <Text fw={'bold'}>HP: <Text display={'inline'}>{player.health}</Text></Text>
                <Text fw={'bold'}>ARM: <Text display={'inline'}>{player.armor}</Text></Text>
                <Text fw={'bold'}>Skin: <Text display={'inline'}>{player.skin}</Text></Text>
                <Text fw={'bold'}>Weapon: <Text display={'inline'}>{player.weapon}</Text></Text>
                <Space h={'xs'} />
                <Text fw={'bold'}>Position: <Text display={'inline'}>{player.position.x.toFixed(2)}, {player.position.y.toFixed(2)}, {player.position.z.toFixed(2)}</Text></Text>
              </Popover.Dropdown>
            </Popover>
          );  
        })}
      </Box>
    </Box>
  );
};