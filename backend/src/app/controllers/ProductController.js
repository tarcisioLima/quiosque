import Yup from '../../config/yup';
import Product from '../models/Product';

class ProductController {
  async index(_, res) {
    const products = await Product.findAll({
      order: [['id', 'DESC']],
    });

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
      .json({ status: `Produto ${name} criado com sucesso!` });
  }
  async update(req, res) {
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

    const product = await Product.findByPk(req.params.id);
    await product.update(req.body);

    return res
      .status(200)
      .json({ status: `Produto ${product.name} atualizado com sucesso!` });
  }
  async remove(req, res) {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(400).json({ status: 'Produto não encontrado' });
    }

    await product.destroy();

    return res
      .status(200)
      .json({ status: `Produto ${product.name} deletado com sucesso!` });
  }
}

export default new ProductController();
