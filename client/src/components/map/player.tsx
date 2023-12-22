import { Popover, Space, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { colorToHex, type IPlayer } from '~/shared';

import { playerStyles } from './map.css';

export interface IPlayerProps {
  left: string;
  top: string;
  player: IPlayer;
}

export const Player = ({ left, top, player }: IPlayerProps) => {
  const [opened, { close, open }] = useDisclosure(false);
  const color = colorToHex(player.color);

  return (
    <Popover width={240} position={'bottom'} withArrow shadow={'md'} opened={opened} onClose={close}>
    <Popover.Target>
      <span
        className={playerStyles}
        onMouseEnter={open}
        onMouseLeave={close}
        style={{
          left,
          top,
          backgroundColor: color,
        }}
      />
    </Popover.Target>
    <Popover.Dropdown onMouseEnter={open} style={{ pointerEvents: 'none' }}>
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
};