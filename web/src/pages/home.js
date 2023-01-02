import React, { useEffect, useState, useContext } from 'react';
import api from '../api';
import SnackBars from '../components/SnackBars';
import { UserContext } from '../contexts/Contexts';

import { StyledTableRow, StyledTableCell } from '../components/StyledTable';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Card from '@mui/material/Card'; 
import Grid from '@mui/material/Grid';

const Home = () => {
  const [ user, setUser ] = useContext(UserContext);

  const [ data, setData ] = useState({ url: '', countries: [] });
  const [ loading, setLoading ] = useState(false);
  const [ open, setOpen ] = useState(false);
  const [ severity, setSeverity ] = useState('info');
  const [ message, setMessage ] = useState('message');

  const alertClick = (severity, message) => {
    setSeverity(severity);
    setMessage(message);
    setOpen(true);
  };

  let userStorage = JSON.parse(localStorage.getItem('login'));

  const getCountDown = async () => {
    await api.post('validate')
      .then(() => {
        if (!userStorage) {
          setUser(user);
          localStorage.setItem('login', JSON.stringify(user));
        };
      })
      .catch(e => {
        if (e.response.status === 401)
          localStorage.clear();
              
        alertClick('error', e.message);
      });
  };
    
  const checkUser = () => {
    if (userStorage) {
      api.defaults.headers.common = {'authorization': `Bearer ${userStorage.token}`};
      setUser(userStorage);

      getCountDown();
    };
  };

  const getConfig = async () => {
      setLoading(true);

      await api.get('config')
          .then(({ data }) => {
              setData({ url: data.url, countries: data.countries });
          })
          .catch(e => console.log(e));

      setLoading(false);
  };

  useEffect(() => {
      getConfig();
      checkUser();
  }, []);
    
  return (
      <div className="container text-center">
          { user.name && <><h3>Olá, {user.name}!</h3></> }

          <h1>Configuração Inicial</h1>

          { loading ? <h3><CircularProgress /></h3> : <>

          <h2>os seguintes países serão extraídos da API <p/> {data.url.substring(0, data.url.indexOf('com') + 3)}</h2>

          <TableContainer fontSize='8em' align='center' sx={{ mt: 5, mb: -1 }} component={Card}>
              <Table sx={{ maxWidth: 200 }} aria-label="customized table">  
                  <TableBody>
                      { data.countries.map((item) => (
                          <StyledTableRow key={item}>
                              <StyledTableCell align="center" component="th" scope="row">{(item).toUpperCase()}</StyledTableCell>
                          </StyledTableRow>
                      ))}
                  </TableBody>
              </Table>
          </TableContainer>

          <Grid gap={2}
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              className="gridButton"
              sx={{ mb: 1 }}>
          </Grid>

          {!user.auth && <h4>Efetue login para acessar mais recursos</h4>}

          {SnackBars(open, setOpen, severity, message)}

          </> }
      </div>
  );
};

export default Home;
