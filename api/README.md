# Info

## Configurazione

L'API server necessita di una installazione di mongo per la gestione dei dati applicativi e di una installazione di keycloak per la gestione dell'autenticazione e dell'autorizzazione.
Nella directory [docker](../docker) è disponibile un docker-compose con un ambiente pre-configurato che installa i due componenti ed esegue una configurazione di base per il primo utilizzo.

Lanciati i container (vedere il seguente [README.md](../docker/README.md) si può passare alla configurazione dell'API server:

- crea una directory "certs"
- entrare nella directory "certs" e lanciare:

https://github.com/FiloSottile/mkcert/

```bash
openssl req -x509 -newkey rsa:2048 -keyout keytmp.pem -out cert.pem -days 365
openssl rsa -in keytmp.pem -out key.pem
```

- Creare un file .env copiandolo da .env.template.
- Aggiornare OPENID_CLIENT_SECRET con quella relativo alla proprio installazione di keycloak. Per recuperare il client secret id è sufficiente accedere a keycloak con l'utenza di amministratore (admin/admin), cliccare su "Clients" --> "api-server" --> "Credentials" ed infine sul bottone "Regenerate secret".
- Lanciare i seguenti comandi

```bash
npm install     # installazione delle dipendenze
npm run seed    # popolamento del database mongo
```

## Test

Per verificare che la configurazione sia corretta e completa è possibile lanciare i test con il comando:

```bash
npm run test
```

## Utilizzo

Per lanciare l'API server:

```bash
npm run start
```

Una volta lanciato il server sarà disponibile lo [Swagger](https://swagger.io/docs) delle [API](http://localhost:3001/docs/).
