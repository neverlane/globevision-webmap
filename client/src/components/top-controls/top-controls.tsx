import { Flex } from '@mantine/core';

import { BlasthackTopic } from './blasthack-topic';
import { ColorScheme } from './color-scheme';
import { GithubRepo } from './github-repo';

export const TopControls = () => {
  return (
    <Flex
      pos={'absolute'}
      right={'2rem'}
      top={'2rem'}
      gap={'sm'}
    >
      <BlasthackTopic />
      <GithubRepo />
      <ColorScheme />
    </Flex>
  );
};