import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import InputMask from 'react-input-mask';

import api from '../api';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const University = () => {
    const [ values, setValues ] = useState({ alphaTwoCode: '',
                                             country: '',
                                             webPages: '',
                                             domains: '',
                                             state: '' });

    const navigate = useNavigate();
    const { id } = useParams();

    const insertCustomer = async () => {
      if (!values.alphaTwoCode || !values.country) {
        alert('Atenção! Os campos obrigatórios devem ser preenchidos.')
      } else {
        if (!id) {
          alert('Email existente na base de dados');
        } else {
          const university = { alpha_two_code: values.alphaTwoCode,
                               web_pages: values.webPages,
                               name: values.name,
                               country: values.country,
                               domains: values.domains,
                               'state-province': values.state };
                           
          if (id) {
            await api.put(`universities/${id}`, university)
              .then(() => navigate('/listUniversity'))
              .catch(e => console.log(e));
          } else {
            await api.post('universities', university)
              .then(() => navigate('/listUniversity'))
              .catch(e => console.log(e));
          }
        }
      }
    }

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
            .catch(e => console.log(e));
        }
      }

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
            <TextField required id="txtWebPages" label="Páginas da web" variant="outlined" value={values.webPages} onChange={e => setValues({...values, webPages: e.target.value})} />
            <TextField required id="txtDomains" label="Domínios" variant="outlined" value={values.domains} onChange={e => setValues({...values, domains: e.target.value})} />
            <TextField required id="txtState" label="Estado" variant="outlined" value={values.state} onChange={e => setValues({...values, state: e.target.value})} />
        </Grid>

        <Grid gap={3}
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              className="gridButton">

          <Button onClick={() => insertCustomer()} variant="contained">Salvar</Button>

          <Link to={'/'}>
            <Button variant="contained">Cancelar</Button>
          </Link>
        </Grid>
        </div>
        </>
      );
};

export default University;
