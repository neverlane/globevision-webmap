import { Box, Space } from '@mantine/core';

import { Map, Sidebar, TopControls } from '~/components';
import { appStyles } from '~/pages/home.css';

function App() {
  return (
    <Box className={appStyles}>
      <Sidebar />
      <Space h={'2rem'} />
      <Map />
      <Space h={'2rem'} />

      {/* heh abs */}
      <TopControls />
    </Box>
  );
}

export default App;
