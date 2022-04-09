const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.get('/api/pokemons/:id', (req, res) => {
    //   plus besoin de la méthode  parseInt
    Pokemon.findByPk(req.params.id)
      .then(pokemon => {
        // gestion d'erreur 
        if (pokemon === null) {
          const message = `Le pokémon demandé n'existe pas. Réessayez avec un autre identifiant.`
          return res.status(404).json({ message })
        }

        const message = 'Un pokémon a bien été trouvé.'
        res.json({ message, data: pokemon })
      })
      .catch(error=>{
        const message = `Le pokemon n'a pas pu être récupéré. Ressayez dans quelques instants`
        res.status(500).json({message, data: error})
      })
  })
}