const { use } = require("express/lib/application");
const {Res_Agr} = require('../models/model');
const ApiError = require('../errors/ApiError');
const { type } = require("express/lib/response");




class Res_Agr_Controller {
    async create(req, res) {
        const {StudentID,RoomID,Agr_to_contractID,date,date_of_beginning,date_of_canceling } = req.body
if(!StudentID||(!RoomID&&!Agr_to_contractID)) return res.json({message: "недостаточно данных для задачи"})
date =date|| new Date ()
date_of_beginning= date_of_beginning||date
date_of_canceling=date_of_canceling||(date.getDate() + 365);

        const type = await Res_Agr.create(
            {StudentID,
                id_Plan_OfRoomID_School,
                Agr_to_contractID,
                date,
                date_of_beginning,
                date_of_canceling
            })
        return res.json(type)
    }

    

    async getALL(req,res) 
    { 
        const types = await Res_Agr.findAndCountAll()
        return res.json(types)    
    }

    async getONE(req,res) 
    { const {id,StudentID } = req.body
    if(id||StudentID){
    const types = await Res_Agr.findOne({where:{id,StudentID}})
        return res.json(types)    }

    else 
        return res.json({message: "недостаточно данных для поиска"})


    }

    async delete(req,res,next) 
    {const {id } = req.body
    if(!id) return next(ApiError.badrequest('не введен айди'))


    const types = await Res_Agr.destroy({where:{id}})
    return res.json({message: "удаление успешно"})
        
    }
   







}
module.exports= new Res_Agr_Controller()