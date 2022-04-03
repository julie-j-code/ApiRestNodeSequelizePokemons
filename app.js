// code minimum pour mettre en place un point de terminaison 
// on récupère le package express
const express = require('express');
const res = require('express/lib/response');
const Sequelize = require('sequelize');


// const helper = require('./helper')
const { success, getUniqueId } = require('./helper')
let pokemons = require('./mock-pokemon')
// middleware morgan
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
// on crée une instance d'une application expres (serveur web sur lequel fonctionnera l'api rest)
const app = express();
const port = 3000;
const sequelize = new Sequelize('pokedex', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(error => {
    console.error(`Impossible de se connecter à la base. Erreur ${error}`);
  });

// méthode use pour attacher un middleware à notre api rest avec express
app
  .use(favicon(__dirname + '/favicon.ico'))
  .use(morgan('dev'))
  // va permettre sans qu'on fasse quoi que ce soit de parser toutes les données entrantes vers notre api rest
  .use(bodyParser.json())


// première point de terminaison
app.get('/', (req, res) => {
  res.send('hello again express with nodemon')
})

app.get('/pokemon/:id', (req, res) => {
  // si on utilise res.send et qu'on veut comparer le texte 1 à la veleur 1 on né pas le choix
  const id = parseInt(req.params.id);
  const pokemon = pokemons.find(pokemon => pokemon.id === id)
  // res.send(`hello le paramètre de la route est ${id} et le nom ${pokemon.name}`);
  // on peut maintenant passer à la méthode json directement un objet javascript
  // réponse de base sans helper
  // res.json(pokemon);
  // réponse structurée avec helper
  const message = 'un pokemon a bien été trouvé'
  res.json(success(message, pokemon));
})
app.get('/pokemons/count', (req, res) => {
  const count = pokemons.length;
  // plutot que d'utiliser res.send, express a une méthode prête à l'emploi pour convertir la réponse en json
  res.send(`hello le nombre de pokemos inscrits au tableau est ${count}`);
})

app.get('/pokemons/index', (req, res) => {
  const message = 'voici la liste des pokemons en base'
  res.json(success(message, pokemons));
})

//...

app.post('/pokemons/new', (req, res) => {
  const id = getUniqueId(pokemons)
  const pokemonCreated = { ...req.body, ...{ id: id, created: new Date() } }
  pokemons.push(pokemonCreated)
  const message = `Le pokémon ${pokemonCreated.name} a bien été crée.`
  res.json(success(message, pokemonCreated))
})

app.put('/pokemons/put/:id', (req, res) => {
  const id = parseInt(req.params.id);
  pokemonUpdated = { ...req.body, id: id }
  // on retourne exactement le même tableau sauf si il s'agit du pokemon correspondant au pokemon modifié
  pokemons = pokemons.map(pokemon => {
    return pokemon.id === id ? pokemonUpdated : pokemon
  })
  const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié`
  res.json(success(message, pokemonUpdated))
})

app.delete('/pokemons/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  // on retourne pokemons 
  pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
  pokemons = pokemons.filter(pokemon => pokemon.id !== id)
  const message = `Le pokemon dont l'id est ${pokemonDeleted.id} a été supprimé`
  res.json(success(message, pokemonDeleted))
})

// ...
// const api = require('./api/v1/index');
// const cors = require('cors');
// app.use(cors());

app.listen(port, () => console.log(`Notre application est démarrée sur le port ${port}`));