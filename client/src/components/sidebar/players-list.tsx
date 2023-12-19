import { Button, Flex, Input, Modal, ScrollArea, Space, Text, useComputedColorScheme } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useUnit } from 'effector-react';
import { useMemo, useState } from 'react';

import { $players, IPlayer } from '~/shared';

export const PlayersList = () => {
  const players = useUnit($players);
  const colorScheme = useComputedColorScheme('dark');
  
  const [search, setSearch] = useState('');
  const [showPlayer, setShowPlayer] = useState<IPlayer | null>(null);
  const [debouncedSearch] = useDebouncedValue(search, 300);

  const playersRows = useMemo(() =>
    players.filter(player => player.nickname.toLowerCase().includes(debouncedSearch.toLowerCase()) || player.id.toString().includes(debouncedSearch)).map((player) => (
      <Flex key={`players-list:${player.id}:${player.nickname}`} direction={'column'} align={'center'} w={'100%'} justify={'start'}>
        <Button
          bg={colorScheme === 'light' ? 'gray.1' : 'dark.5'} 
          w={'96%'} fw={'bold'} 
          c={`#${player.color.toString(16).slice(0, 6)}`} 
          style={{
            textShadow: '1px 1px 1px #000',
          }}
          onClick={() => setShowPlayer(player)}
        >
          {player.nickname} [{player.id}]
        </Button>
      </Flex>
    ))
  , [players, debouncedSearch, colorScheme]);

  return (
    <>
      <Modal opened={showPlayer !== null} onClose={() => setShowPlayer(null)} title={'Player info'} centered>
        <Text fw={'bold'}>
          Nickname:
          <Text display={'inline'} c={`#${showPlayer?.color.toString(16).slice(0, 6)}`} style={{ textShadow: '1px 1px 1px #000' }}>{showPlayer?.nickname} [{showPlayer?.id}]</Text>
        </Text>
        <Space h={'xs'} />
        <Text fw={'bold'}>HP: <Text display={'inline'}>{showPlayer?.health}</Text></Text>
        <Text fw={'bold'}>ARM: <Text display={'inline'}>{showPlayer?.armor}</Text></Text>
        <Text fw={'bold'}>Skin: <Text display={'inline'}>{showPlayer?.skin}</Text></Text>
        <Text fw={'bold'}>Weapon: <Text display={'inline'}>{showPlayer?.weapon}</Text></Text>
        <Space h={'xs'} />
        <Text fw={'bold'}>Position: <Text display={'inline'}>{showPlayer?.position.x.toFixed(2)}, {showPlayer?.position.y.toFixed(2)}, {showPlayer?.position.z.toFixed(2)}</Text></Text>
                
      </Modal>
      <Text fw={'bold'}>
        Players count: <Text display={'inline'}>{players.length}</Text>
      </Text>
      <Space h={'xs'} />
      <Input
        w={'100%'}
        placeholder={'Enter nickname or ID'}
        value={search}
        onChange={(event) => setSearch(event.currentTarget.value)}
      />
      <Space h={'md'} />
      <ScrollArea w={'100%'} h={'400px'}>
        <Flex direction={'column'} align={'start'} justify={'start'} gap={'xs'} py={'md'}>
          {playersRows}
        </Flex>
      </ScrollArea>
    </>
  );
};