import { Flex, Select, Space, Text } from '@mantine/core';
import { useUnit } from 'effector-react';
import { useMemo } from 'react';

import { $currentServer, $serversList, setCurrentServer } from '~/shared';

export const Controls = () => {
  const serversList = useUnit($serversList);
  const currentServer = useUnit($currentServer);
  
  const mappedServersList = useMemo(() =>
    serversList.map((server) => server.name)
  , [serversList]);
  return (
    <Flex w={'100%'} direction={'column'} align={'start'} justify={'start'}>
      <Text size={'xl'} fw={'bold'}>Controls</Text>
      <Space h={'xs'} />
      <Select
        w={'100%'}
        label={'Select server'}
        value={currentServer?.name ?? null}
        data={mappedServersList}
        onChange={name => setCurrentServer(serversList.find(server => server.name === name) ?? null)}
        clearable
      />
    </Flex>
  );
};