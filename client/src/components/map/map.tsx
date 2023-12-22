import { Flex } from '@mantine/core';
import { useUnit } from 'effector-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { $currentServer, $players } from '~/shared';

import { wrapperStyles } from './map.css';
import { RenderMap } from './render-map';



export const Map = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const currentServer = useUnit($currentServer);

  const [mapSize, setMapSize] = useState<number>(0);

  const players = useUnit($players);

  const recalculateMap = useCallback(() => {
    if (!boxRef.current) return;
    const s = Math.min(boxRef.current.clientWidth * 0.9, 1200);
    setMapSize(s);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', recalculateMap);
    return () => window.removeEventListener('resize', recalculateMap);
  }, [recalculateMap]);

  useEffect(() => {
    recalculateMap();
  }, [boxRef, recalculateMap]);

  return (
    <Flex ref={boxRef} className={wrapperStyles}>
      {currentServer !== null && <RenderMap size={mapSize} players={players} server={currentServer} />}
    </Flex>
  );
};