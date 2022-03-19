# Info

## Configurazione

La variabile OPENVIDU_SECRET è la secret per accedere al server OpenVidu.
E' possibile modificare la secret di openvidu in package.json (consigliato in ambienti diversi da quello di sviluppo), presente negli script `start` e `openvidu-dev`.

[Apertura del firewall](https://docs.openvidu.io/en/2.21.0/deployment/allow-users-behind-firewalls/)

## Utilizzo

Per lanciare la videocall app:

```bash
cd openmed-videocall
npm install     # necessario al primo avvio
npm run openvidu-dev    # per linux potrebbe essere necessario eseguire il comando come superuser (sudo npm run openvidu-dev)
npm start
```

L'applicazione di videoconferenza sarà disponibile all indirizzo:
https://localhost:5000

## Integrazione

Per integrare il modulo di videoconferenza con un app esterna (es. Openmed-app) è sufficiente chiamare l'entry point `session` con una chiamata POST, specificando i parametri nel body specificati di seguito:

```bash
URL: https://HOSTNAME:5000/session
METHOD: POST
BODY PARAMS:
    - data: <nickname dell utente loggato>
    - sessionname: <nome della room>
SESSION PARAMS:
    - loggedUser: <username dell utente loggato>
```
