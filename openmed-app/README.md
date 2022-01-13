# OpenMED-app

Questa applicazione è una GUI che permette di interagire con le funzionalità della piattaforma OpenMED. Per accedere è necessario prima configurare alcuni componenti, come descritto nei paragrafi successivi.

## Prerequisiti

Affinchè l'applicativo funzioni correttamente è necessario:

### Configurazione ambiente di backend

La guida per la configurazione dell'ambiente di sviluppo è disponibile [qui](../v1.0.0.md). Di seguito sono elencati i passaggi necessari alla configurazione, in modo da semplificare la fruizione della guida:

### Configurazione file .env

Partendo dal file ".env.template" creare il file ".env" impostando correttamente le seguenti variabili:

- **REACT_APP_API_SERVER**: è l'URL dell'API server di OpenMED. In sviluppo sarà: [http://localhost:3001](http://localhost:3001)

## Utilizzo

Per lanciare il client:

```bash
cd openmed-app
mv .env.template .env  # necessario al primo avvio
npm install     # necessario al primo avvio
npm start
```

## Login

La procedura di [seed](../api/README.md) genera alcuni utenti di default che possono essere utilizzati per i primi login:

### Utente

email: `user@openmed.test`
password: `password`
