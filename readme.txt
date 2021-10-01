Per avviare l'app eseguire i seguenti comandi (richiede docker installato):
- docker build . -t gianpaolo.pascasi/shofully-app
- docker run -p 8080:8080 -d gianpaolo.pascasi/shofully-app

L'app è ora raggiunbile su localhost:8080 e le api su localhost:8080/api