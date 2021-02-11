import type { TrackerParams } from '../types/types';

import uuid from 'uuid-random';

export const generateId = () => uuid();
export const generateRandom = () => Math.random().toString(36).slice(2, 7);

// 2020-08-24T13:42:16.439Z -> 2020-08-24T13:42:16.439123Z
export const reformatDate = (strDate: string) => {
  const end = strDate.split('.')[1];
  if (!end) {
    return strDate;
  }
  if (end.length >= 7) {
    return strDate;
  }
  return strDate.slice(0, -1) + '0'.repeat(7 - end.length) + 'Z';
};

export const getLaunchParams = (query: string) => {
  const params: TrackerParams = {};
  let match;
  const paramsRegex = /vk_([\w-]+)=([\w-]+)/g;
  while ((match = paramsRegex.exec(query)) !== null) {
    params[match[1]] = match[2];
  }
  return params;
};

export const stringify = (obj: TrackerParams) => {
  const cache: unknown[] = [];
  const result = JSON.stringify(obj, (_, value) => {
    if (typeof value === 'object' && value !== null) {
      if (cache.includes(value)) {
        return;
      }
      cache.push(value);
    }
    return value;
  }, 0);
  return result;
};

const hostScheme = /((https?:)|^)(\/\/)?/;
export const getHostWithProtocol = (url: string) => {
  return url.replace(hostScheme, '//');
};
