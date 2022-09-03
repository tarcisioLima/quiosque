import TableOrder from '../models/TableOrder';
import Table from '../models/Table';

export const removeFromTable = async (order) => {    
    // Verifica se essa comanda já esta em outra mesa, se tiver, a remove.
    const foundTables = await TableOrder.findAll({ 
        where: { order_id: order.id },
        attributes: ['id', 'gathered_tables']
    });
  
    if(foundTables){ 
        try {   
            const ids = foundTables.map((_table) => {   
                if(_table.getDataValue('gathered_tables')){         
                    const tableTobeFree = _table.getDataValue('gathered_tables').split(',');                
                    tableTobeFree.forEach(async (_id_table) => {
                        await Table.update({status: 'free'}, { where: { id: _id_table}})
                    });
                }  
                return _table.id
            });
            await TableOrder.destroy({ where: { id: ids }});
        }catch(err) {
            console.log('DEU RUIM: ', err)
        }
    }
}

const transactionOrder = async (order, table_type, table_id, res) => {
    if(table_type === 'table'){
        const orderedTable = await Table.findByPk(table_id);

        if(!orderedTable) {
            return res.status(400).json({ status: 'Mesa não encontrada' })
        }

        if(orderedTable.disabled || orderedTable.status === 'blocked'){
            return false;
        }

        await removeFromTable(order);
      
        // Adiciona comanda à mesa especificada
        await TableOrder.create({
            table_id: table_id,
            order_id: order.id,
        });

      // Atualiza o Status da Mesa para Aberta
      await Table.update({status: 'opened'}, { where: { id: table_id}});
     
    }else if(table_type === 'sand' || table_type === 'other' || table_type === 'single') {
        await removeFromTable(order);
    }
}

export default transactionOrder;