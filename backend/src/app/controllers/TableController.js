import Yup from '../../config/yup';
import Table from '../models/Table';
import Order from '../models/Order';
import Product from '../models/Product';

class TableController {
  async index(_, res) {
    const tables = await Table.findAll({
      order: [['id', 'ASC']],
      where: { disabled: false },
      include: [
        {
          model: Order,
          as: "orders",
          include: [
            {
              model: Product,
              as: 'products'
            }
          ]
        },
      ]
    });

    return res.json(tables);
  }
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().notRequired(),
      status: Yup.mixed().oneOf(['free', 'opened', 'blocked']).notRequired(),
      type: Yup.mixed().oneOf(['normal', 'sand', 'other']).required(),
    });

    if (!schema.isValidSync(req.body)) {
      const validationResult = await schema
        .validate(req.body, {
          abortEarly: false,
        })
        .catch(err => err);
      return res.status(400).json(validationResult.errors);
    }


    await Table.create({...req.body, status: req.body.status || 'free'});

    return res
      .status(200)
      .json({ status: `Mesa criada com sucesso!` });
  }
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().notRequired(),
      status: Yup.mixed().oneOf(['free', 'opened', 'blocked']).required(),
      type: Yup.mixed().oneOf(['normal', 'sand', 'other']).notRequired(),
    });


    if (!schema.isValidSync(req.body)) {
      const validationResult = await schema
        .validate(req.body, {
          abortEarly: false,
        })
        .catch(err => err);
      return res.status(400).json(validationResult.errors);
    }

    const table = await Table.findByPk(req.params.id);
    await table.update(req.body);

    return res
      .status(200)
      .json({ status: `Mesa atualizada com sucesso!` });
  }
  async remove(req, res) {
    const table = await Table.findByPk(req.params.id);

    if (!table) {
      return res.status(400).json({ status: 'Mesa não encontrada' });
    }

    await table.update({ disabled: true });

    return res
      .status(200)
      .json({ status: `Mesa ${table.id} deletada com sucesso!` });
  }
}

export default new TableController();
