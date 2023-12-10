const { use } = require("express/lib/application");
const {NapravlenieOBR} = require('../models/model');
const ApiError = require('../errors/ApiError');
const { type } = require("express/lib/response");




class NapravlenieOBRController {
    async create(req, res) {
        const {name} = req.body
        const type = await NapravlenieOBR.create({name})
        return res.json(type)
    }



    async getALL(req,res,next) 
    {const types = await NapravlenieOBR.findAndCountAll()
        return res.json(types)    
    }

    async delete(req,res,next) 
    {
        const {name,id} = req.body
        if(name)
        await NapravlenieOBR.destroy({where:{name}})
        else if(id)
        await NapravlenieOBR.destroy({where:{id}})
        else if(!id&&!name)
        return next(ApiError.badrequest('некорректные данные'))
        return res.json({message: "удаление успешно"})
        
    }
   







}
module.exports= new NapravlenieOBRController()