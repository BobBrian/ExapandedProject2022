const JWT = require('jsonwebtoken')

module.exports = async (req,res,next) =>{
    const token  = req.header('token')
    if(!token){
        return res.status(400).json({
            "errors":[
                {
                    "msg":"No Token"
                }
            ]
        })
    }

   try {

    const verify = JWT.verify(token,"MEGARANGER123")
    req.user = verify.user
    next()
        
   } catch (err) {

        return res.status(400).json({
            "errors":[
                {
                    "msg":"Invalid Token"
                }
            ]
        })
       
   }
}