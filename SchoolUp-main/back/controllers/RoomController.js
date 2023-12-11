const { use } = require("express/lib/application");
const {Room} = require('../models/model');
const ApiError = require('../errors/ApiError');
const { type } = require("express/lib/response");




class Room_Controller {
    async create(req, res) {
        const {DormitoryID,Floor,Numb_of_max_residents } = req.body
if(!StudentID||!DormitoryID||!Floor) return res.json({message: "недостаточно данных для задачи"})
        Numb_of_max_residents=Numb_of_max_residents||2

        const type = await Room.create(
            {DormitoryID,
                Floor,
                Agr_to_contractID,
                Numb_of_max_residents,
                
            })
        return res.json(type)
    }



    async getALL(req,res) 
    { 
        const types = await Room.findAndCountAll()
        return res.json(types)    
    }

    async getONE(req,res) 
    { const {id } = req.body
    const types = await Room.findOne({where:{id}})
        return res.json(types)    
    }

    async delete(req,res,next) 
    {const {id } = req.body
    if(!id) return next(ApiError.badrequest('не введен айди'))


    const types = await Room.destroy({where:{id}})
    return res.json({message: "удаление успешно"})
        
    }
   







}
module.exports= new Room_Controller()