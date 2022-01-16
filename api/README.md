# Info

## Configurazione

Creare un file .env copiandolo da .env.template. Il backend richiede che ci sia una installazione di mongo disponibile. Nel repository è disponibile un [docker-compose](../docker) pronto all'uso.

## Utilizzo

Per lanciare l'API server:

```bash
cd api
mv .env.template .env  # necessario al primo avvio
npm install     # necessario al primo avvio
npm run seed    # necessario al primo avvio
npm run start
```

Una volta lanciato il server sarà disponibile lo [Swagger](https://swagger.io/docs) delle [API](http://localhost:3001/docs/).
