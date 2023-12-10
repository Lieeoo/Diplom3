
const jwt= require('jsonwebtoken')

const { options } = require("pg/lib/defaults")

/*основной задачей этого блока является проверка токенов на валидность изменять только в случае крайней необходимости*/
module.exports = function(req,res,next)
{
if (req.method=== "OPTIONS"){
    next()
}
try{
    const token = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
if(!token){
    res.status(401).json({"message":"не авторизован"})
}

const decoded=jwt.verify(token, process.env.jwt_key)
req.user= decoded
next()


}
catch(e)
    {
    res.status(401).json({"message":"не авторизован"})
    }
};

