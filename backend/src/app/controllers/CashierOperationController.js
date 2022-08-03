import Yup from '../../config/yup';
import Cashier from '../models/Cashier';
import CashierOperation from '../models/CashierOperation';

class CashierOperationController {
  async index(_, res) {
    const history = await CashierOperation.findAll({
      order: [['id', 'DESC']],
    });

    // Check if has a cashier
    let cashier = await Cashier.findAll();

    if (!cashier.length) {
      await Cashier.create({ amount: 0 });
      cashier = await Cashier.findAll();
    }

    const data = {
      cashier: cashier[0],
      history,
    };

    return res.json(data);
  }
  async store(req, res) {
    const schema = Yup.object().shape({
      type: Yup.mixed().oneOf(['in', 'out', 'open', 'close']),
      amount: Yup.number().notRequired(),
      description: Yup.number().notRequired(),
    });

    if (!schema.isValidSync(req.body)) {
      const validationResult = await schema
        .validate(req.body, {
          abortEarly: false,
        })
        .catch(err => err);
      return res.status(400).json(validationResult.errors);
    }

    const { type, ...rest } = req.body;

    // Check if has a cashier
    let cashier = await Cashier.findAll();

    if (!cashier.length) {
      await Cashier.create({ amount: 0 });
      cashier = await Cashier.findAll();
    }

    if (type === 'in') {
      const updatedAmount = cashier[0].amount + rest.amount;
      await Cashier.update(
        { amount: updatedAmount },
        { where: { id: cashier[0].id } }
      );
      await CashierOperation.create({
        type,
        amount: rest.amount,
        description: rest.description,
      });
      return res.status(200).json({ status: 'Caixa atualizado com sucesso' });
    }

    if (type === 'out') {
      const updatedAmount = cashier[0].amount - rest.amount;
      await Cashier.update(
        { amount: updatedAmount },
        { where: { id: cashier[0].id } }
      );
      await CashierOperation.create({
        type,
        amount: rest.amount,
        description: rest.description,
      });
      return res.status(200).json({ status: 'Caixa atualizado com sucesso' });
    }

    if (type === 'open') {
      await CashierOperation.create({ type, description: rest.description });
      return res.status(200).json({ status: 'Caixa aberto com sucesso' });
    }

    if (type === 'close') {
      await CashierOperation.create({ type, description: rest.description });
      return res.status(200).json({ status: 'Caixa fechado com sucesso' });
    }

    return res.status(400).json({ status: 'Operação inválida' });
  }
}

export default new CashierOperationController();
