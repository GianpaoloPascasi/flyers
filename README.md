-- An hiring challenge.

-- EN

Requirements: unix or windows, docker started up, node v15.0.1;
To start the app exeute the following command (be sure to stay in the root repo folder):
- npm run (use `windows` or `unix` based on your OS)

This script will install all npm deps for the backend, will create the docker instance, will copy the transpiled backend files in the docker vm and will start it.
You can now reach the site at localhost:8080 and the api at localhost:8080/api.

Implemented features:
- express buil-in webserver;
- react-bootstrap;
- swipe menu;
- list lazy loading;
- localstorage flyer crud;

--- ITA 

Requisiti: unix or windows, docker avviato, node v15.0.1;
Per avviare l'app eseguire il seguente comando (assicurati di stare sulla root della repo):
- npm run ( `windows` o `unix` in base al tuo SO)

Lo script npm si occuperà di installare le dipendenze di node nella cartella del backend, creare l'immagine docker (copiando i file di build) ed avviarla.
L'app ora raggiunbile su localhost:8080 e le api su localhost:8080/api

Funzionalità implementate:
- buil-in webserver di express;
- react-bootstrap;
- swipe per apertura/chiusura menu;
- lazy loading quando la lista da scrollare arriva alla fine;
- salvataggio dei volantini preferiti sul localstorage, con funzionalità di rimozione;
