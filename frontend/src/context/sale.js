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
    const [loading, setLoading] = useState([]);
    const [loadingTable, setLoadingTable] = useState([]);
    const [tables, setTables] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [openPdfOrder, setOpenPdfOrder] = useState(false);
    const [openPayOrderModal, setOpenPayOrderModal] = useState(false);

    const [form] = Form.useForm();
  
    const fetchProducts = useCallback(async () => {
      setLoading(true);
  
      const results = await api.get('/products');
  
      if (results) {
        setProducts(results.data);
      }
      setLoading(false);
    }, []);

    const fetchOrders = useCallback(async () => {
      const results = await api.get('/order');
  
      if (results) {
        setOrders(results.data);
      }
      
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

    const openPFFOrder = (order) => {
      setOpenPdfOrder(true);
      setCurrent(order);
    };

    const triggerOpenPayModal = (order) => {
      setOpenPayOrderModal(true);
      setCurrent(order);
    };
  
    const openUpdateOrder = (_current) => {
      setActionType('update');
      setOpen(true);
      setCurrent(_current);
    };
  
    const closeDrawer = () => {
      setOpen(false);
      setCurrent(null);
      form.resetFields();
    };
  
    const remove = async (id) => {
      const response = await api.delete(`/products/${id}`);
      if (response) {
        toast.success('Produto excluido com sucesso!');
        fetchProducts();
      }
    };
  
    useEffect(() => {
      fetchOrders();
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
          setLoading,
          fetchProducts,
          openNewOrder,
          openUpdateOrder,
          closeDrawer,
          actionType,
          setActionType,
          remove,
          form,
          loadingTable,
          setLoadingTable,
          fetchTables,
          fetchOrders,
          tables,
          products,
          orders, 
          setOrders,
          openPdfOrder, 
          setOpenPdfOrder,
          openPFFOrder,
          openPayOrderModal, 
          setOpenPayOrderModal,
          triggerOpenPayModal,
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
  