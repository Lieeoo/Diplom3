const { use } = require("express/lib/application");
const {Plan} = require('../models/model');
const ApiError = require('../errors/ApiError');
const { type } = require("express/lib/response");




class PlanController {
    async create(req, res) {
        const {year_of_plan,
            goals_of_educational_activity,
            
            target_priorities_1to4,
            tasks_1to4,
            target_priorities_5to9,
            tasks_5to9,
            target_priorities_10to11,
            tasks_10to11
             } = req.body
try{
        const type = await Plan.create(
            {year_of_plan,
                goals_of_educational_activity,
                
                target_priorities_1to4,
                tasks_1to4,
                target_priorities_5to9,
                tasks_5to9,
                target_priorities_10to11,
                tasks_10to11 })
        return res.json(type)
            }
            catch(e)
            {return next(ApiError.badrequest(e.message))



            }
    }



    async getALL(req,res) 
    { 
        const types = await Plan.findAndCountAll()
        return res.json(types)    
    }

    async getONE(req,res) 
    { const {id } = req.body
    const types = await Plan.findOne({where:{id}})
        return res.json(types)    
    }

    async delete(req,res,next) 
    {const {id } = req.body
    if(!id) return next(ApiError.badrequest('не введен айди'))


    const types = await Plan.destroy({where:{id}})
    return res.json({message: "удаление успешно"})
        
    }
   







}
module.exports= new PlanController()