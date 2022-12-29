import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../contexts/Contexts';
import { Link, useNavigate } from 'react-router-dom';

import api from '../api';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import InputAdornment from '@mui/material/InputAdornment';
// import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import Alert from '@mui/material/Alert';
// import Snackbar from '@mui/material/Snackbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SnackBars from '../components/SnackBars';
import { StyledTableCell, StyledTableRow } from '../components/StyledTable';

const Config = () => {
  const navigate = useNavigate();
  const [ user ] = useContext(UserContext);
  // const { id } = useParams();

  const [ values, setValues ] = useState({ id: '',
                                           url: '',
                                           countries: [],
                                           perPage: '',
                                          //  updateHour: '',
                                          //  secret: '',
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
                      //  updateHour: values.updateHour,
                      //  secret: values.secret,
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
    
    // const handleClickShowPassword = () => {
    //   setValues({
    //     ...values,
    //     showPassword: !values.showPassword,
    //   });
    // };
    
    // const handleMouseDownPassword = (event) => {
    //   event.preventDefault();
    // };

    const getConfig = async () => {
      await api.get(`config`)
        .then(({ data }) => {
          setValues({ id: data[0]._id,
                      url: data[0].url,
                      countries: data[0].countries,
                      perPage: data[0].perPage,
                      // updateHour: data[0].updateHour,
                      // secret: data[0].secret,
                      timeOut: data[0].timeOut });
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

            {/* <FormControl sx={{ width: 300 }}>
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
            </FormControl> */}

          <TextField required id="txtURL" label="URL" variant="outlined" value={values.url} onChange={e => setValues({...values, url: e.target.value})} />
          <TextField placeholder='Digite o nome do país e pressione enter' sx={{ mt: 2 }} id="txtCountry" label="País" variant="outlined" value={country} onChange={e => setCountry(e.target.value)} onKeyDown={e => e.key === 'Enter' && addItem(e.target.value)} />
          
          
          
          


          
          


        <TableContainer sx={{ width: 300, mb: 2 }} component={Paper}>
          <Table aria-label="customized table">
              {/* <TableHead>
              <TableRow>
                  <StyledTableCell align="center">ID</StyledTableCell>
                  <StyledTableCell align="right" />
                  <StyledTableCell align="right" />
              </TableRow>
              </TableHead> */}
              <TableBody>

                { values.countries && values.countries.map((item, index) => (<>
                  {/* !item.page ? */}
                    <StyledTableRow key={index}>
                      <StyledTableCell align="left">{item}</StyledTableCell>
                      <StyledTableCell align="right"><button onClick={() => deleteItem(index)}>X</button></StyledTableCell>
                    </StyledTableRow>
                    </>))}
                  {/* : */}
                  {/* <StyledTableCell colSpan={6} align="center">
                    <Button sx={{ mr: 1.5 }} variant="outlined" onClick={() => countPage('decrease')}>{'<'}</Button>Página {item.page} de {item.from}
                    <Button sx={{ ml: 1.5 }} variant="outlined" onClick={() => countPage('increase')}>{'>'}</Button>
                  </StyledTableCell> */}
                {/* ))} */}
              </TableBody>
          </Table>
        </TableContainer>

        {/* <Grid gap={3}
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              className="gridButton">

          <Link to={'/'}>
            <Button variant="contained">Voltar</Button>
          </Link>
        </Grid> */}
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          <TextField required type={'number'} id="txtPerPage" label="Paginação" variant="outlined" value={values.perPage} onChange={e => setValues({...values, perPage: e.target.value})} />
          {/* <TextField required type={'number'} id="txtUpdateHour" label="Atualização Periódica (horas)" variant="outlined" value={values.updateHour} onChange={e => setValues({...values, updateHour: e.target.value})} /> */}
          {/* <TextField required id="txtSecret" label="Palavra Secreta" variant="outlined" value={values.secret} onChange={e => setValues({...values, secret: e.target.value})} /> */}
          <TextField required type={'number'} id="txtTimeOut" label="Tempo da Sessão (milisegundos)" variant="outlined" value={values.timeOut} onChange={e => setValues({...values, timeOut: e.target.value})} />      
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
