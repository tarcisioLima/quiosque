import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
  } from 'react';
  import { Form } from 'antd';
  import { toast } from 'react-toastify';
  import api from '~/services/api';
  export const SaleContext = createContext();
  
  const SaleProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [actionType, setActionType] = useState('create');
    const [current, setCurrent] = useState(null);
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState([]);
    const [loadingTable, setLoadingTable] = useState([]);
    const [tables, setTables] = useState([]);
    const [form] = Form.useForm();
  
    const fetchProducts = useCallback(async () => {
      setLoading(true);
  
      const results = await api.get('/products');
  
      if (results) {
        setList(results.data);
      }
      setLoading(false);
    }, []);

    const fetchTables = useCallback(async () => {
      setLoadingTable(true);
  
      const results = await api.get('/table');
  
      if (results) {
        setTables(results.data);
      }
      setLoadingTable(false);
    }, []);


  
    const openNewOrder = () => {
      setActionType('create');
      setOpen(true);
      setCurrent(null);
      form.resetFields();
    };
  
    const openUpdateProduct = (_current) => {
      setActionType('update');
      setOpen(true);
      setCurrent(_current);
    };
  
    const closeDrawer = () => {
      setOpen(false);
      setCurrent(null);
      form.resetFields();
    };
  
    const onSubmit = async (values) => {
      if (actionType === 'create') {
        const response = await api.post('/products', values);
  
        if (response) {
          toast.success(`${values.name} registrado com sucesso!`);
          closeDrawer();
          fetchProducts();
        }
      } else if (actionType === 'update') {
        const { id, ...rest } = current;
        const response = await api.put(`/products/${id}`, { ...rest, ...values });
        if (response) {
          toast.success(`${values.name} atualizado com sucesso!`);
          closeDrawer();
          fetchProducts();
        }
      }
    };
  
    const remove = async (id) => {
      const response = await api.delete(`/products/${id}`);
      if (response) {
        toast.success('Produto excluido com sucesso!');
        fetchProducts();
      }
    };
  
    useEffect(() => {
      fetchProducts();
      fetchTables();
    }, []);
  
    return (
      <SaleContext.Provider
        value={{
          open,
          setOpen,
          current,
          setCurrent,
          loading,
          list,
          setLoading,
          fetchProducts,
          openNewOrder,
          openUpdateProduct,
          closeDrawer,
          actionType,
          setActionType,
          onSubmit,
          remove,
          form,
          loadingTable,
          setLoadingTable,
          fetchTables,
          tables,
        }}
      >
        {children}
      </SaleContext.Provider>
    );
  };
  
  export default SaleProvider;
  
  export const useSale = () => {
    const context = useContext(SaleContext);
    if (!context) {
      throw new Error('useSale must be used within SaletProvider');
    }
    return context;
  };
  