import bonjour from 'bonjour';
import { ElgatoEndpoint } from './types';
import { saveConfig } from './config';

export function discoverEndpoint(): Promise<ElgatoEndpoint> {
    return new Promise((resolve, reject) => {
      const bonjourClient = bonjour();
  
      const browser = bonjourClient.find({ type: 'elg' }, (service) => {
        console.log(service)
      });
  
      browser.on('up', (service) => {
        const info: ElgatoEndpoint = {
          ip: service.referer.address,
          port: service.port,
        };
          console.log('Service up:', info);
          
        // also write service info to config file
        saveConfig(info);

        // Destroy the client and resolve the promise with the discovered info
        bonjourClient.destroy();
        resolve(info);
      });
    
      // Start the browser
      browser.start();
    });
  }
