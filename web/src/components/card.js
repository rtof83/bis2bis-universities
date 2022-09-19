import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Foods from '../assets/foods.png';
import ListContext from '../contexts/ListContext';

const CardFood = ({ sku, image, name, descr, price, quantity }) => {
  const [ list, setList ] = useContext(ListContext);
  const navigate = useNavigate();

  const order = (add) => {
    if (list.filter(item => item.sku === add.sku).length > 0) {
      alert('Produto já foi adicionado ao carrinho.');
    } else {
      setList(prevList => ([ ...prevList, add ]));
      navigate('/cart');
    }
  }

  return (
    <Card className='cardList'
          onClick={() => order({ sku: sku,
                                 image: image,
                                 name: name,
                                 quantity: 1,
                                 quantMax: quantity,
                                 price: price })} sx={{ maxWidth: 265, height: 345 }}>
      <CardHeader
        title={name}
      />
      <CardMedia
        component="img"
        height="190"
        image={image ? image : Foods}
        alt={name}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {descr}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <AttachMoneyIcon />
        </IconButton>
        <Typography variant="body2" color="text.secondary">
          {price.toFixed(2)}
        </Typography>
      </CardActions>
    </Card>
  );
}

export default CardFood;
