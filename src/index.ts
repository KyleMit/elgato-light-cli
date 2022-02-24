#!/usr/bin/env ts-node-script
import { getArgAction } from './cli';
import { intervalBrightness, minBrightness, maxBrightness, intervalTemperature, minTemperature, maxTemperature } from './config';
import { updateLights, printStatus } from './elgato';
import { ActionTypes, TransformFunc } from './types';

main()

async function main() {

    const argInfo = getArgAction()

    if (argInfo.isTransform) {
        const lightTransformLookup: Partial<Record<ActionTypes, TransformFunc>> = {
            [ActionTypes.off]: l => ({on: 0}),
            [ActionTypes.on]: l => ({ on: 1 }),
            [ActionTypes.dim]: l => ({ brightness: Math.max(l.brightness - intervalBrightness, minBrightness) }),
            [ActionTypes.brighten]: l => ({ brightness: Math.min(l.brightness + intervalBrightness, maxBrightness) }),
            [ActionTypes.colder]: l => ({ temperature: Math.max(l.temperature - intervalTemperature, minTemperature) }),
            [ActionTypes.warmer]: l => ({ temperature: Math.min(l.temperature + intervalTemperature, maxTemperature) })
        }

        const transformFunc = lightTransformLookup[argInfo.action] as TransformFunc;
        await updateLights(transformFunc)
    } else if (argInfo.action === ActionTypes.status) {
        await printStatus();
    }

}

