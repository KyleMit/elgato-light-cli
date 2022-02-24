# Elgato Light Cli

CLI to control Elgato Light


```bash
elgato-lights-cli off
elgato-lights-cli on
elgato-lights-cli dim
elgato-lights-cli brighten
elgato-lights-cli colder
elgato-lights-cli warmer
```


## Prior Art


* Powershell - [pcgeek86/elgato](https://github.com/pcgeek86/elgato)
* Python - [jeffisfast/Elgato-Light-Controller](https://github.com/jeffisfast/Elgato-Light-Controller)
* Node - [jasonheecs/elgato-key-light-automator](https://github.com/jasonheecs/elgato-key-light-automator)


## Bonjour

```js
import bonjour from 'bonjour';


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
```
