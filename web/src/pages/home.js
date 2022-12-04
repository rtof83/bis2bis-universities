import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card'; 
import Grid from '@mui/material/Grid';

const Home = () => {
    const navigate = useNavigate();
    const [ data, setData ] = useState({ url: '', countries: []});
    const [ loading, setLoading ] = useState(false);

    const getConfig = async () => {
        setLoading(true);

        await api.get('config')
            .then(({ data }) => {
                setData(data);
            })
            .catch(e => console.log(e));

        setLoading(false);
    };

    const create = async () => {
        if (window.confirm('As informações atuais do banco de dados serão substituídas. Deseja continuar?')) {
            setLoading(true);

            api.post('universities/create')
                .then(() => {
                    setLoading(false);
                    navigate('/listUniversity');
                })
                .catch(e => console.log(e));
        };
    };

    useEffect(() => {
        getConfig();
    }, []);
    
    return (
        <div className="container text-center">
            <h1>Configuração Inicial</h1>

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

                <Button disabled={loading} onClick={() => create()} size='large' sx={{ mt: 5, mb: 2 }} variant="contained">{loading ? 'aguarde...' : 'Criar!'}</Button>
            </Grid>

            <div>
                Atenção!<p/>
                Ao clicar no botão, os dados atuais serão substituídos pela configuração acima.
            </div>
        </div>
    )
};

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

export default Home;
