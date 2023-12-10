const { use } = require("express/lib/application");
const uuid= require("uuid");
const path = require("path")
const {Device, DeviceInfo}= require('../models/model')//запрос девайса из базы данных

const ApiError = require('../errors/ApiError');
const { json } = require("express/lib/response");

class DeviceController {
    async create(req,res,next) 
    {
        try{
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            if(info){
                info= JSON.parse(info)
                info.forEach(i=>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                    )
            }




            const device = await Device.create({name, price, brandId, typeId, img: fileName});
            return res.json(device)
        }
        catch(e)
        {
            next(ApiError.badRequest(e.message))
        }
    }
    async getALL(req,res) 
    { let {brandId, typeId, limit, page}= req.query
        page = page || 1
        limit = limit || 9
        let ofset =(page-1)*limit


        let devices;
        if(!brandId && !typeId){
            devices= await Device.findAndCountAll({limit,ofset})//FindAll Находит всех, а финдэндкаунт еще и  выдает фронту количевство
        }
            else if(brandId && !typeId){
                devices= await Device.findAndCountAll({where: {brandId},limit,ofset})

            }
                else if(!brandId && typeId){
                    devices= await Device.findAndCountAll({where: {typeId},limit,ofset})

                }
                    else if(brandId && typeId){
                        devices= await Device.findAndCountAll({where: {typeId, brandId},limit,ofset})

                    }
                    return res.json(devices)
    }
    async getOne(req,res) 
    {
        const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            },
        )
        return res.json(device)

        
    }

    async delete(req,res) 
    {


        
    }
   
   





}
module.exports= new DeviceController()