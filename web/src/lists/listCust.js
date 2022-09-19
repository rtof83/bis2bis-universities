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
import CircularProgress from '@mui/material/CircularProgress';

const ListCust = () => {
    const [ data, setData ] = useState([]);
    const navigate = useNavigate();
    const [ loading, setLoading ] = useState(false);

    const getData = async () => {
      setLoading(true);

      await api.get('customers')
          .then(({ data }) => {
            setData(data);
            setLoading(false);
          })
          .catch(e => console.log(e));
      };

      useEffect(() => {
        getData();
      }, []);

      const deleteCustomer = async (id, name) => {
        if (window.confirm(`Excluir ${name}?`)) {
          await api.delete(`customers/${id}`)
            .then(() => getData())
            .catch(e => console.log(e));
        }
      }

  return (
      <div className="tableCustomer">

        {/* { data.length === 0 ? <h3>Nenhum registro encontrado</h3> : <> */}
        { loading ? <h3><CircularProgress /></h3> : <>

        <h3>Lista de Clientes</h3>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
              <TableRow>
                  <StyledTableCell align="center">Nome</StyledTableCell>
                  <StyledTableCell align="center">Email</StyledTableCell>
                  <StyledTableCell align="right" />
                  <StyledTableCell align="right" />
              </TableRow>
              </TableHead>
              <TableBody>
              {data.map((item) => (
                  <StyledTableRow key={item.id}>
                  <StyledTableCell align="center" component="th" scope="row">
                      {item.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">{item.email}</StyledTableCell>
                  <StyledTableCell align="right"><button onClick={() => navigate(`/customer/${item.id}`)}>Alterar</button></StyledTableCell>
                  <StyledTableCell align="right"><button onClick={() => deleteCustomer(item.id, item.name)}>Excluir</button></StyledTableCell>
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

export default ListCust;
