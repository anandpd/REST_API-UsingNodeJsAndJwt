const joi = require('@hapi/joi')

// Register Validation func //
const RegisterValidation = (data)=>{
    const schema = joi.object( {
        name:joi.string().min(6).required(),
        email:joi.string().email().required(),
        password:joi.string().min(6).required()
    })
    return schema.validate(data)
    
}

const LoginValidation = (data)=>{
    const schema = joi.object( {
        email:joi.string().email().required(),
        password:joi.string().min(6).required()
    })
    return schema.validate(data)
    
}


module.exports.registerValidation = RegisterValidation  
module.exports.loginValidation = LoginValidation