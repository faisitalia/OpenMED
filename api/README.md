# Info

## Configurazione

Creare un file .env copiandolo da .env.template. Il backend richiede che ci sia una installazione di mongo disponibile. Nel repository è disponibile un [docker-compose](../docker) pronto all'uso.

## Utilizzo

- crea una directory "certs"

- entrare nella directory "certs" e lanciare:

```bash
openssl req -x509 -newkey rsa:2048 -keyout keytmp.pem -out cert.pem -days 365
openssl rsa -in keytmp.pem -out key.pem
```

Per lanciare l'API server:

```bash
cd api
mv .env.template .env  # necessario al primo avvio
npm install     # necessario al primo avvio
npm run seed    # necessario al primo avvio
npm run start
```

Una volta lanciato il server sarà disponibile lo [Swagger](https://swagger.io/docs) delle [API](http://localhost:3001/docs/).
