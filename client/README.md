# OpenMed Client

Il Client di OpenMed è un'App che gira su [Nuxt3](https://v3.nuxtjs.org). Al momento il SSR è disabilitato.

## Prerequisiti

È necessario completare la procedura di installazione e configurazione del (degli) Server API, come indicato [qui](https://github.com/faisitalia/OpenMED/blob/develop/api/README.md).

Per installare yarn eseguire i seguenti comandi (testati su Ubuntu 20.04):

```bash
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get install yarn
```

## Setup

È necessario installare le dipendenze con:

```bash
yarn install
```

NB. `yarn` è necessario al fine di installare [Pinia](https://pinia.vuejs.org/) su ambiente Nuxt3.
In altre parole, NON usare `npm install`, in quanto `npm` non è in grado di installare `Pinia` su Nuxt3.

## Development Server

Start the development server on https://localhost:3000

```bash
yarn dev -o
```

## Production

Per far partire il server in produzione, occorre ... (TODO)

(Di seguito le istruzioni standard per un server nuxt3)

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/guide/deploy/presets) for more information.