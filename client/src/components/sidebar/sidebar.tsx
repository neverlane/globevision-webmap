import { Flex, Space, useComputedColorScheme } from '@mantine/core';
import { IconDeviceVisionPro } from '@tabler/icons-react';
import { ColorScheme } from './color-scheme';
import { Controls } from './controls';
import { PlayersList } from '~/components/sidebar/players-list';

export const Sidebar = () => {
  const colorScheme = useComputedColorScheme('dark');
  return (
    <Flex w={'20rem'} h={'100%'} direction={'column'} align={'start'} justify={'space-between'} p={'md'}>
      <Flex w={'100%'} direction={'column'} align={'start'} justify={'start'}>
        <IconDeviceVisionPro style={{ margin: '0 auto' }} size={'8rem'} color={colorScheme === 'dark' ? 'white' : 'black'} />
        <Controls />
        <Space h={'md'} />
        <PlayersList />
      </Flex>
      <ColorScheme />
    </Flex>
  );
};