import { Button } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons-react';

export const GithubRepo = () => {
  return (
    <Button
      w={'2.5rem'}
      h={'2.5rem'}
      p={0}
      variant={'default'}
      onClick={() => window.open('https://github.com/neverlane/globevision-webmap', '_blank')}
    >
      <IconBrandGithub />
    </Button>
  );
};