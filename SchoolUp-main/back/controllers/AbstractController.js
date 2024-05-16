const ApiError = require('../errors/ApiError');

class BaseController {
    constructor(model) {
        this.model = model;
    }

    async create(req, res, next) {
        try {
            const { ...data } = req.body;
            if (Object.keys(data).length === 0) {
                throw ApiError.badRequest('Отсутствуют данные для создания сущности');
            }
            const entity = await this.model.create(data);
            res.json(entity);
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next) {
        try {
            const entities = await this.model.findAndCountAll();
            res.json(entities);
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const { id, name } = req.body;
            if (name) {
                await this.model.destroy({ where: { name } });
            } else if (id) {
                await this.model.destroy({ where: { id } });
            } else {
                throw ApiError.badRequest('Некорректные данные');
            }
            res.json({ message: 'Удаление успешно' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = BaseController;