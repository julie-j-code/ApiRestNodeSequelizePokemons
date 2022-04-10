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

### Initialisation

Pour bénéficier d'un opérateur Sequelize :
`const { Op } = require('sequelize')`

