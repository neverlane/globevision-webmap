import { Flex, Space, Text, useComputedColorScheme } from '@mantine/core';
import { IconDeviceVisionPro } from '@tabler/icons-react';

import { Controls } from './controls';
import { PlayersList } from './players-list';

export const Sidebar = () => {
  const colorScheme = useComputedColorScheme('dark');
  return (
    <Flex w={'100%'} h={'100%'} direction={'column'} align={'center'} justify={'start'}>
      <Flex direction={'column'} align={'center'}>
        <IconDeviceVisionPro size={'8rem'} color={colorScheme === 'dark' ? 'white' : 'black'} />
        <Text size={'1.75rem'} fw={'bold'}>
          GlobeVision
        </Text>
        <Text size={'1.25rem'}>map</Text>
      </Flex>
      <Space h={'xl'} />
      <Flex w={'90%'} maw={'75rem'} direction={'column'} align={'center'} justify={'start'} gap={'md'}>
        <Controls />
        <PlayersList />
      </Flex>
    </Flex>
  );
};