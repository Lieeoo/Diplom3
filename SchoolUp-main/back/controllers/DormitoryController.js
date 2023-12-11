const { use } = require("express/lib/application");
const {Dormitory} = require('../models/model');
const ApiError = require('../errors/ApiError');
const { type } = require("express/lib/response");




class Dormitory_Controller {
    async create(req, res) {
        const {name,adress } = req.body
if(!name||!adress) return res.json({message: "недостаточно данных для задачи"})
        

        const type = await Dormitory.create(
            {name,
                adress,
                
                
            })
        return res.json(type)
    }



    async getALL(req,res) 
    { 
        const types = await Dormitory.findAndCountAll()
        return res.json(types)    
    }

    async getONE(req,res) 
    { const {id } = req.body
    const types = await Dormitory.findOne({where:{id}})
        return res.json(types)    
    }

    async delete(req,res,next) 
    {const {id } = req.body
    if(!id) return next(ApiError.badrequest('не введен айди'))


    const types = await Dormitory.destroy({where:{id}})
    return res.json({message: "удаление успешно"})
        
    }
   







}
module.exports= new Dormitory_Controller()