import fetch from 'cross-fetch';
import { ElgatoResponse, TransformFunc, ElgatoUpdate } from './types';

export function getUrl() {
    const keyLightIp = "192.168.1.64"
    const keyLightPort = "9123"
    const keyLightUrl = `http://${keyLightIp}:${keyLightPort}/elgato/lights`;
    return keyLightUrl
}

export async function getLights(): Promise<ElgatoResponse> {
    const resp = await fetch(getUrl())
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

    await fetch(getUrl(), {
        method: 'PUT',
        body: JSON.stringify(payload),
    })
}
