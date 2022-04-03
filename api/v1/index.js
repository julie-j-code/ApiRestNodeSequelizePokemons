const express = require('express');
const app = express()
// anciennement :
// const res = require('express/lib/response');
// const router = express.Router();


// respond with "hello world" when a GET request is made to the homepage
app.get('/ping', (req, res) => {
//   res.send('hello world')
res.status(200).json({'msg':'pong', 'date':new Date()})
})
// anciennement :
// router.get('/', (req, res) => {
//     res.send('hello world')
//   })

module.exports = app;
// anciennement :
// module.exports = router;