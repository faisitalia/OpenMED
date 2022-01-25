# Info

## Configurazione

La variabile OPENVIDU_SECRET è la secret per accedere al server OpenVidu.
E' possibile modificare la secret di openvidu in package.json (consigliato in ambienti diversi da quello di sviluppo), presente negli script `start` e `openvidu-dev`.

## Utilizzo

Per lanciare la videocall app:

```bash
cd openmed-videocall
npm install     # necessario al primo avvio
npm run openvidu-dev
npm start
```