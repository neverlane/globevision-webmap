import { Button, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';

export const ColorScheme = () => {
  const { toggleColorScheme } = useMantineColorScheme();
  const colorScheme = useComputedColorScheme('dark');
  const Icon = colorScheme === 'light' ? IconMoon : IconSun;

  return (
    <Button
      w={'2.5rem'}
      h={'2.5rem'}
      p={0}
      variant={'default'}
      onClick={toggleColorScheme}
    >
      <Icon />
    </Button>
  );
};