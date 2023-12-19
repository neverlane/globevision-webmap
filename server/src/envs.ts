import { config } from 'dotenv';
import { get } from 'env-var';

config();

export const PORT = get('PORT').required().asPortNumber();

export const GLOBE_VISION_IP = get('GLOBE_VISION_IP').required().asString();
export const GLOBE_VISION_PORT = get('GLOBE_VISION_PORT').required().asPortNumber();