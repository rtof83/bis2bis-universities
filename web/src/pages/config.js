import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import api from '../api';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import SnackBars from '../components/SnackBars';
import { StyledTableCell, StyledTableRow } from '../components/StyledTable';

const Config = () => {
  const navigate = useNavigate();
  
  const [ values, setValues ] = useState({ id: '',
                                           url: '',
                                           countries: [],
                                           perPage: '',
                                           timeOut: '' });

  const [ country, setCountry ] = useState('');
  const [ open, setOpen ] = useState(false);
  const [ severity, setSeverity ] = useState('info');
  const [ message, setMessage ] = useState('message');

  const alertClick = (severity, message) => {
    setSeverity(severity);
    setMessage(message);
    setOpen(true);
  };

  const updateConfig = async () => {
    if (!values.url || !values.countries || !values.perPage || !values.timeOut) {
      alert('Atenção! Os campos obrigatórios devem ser preenchidos.');
    } else {
      const config = { url: values.url,
                       countries: values.countries,
                       perPage: values.perPage,
                       timeOut: values.timeOut };
      
      await api.put(`config/${values.id}`, config)
        .then(() => alertClick('success', 'Configuração atualizada com sucesso!'))
        .catch(e => alertClick('error', e.message));
    };
  };

  const addItem = (item) => {
    if (!item) {
      alert('Deve ser informado um País');
    } else {
      setValues({...values, countries: [...values.countries, item].sort()});
      setCountry('');
    };
  };

  const deleteItem = (index) => {
    let list = [];
    values.countries.map((country, i) => {
      if (i !== index) list.push(country)
    });

    setValues({...values, countries: list});
  };

  const createUniversities = async () => {
    if (window.confirm('Atenção! A lista atual será excluída e uma nova será criada a partir da última configuração salva.')) {
      alertClick('info', 'aguarde...');

      await api.post('/create')
        .then(() => {
          alertClick('success', 'Lista atualizada com sucesso!');
          navigate('/listUniversities');
        })
        .catch(e => {
          alertClick('error', e.message);
        });
    };
  };

  const getConfig = async () => {
    await api.get(`config`)
      .then(({ data }) => {
        setValues({ id: data._id,
                    url: data.url,
                    countries: data.countries,
                    perPage: data.perPage,
                    timeOut: data.timeOut });
      })
      .catch(e => console.log(e));
  };

  useEffect(() => {
    getConfig();
  }, []);
    
  return (
    <>
    <h3>Configurações</h3>

    <div className="gridCustomer">

    <Grid gap={3}
          container
          width={600}
          direction="column"
          justifyContent="space-evenly"
          alignItems="stretch"
          className="gridCustomer">

        <TextField required id="txtURL" label="URL" variant="outlined" value={values.url} onChange={e => setValues({...values, url: e.target.value})} />
        <TextField placeholder='Digite o nome do país e pressione enter' sx={{ mt: 2 }} id="txtCountry" label="País" variant="outlined" value={country} onChange={e => setCountry(e.target.value)} onKeyDown={e => e.key === 'Enter' && addItem(e.target.value)} />

      <TableContainer sx={{ width: 300, mb: 2 }} component={Paper}>
        <Table aria-label="customized table">
          <TableBody>

            { values.countries && values.countries.map((item, index) => (<>
                <StyledTableRow key={index}>
                  <StyledTableCell align="left">{item}</StyledTableCell>
                  <StyledTableCell align="right"><button onClick={() => deleteItem(index)}>X</button></StyledTableCell>
                </StyledTableRow>
                </>))
            }

            </TableBody>
        </Table>
      </TableContainer>
  
      <TextField required type={'number'} id="txtPerPage" label="Paginação" variant="outlined" value={values.perPage} onChange={e => setValues({...values, perPage: e.target.value})} />
      <TextField required type={'number'} id="txtTimeOut" label="Tempo da Sessão (milisegundos)" variant="outlined" value={values.timeOut} onChange={e => setValues({...values, timeOut: e.target.value})} />      
      <Button onClick={() => createUniversities()} variant='outlined'>Atualizar Lista de Universidades</Button>
    </Grid>

    <Grid gap={3}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          className="gridButton">

      <Button onClick={() => updateConfig()} variant="contained">Atualizar</Button>

      <Link to={'/'}>
        <Button variant="contained">Cancelar</Button>
      </Link>
    </Grid>

    {SnackBars(open, setOpen, severity, message)}

    </div>
    </>
  );
};

export default Config;
