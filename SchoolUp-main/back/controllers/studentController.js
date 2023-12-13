const { use } = require("express/lib/application");
const uuid= require("uuid");
const path = require("path")
const {Student}= require('../models/model')//запрос девайса из базы данных в этот раз мавра
const {Family} = require('../models/model');
const ApiError = require('../errors/ApiError');
const { json } = require("express/lib/response");

class StudentController {
    async create(req,res,next)  // создание студентишка
    {
        try{
            let {name, fullname, class_ID, birthday, group_of_risk,family_id,PFDO,sex,ball_of_abiturient,highter_educ,direction} = req.body// берем с тела реквеста  значения полей
            //const {img} = req.files
           // let fileName = uuid.v4() + ".jpg"// если было значение файла, то мы кидаем в статику файл, и прикрепляем название картинки в базу данных
           // img.mv(path.resolve(__dirname, '..', 'static', fileName))

            /*if(info){
                info= JSON.parse(info)
                info.forEach(i=>
                    studentInfo.create({
                        title: i.title,
                        description: i.description,
                        studentId: student.id
                    })
                    )
            }*/



            const student = await Student.create({name, fullname, class_ID, birthday, group_of_risk,family_id,PFDO,sex,ball_of_abiturient,highter_educ,direction});
            return res.json(student)
        }
        catch(e)
        {
            next(ApiError.badRequest(e.message))
        }
    }
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------




//-------------------------------------------------------------------------------------------------------------------------------
    async getALL(req,res) 
    { let {class_ID, family_id, limit, page}= req.query
        page = page || 1
        limit = limit || 30
        let ofset =(page-1)*limit


        let classes;
        if(!class_ID && !family_id){
            classes= await Student.findAndCountAll({limit,ofset})//FindAll Находит всех, а финдэндкаунт еще и  выдает фронту количевство
        }
            else if(class_ID && !family_id){
                classes= await Student.findAndCountAll({where: {class_ID},limit,ofset})

            }
                else if(!class_ID && family_id){
                    classes= await Student.findAndCountAll({where: {family_id},limit,ofset})

                }
                    else if(class_ID && family_id){
                        classes= await Student.findAndCountAll({where: {family_id, class_ID},limit,ofset})

                    }
                    return res.json(classes)
    }
    //------------------------------------------------------------------------------------------





    //------------------------------------------------------------------------------------------
    async getCLASS(req,res) 
    { let {class_ID, /*limit, page*/}= req.query
       /* page = page || 1
        limit = limit || 30
        let ofset =(page-1)*limit/** */

        let classes;
       if(class_ID ){
                classes= await Student.findAll({where: {class_ID}/*,limit,ofset*/})

            }
                
                    else {
                        return next(ApiError.badrequest('поле класса пустое'))

                    }
                    return res.json(classes)
    }
    //------------------------------------------------------------------------------------------
    async studred(req,res,next)
    {const {id,class_ID,name,fullname,birthday,group_of_risk,family_id,PFDO,sex }= req.body
    if(!id){
        return next(ApiError.badrequest('отсутствует айди'))
    }
    let candidate = await Student.findOne({where:{id}})


        if(candidate){
            if (name)
            await Student.update({ name:name/*,lname: lname,mname: mname,comm: comm */}, {
                where: {id}
              });
            if (class_ID)
              await Student.update({ class_ID:class_ID/*,lname: lname,mname: mname,comm: comm */}, {
                  where: {id}
                });
                if (fullname)
                await Student.update({ fullname:fullname/*,lname: lname,mname: mname,comm: comm */}, {
                    where: {id}
                  });
                  if (birthday)
                await Student.update({ birthday:birthday/*,lname: lname,mname: mname,comm: comm */}, {
                    where: {id}
                  });
                  if (group_of_risk)
                  await Student.update({ group_of_risk:group_of_risk/*,lname: lname,mname: mname,comm: comm */}, {
                      where: {id}
                    });
                    if (family_id)
                    await Student.update({ family_id:family_id/*,lname: lname,mname: mname,comm: comm */}, {
                        where: {id}
                      }); 
                      if (PFDO)
                      await Student.update({ PFDO:PFDO/*,lname: lname,mname: mname,comm: comm */}, {
                          where: {id}
                        }); 
                        if (sex)
                        await Student.update({ sex:sex/*,lname: lname,mname: mname,comm: comm */}, {
                            where: {id}
                          }); 
                        

                  

        let candidate1 = await Student.findOne({where:{id}})     
        return res.json(candidate1)
        }
        else
        {
           return next(ApiError.badrequest('некорректный айди'))
        }

    }


    async studred2(req,res,next)
    {let {id,name, fullname, class_ID, birthday, group_of_risk,family_id,PFDO,sex,ball_of_abiturient,highter_educ,direction }= req.body
    if(!id){
        return next(ApiError.badrequest('отсутствует айди'))
    }
    let candidate = await Student.findOne({where:{id}})
    class_ID=class_ID ||candidate.class_ID
    name=name||   candidate.name
    fullname=fullname|| candidate.fullname
    birthday=birthday|| candidate.birthday
    group_of_risk=group_of_risk||candidate.group_of_risk
    family_id=family_id||candidate.family_id
    PFDO=PFDO||candidate.PFDO
    sex=sex||candidate.sex
    ball_of_abiturient||candidate.ball_of_abiturient
    highter_educ||candidate.highter_educ
    direction||candidate.direction


    if(!candidate) return next(ApiError.badrequest('событие не найдено'))
    await Student.update({ class_ID,name,fullname,birthday,group_of_risk,family_id,PFDO,sex},
      {
        where: {id}
      });
        let candidate1 = await Student.findOne({where:{id}})     
        return res.json(candidate1)
    }



    //------------------------------------------------------------------------------------------
    async getFAMILY(req,res) 
    { let {family_id, /*limit, page*/}= req.body
       /* page = page || 1
        limit = limit || 30
        let ofset =(page-1)*limit/** */

        let classes;
       if(family_id ){
                classes= await Student.findAll({where: {family_id}/*,limit,ofset*/})

            }
                
                    else {
                        return next(ApiError.badrequest('поле семьи пустое'))

                    }
                    return res.json(classes)
    }
    //------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------
    async getSOME(req,res) 
    { let {class_ID, family_id, limit, page}= req.body
        page = page || 1
        limit = limit || 9999
        let ofset =(page-1)*limit


        let classes;
        if(!class_ID && !family_id){
            return (ApiError.badrequest('поля пусты'))

        }
            else if(class_ID && !family_id){
                classes= await Student.findAll({where: {class_ID},limit,ofset})

            }
                else if(!class_ID && family_id){
                    classes= await Student.findAll({where: {family_id},limit,ofset})

                }
                    else if(class_ID && family_id){
                        classes= await Student.findAll({where: {family_id, class_ID},limit,ofset})

                    }
                    return res.json(classes)
    }

//------------------------------------------------------------------------------------------
async getONE(req,res) 
{let {id}= req.body
if(id){
let stud=Student.findAll({where: {id} })
//id=stud.family_id;
//let fam=Family.findAll({where: {id} })
//let info= JSON.stringify(JSON.parse(fam).concat(JSON.parse(stud)));
return res.json(stud)
} else return next(ApiError.badrequest('поля пусты'))     
}



async getBRO(req,res) 
{let {id}= req.body
if(id){
let stud=Student.findAll({where: {id} })
id=stud.family_id;
let fam=Family.findAll({where: {id} })
let info= JSON.stringify(JSON.parse(fam).concat(JSON.parse(stud)));
return res.json(info)
} else return next(ApiError.badrequest('поля пусты'))     
}




//------------------------------------------------------------------------------------------   
    async delete(req,res) 
    {let {id}= req.body
    if(id){
    let stud =Student.findOne({where: {id} })
     if (stud){
    Student.destroy({where: {id} })
    if (stud.family_id)
    {
        family_id=stud.family_id;
        stud=Student.findAll({where: {family_id} })
        if(!stud)
        {id=family_id
            Family.destroy({where: {id} })


        }
    }
    return res.json({message: "удаление успешно"})}
    return next(ApiError.badrequest('ученик не найден')) 
    } else return next(ApiError.badrequest('поля пусты'))     
    }
   
    async getADDEDUC(req,res,next) 
    {try{
        const {id } = req.body
        Student.findOne({where: {id}})
        .then(event=>{
            if(!event) return next(ApiError.badrequest('некорректный айди'));
            event.getAdditional_educations().then(courses=>{
                return res.json(courses)
               
                /*for(course of courses){
                    console.log(course.name);
                }*/
            });
        });
    }
    catch(e)
    {
        return ApiError.badRequest(e.message)
    }}
    





}
module.exports= new StudentController()