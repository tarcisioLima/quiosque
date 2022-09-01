import Order from '../models/Order';
import Product from '../models/Product';
import OrderProduct from '../models/OrderProduct';
import Cashier from '../models/Cashier';
import CashierOperation from '../models/CashierOperation';
import TableOrder from '../models/TableOrder';
import Table from '../models/Table';

const closeOrder = async (order) => {
    const cashier = await Cashier.findAll();

    const orderProducts = await Order.findAll({
        order: [['id', 'ASC']],
        where: { id: order.id  },
        include: [
          {
            model: Product,
            as: "products",
          },
        ]
    });

    const orderedTable = await TableOrder.findOne(
      {
        where: { order_id: order.id }, 
        attributes: ['gathered_tables']
      })

    // LIBERAR MESAS
    const united_tables = orderedTable.getDataValue('gathered_tables');

    if(united_tables){
      const table_list = united_tables.split(',');
      table_list.forEach(async (_table_id) => {        
          await Table.update({status: 'free'}, { where: { id: _table_id}});        
      });
    }

    let total = orderProducts[0].products.reduce((acc, curr) => {
        return acc + (curr.sell_price * curr.order_product.quantity)
    }, 0);

    if(order.status === 'paid' && order.discount_amount) {
        total = total - order.discount_amount;
    }
    
    const totalCashier = total + cashier[0].amount;
    await Cashier.update({ amount: totalCashier }, { where: { id: cashier[0].id } });
    await CashierOperation.create({type: 'in',  amount: total,  description: 'COMANDA PAGA'});
}

export default closeOrder;