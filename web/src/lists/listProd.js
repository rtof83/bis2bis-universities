import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link, useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import Foods from '../assets/foods.png';

const ListProd = () => {
    const navigate = useNavigate();
    const [ data, setData ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    const getData = async () => {
        setLoading(true);

        await api.get('products')
          .then(({ data }) => {
            setData(data);
            setLoading(false);
          })
          .catch(e => console.log(e));
      }
    
      useEffect(() => {    
        getData();
      }, []);

      const deleteProduct = async (sku, name) => {
        if (window.confirm(`Excluir ${name}?`)) {
          await api.delete(`products/${sku}`)
            .then(() => getData())
            .catch(e => console.log(e));
        }
      }

      // const getValue = (value) => {
      //   value >= 0 ? (value).toLocaleString('pt-BR') : 
      //           <Skeleton variant="text" width={182} height={60} />
      // }

  return (
      <div className="tableProduct">

        {/* { loading && <h3><CircularProgress /></h3> } */}
        {/* { data.length === 0 ? <h3>Nenhum registro encontrado</h3> : <> */}

        { loading ? <h3><CircularProgress /></h3> : <>

        <h3>Lista de Produtos</h3>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
              <TableRow>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="center">SKU</StyledTableCell>
                  <StyledTableCell align="left">Nome</StyledTableCell>
                  <StyledTableCell align="center">Quantidade</StyledTableCell>
                  <StyledTableCell align="center">Preço</StyledTableCell>
                  <StyledTableCell align="right" />
                  <StyledTableCell align="right" />
              </TableRow>
              </TableHead>
              <TableBody>
              {data.map((item) => (
                  <StyledTableRow key={item.sku}>

                  <StyledTableCell align="left">
                    <Avatar alt="food"
                            src={ item.image ? item.image : Foods }
                            sx={{ width: 30, height: 30 }}
                          />
                  </StyledTableCell>

                  <StyledTableCell align="center">{item.sku}</StyledTableCell>
                  <StyledTableCell align="left" component="th" scope="row">
                      {item.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">{item.quantity}</StyledTableCell>
                  <StyledTableCell align="center">{item.price.toFixed(2)}</StyledTableCell>
                  <StyledTableCell align="right"><button onClick={() => navigate(`/product/${item.sku}`)}>Alterar</button></StyledTableCell>
                  <StyledTableCell align="right"><button onClick={() => deleteProduct(item.sku, item.name)}>Excluir</button></StyledTableCell>
                  </StyledTableRow>
              ))}
              </TableBody>
          </Table>
        </TableContainer>

        <Grid gap={3}
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              className="gridButton">

          <Link to={'/'}>
            <Button variant="contained">Voltar</Button>
          </Link>
        </Grid>

        </> }
    </div>
  );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default ListProd;