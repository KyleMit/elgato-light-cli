import bonjour from 'bonjour';

main()

async function main() {
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
    //browser.start();

    await new Promise(r => setTimeout(r, 2000));
    await new Promise(r => setTimeout(r, 4000));
    await new Promise(r => setTimeout(r, 6000));
    await new Promise(r => setTimeout(r, 8000));
    await new Promise(r => setTimeout(r, 20000));
    console.log("done")

}
