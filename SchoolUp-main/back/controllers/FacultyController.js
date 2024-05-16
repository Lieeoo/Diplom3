const BaseController = require('./BaseController');
const { Faculty } = require('../models/model'); // Подставьте нужную модель

class FacultyController extends BaseController {
    constructor() {
        super(Faculty); // Передаем модель Faculty в конструктор базового класса
    }

    // Дополнительные методы, специфичные для контроллера факультетов, можно добавить здесь
    // Например, методы для получения факультетов определенного университета и т. д.
}

module.exports = new FacultyController();