const router  = require('express').Router();
const User = require('../model/User'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcryptjs'),
    secretToken = 'iamSecretToken',
    verify = require('../verifyToken'),
    {registerValidation,loginValidation} = require('../validation')

router.post('/register', async(req,res)=>{
    // Validate the data first 
    const {error} = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // Check if User Exists 
    const emailExists = await User.findOne({email:req.body.email})
    if (emailExists) return res.status(400).send('User alredy Exists !!!')

    // Hash The Password
    const salt = await bcrypt.genSalt(5)
    const hashedPassword = await bcrypt.hash(req.body.password,salt)

    // Create a new User
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword
    });
    try{
        const savedUser = await user.save()
        // res.send('User added Succesfully :)')
        res.send({user:savedUser.name})
    } catch(err) {
        res.status(400).send(err)
    }
});

router.post('/login',async(req,res)=>{
    const {error} = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const user = await User.findOne({email:req.body.email})
    if (!user) return res.status(400).send('Invalid Email !!!')


    // Password is Correct
    const validPass = await bcrypt.compare(req.body.password,user.password)
    if (!validPass) return res.status(400).send('Invalid Password !!!')

    // Create and assign a token 
    const token = jwt.sign({_id:user._id},secretToken)
    res.header('auth-token',token).send('Succesfully LoggedIn')
    // res.send('Succesfully Logged in :)')
})


module.exports = router