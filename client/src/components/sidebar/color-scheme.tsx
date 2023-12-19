import { useMantineColorScheme, Select, type MantineColorScheme } from '@mantine/core';

export const ColorScheme = () => {
  const { setColorScheme, colorScheme } = useMantineColorScheme();

  return (
    <Select
      w={'100%'}
      label={'Select color scheme'}
      value={colorScheme}
      data={['light', 'dark', 'auto']}
      onChange={(v) => v && setColorScheme(v as MantineColorScheme)}
    />
  );
};