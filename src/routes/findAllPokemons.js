// on crée un point de terminaison conteneant la route et le traitement associé
// on importe le modèle
const { Pokemon } = require('../db/sequelize')
  
// on exporte une fonction qui prend en paramètre notre application !
module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    //   retourne une promesse contenant la liste de pokemons présents dans la base de donnée
    Pokemon.findAll()
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: pokemons })
      })
  })
}