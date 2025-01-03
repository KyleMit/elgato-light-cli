import { promises as fs } from 'fs';
import * as path from 'path';
import * as os from 'os';
import { ElgatoEndpoint } from './types';
import { discoverEndpoint } from './discovery';

export const minBrightness = 3;
export const maxBrightness = 100;
export const minTemperature = 143;
export const maxTemperature = 344;
export const stepsBrightness = 6;
export const stepsTemperature = 6;
export const intervalBrightness = (maxBrightness - minBrightness) / stepsBrightness;
export const intervalTemperature = (maxTemperature - minTemperature) / stepsTemperature;

  
function getConfigFilePath(): string {
    // Example
    //   /Users/<username>/.elgato-light-cli.json (macOS/Linux)
    //   C:\Users\<username>\.elgato-light-cli.json (Windows)
    return path.join(os.homedir(), '.elgato-light-cli.json');
}

export async function saveConfig(config: ElgatoEndpoint): Promise<void> {
    const configFilePath = getConfigFilePath();
  
    // Write the file, pretty-printing JSON with two spaces
    const jsonString = JSON.stringify(config, null, 2);
    await fs.writeFile(configFilePath, jsonString, 'utf8');
  }
  
export async function loadConfig(): Promise<ElgatoEndpoint> {
    const configFilePath = getConfigFilePath();
    try {
      const fileContents = await fs.readFile(configFilePath, 'utf8');
      return JSON.parse(fileContents) as ElgatoEndpoint;
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
          // if file doesn't exist yet, try to get it
          const config = await discoverEndpoint();
          return config;
      }
      throw error;
    }
  }
