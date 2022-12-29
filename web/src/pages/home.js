import React, { useEffect, useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
import api from '../api';
import { UserContext } from '../contexts/Contexts';

// import { styled } from '@mui/material/styles';
import { StyledTableRow, StyledTableCell } from '../components/StyledTable';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card'; 
import Grid from '@mui/material/Grid';

// import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert from '@mui/material/Alert';
// import SnackBars from '../components/SnackBars';

const Home = () => {
    const [ user, setUser ] = useContext(UserContext);
    // const navigate = useNavigate();

    const [ data, setData ] = useState({ url: '', countries: [] });
    const [ loading, setLoading ] = useState(false);

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
                  
            console.log(e);
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
                setData({ url: data[0].url, countries: data[0].countries });
            })
            .catch(e => console.log(e));

        setLoading(false);
    };

    // const create = async () => {
    //     if (window.confirm('As informações atuais do banco de dados serão substituídas. Deseja continuar?')) {
    //         setLoading(true);

    //         api.post('universities/create')
    //             .then(() => {
    //                 setLoading(false);
    //                 navigate('/listUniversity');
    //             })
    //             .catch(e => console.log(e));
    //     };
    // };

    useEffect(() => {
        getConfig();
        checkUser();
    }, []);
    
    return (
        <div className="container text-center">
            { user.name && <><h3>Olá, {user.name}!</h3></> }

            <h1>Configuração Inicial</h1>

            <h2>os seguintes países serão extraídos da API <p/> {data.url.substring(0, data.url.indexOf('com') + 3)}</h2>
            
            {/* <h2>os seguintes países serão extraídos da API <p/> {data[0].url} </h2> */}

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
        </div>
    )
};

export default Home;
