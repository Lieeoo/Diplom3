const ApiError = require('../errors/ApiError');
const {Faculty} = require('../models/model');


class BaseController {
    constructor(model) {
        const modell = model;
    }
    //model=Faculty
    async create(req, res, next) {
        //try {
            const data = req.body;
            const entity = await modell.create(data);
            res.json(entity);
       // } catch (error) {
       //     next(error); // Передаем ошибку обработчику ошибок
       // }
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
}

module.exports = BaseController;