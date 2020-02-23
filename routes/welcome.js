const router  = require('express').Router(),
verify = require('../verifyToken')


router.get('/',verify,(req,res)=>res.send('Welcome User :)'))
module.exports = router