import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import api from '../api';
import SnackBars from '../components/SnackBars';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

const University = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [ values, setValues ] = useState({ alphaTwoCode: '',
                                            country: '',
                                            name: '',
                                            webPages: ['', ''],
                                            domains: ['', ''],
                                            state: '' });

  const [ open, setOpen ] = useState(false);
  const [ severity, setSeverity ] = useState('info');
  const [ message, setMessage ] = useState('message');

  const alertClick = (severity, message) => {
    setSeverity(severity);
    setMessage(message);
    setOpen(true);
  };

  const insertUniversity = async () => {
    if (!values.alphaTwoCode || !values.country || !values.name) {
      alert('Atenção! Os campos obrigatórios devem ser preenchidos.')
    } else {
      const university = { alpha_two_code: values.alphaTwoCode,
                            web_pages: values.webPages,
                            name: values.name,
                            country: values.country,
                            domains: values.domains,
                            'state-province': values.state };
                        
      const query = id ? api.put(`universities/${id}`, university) : api.post('universities', university);
      await query
        .then(() => navigate('/listUniversity'))
        .catch(e => {
          if (e.response.status === 409)
            alertClick('error', e.message);
        })
      };
  };

  const getUniversity = async () => {
    if (id) {
      await api.get(`universities/${id}`)
        .then(({ data }) => {
          setValues({ alphaTwoCode: data.alpha_two_code,
                      webPages: data.web_pages,
                      name: data.name,
                      country: data.country,
                      domains: data.domains,
                      state: data['state-province'] });
        })
        .catch(e => alertClick('error', e.message));
    };
  };

  useEffect(() => {
    getUniversity();
  }, []);
    
  return (
    <>
    <h3>Cadastro de Universidades</h3>

    <div className="gridCustomer">

    <Grid gap={3}
          container
          direction="column"
          justifyContent="space-evenly"
          alignItems="stretch"
          className="gridCustomer">

        { id && <TextField id="txtId" label="Id" variant="outlined" value={id} disabled /> }
        <TextField required id="txtAlphaTwoCode" label="Código do País" variant="outlined" value={values.alphaTwoCode} onChange={e => setValues({...values, alphaTwoCode: e.target.value})} />
        <TextField required id="txtCountry" label="País" variant="outlined" value={values.country} onChange={e => setValues({...values, country: e.target.value})} />
        <TextField required id="txtName" label="Nome" variant="outlined" value={values.name} onChange={e => setValues({...values, name: e.target.value})} />
        <TextField required id="txtState" label="Estado" variant="outlined" value={values.state} onChange={e => setValues({...values, state: e.target.value})} />

        <FormControl sx={{ m: 1.2, gap: 1.2 }}>
          <TextField id="txtWebPages1" label="Páginas da web 01" variant="outlined" value={values.webPages[0]} onChange={e => setValues({...values, webPages: [e.target.value, values.webPages[1]]})} />
          <TextField id="txtWebPages2" label="Páginas da web 02" variant="outlined" value={values.webPages[1]} onChange={e => setValues({...values, webPages: [values.webPages[0], e.target.value]})} />

          <TextField id="txtDomains1" label="Domínio 01" variant="outlined" value={values.domains[0]} onChange={e => setValues({...values, domains: [e.target.value, values.domains[1]]})} />
          <TextField id="txtDomains2" label="Domínio 02" variant="outlined" value={values.domains[1]} onChange={e => setValues({...values, domains: [values.domains[0], e.target.value]})} />
        </FormControl>
    </Grid>

    <Grid gap={3}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          className="gridButton">

      <Button onClick={() => insertUniversity()} variant="contained">Salvar</Button>

      <Link to={'/'}>
        <Button variant="contained">Cancelar</Button>
      </Link>
    </Grid>

    {SnackBars(open, setOpen, severity, message)}

    </div>
    </>
  );
};

export default University;
