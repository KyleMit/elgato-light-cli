import bonjour from 'bonjour';

export function discoverEndpoint() {
    const bonjourClient = bonjour();
    const browser = bonjourClient.find({ type: 'elg' }, (service) => {
        console.log(service)
    });

    browser.on('up', (service) => {

        var info = {
            ip: service['referer'].address,
            port: service.port
        }

        console.log(info)

        bonjourClient.destroy();
    });
    browser.start();
}
