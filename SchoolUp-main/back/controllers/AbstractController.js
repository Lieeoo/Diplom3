const ApiError = require('../errors/ApiError');
const {Faculty} = require('../models/model');


class BaseController {
    constructor(model) {
        this.modell = model;
    }
    //model=Faculty
    async create(req, res, next) {
        //try {
            const data = req.body;
            const entity = await this.modell.create(data);
            res.json(entity);
       // } catch (error) {
       //     next(error); // Передаем ошибку обработчику ошибок
       // }
    }

    async getAll(req, res, next) {
        try {
            const entities = await this.modell.findAndCountAll();
            return res.json(entities);
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const { id, name } = req.body;
            if (name) {
                await this.modell.destroy({ where: { name } });
            } else if (id) {
                await this.modell.destroy({ where: { id } });
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