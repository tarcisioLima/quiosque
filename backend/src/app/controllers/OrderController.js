import Yup from '../../config/yup';
import Order from '../models/Order';
import Table from '../models/Table';
import TableOrder from '../models/TableOrder';
import Product from '../models/Product';
import OrderProduct from '../models/OrderProduct';
import closeOrder from '../utils/closeOrder';
import transactionOrder from '../utils/transactionOrder';
import isNumber from '../utils/isNumber';
import getJoinedTables from '../utils/getJoinedTables';

class OrderController {
  async index(_, res) {
    const orders = await Order.findAll({
      order: [['id', 'DESC']],
      include: [
        {
          model: Product,
          as: "products",
        },
        {
          model: Table,
          as: "tables",
        }
      ]
    });

    /* const updated = orders.map(async (_order) => {
      if(_order.tables.length && _order.tables[0].table_order.gathered_tables){
        const in_joined_table = getJoinedTables(_order.tables[0].table_order.gathered_tables);
        console.log('ENTROU: ', in_joined_table)
        return {
          ..._order,
          in_joined_table,
        }
      }
      return _order;
    }) */
 

    return res.json(orders);
  }
  async store(req, res) {
    const schema = Yup.object().shape({
      customer_name: Yup.string().required(),
      discount_amount: Yup.number().notRequired(),
      type: Yup.mixed().oneOf(['table', 'single', 'sand', 'other']).required(),
      status: Yup.mixed().oneOf(['open', 'paid']).notRequired(),
      tables_id: Yup.array().of(Yup.number()).notRequired(),
      products_id: Yup.array().of(
        Yup.object().shape({
        id: Yup.number().required(),
        quantity: Yup.number().required(),
      })).notRequired(),
    });

    if (!schema.isValidSync(req.body)) {
      const validationResult = await schema
        .validate(req.body, {
          abortEarly: false,
        })
        .catch(err => err);
      return res.status(400).json(validationResult.errors);
    }

    const { tables_id, products_id, status, ...rest } = req.body;
  

    const created = await Order.create({ ...rest, status: status || 'open' });

     // Alocação das mesas
    if(tables_id && rest.type === 'table'){
      const mainTableId = tables_id[0];
      const gathered_tables = tables_id.join(',');

      await TableOrder.create({ table_id: mainTableId, order_id: created.id, gathered_tables})
     
      tables_id.forEach(async (_table, index) => {
        if(index === 0){
          await Table.update({status: 'opened'}, { where: { id: _table}})
        }else {
          await Table.update({status: 'blocked'}, {where: { id: _table}})
        }
      });
    }

    // Adição dos produtos
    if(products_id){
      products_id.forEach(async (_product) => {
        await OrderProduct.create({
          order_id: created.id,
          product_id: _product.id,
          quantity: _product.quantity
        })
      });
    }    


    return res
      .status(200)
      .json({ status: `Comanda criada com sucesso!` });
  }
  async update(req, res) {
    const schema = Yup.object().shape({
      customer_name: Yup.string().required(),
      discount_amount: Yup.number().notRequired(),
      payment_type: Yup.mixed().oneOf(['cash', 'credit', 'debit', 'pix', 'transfer', 'check', 'other']).notRequired(),
      type: Yup.mixed().oneOf(['table', 'single', 'sand', 'other']).required(),
      status: Yup.mixed().oneOf(['open', 'paid']).required(),
      table_id: Yup.number().integer().notRequired(),
      is_transaction: Yup.boolean().notRequired().default(false),
      transfer_to: Yup.string().notRequired(),
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
    const { table_id, is_transaction, transfer_to, ...rest } = req.body;
    
    if(is_transaction){      
      let type_of_table = rest.type;
      let table_id_transfer = table_id;

      if(transfer_to) {
        type_of_table = isNumber(transfer_to) ? 'table' : transfer_to;
        table_id_transfer = transfer_to;
      }

      try {
        await transactionOrder(order, type_of_table, table_id_transfer, res)
      }catch(err) {
        console.log('Err: ', err)
      }
    } 

    await order.update({
      ...rest,
      type: !isNumber(transfer_to) ? transfer_to : rest.type,
    });    

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

    if (!order) {
      return res.status(400).json({ status: 'Comanda não encontrada' });
    }

    const orderproduct = await OrderProduct.findOne({
      order_id: order.id,
      product_id: req.params.order_product_id
    });

    if (!orderproduct) {
      return res.status(400).json({ status: 'Não encontrado' });
    }

    await OrderProduct.destroy({
      where: { 
        order_id: order.id,
        product_id: req.params.order_product_id
      }
    });

    return res
      .status(200)
      .json({ status: 'Produto removido com sucesso!' });
  }
}

export default new OrderController();
