const { use } = require("express/lib/application");
const {Contract_to_agreement} = require('../models/model');
const ApiError = require('../errors/ApiError');
const { type } = require("express/lib/response");




class Contract_to_agreement_Controller {
    async create(req, res) {
        const {date,rent, Rector_order} = req.body
if(!date||!rent||!Rector_order) return res.json({message: "недостаточно данных для задачи"})
        

        const type = await Contract_to_agreement.create(
            {date,
                rent,
                Rector_order,
                
            })
        return res.json(type)
    }



    async getALL(req,res) 
    { 
        const types = await Contract_to_agreement.findAndCountAll()
        return res.json(types)    
    }

    async getONE(req,res) 
    { const {id } = req.body
    const types = await Contract_to_agreement.findOne({where:{id}})
        return res.json(types)    
    }

    async delete(req,res,next) 
    {const {id } = req.body
    if(!id) return next(ApiError.badrequest('не введен айди'))


    const types = await Contract_to_agreement.destroy({where:{id}})
    return res.json({message: "удаление успешно"})
        
    }
   







}
module.exports= new Contract_to_agreement_Controller()