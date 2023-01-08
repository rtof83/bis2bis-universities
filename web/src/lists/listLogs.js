import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../api';
import SnackBars from '../components/SnackBars';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { StyledTableCell, StyledTableRow } from '../components/StyledTable';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';

const listUniversities = () => {
  const [ data, setData ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ open, setOpen ] = useState(false);
  const [ severity, setSeverity ] = useState('info');
  const [ message, setMessage ] = useState('message');

  const alertClick = (severity, message) => {
    setSeverity(severity);
    setMessage(message);
    setOpen(true);
  };

  const getData = async () => {
    setLoading(true);

    await api.get('/log')
        .then(({ data }) => {
          setData(data);
        })
        .catch(e => {
          alertClick('error', e.message);
        });
        
    setLoading(false);
  };

  const deleteList = async () => {
    if (window.confirm('Atenção! Todos os itens da lista serão excluídos.')) {
      await api.delete('/log')
        .then(() => {
          alertClick('success', 'Lista excluída com sucesso');
          getData();
        })
        .catch(e => {
          alertClick('error', e.message);
        });
    };
  };

  useEffect(() => {
    getData();
  }, []);
  
  return (
      <div className="tableCustomer">

        { loading ? <h3><CircularProgress /></h3> : <>

        <h3>Lista de Logs</h3>

        <TableContainer sx={{ mt: 3 }} component={Paper}>
          <Table sx={{ minWidth: 800 }} aria-label="customized table">
              <TableHead>
              <TableRow>
                  <StyledTableCell align="center">Última Atualização</StyledTableCell>
                  <StyledTableCell align="left">Mensagem</StyledTableCell>
              </TableRow>
              </TableHead>
              <TableBody>

                { data && data.map((item) => (
                  !item.page &&
                    <StyledTableRow key={item._id}>
                      <StyledTableCell align="center" component="th" scope="row">{new Date(item.lastUpdate).toLocaleString('pt-BR', { timeZone: 'UTC' })}</StyledTableCell>
                      <StyledTableCell align="left">{item.message}</StyledTableCell>
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

          <Button onClick={() => deleteList()} variant="contained">Excluir Lista</Button>
          
          <Link to={'/'}>
            <Button variant="contained">Voltar</Button>
          </Link>
        </Grid>

        </> }

        {SnackBars(open, setOpen, severity, message)}

    </div>
  );
};

export default listUniversities;
