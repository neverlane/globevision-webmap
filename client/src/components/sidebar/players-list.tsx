import { Button, Flex, Input, ScrollArea, Space, Text } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useUnit } from 'effector-react';
import { useMemo, useState } from 'react';

import { $players, colorToHex } from '~/shared';

import { PlayerInfoModal } from './player-info-modal';

export const PlayersList = () => {
  const players = useUnit($players);
  
  const [search, setSearch] = useState('');
  const [showPlayerID, setShowPlayerID] = useState<number | null>(null);
  const [debouncedSearch] = useDebouncedValue(search, 300);

  const showPlayerData = useMemo(() => (players.find((player) => player.id === showPlayerID)), [players, showPlayerID]);

  const playersRows = useMemo(() =>
    players.filter(player => player.nickname.toLowerCase().includes(debouncedSearch.toLowerCase()) || player.id.toString().includes(debouncedSearch)).map((player) => (
      <Button
        key={`players-list:${player.id}:${player.nickname}`}
        variant={'default'} 
        w={'100%'} fw={'bold'} 
        c={colorToHex(player.color)} 
        style={{
          textShadow: '1px 1px 1px #000',
        }}
        onClick={() => setShowPlayerID(player.id)}
      >
        {player.nickname} [{player.id}]
      </Button>
    ))
  , [players, debouncedSearch]);

  return (
    <Flex w={'100%'} direction={'column'} align={'start'} justify={'start'}>
      <PlayerInfoModal opened={showPlayerID !== null} onClose={() => setShowPlayerID(null)} data={showPlayerData}/>
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
      <ScrollArea w={'100%'} h={'200px'}>
        <Flex direction={'column'} align={'start'} justify={'start'} gap={'xs'} py={'md'}>
          {playersRows}
        </Flex>
      </ScrollArea>
    </Flex>
  );
};