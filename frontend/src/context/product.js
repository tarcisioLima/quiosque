import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { toast } from 'react-toastify';
import api from '~/services/api';
export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [actionType, setActionType] = useState('create');
  const [current, setCurrent] = useState(null);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState([]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);

    const results = await api.get('/products');

    if (results) {
      setList(results.data);
    }
    setLoading(false);
  }, []);

  const openNewProduct = () => {
    setActionType('create');
    setOpen(true);
    setCurrent(null);
  };

  const openUpdateProduct = (_current) => {
    setActionType('update');
    setOpen(true);
    setCurrent(_current);
  };

  const closeDrawer = () => {
    setOpen(false);
    setCurrent(null);
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
  }, []);

  return (
    <ProductContext.Provider
      value={{
        open,
        setOpen,
        current,
        setCurrent,
        loading,
        list,
        setLoading,
        fetchProducts,
        openNewProduct,
        openUpdateProduct,
        closeDrawer,
        actionType,
        setActionType,
        onSubmit,
        remove,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within ProductProvider');
  }
  return context;
};
