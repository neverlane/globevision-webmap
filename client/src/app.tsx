import { Flex } from '@mantine/core';

import { Map, Sidebar } from '~/components';

function App() {
  return (
    <Flex h={'100vh'} align={'start'} justify={'space-between'} p={'md'}>
      <Sidebar />
      <Map />
    </Flex>
  );
}

export default App;
