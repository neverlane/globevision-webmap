import { createSocket } from 'dgram';
import { SmartBuffer } from 'smart-buffer';

import { GLOBE_VISION_IP, GLOBE_VISION_PORT } from './envs';
import { serversList } from './list';
import { serverCache } from './cache';

export interface IPosition {
  x: number;
  y: number;
  z: number;
}

export interface IPlayer {
  id: number;
  nickname: string;
  updated: number;
  health: number;
  armor: number;
  weapon: number;
  skin: number;
  position: IPosition;
  color: number;
}

const SOCKET_PACKET_TIMEOUT = 100;

export const createSocketClient = (index: number) => {
  const socket = createSocket('udp4');
  const data = new SmartBuffer().writeUInt16LE(2).writeUInt8(1).writeUInt8(index).toBuffer();
  const sendPacket = () => socket.send(data);
  socket.on('message', (message) => {
    const buffer = SmartBuffer.fromBuffer(message);
    const size = buffer.readInt16LE();
  
    const count = (size-1) / 46;
    if (count % 1 !== 0) return;
    const players: IPlayer[] = [];
  
    for (let i = 0; i < count; ++i) {
      const id = buffer.readUInt16LE();
      const updHp = buffer.readUInt8();
      const armor = buffer.readUInt8();
      const weapSkin = buffer.readUInt16LE();
      const position = {
        x: buffer.readFloatLE(),
        y: buffer.readFloatLE(),
        z: buffer.readFloatLE(),
      };
      buffer.readUInt32LE(); // skip quats
      const color = buffer.readUInt32LE();
      let nickname = '';
      const nicknameBuffer = buffer.readBuffer(20);
      for (let i = 0; i < nicknameBuffer.length; i++) {
        if (nicknameBuffer[i] === 0) break;
        nickname += String.fromCharCode(nicknameBuffer[i]);
      }
      players.push({
        id,
        updated: (updHp >> 0) & 1,
        health: (updHp >> 1 & 0x7F),
        armor,
        weapon: weapSkin & 0x003F,
        skin: (weapSkin >> 6) & 0x03FF,
        position,
        color,
        nickname
      });
    }
    serverCache.set(index, players);
  });
  socket.on('connect', () => {
    setInterval(sendPacket, SOCKET_PACKET_TIMEOUT);
  });
  socket.connect(GLOBE_VISION_PORT, GLOBE_VISION_IP);
  return { socket };
};

// start servers from settings
export const socketClients = serversList.map((server) => ({
  server, socket: createSocketClient(server.index)
}));