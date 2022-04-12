const { Sequelize, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')
const PokemonModel = require('../models/pokemon')
const UserModel = require('../models/user')
const pokemons = require('./mock-pokemon')

if(process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize('h4emme7k3w50fawh', 'wzn2i59vbv85be0z', 'uu7p8lb06yvt0jt3', {
    host: 'uyu7j8yohcwo35j3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-2',
    },
    logging: true
  })
} else{
  sequelize = new Sequelize('pokedex', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
})}

const Pokemon = PokemonModel(sequelize, DataTypes)
// on instancie le modèle User au près de Sequelize
const User = UserModel(sequelize, DataTypes)

const initDb = () => {
  return sequelize.sync({ force: true }).then(_ => {
    pokemons.map(pokemon => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types
      }).then(pokemon => console.log(pokemon.toJSON()))
    })


    bcrypt.hash('pikachu', 10)
      .then(hash => User.create({ username: 'pikachu', password: hash }))
      .then(user => console.log(user.toJSON()))

    console.log('La base de donnée a bien été initialisée !')
  })
}

module.exports = {
  initDb, Pokemon, User
}