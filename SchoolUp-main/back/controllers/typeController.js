const { use } = require("express/lib/application");
const {Type} = require('../models/model');
const ApiError = require('../errors/ApiError');
const { type } = require("express/lib/response");




class TypeController {
    async create(req, res) {
        const {name} = req.body
        const type = await Type.create({name})
        return res.json(type)
    }



    async getALL(req,res) 
    {const types = await Type.findAll()
        return res.json(types)

        
    }
    async delete(req,res) 
    {


        
    }
   







}
module.exports= new TypeController()