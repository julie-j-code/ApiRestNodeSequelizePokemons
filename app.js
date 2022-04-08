// code minimum pour mettre en place un point de terminaison 
// on récupère le package express
const express = require('express');
// on garde Sequelize en n'utilisant maintenant que les éléments dont nous avons besoin. 
const sequelize = require('./src/db/sequelize');

// middleware morgan
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
// on crée une instance d'une application expres (serveur web sur lequel fonctionnera l'api rest)
const app = express();
const port = 3000;

// méthode use pour attacher un middleware à notre api rest avec express
app
  .use(favicon(__dirname + '/favicon.ico'))
  .use(morgan('dev'))
  // va permettre sans qu'on fasse quoi que ce soit de parser toutes les données entrantes vers notre api rest
  .use(bodyParser.json())

//  on appelle la méthode init qu'on vient de définir dans notre module sequelize
  sequelize.initDb();

  // ici, on placera nos futurs points de terminaison

app.listen(port, () => console.log(`Notre application est démarrée sur le port ${port}`));