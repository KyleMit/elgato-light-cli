import bonjour from 'bonjour';
import { ElgatoEndpoint } from './types';
import { saveConfig } from './config';

export function discoverEndpoint() {
    const bonjourClient = bonjour();
    const browser = bonjourClient.find({ type: 'elg' }, (service) => {
        console.log(service)
    });

    browser.on('up', (service) => {

        var info: ElgatoEndpoint = {
            ip: service['referer'].address,
            port: service.port
        }

        console.log(info)
        saveConfig(info);

        bonjourClient.destroy();
    });
    browser.start();
}
