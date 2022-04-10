// on crée un point de terminaison conteneant la route et le traitement associé
// on importe le modèle
const { Pokemon } = require('../db/sequelize')
const { Op } = require('sequelize')

// on exporte une fonction qui prend en paramètre notre application !
module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    //   retourne une promesse contenant la liste de pokemons présents dans la base de donnée

    // exemple de paramètres de requête personnelle
    if (req.query.name) {
      const name = req.query.name;
      return Pokemon.findAndCountAll(
        // {where : {name:name}} sans opérateur sequelize
        {
          where: {
            name: {
              [Op.or]: {
                [Op.like]: `%${name}%`,
              }
            }
          }, limit: 4
        }
      )

        .then(({ count, rows }) => {
          const message = `Il y a ${count} pokémons qui correspondent au terme de recherche ${name}.`
          return res.json({ message, data: rows })
        })

    }
    else {
      Pokemon.findAll()
        .then(pokemons => {
          const message = 'La liste des pokémons a bien été récupérée.'
          res.json({ message, data: pokemons })
          // puis on va utiliser la méthode catch() de javascript
        })
        .catch(error => {
          const message = `La liste des erreurs n'a pas  pu être récupérée, réessayez dans quelques instants`
          res.status(500).json({ message, data: error })
        })
    }
  })
}