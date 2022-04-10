const { Pokemon } = require('../db/sequelize')
const { UniqueConstraintError, ValidationError } = require('sequelize/types')

module.exports = (app) => {
  app.put('/api/pokemons/:id', (req, res) => {
    const id = req.params.id
    Pokemon.update(req.body, {
      where: { id: id }
    })
      .then(_ => {
        // le fait de rajouter l'instrucrion return va permettre de factoriser la gestion de l'erreur 500
        // et donc de supprimer la duplication de code concernant cette erreur
        return Pokemon.findByPk(id).then(pokemon => {
          if (pokemon === null) {
            const message = `Le pokémon demandé n'existe pas. Réessayez avec un autre identifiant.`
            return res.status(404).json({ message })
          }
          const message = `Le pokémon ${pokemon.name} a bien été modifié.`
          res.json({ message, data: pokemon })
          // .catch(error => {
          //   const message = `Le  pokémon n'a pas pu être modifié. Réessayer dans quelques instants`
          //   res.status(500).json({ message, data: error })
          // })
        })
          .catch(error => {

            if (error instanceof ValidationError) {
              return res.status(400).json({ message: error.message, data: error });
            }
            // ajout contrainte d'unicité
            if (error instanceof UniqueConstraintError) {
              return res.status(400).json({ message: error.message, data: error });
            }

            const message = `Le  pokémon n'a pas pu être modifié. Réessayer dans quelques instants`
            res.status(500).json({ message, data: error })
          })
      })
  })
}