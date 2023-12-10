const { use } = require("express/lib/application");
const {Plan_Of_Class} = require('../models/model');
const ApiError = require('../errors/ApiError');
const { type } = require("express/lib/response");
const jwt= require('jsonwebtoken')



class PlanOfClassController {
    async create(req, res) {
        const {class_id, year_of_plan, target_priorities,           } = req.body
if(!class_id||! year_of_plan||!target_priorities) return res.json({message: "недостаточно данных"})

        const type = await Plan.create(
            {year_of_plan,
                class_id,
                target_priorities })
        return res.json(type)
    }



    async getALL(req,res) 
    { 
        const types = await Plan_Of_Class.findAndCountAll()
        return res.json(types)    
    }

    async getONE(req,res) 
    { const {id } = req.body
    const types = await Plan_Of_Class.findOne({where:{id}})
        return res.json(types)    
    }

    async delete(req,res,next) 
    {const {id } = req.body
    if(!id) return next(ApiError.badrequest('не введен айди'))


    const types = await Plan_Of_Class.destroy({where:{id}})
    return res.json({message: "удаление успешно"})
        
    }
   







}
module.exports= new PlanOfClassController()