import TableOrder from '../models/TableOrder';
import Table from '../models/Table';


const removeFromTable = async (order_id) => {    
      // Verifica se essa comanda já esta em outra mesa, se tiver, a remove.
      const foundTables = await TableOrder.findAll({ 
            where: {
                order_id,
            },
            attributes: ['id']
        });
  

    if(foundTables){     
        const ids = foundTables.map((_table) => {           
            return _table.id
        });        
        await TableOrder.destroy({ where: { id: ids }});
    }
}

const transactionOrder = async (order, table_type, table_id, res) => {
    if(table_type === 'table'){
        const orderedTable = await Table.findByPk(table_id);

        if(!orderedTable) {
            return res.status(400).json({ status: 'Mesa não encontrada' })
        }

        if(orderedTable.disabled || orderedTable.status === 'blocked'){
            //return res.status(400).json({ status: 'Mesa indisponível' });
            return false;
        }

        await removeFromTable(order.id);
      
        // Adiciona comanda à mesa especificada
        await TableOrder.create({
            table_id: table_id,
            order_id: order.id,
        });
      // Atualiza o Status da Mesa para Aberta
      const foundTable = await Table.findByPk(table_id);
      if(foundTable){
        await foundTable.update({status: 'opened'});
      }

    }else if(table_type === 'sand' || table_type === 'other' || table_type === 'single') {
        await removeFromTable(order.id);
    }
}

export default transactionOrder;