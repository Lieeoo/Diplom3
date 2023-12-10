const { use } = require("express/lib/application");
const {Institution} = require('../models/model');
const ApiError = require('../errors/ApiError');
const { type } = require("express/lib/response");




class InstitutionController {
    async create(req, res) {
        const {name, descriprtion} = req.body
        if(!name||!descriprtion) return res.json({message: "некорректные данные"})
        const type = await Institution.create( {name,descriprtion,})
        return res.json(type)
    }



    async getALL(req,res) 
    { 
        const types = await Institution.findAndCountAll()
        return res.json(types)    
    }

    async getONE(req,res) 
    { const {id } = req.body
    const types = await Institution.findOne({where:{id}})
        return res.json(types)    
    }




    async delete(req,res,next) 
    {const {id } = req.body
    if(!id) return next(ApiError.badrequest('не введен айди'))
    await Institution.destroy({where:{id}})
    return res.json({message: "удаление успешно"})
        
    }
   
 async getAdditionalEducation(req,res,next) 
    { 
      
    }


    


}
module.exports= new InstitutionController()