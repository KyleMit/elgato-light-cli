#!/usr/bin/env ts-node-script
import { getArgAction } from './cli';
import { intervalBrightness, minBrightness, maxBrightness, intervalTemperature, minTemperature, maxTemperature } from './config';
import { discoverEndpoint } from './discovery';
import { updateLights, printStatus } from './elgato';
import { ActionTypes, TransformFunc } from './types';

main()

async function main() {

    const action = getArgAction()

    if (action === ActionTypes.help) {
        console.log(`Usage:
  elg [command]
  elgato-light-cli [command]

Commands:
  help       Display help for elgato-light-cli
  status     Show the current status
  off        Turn off the device
  on         Turn on the device
  dim        Decrease brightness
  brighten   Increase brightness
  colder     Shift color temperature cooler
  warmer     Shift color temperature warmer
  discover   Discover the device on the network (need to hardcode the IP address)
`)
    } else if (action === ActionTypes.status) {
        await printStatus();
    } else if (action === ActionTypes.discover) {
        discoverEndpoint();
    } else {
        const lightTransformLookup: Partial<Record<ActionTypes, TransformFunc>> = {
            [ActionTypes.off]: l => ({on: 0}),
            [ActionTypes.on]: l => ({ on: 1 }),
            [ActionTypes.dim]: l => ({ brightness: Math.max(l.brightness - intervalBrightness, minBrightness) }),
            [ActionTypes.brighten]: l => ({ brightness: Math.min(l.brightness + intervalBrightness, maxBrightness) }),
            [ActionTypes.colder]: l => ({ temperature: Math.max(l.temperature - intervalTemperature, minTemperature) }),
            [ActionTypes.warmer]: l => ({ temperature: Math.min(l.temperature + intervalTemperature, maxTemperature) })
        }

        const transformFunc = lightTransformLookup[action] as TransformFunc;
        await updateLights(transformFunc)
    } 

}

