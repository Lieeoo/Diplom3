const { use } = require("express/lib/application");
const {Brand} = require('../models/model');
class BrandController {
    async create(req,res) 
    {
        const {name} = req.body
        const brand = await Brand.create({name})
        return res.json(brand)


    }
    async getALL(req,res) 
    {const brands = await Brand.findAll()
        return res.json(brands)



        
    }
    async delete(req,res) 
    {


        
    }
   







}
module.exports= new BrandController()