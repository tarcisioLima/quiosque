
const joinSameProducts = (list_products=[]) => {
    let allProductsJoined = [];

    list_products.forEach((_product) => {
      const hasProduct = allProductsJoined.filter((__p) => __p.id === _product.id);

      if(!hasProduct.length){
        allProductsJoined.push(_product);
      }else {
        allProductsJoined = allProductsJoined.map((__p) => {
          if(__p.id === _product.id){
            const newQuantity = _product.quantity + hasProduct[0].quantity || 1;
            return { ...__p, quantity: newQuantity};
          }
          return __p;
        });
      }
    });

    return allProductsJoined;
}

export default joinSameProducts;