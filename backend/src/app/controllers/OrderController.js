import Yup from '../../config/yup';
import Order from '../models/Order';
import TableOrder from '../models/TableOrder';
import Product from '../models/Product';
import OrderProduct from '../models/OrderProduct';
import closeOrder from '../utils/closeOrder';
import transactionOrder from '../utils/transactionOrder';


class OrderController {
  async index(_, res) {
    const orders = await Order.findAll({
      order: [['id', 'DESC']],
      include: [
        {
          model: Product,
          as: "products",
        },
      ]
    });

    return res.json(orders);
  }
  async store(req, res) {
    const schema = Yup.object().shape({
      customer_name: Yup.string().required(),
      discount_amount: Yup.number().notRequired(),
      type: Yup.mixed().oneOf(['table', 'single', 'sand', 'other']).required(),
      table_id: Yup.number().integer().notRequired(),
    });

    if (!schema.isValidSync(req.body)) {
      const validationResult = await schema
        .validate(req.body, {
          abortEarly: false,
        })
        .catch(err => err);
      return res.status(400).json(validationResult.errors);
    }

    const { table_id, ...rest } = req.body;

    const created = await Order.create({ ...rest, status: 'open' });

    if(table_id && rest.type === 'table'){
      await TableOrder.create({ table_id, order_id: created.id})
    }   

    return res
      .status(200)
      .json({ status: `Comanda criada com sucesso!` });
  }
  async update(req, res) {
    const schema = Yup.object().shape({
      customer_name: Yup.string().required(),
      discount_amount: Yup.number().notRequired(),
      type: Yup.mixed().oneOf(['table', 'single', 'sand', 'other']).required(),
      status: Yup.mixed().oneOf(['open', 'paid']).required(),
      table_id: Yup.number().integer().notRequired(),
    });

    if (!schema.isValidSync(req.body)) {
      const validationResult = await schema
        .validate(req.body, {
          abortEarly: false,
        })
        .catch(err => err);
      return res.status(400).json(validationResult.errors);
    }

    const order = await Order.findByPk(req.params.id);

    if(!order) {
      return res.status(400).json({ status: 'Comanda não encontrada' });
    }

    // Transacionar comanda
    const { table_id, ...rest } = req.body;
    
    await transactionOrder(order, rest.type, table_id, res)    

    await order.update(rest);    

    // Se comanda foi paga, atualizar o caixa
    if(req.body.status === 'paid'){
      await closeOrder(order);
    }

    return res
      .status(200)
      .json({ status: 'Comanda atualizada com sucesso!' });
  }
  async remove(req, res) {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(400).json({ status: 'Comanda não encontrada' });
    }

    await order.destroy();

    return res
      .status(200)
      .json({ status: `Comanda ${order.id} deletada com sucesso!` });
  }
  async addProduct(req, res) {
    const order = await Order.findByPk(req.params.id);
    const product = await Product.findByPk(req.params.product_id);

    if (!order) {
      return res.status(400).json({ status: 'Comanda não encontrada' });
    }

    if (!product) {
      return res.status(400).json({ status: 'Produto não encontrado' });
    }    

    await OrderProduct.create({
      order_id: order.id,
      product_id: product.id,
      quantity: req.body.quantity || 1
    })


    return res
      .status(200)
      .json({ status: `Produto ${product.name} adicionado com sucesso!` });
  }
  async removeProduct(req, res) {
    const order = await Order.findByPk(req.params.id);
    const orderproduct = await OrderProduct.findByPk(req.params.order_product_id);

    if (!order) {
      return res.status(400).json({ status: 'Comanda não encontrada' });
    }

    if (!orderproduct) {
      return res.status(400).json({ status: 'Não encontrado' });
    }

    await OrderProduct.destroy({
      where: { 
       id: orderproduct.id
      }
    });

    return res
      .status(200)
      .json({ status: 'Produto removido com sucesso!' });
  }
}

export default new OrderController();
