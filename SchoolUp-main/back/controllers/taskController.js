const { use } = require("express/lib/application");
const {Task} = require('../models/model');
const ApiError = require('../errors/ApiError');
const { type } = require("express/lib/response");




class TaskController {
    async create(req, res) {
        const {id_Plan_Of_Class,id_Plan_Of_School,name } = req.body
if(!name||(!id_Plan_Of_Class&&!id_Plan_Of_School)) return res.json({message: "недостаточно данных для задачи"})
        const type = await Task.create(
            {id_Plan_Of_Class,
                id_Plan_Of_School,
                name
            })
        return res.json(type)
    }



    async getALL(req,res) 
    { 
        const types = await Task.findAndCountAll()
        return res.json(types)    
    }

    async getONE(req,res) 
    { const {id } = req.body
    const types = await Task.findOne({where:{id}})
        return res.json(types)    
    }

    async delete(req,res,next) 
    {const {id } = req.body
    if(!id) return next(ApiError.badrequest('не введен айди'))


    const types = await Task.destroy({where:{id}})
    return res.json({message: "удаление успешно"})
        
    }
   







}
module.exports= new TaskController()