// const router = require('express').Router();
import express from 'express';
import axios from 'axios';
import University from '../models/University.js';
import createUniversities from '../createUniversities.js';

const router = express.Router();
// const urlCreate = 'http://universities.hipolabs.com/search?country=';

// router.post('/', async (req, res) => {
//   const { name, desc, quant, price, image } = req.body;

//   const product = {
//     name,
//     desc,
//     quant,
//     price,
//     image
//   };

//   try {
//     await Product.create(product);

//     res.status(201).json({ message: 'Record inserted successfully!' });
//   } catch (error) {
//     res.status(500).json({ erro: error });
//   }
// })




router.post('/', async (req, res) => {
  // const { alpha_two_code, web_pages, name, domains, state_province } = req.body;
  const university = req.body;

  // const university = {
  //   name,
  //   desc,
  //   quant,
  //   price,
  //   image
  // };

  try {
    await University.create(university);
    res.status(201).json({ message: 'Record inserted successfully!' });
  } catch (error) {
    res.status(500).json({ erro: error });
  }
})




router.post('/create', async (_, res) => {
  await University.deleteMany();

  for (let i = 0; i < createUniversities.countries.length; i++) {
    await axios.get(createUniversities.url + createUniversities.countries[i])
            .then(({ data }) => {
              data.forEach(async uni => {
                await University.create(uni);
              });
            })
            .catch(error => res.status(500).json({ erro: error }));
  }

  res.status(201).json({ message: 'Created!' });
})



router.get('/', async (_, res) => {
try {
  const universities = await University.find();

  res.status(200).json(universities);
} catch (error) {
  res.status(500).json({ erro: error });
}
})

// router.delete('/:id', async (req, res) => {
// const id = req.params.id;

// const product = await Product.findOne({ _id: id });

// if (!product) {
//   res.status(422).json({ message: 'Produto não encontrado!' });
//   return
// }

// try {
//   await Product.deleteOne({ _id: id });

//   res.status(200).json({ message: 'Produto removido com sucesso!' });
// } catch (error) {
//   res.status(500).json({ erro: error });
// }
// })

// router.patch('/:id', async (req, res) => {
// const id = req.params.id;

// const { name, desc, quant, price, image } = req.body;

// const product = {
//   name,
//   desc,
//   quant,
//   price,
//   image
// };

// try {
//   const updatedProduct = await Product.updateOne({ _id: id }, product);

//   if (updatedProduct.matchedCount === 0) {
//     res.status(422).json({ message: 'Produto não encontrado!' });
//     return
//   }

//   res.status(200).json(product);
// } catch (error) {
//   res.status(500).json({ erro: error });
// }
// })

// router.get('/:id', async (req, res) => {
// const id = req.params.id;

// try {
//   const product = await Product.findOne({ _id: id });

//   if (!product) {
//     res.status(422).json({ message: 'Pedido não encontrado!' });
//     return
//   }

//   res.status(200).json(product);
// } catch (error) {
//   res.status(500).json({ erro: error });
// }
// })

export default router;
