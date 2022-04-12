console.log(process.env.PORT)
// le PORT sera déterminé dynamiquement sur Heroku, alors que localement, il l'est de manière statique. 
// L'exécution de la commande ci-dessus renvoie même undefined
// La question est comment permuter ce port en fonction de l'environnament où on se trouve ? 
// D'où l'intérêt d'écouter le PORT défini par la variable d'environnement fournie par Heroku : PROCESS_ENV

