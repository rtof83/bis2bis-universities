import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

import { Button } from '@mui/material';

const Home = () => {
    const navigate = useNavigate();
    const [ loading, setLoading ] = useState(false);

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
    
    return (
        <div className="container text-center">
            <h1>Configuração Inicial</h1>

            <h2>os seguintes países serão extraídos da API http://universities.hipolabs.com/search</h2>

            <h3>
                <ul>
                    <li>Argentina</li>
                    <li>Brasil</li>
                    <li>Chile</li>
                    <li>Colombia</li>
                    <li>Paraguai</li>
                    <li>Peru</li>
                    <li>Suriname</li>
                    <li>Uruguai</li>
                </ul>
            </h3>

            <Button disabled={loading} onClick={() => create()} size='large' sx={{ mt: 5, mb: 2 }} variant="contained">{loading ? 'aguarde...' : 'Criar!'}</Button>
            <div>
                Atenção!<p/>
                Ao clicar no botão os dados atuais serão substituídos pela configuração acima.
            </div>
        </div>
    )
};

export default Home;
