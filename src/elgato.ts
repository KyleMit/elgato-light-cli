import fetch from 'cross-fetch';
import { ElgatoResponse, TransformFunc, ElgatoUpdate } from './types';
import { loadConfig } from './config';

export async function getUrl(): Promise<string> {
    const config = await loadConfig();
    const keyLightUrl = `http://${config.ip}:${config.port}/elgato/lights`;
    return keyLightUrl
}

export async function getLights(): Promise<ElgatoResponse> {
    const url = await getUrl();
    const resp = await fetch(url)
    const data = await resp.json()
    return data;
}

export async function printStatus(): Promise<void> {
    const data = await getLights();
    console.log(data);
}

export async function updateLights(transformFunc: TransformFunc): Promise<void> {
    const { lights } = await getLights();

    const payload: ElgatoUpdate = { lights: lights.map(transformFunc)}

    const url = await getUrl();
    await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(payload),
    })
}
