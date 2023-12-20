import { Flex, Space, useComputedColorScheme, Text } from '@mantine/core';
import { IconDeviceVisionPro } from '@tabler/icons-react';
import { ColorScheme } from './color-scheme';
import { Controls } from './controls';
import { PlayersList } from '~/components/sidebar/players-list';

export const Sidebar = () => {
  const colorScheme = useComputedColorScheme('dark');
  return (
    <Flex w={'20rem'} h={'100%'} direction={'column'} align={'start'} justify={'space-between'} p={'md'}>
      <Flex w={'100%'} direction={'column'} align={'center'} justify={'start'}>
        <IconDeviceVisionPro size={'8rem'} color={colorScheme === 'dark' ? 'white' : 'black'} />
        <Text size={'1.75rem'} fw={'bold'}>
          GlobeVision
        </Text>
        <Text size={'1.25rem'}>map</Text>
        <Space h={'xs'} />
        <a href={'https://www.blast.hk/threads/196970/'} target={'_blank'} style={{ textDecoration: 'none' }}>
          <Text fw={'bold'} size={'1rem'} >see topic on blast.hk</Text>
        </a>
        <Space h={'xl'} />
        <Controls />
        <Space h={'md'} />
        <PlayersList />
      </Flex>
      <ColorScheme />
    </Flex>
  );
};