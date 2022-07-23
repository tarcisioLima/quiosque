import Yup from '../../config/yup';
import Cashier from '../models/Cashier';
import CashierOperation from '../models/CashierOperation';

class CashierOperationController {
  async index(_, res) {
    const history = await CashierOperation.findAll({
      order: [['id', 'DESC']],
    });

    return res.json(history);
  }
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      sell_price: Yup.number().required(),
    });

    if (!schema.isValidSync(req.body)) {
      const validationResult = await schema
        .validate(req.body, {
          abortEarly: false,
        })
        .catch(err => err);
      return res.status(400).json(validationResult.errors);
    }

    const { name, sell_price, ...rest } = req.body;

    await CashierOperation.create({
      name,
      sell_price,
      ...rest,
    });

    return res
      .status(200)
      .json({ status: `Produto ${name} criado com sucesso!` });
  }
}

export default new CashierOperationController();
