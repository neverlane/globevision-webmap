import { Flex } from '@mantine/core';
import { Sidebar, Map } from '~/components';

function App() {
  return (
    <Flex h={'100vh'} align={'start'} justify={'space-between'} p={'md'}>
      <Sidebar />
      <Map />
    </Flex>
  );
}

export default App;
