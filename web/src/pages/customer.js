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

const Customer = () => {
    const [ values, setValues ] = useState({ name: '',
                                             address: '',
                                             email: '',
                                             cpf: '',
                                             phone: '',
                                             birth: '',
                                             password: '',
                                             showPassword: '' });

    const navigate = useNavigate();
    const { id } = useParams();

    const insertCustomer = async () => {
      if (!values.name || !values.address || !values.cpf) {
        alert('Atenção! Os campos obrigatórios devem ser preenchidos.')
      } else {
        let checkEmail = 0;

        await api.post('customers/checkEmail', { email: values.email })
        .then(({ data }) => {
              checkEmail = data[0].id
            })
        .catch(e => console.log(e));

        if (checkEmail !== 0 && !id) {
          alert('Email existente na base de dados');
        } else {
          const customer = { name: values.name,
                             address: values.address,
                             email: values.email,
                             phone: values.phone,
                             birth: values.birth,
                             password: (values.password) };
                           
          if (id) { 
            if (checkEmail !== 0 && checkEmail !== parseInt(id)) {
             alert('Email cadastrado em outro registro');
            } else {
              await api.put(`customers/${id}`, customer)
                .then(() => navigate('/listCust'))
                .catch(e => console.log(e));
            }
          } else {
            await api.post('customers', customer)
              .then(() => navigate('/listCust'))
              .catch(e => console.log(e));
          }
        }
      }
    }
    
      const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

      const getCustomer = async () => {
        if (id) {
          await api.get(`customers/${id}`)
            .then(({ data }) => {
              setValues({ name: data.name,
                          address: data.address,
                          email: data.email,
                          cpf: data.cpf,
                          phone: data.phone,
                          birth: data.birth,
                          password: data.password });
            })
            .catch(e => console.log(e));
        }
      }

      useEffect(() => {
        getCustomer();
      }, []);
    
      return (
        <>
        <h3>Cadastro de Clientes</h3>

        <div className="gridCustomer">

        <Grid gap={3}
              container
              direction="column"
              justifyContent="space-evenly"
              alignItems="stretch"
              className="gridCustomer">

            { id && <TextField id="txtId" label="Id" variant="outlined" value={id} disabled /> }
            <TextField required id="txtName" label="Nome" variant="outlined" value={values.name} onChange={e => setValues({...values, name: e.target.value})} />
            <TextField id="txtAddress" label="Endereço" variant="outlined" value={values.address} onChange={e => setValues({...values, address: e.target.value})} />
            <TextField required id="txtEmail" label="E-mail" variant="outlined" value={values.email} onChange={e => setValues({...values, email: e.target.value})} />            

            <InputMask value={values.cpf} onChange={e => setValues({...values, cpf: e.target.value})} mask="999.999.999-99" maskChar=" ">
              {() => <TextField required id="txtCPF" label="CPF" variant="outlined" />}
            </InputMask>

            <InputMask value={values.phone} onChange={e => setValues({...values, phone: e.target.value})} mask="(99) 99999-9999" maskChar=" ">
              {() => <TextField required id="txtPhone" label="Telefone" variant="outlined" />}
            </InputMask>

            <TextField type="date" required id="txtBirth" label="Nascimento" variant="outlined" value={values.birth} onChange={e => setValues({...values, birth: e.target.value})} />

            <FormControl required variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
              <OutlinedInput
                id="txtPassword"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={e => setValues({...values, password: e.target.value})}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
        </FormControl>
        
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

export default Customer;
