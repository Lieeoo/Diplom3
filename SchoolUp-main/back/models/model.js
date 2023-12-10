const sequelize = require('../db')
const {DataTypes} = require('sequelize')



const User = sequelize.define('user',{
id:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
email: {type: DataTypes.STRING, unique: true,},
password: {type: DataTypes.STRING},
role: {type: DataTypes.STRING, defaultValue: "USER"},
name: {type: DataTypes.STRING, defaultValue: "безымянный"},
lname:{type: DataTypes.STRING, defaultValue: "безымянов"},
mname:{type: DataTypes.STRING, defaultValue: "безымянович"},
comm:{type: DataTypes.STRING, defaultValue: "безымянович"},
}) 

const Student = sequelize.define('Student', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},//просто айди ученика
    class_ID: {type: DataTypes.INTEGER, allowNull: false},//айди класса к которому он принадлежит
    name: {type: DataTypes.STRING, allowNull: false},//фамилия ученика
    fullname: {type: DataTypes.STRING,  allowNull: false},//ФИО ученика или имя отчество, хй бзнал
    birthday: {type: DataTypes.DATEONLY, allowNull: false},//день рождения ученика
    group_of_risk: {type: DataTypes.STRING, defaultValue: "вне группы риска"},//группа риска
    family_id: {type: DataTypes.INTEGER,defaultValue: 0},// айди семейки из которой он пришел в школу
    PFDO: {type: DataTypes.STRING, defaultValue: "отсутствует"},// номер пфдо ученика
    sex: {type: DataTypes.INTEGER, defaultValue: 0},//по умолчанию пол будет средним между мальчиком и девочкой
 
})


const Class = sequelize.define('Class',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},//айди класса что очевидно
    letter: {type: DataTypes.STRING, allowNull: false},// буква класса чтобы могли вывести все классы "ы"
    number: {type: DataTypes.STRING, allowNull: false},// цифра класса чтобы не парить мозг и просто вывести все 14е классы
    birthday: {type: DataTypes.DATEONLY, allowNull: false,defaultValue: (2011, 11, 11)},// дата сформирования класса
    //number_of_students: {type: DataTypes.INTEGER, allowNull: false},//количевство детей в классе
    ////class_master_id: {type: DataTypes.INTEGER, allowNull: false},//айди классрука
    //img: {type: DataTypes.STRING, allowNull: false},    
    }) 

    const Family = sequelize.define('Family',{  
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        family_status:{type: DataTypes.INTEGER,defaultValue: 1, allowNull: false},//статусы семьи полный неполный мать одиночька отец одиночька
        material_condition: {type: DataTypes.STRING, allowNull: false , defaultValue: "неизвестен"},// уровень образования
        educationMother:{type: DataTypes.STRING, allowNull: false ,defaultValue: "неизвестен"},//образовательный уровень
       
        educationFather:{type: DataTypes.STRING, allowNull: false ,defaultValue: "неизвестен"},//образовательный уровень
        fatherStat:{type: DataTypes.STRING, allowNull: false ,defaultValue: "неизвестен"},
        motherStat:{type: DataTypes.STRING, allowNull: false ,defaultValue: "неизвестен"},
     }) 
     const Event = sequelize.define('Event',{  
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        plan_id:{type: DataTypes.INTEGER,defaultValue: 0, allowNull: false},
        event_name: {type: DataTypes.STRING, allowNull: false , defaultValue: "неизвестен"},
        date_of_nach_event:{type: DataTypes.DATEONLY, allowNull: false/* ,defaultValue: getDate ()/**/},//если не сработает, то убрать
        date_of_conch_event:{type: DataTypes.DATEONLY, },
        form_vosp_rab_id:{type: DataTypes.INTEGER, allowNull: false },
        network_interaction:{type: DataTypes.TEXT('long')},
        project:{type: DataTypes.STRING ,defaultValue: "отсутствует"},
        who:{type: DataTypes.STRING, allowNull: false ,defaultValue: "неизвестен"},
        invited_organizations:{type: DataTypes.TEXT('long') },
        invited_parents:{type: DataTypes.TEXT('long') },
        sertificate:{type: DataTypes.STRING ,defaultValue: "отсутствует"},
        picture_Adress:{type: DataTypes.STRING },
        picture_Need:{type: DataTypes.INTEGER },
        Archive:{type: DataTypes.BOOLEAN,defaultValue: false},
     }) 

     const FormOfVospRab = sequelize.define('FormOfVospRab',{  
      id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
      name:{type: DataTypes.STRING, allowNull: false },//задачи воспитательной деятельности
      picture_Need:{type: DataTypes.INTEGER,defaultValue:0  },
      time_of_event:{type: DataTypes.INTEGER,defaultValue:0  }
   }) 



     
     const Plan = sequelize.define('Plan',{  
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        year_of_plan:{type: DataTypes.INTEGER, allowNull: false /*,defaultValue: "неизвестен"*/},//образовательный уровень
        goals_of_educational_activity: {type: DataTypes.TEXT('long'), allowNull: false },// уровень образования

        target_priorities_1to4:{type: DataTypes.TEXT('long'), allowNull: false },//образовательный уровень
        tasks_1to4:{type: DataTypes.TEXT('long'), allowNull: false },//образовательный уровень

        target_priorities_5to9:{type: DataTypes.TEXT('long'), allowNull: false },//образовательный уровень
        tasks_5to9:{type: DataTypes.TEXT('long'), allowNull: false },//образовательный уровень


        target_priorities_10to11:{type: DataTypes.TEXT('long'), allowNull: false },//образовательный уровень
        tasks_10to11:{type: DataTypes.TEXT('long'), allowNull: false },//образовательный уровень

      //  tasks:{type: DataTypes.TEXT('long'), allowNull: false },//задачи воспитательной деятельности
     }) 
     
     const Napravlenie = sequelize.define('Napravlenie',{  
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name:{type: DataTypes.STRING, allowNull: false },//задачи воспитательной деятельности
     }) 
     const NapravlenieOBR = sequelize.define('NapravlenieOBR',{  
      id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
      name:{type: DataTypes.STRING, allowNull: false },//задачи воспитательной деятельности
   }) 

     const Additional_education = sequelize.define('Additional_education',{  //дополниетльное образование
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        id_institution: {type: DataTypes.INTEGER, allowNull: false },//айди учреждения
        name:{type: DataTypes.STRING, allowNull: false },//название программы
        description:{type:DataTypes.TEXT('long') },//название программы
     }) 

     const Institution = sequelize.define('Institution',{  //учреждение
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        
        name:{type: DataTypes.STRING, allowNull: false },//название программы
        description:{type:DataTypes.TEXT('long') },//название программы
     }) 



     const Plan_Of_Class = sequelize.define('Plan_Of_Class',{  //учреждение
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        class_id: {type: DataTypes.INTEGER,  allowNull: false },
        year_of_plan:{type: DataTypes.INTEGER, allowNull: false /*,defaultValue: "неизвестен"*/},//год образования плана
        target_priorities:{type: DataTypes.TEXT('long'), allowNull: false },//целевые приоритеты класса
     
     }) 

     const Task = sequelize.define('Task', {//задача, присоединяется к планам либо школы либо класса
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        id_Plan_Of_Class: {type: DataTypes.INTEGER},
        id_Plan_Of_School: {type: DataTypes.INTEGER},

        name:{type: DataTypes.TEXT('long'), allowNull: false },
    })
//-------------------------------ПРОМЕЖУТОЧНЫЕ ТАБЛИЦЫ СВЯЗИ МНОГИЕ КО МНОГИМ---------------------------------------------------------------------------
const formorab_Napravl = sequelize.define('formorab_Napravl', {
   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
   test:{type: DataTypes.INTEGER},
  // event_id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Plan_Of_Class_Event = sequelize.define('Plan_Of_Class_Event', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    test:{type: DataTypes.INTEGER},
   // event_id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
const Class_Event = sequelize.define('Class_Event', {
   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
   test:{type: DataTypes.INTEGER},
  // event_id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

    const AddEduc_Napravl = sequelize.define('AddEduc_Napravl', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        test:{type: DataTypes.INTEGER},
       // event_id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    })


    const AddEduc_Task = sequelize.define('AddEduc_Task', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        test:{type: DataTypes.INTEGER},
       // event_id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    })


    const AddEduc_Stud = sequelize.define('AddEduc_Stud', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        test:{type: DataTypes.INTEGER},
       // event_id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    })




     const Student_Event = sequelize.define('Student_Event', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        test:{type: DataTypes.INTEGER},
       // event_id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    })

    const  Event_napravl = sequelize.define('Event_napravl', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        test:{type: DataTypes.INTEGER},
       // event_id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    })

    const  Class_User = sequelize.define('Class_User', {
      id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
      test:{type: DataTypes.INTEGER},
     // event_id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  })

//--------------------------------------------------------------------

//-----------------------------------------------------------------------------------
User.hasOne(Class)//пользователь имеет только один класс
Class.belongsTo(User)//класс принадлежит пользователю



Class.hasMany(Student) //класс имеет много студентов
Student.belongsTo(Class)// студент принадлежит классу

Family.hasMany(Student) //класс имеет много студентов
Student.belongsTo(Family)// студент принадлежит классу

Plan_Of_Class.hasMany(Task) //класс имеет много студентов
Task.belongsTo(Plan_Of_Class)// студент принадлежит классу





Institution.hasMany(Additional_education) //класс имеет много студентов
Additional_education.belongsTo(Institution)// студент принадлежит классу
//-------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------
Student.belongsToMany(Event, {through: Student_Event })//типу принадлежит много брендов
Event.belongsToMany(Student, {through: Student_Event })//бренду принадлежит много типов

Class.belongsToMany(User, {through: Student_Event })//типу принадлежит много брендов
User.belongsToMany(Class, {through: Student_Event })//бренду принадлежит много типов


Napravlenie.belongsToMany(Event, {through: Event_napravl })//типу принадлежит много брендов
Event.belongsToMany(Napravlenie, {through: Event_napravl })//бренду принадлежит много типов


Additional_education.belongsToMany(NapravlenieOBR, {through: AddEduc_Napravl })//дополнительному образованию принадлежит карточка направления, и возможно не одна
NapravlenieOBR.belongsToMany(Additional_education, {through: AddEduc_Napravl })//


Additional_education.belongsToMany(Student, {through: AddEduc_Stud })//дополнительному образованию принадлежит ученик и возможно не один
Student.belongsToMany(Additional_education, {through: AddEduc_Stud })


Additional_education.belongsToMany(Task, {through: AddEduc_Task })//дополнительному образованию принадлежит карточка направления, и возможно не одна
Task.belongsToMany(Additional_education, {through: AddEduc_Task })//


Plan_Of_Class.belongsToMany(Event, {through: Plan_Of_Class_Event })//типу принадлежит много брендов
Event.belongsToMany(Plan_Of_Class, {through: Plan_Of_Class_Event })//бренду принадлежит много типов

User.belongsToMany(Class, {through: Class_User })//типу принадлежит много брендов
Class.belongsToMany(User, {through: Class_User })//бренду принадлежит много типов

Event.belongsToMany(Class, {through: Class_Event })//типу принадлежит много брендов
Class.belongsToMany(Event, {through: Class_Event })//бренду принадлежит много типов


FormOfVospRab.belongsToMany(Napravlenie, {through: formorab_Napravl })//дополнительному образованию принадлежит карточка направления, и возможно не одна
Napravlenie.belongsToMany(FormOfVospRab, {through: formorab_Napravl })//

//-----------------------------------------------------------------------------



module.exports = {

    User,
    NapravlenieOBR,
    Napravlenie,
    FormOfVospRab,
    Class,
    Student,
    Family,
    Event,
    Plan,
    Student_Event,
    Event_napravl,
    Additional_education,
    Institution,
    Plan_Of_Class,
    Task,
}
