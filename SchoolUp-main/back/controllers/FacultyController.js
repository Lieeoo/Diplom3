const BaseController = require('./AbstractController');
const { Faculty } = require('../models/model'); // Подставьте нужную модель
const modell =Faculty;
class FacultyController extends BaseController {
   
    
    //model=Faculty
    async create(req, res, next) {
        try {
            const data = req.body;
            const entity = await modell.create(data);
            res.json(entity);
        } catch (error) {
            next(error); // Передаем ошибку обработчику ошибок
        }
    }

    async getAll(req, res, next) {
        try {
            const entities = await modell.findAndCountAll();
            return res.json(entities);
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const { id, name } = req.body;
            if (name) {
                await modell.destroy({ where: { name } });
            } else if (id) {
                await modell.destroy({ where: { id } });
            } else {
                throw ApiError.badRequest('Некорректные данные');
            }
            return res.json({ message: 'Удаление успешно' });
        } catch (error) {
            next(error);
        }
    }
    // Дополнительные методы, специфичные для контроллера факультетов, можно добавить здесь
    // Например, методы для получения факультетов определенного университета и т. д.
}

module.exports = new FacultyController();