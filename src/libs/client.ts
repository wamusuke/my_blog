import { createClient } from 'microcms-js-sdk';

type methodType = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const client = createClient({
  serviceDomain: process.env.SERVICE_DOMAIN || '',
  apiKey: process.env.API_KEY || '',
});

// defaltだとlimitに制限(10件まで)をかけられていたので100件取得する
export const getBlogs = (limit: number, endpoint: string, methodType: methodType) =>
  fetch(`https://${process.env.SERVICE_DOMAIN}.microcms.io/api/v1/${endpoint}?limit=${limit}`, {
    method: methodType,
    headers: { 'X-MICROCMS-API-KEY': process.env.API_KEY || '' },
  }).then((result) => result.json());
