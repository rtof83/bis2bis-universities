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
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

const listUniversity = () => {
    const navigate = useNavigate();
    const [ data, setData ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ page, setPage ] = useState(1);
    const [ countries, setCountries ] = useState([]);
    const [ country, setCountry ] = useState('Brazil');
    const [ searchByName, setSearchByName ] = useState('');
    const [ searchById, setSearchById ] = useState('');

    const getData = async (id) => {
      const query = !id ? 'universities?page=' + page +
                         (country ? '&country=' + country : '') +
                         (searchByName ? '&name=' + searchByName : '')
                        :
                        'universities/' + id;

      await api.get(query)
          .then(({ data }) => {
            setLoading(true);
            data.length === undefined ? setData([data]) : setData(data);
            setLoading(false);
          })
          .catch(e => {
            console.log(e);
            if (e.response.status === 400) alert('ID inválido!');
            if (e.response.status === 422) setData([]);
          });
    };

    const getCountries = async () => {
      await api.get(`universities/countries`)
        .then(({ data }) => {
          setCountries(data);
        })
        .catch(e => console.log(e));
    };

      useEffect(() => {
        getCountries();
      }, []);

      useEffect(() => {
        getData();
      }, [page, country]);

      const deleteCustomer = async (id, name) => {
        if (window.confirm(`Excluir ${name}?`)) {
          await api.delete(`universities/${id}`)
            .then(() => getData())
            .catch(e => console.log(e));
        };
      };

      const countPage = (action) => {
        if (action === 'increase' && page < data.slice(-1)[0].from) {
          setPage(page + 1);
        } else if (action === 'decrease' && page > 1) {
          setPage(page - 1);
        };
      };

      const setDefault = (e) => {
        setPage(1);
        setSearchByName('');
        setSearchById('');
        setCountry(e)
      };

  return (
      <div className="tableCustomer">

        { loading ? <h3><CircularProgress /></h3> : <>

        <h3>Lista de Universidades</h3>

        <FormControl sx={{ mx: 3, display: 'inline' }}>
          <FormControl sx={{ mx: 1, width: 180 }}>
            <InputLabel id="demo-simple-select-label">Selecione o País</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={country}
              label="Forma de Pagamento"
              onChange={e => {
                  setDefault(e.target.value);
                }}>

              { countries.map(item => 
                <MenuItem value={item._id}>{item._id}</MenuItem>) }
            </Select>
            
            <Button variant='outlined' onClick={() => setDefault()}>Listar todos</Button>
          </FormControl>

          <FormControl sx={{ width: 300, mx: 1 }}>
            <TextField id="txtSearchByName" label="Digite o nome da Universidade" variant="outlined" value={searchByName} onChange={e => setSearchByName(e.target.value)} onKeyDown={e => e.key === 'Enter' && getData()} />
            <Button variant='outlined' onClick={() => getData()}>Localizar por Nome</Button>
          </FormControl>

          <FormControl sx={{ width: 300, mx: 1 }}>
            <TextField id="txtSearchByName" label="Digite o ID da Universidade" variant="outlined" value={searchById} onChange={e => setSearchById(e.target.value)} onKeyDown={e => e.key === 'Enter' && getData(searchById)} />
            <Button variant='outlined' onClick={() => getData(searchById)}>Localizar por ID</Button>
          </FormControl>
        </FormControl>

        <TableContainer sx={{ mt: 3 }} component={Paper}>
          <Table sx={{ minWidth: 800 }} aria-label="customized table">
              <TableHead>
              <TableRow>
                  <StyledTableCell align="center">ID</StyledTableCell>
                  <StyledTableCell align="left">Nome</StyledTableCell>
                  <StyledTableCell align="center">País</StyledTableCell>
                  <StyledTableCell align="left">Estado</StyledTableCell>
                  <StyledTableCell align="right" />
                  <StyledTableCell align="right" />
              </TableRow>
              </TableHead>
              <TableBody>

                { data && data.map((item) => (
                  !item.page ?
                    <StyledTableRow key={item._id}>
                      <StyledTableCell align="center" component="th" scope="row">{item._id}</StyledTableCell>
                      <StyledTableCell align="left">{item.name}</StyledTableCell>
                      <StyledTableCell align="center">{item.country}</StyledTableCell>
                      <StyledTableCell align="left">{item['state-province']}</StyledTableCell>
                      <StyledTableCell align="right"><button onClick={() => navigate(`/university/${item._id}`)}>Alterar</button></StyledTableCell>
                      <StyledTableCell align="right"><button onClick={() => deleteCustomer(item._id, item.name)}>Excluir</button></StyledTableCell>
                    </StyledTableRow>
                  :
                  <StyledTableCell colSpan={6} align="center">
                    <Button sx={{ mr: 1.5 }} variant="outlined" onClick={() => countPage('decrease')}>{'<'}</Button>Página {item.page} de {item.from}
                    <Button sx={{ ml: 1.5 }} variant="outlined" onClick={() => countPage('increase')}>{'>'}</Button>
                  </StyledTableCell>
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

export default listUniversity;
