const { use } = require("express/lib/application");
const ApiError = require('../errors/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {User, Class}= require ('../models/model')
const generateJwt=(id,email,role)=>{
    return jwt.sign({id , email, role},process.env.jwt_key,{expiresIn: '24h'})/* экспайрс ин, это срок годности токена, чтобы если токен украли, он устарел за этот срок*/


}




class UserController {
    async aboutme(req,res,next)
    {
        try {
            const token = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
            const decoded = jwt.verify(token, process.env.jwt_key)
            if(!decoded.email){
                return next(ApiError.badrequest('некорректный логин'))
            }
            const candidate = await User.findOne({where:{email: decoded.email}})
                if(candidate){
        
                return res.status(200).json({
                    email:candidate.email,
                    comm:candidate.comm,
                    name: candidate.name,
                    lname:candidate.lname,
                    mname:candidate.mname
            
                })
                }
                else
                {
                   return next(ApiError.badrequest('некорректный логин'))
                }
        }
     catch (e) {
        res.status(401).json({message: "не авторизован"})
    }
   
    }






    async aboutmered(req,res,next)
    {let {name,lname,mname,comm,password,email }= req.body
    try {
    const token = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
            if (!token) {
                return res.status(401).json({message: "Не авторизован"})
            }
            const decoded = jwt.verify(token, process.env.jwt_key)
            if(!decoded.email){
                return next(ApiError.badrequest('некорректный логин'))
            }



    
    let candidate = await User.findOne({where:{email:decoded.email}})
    let hashPassword  
    if(password)
    {hashPassword = await bcrypt.hash(password,8)  }
else  hashPassword=password||candidate.password

    name=name||candidate.name
    lname=lname||candidate.lname
    mname=mname||candidate.mname
    comm=comm||candidate.comm
    password=password||candidate.password
    email=email||candidate.email
    

        if(candidate){
            await User.update({ name: name,lname: lname,mname: mname,comm: comm, email:email, password:hashPassword}, {
                where: {
                    email: decoded.email
                }
              });
        let candidate = await User.findOne({where:{email:decoded.email}})   
        const token= generateJwt(candidate.id,candidate.email,candidate.role)
        return res.status(200).json({
            comm:candidate.comm,
            name: candidate.name,
            lname:candidate.lname,
            mname:candidate.mname,
            password:candidate.password,
            email:candidate.email,
            token:token
        })
        }
        else
        {
           return next(ApiError.badrequest('некорректный логин'))
        }}
        catch (e) {
            res.status(401).json({message: "не авторизован"})
        }
    }




    async registration(req,res,next) 
    {const {email, password, role,name,lname,mname,comm }= req.body
        if(!email||!password){
            return next(ApiError.badrequest('некорректный логин или пароль'))
        }
        const candidate = await User.findOne({where:{email}})
        if(candidate){
            return next(ApiError.badrequest('такой логин уже существует'))
        }
        const hashPassword = await bcrypt.hash(password,8)
        const user = await User.create({email, role, password:hashPassword,name,lname,mname,comm })
        
        const token= generateJwt(user.id,user.email,user.role)


        return res.json({token})
    }




    async login(req,res,next) 
    {
        const{email,password} = req.body
        if (!email&&!password) return next(ApiError.internal('вы не ввели данные'))
        const user = await User.findOne({where:{email}})
        if (!user)
        {
            return next(ApiError.internal('пользователь не найден. Возможно, вы ввели неправильные данные '))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword)
        {
            return next(ApiError.internal('указан неверный пароль'))
        }
        const token= generateJwt(user.id,user.email,user.role)


        return res.json({token})
    }

    
    async check(req,res, next) 
    {
       
    const token = generateJwt(req.user.id, req.user.email, req.user.role)
        res.json({token})

        /*const {id} = req.query
        
        if(!id){return next(ApiError.badrequest('не задан айди'))}
        res.json(id)*/
    }
   

    async addClass(req,res,next)
    {try{  const {id, class_id } = req.body
   
 
    User.findOne({where: {id}})
    .then(event=>{
        if(!event) return next(ApiError.badrequest('некорректный айди'));
         
        // добавим Тому курс по JavaScript
        Class.findOne({where: {id: class_id}})
            .then(course=>{
                if(!course) return next(ApiError.badrequest('некорректный айди'));
                event.addClass(course, {through:{test:1}});
                return res.json({message:"класс добавлен"})
        });
        
}); }catch(e)
{
    return next(ApiError.badRequest(e.message))
}}

async getClass(req,res,next) 
{try{
    const {id } = req.body
    User.findOne({where: {id}})
    .then(event=>{
        if(!event) return next(ApiError.badrequest('некорректный айди'));
        event.getclasss().then(courses=>{
           /* for(course of courses){
                console.log(course.name);
            }/** */
            return res.json(courses)
           
            
        });
    });
}catch(e)
{
    return next(ApiError.badRequest(e.message))
}
}


async getALL(req,res) 
{const brands = await User.findAll()
    return res.json(brands)
}

async givemyrole(req,res) 
{ try{const token = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
const decoded = jwt.verify(token, process.env.jwt_key)
return res.json({"role": decoded.role})

}catch(e)
{
    return next(ApiError.badRequest(e.message))
}
}




}
module.exports= new UserController()