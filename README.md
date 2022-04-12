# Révisions Node et Initiation à l'ORM Sequelize pour synchroniser la base SQL avec des modèles js

....

### Sequelize

What things you need to install the software and how to install them

```
npm install sequelize --save
```
Nécessite un driver pour que l'ORM communique avec la base de donnée SQL Maria DB

`` 
npm install mariadb --save  
``
Puis Créer un modèle Sequelize

`` 
src/models/pokemon.js
``

### Installation rappels

`npm install express --save`
`npm install morgan --save-dev`
`npm install serve-favicon --save`
`npm install body-parser --save `
`npm install sequelize --save `
`npm install mariadb --save `
`npm install bcrypt --save`
`npm install jsonwebtoken --save`

Pour bénéficier d'un opérateur Sequelize :
`const { Op } = require('sequelize')`

## Pour déploiement sur Heroku !
// très important pour le déploiement sur heroku !!!
// cela permettra à notre API REST de démarrer sur le bon port, que ce soit sur le web via Heroku ou localement !!!

Dans app.js, effectuer la modification suivante :
`const port = process.env.PORT || 3000;`
Nodemon ne doit pas être utilisé en production. En effet, son rôle est de démarrer et redémarrer l'API à chaque modification de notre code. D'où l'intérêt de distinguer les scripts de démarrage en production et développement
``
"start": "NODE_ENV=production node app.js",
"dev" : "NODE_ENV=development nodemon app.js"
``
Passer express en mode production !
Ne pas utiliser les dépendances de développement 
Ici, on a supprimé Morgan qui ne nous servait finalement à rien ainsi que d'autres initialement prévues pour un projet différent. 


