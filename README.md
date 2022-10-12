-- An hiring challenge.

-- EN

Requirements: ubuntu, docker started up, node v15.0.1;
To start the app exeute the following command:
- npm start

This script will install all npm deps for the backend, will create the docker instance, will copy the transpiled backend files in the docker vm and will start it.
You can now reach the site at localhost:8080 and the api at localhost:8080/api.

Implemented features:
- express buil-in webserver;
- react-bootstrap;
- swipe menu;
- list lazy loading;
- localstorage flyer crud;

--- ITA 

Requisiti: ubuntu, docker avviato, node v15.0.1;
Per avviare l'app eseguire il seguente comando:
- npm start

Lo script npm si occuperà di installare le dipendenze di node nella cartella del backend, creare l'immagine docker (copiando i file di build) ed avviarla.
L'app ora raggiunbile su localhost:8080 e le api su localhost:8080/api

Funzionalità implementate:
- buil-in webserver di express;
- react-bootstrap;
- swipe per apertura/chiusura menu;
- lazy loading quando la lista da scrollare arriva alla fine;
- salvataggio dei volantini preferiti sul localstorage, con funzionalità di rimozione;
