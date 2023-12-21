import { Button, Flex, Input, Modal, ScrollArea, Space, Text, useComputedColorScheme } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useUnit } from 'effector-react';
import { useMemo, useState } from 'react';

import { $players } from '~/shared';

export const PlayersList = () => {
  const players = useUnit($players);
  const colorScheme = useComputedColorScheme('dark');
  
  const [search, setSearch] = useState('');
  const [showPlayerNickname, setShowPlayerNickname] = useState<string | null>(null);
  const [debouncedSearch] = useDebouncedValue(search, 300);

  const showPlayerData = useMemo(() => (players.find((player) => player.nickname === showPlayerNickname)), [players, showPlayerNickname]);

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
          onClick={() => setShowPlayerNickname(player.nickname)}
        >
          {player.nickname} [{player.id}]
        </Button>
      </Flex>
    ))
  , [players, debouncedSearch, colorScheme]);

  return (
    <>
      <Modal opened={showPlayerNickname !== null} onClose={() => setShowPlayerNickname(null)} title={'Player info'} centered>
        <Text fw={'bold'}>
          Nickname: <Text display={'inline'} c={`#${showPlayerData?.color.toString(16).slice(0, 6)}`} style={{ textShadow: '1px 1px 1px #000' }}>{showPlayerData?.nickname} [{showPlayerData?.id}]</Text>
        </Text>
        <Space h={'xs'} />
        <Text fw={'bold'}>HP: <Text display={'inline'}>{showPlayerData?.health}</Text></Text>
        <Text fw={'bold'}>ARM: <Text display={'inline'}>{showPlayerData?.armor}</Text></Text>
        <Text fw={'bold'}>Skin: <Text display={'inline'}>{showPlayerData?.skin}</Text></Text>
        <Text fw={'bold'}>Weapon: <Text display={'inline'}>{showPlayerData?.weapon}</Text></Text>
        <Space h={'xs'} />
        <Text fw={'bold'}>Position: <Text display={'inline'}>{showPlayerData?.position.x.toFixed(2)}, {showPlayerData?.position.y.toFixed(2)}, {showPlayerData?.position.z.toFixed(2)}</Text></Text>
                
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