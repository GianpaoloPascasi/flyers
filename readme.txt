Per avviare l'app eseguire il seguente comando (richiede ubuntu, docker avviato, node v15.0.1):
- npm start

Lo script npm si occuperà di installare le dipendenze di node nella cartella del backend, creare l'immagine docker (copiando i file di build) ed avviarla.
L'app ora raggiunbile su localhost:8080 e le api su localhost:8080/api

Funzionalità implementate:
- buil-in webserver di express;
- react-bootstrap;

- swipe per apertura/chiusura menu;
- lazy loading quando la lista da scrollare arriva alla fine;
- salvataggio dei volantini preferiti sul localstorage, con funzionalità di rimozione;