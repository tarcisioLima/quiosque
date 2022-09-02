import Table from "../models/Table";

const getJoinedTables = async (gathered_tables) => {
    if(!gathered_tables){
        return null;
    }

    const splited = gathered_tables.split(',')
    
    let table_names = []

    await splited.forEach(async (_id) => {        
        const table = await Table.findByPk(_id);
        table_names = [table.getDataValue('name'), ...table_names];
    });

    console.log('lx: ', table_names)

    return table_names.join('-');
}

export default getJoinedTables;