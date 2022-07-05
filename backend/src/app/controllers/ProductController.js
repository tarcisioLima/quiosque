import Yup from '../../config/yup';
import Product from '../models/Product';

class ProductController {
  async index(_, res) {
    const products = await Product.findAll();

    return res.json(products);
  }
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      sell_price: Yup.number().required(),
    });

    if (!schema.isValidSync(req.body)) {
      const validationResult = await schema
        .validate(req.body, {
          abortEarly: false,
        })
        .catch(err => err);
      return res.status(400).json(validationResult.errors);
    }

    const { name, sell_price, ...rest } = req.body;

    await Product.create({
      name,
      sell_price,
      ...rest,
    });

    return res
      .status(200)
      .json({ status: `Produto {name} criado com  sucesso!` });
  }
}

export default new ProductController();
