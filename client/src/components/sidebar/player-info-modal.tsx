import { Anchor, Flex, Modal, RingProgress, Text } from '@mantine/core';
import { IconExternalLink, IconPlugConnectedX } from '@tabler/icons-react';

import { type IPlayer } from '~/shared';

export interface IPlayerInfoModalProps {
  opened: boolean;
  onClose: () => unknown;
  data: IPlayer | undefined;
}

export const PlayerInfoModal = ({opened, onClose, data}: IPlayerInfoModalProps) => {
  const nicknameColor = `#${data?.color.toString(16).slice(0, 6)}`;
  const ringSize = 120;
  const ringThickness = 10;
  return (
    <Modal opened={opened} onClose={onClose} withCloseButton={false} centered radius={'1rem'}>
      {
        data ? <Flex direction={'column'} align={'center'} justify={'start'} px={'1rem'}>
          <Text py={'1.5rem'} size={'1.5rem'} fw={'bold'} ta={'center'}>
            Player <Text display={'inline'} fw={'unset'} c={nicknameColor} style={{ textShadow: '1px 1px 1px #000' }}>{data.nickname} [{data.id}]</Text>
          </Text>
          <Flex align={'center'} justify={'center'} pb={'1.5rem'}>
            <RingProgress
              size={ringSize}
              thickness={ringThickness}
              sections={[{
                value: data.health / 1.6,
                color: 'red',
              }]}
              roundCaps
              label={
                <Text fw={'bold'} fz={'unset'} ta={'center'}>
                  HP: {data.health}
                </Text>
              }
            />
            <RingProgress
              size={ringSize}
              thickness={ringThickness}
              sections={[{
                value: data.armor,
                color: 'blue',
              }]}
              roundCaps
              label={
                <Text fw={'bold'} fz={'unset'} ta={'center'}>
                  ARM: {data.armor}
                </Text>
              }
            />
          </Flex>
          <Flex w={'100%'} align={'center'} justify={'space-between'}>
            <Text fz={'unset'} fw={'bold'}>Skin: <Text fz={'unset'} display={'inline'}>{data.skin}</Text></Text>
            <Anchor href={`https://sa-skins.netlify.app/samp/${data.skin}`} target={'_blank'}>
              <Flex align={'center'} justify={'center'} gap={'0.2rem'}>
                <Text fz={'unset'} fw={'bold'}>SA Skins</Text>
                <IconExternalLink />
              </Flex>
            </Anchor>
          </Flex>
          
          <Text w={'100%'} fz={'unset'} fw={'bold'}>Weapon: <Text fz={'unset'} display={'inline'}>{data.weapon}</Text></Text>
          <Text w={'100%'} fz={'unset'} fw={'bold'}>Position: <Text fz={'unset'} display={'inline'}>{data.position.x.toFixed(2)}, {data.position.y.toFixed(2)}, {data.position.z.toFixed(2)}</Text></Text>
        </Flex> : <Flex direction={'column'} py={'1.5rem'} gap={'xs'} align={'center'} justify={'center'}>
          <IconPlugConnectedX size={'8rem'} />
          <Text size={'1.5rem'} fw={'bold'} ta={'center'}>
            Player offline
          </Text>
          </Flex>
      }
    </Modal>
  );
};