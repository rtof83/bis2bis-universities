import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../contexts/Contexts';
import { Link, useNavigate, useParams } from 'react-router-dom';

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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const User = () => {
    const [ values, setValues ] = useState({ name: '',
                                             password: '',
                                             email: '',
                                             access: '' });

    const navigate = useNavigate();
    const [ user ] = useContext(UserContext);
    const { id } = useParams();

    const insertUser = async () => {
      if (!values.name || !values.password || !values.email) {
        alert('Atenção! Os campos obrigatórios devem ser preenchidos.');
      } else {
        const user = { name: values.name,
                       password: values.password,
                       email: values.email,
                       access: values.access };

        const query = id ? api.put(`users/${id}`, user) : api.post('users', user);
        console.log(query);
        await query
          .then(() => navigate('/listUsers'))
          .catch(e => {
            if (e.response.status === 419)
              alert('Usuário existente na base de dados!');
          });
      };
    };
    
    const handleClickShowPassword = () => {
      setValues({
        ...values,
        showPassword: !values.showPassword,
      });
    };
    
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const getUser = async () => {
      if (id) {
        await api.get(`users/${id}`)
          .then(({ data }) => {
            setValues({ name: data.name,
                        password: data.password,
                        email: data.email,
                        access: data.access });
          })
          .catch(e => console.log(e));
      };
    };

    useEffect(() => {
      getUser();
    }, []);
    
    return (
      <>
      <h3>Cadastro de Usuários</h3>

      <div className="gridCustomer">

      <Grid gap={3}
            container
            direction="column"
            justifyContent="space-evenly"
            alignItems="stretch"
            className="gridCustomer">

            <FormControl sx={{ width: 300 }}>
              <InputLabel id="lblBrand">Tipo Acesso</InputLabel>
              <Select
                disabled={user.access === 'admin' || !user.access ? false : true}
                labelId="lblBrand"
                id="sltBrand"
                value={values.access}
                label="Marca"
                onChange={e => setValues({...values, access: e.target.value})}
              >            
                <MenuItem value={'admin'}>Administrador</MenuItem>
                <MenuItem value={'user'}>Usuário</MenuItem>
              </Select>
            </FormControl>

          { id && <TextField id="txtId" label="Id" variant="outlined" value={id} disabled /> }
          <TextField required id="txtName" label="Nome" variant="outlined" value={values.name} onChange={e => setValues({...values, name: e.target.value})} />
          <TextField id="txtEmail" label="Email" variant="outlined" value={values.email} onChange={e => setValues({...values, email: e.target.value})} />
          
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

        <Button onClick={() => insertUser()} variant="contained">Salvar</Button>

        <Link to={'/'}>
          <Button variant="contained">Cancelar</Button>
        </Link>
      </Grid>
      </div>
      </>
    );
};

export default User;
