import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/Contexts';
import searchPanel from './SearchPanel';
import deleteRecord from './DeleteRecord';
import CountPage from './CountPage';

import { StyledTableCell, StyledTableRow } from './StyledTable';

import CircularProgress from '@mui/material/CircularProgress';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const TableList = ( listName,
                    tableCell,
                    loading,
                    srPanFn,
                    api,
                    data, getData,
                    page, setPage,
                    navigate, path ) => {

  const [ user ] = useContext(UserContext);

  const [ checkAcess, setCheckAcess ] = useState(false);

  useEffect(() => {
    if (user.access !== 'admin' && path !== 'user')
      setCheckAcess(true);
  }, []);

  // format specific cells
  // const checkCell = (item, cell) => {
  //   if (cell.field === 'list') {
  //     return item.list.map(i =>
  //         <div id={i.id}>{`${i.quantity} x ${i.product}`}</div>);

  //   } else if (cell.field === 'total' || cell.field === 'price') {
  //     return 'R$ ' + parseFloat(item[cell.field]).toFixed(2);

  //   } else {
  //     return item[cell.field];
  //   };
  // };

  return (
      <div className="tableCustomer">

      { loading ? <h3><CircularProgress /></h3> : <>

      <h3>Lista de {listName}</h3>

      { ((user.access === 'admin') ||
         (user.access !== 'admin' && path !== 'user')) &&
          searchPanel( srPanFn.searchById,
                       srPanFn.searchByName,
                       srPanFn.setSearch,
                       srPanFn.setSearchById,
                       srPanFn.setSearchByName,
                       srPanFn.getDefault )
      }

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700, mt: 3 }} aria-label="customized table">
            <TableHead>
              <TableRow>

                  {tableCell.map(head => 
                      <StyledTableCell align={head.align}>{head.fieldName}</StyledTableCell>)}

                  <StyledTableCell align="right" />
                  <StyledTableCell align="right" />
              </TableRow>
            </TableHead>
            <TableBody>

              {data && data.map((item) => (
                !item.page ?
                  <StyledTableRow key={item.id}>

                    { tableCell.map(cell =>
                      <StyledTableCell align={cell.align}>
                        {/* {checkCell(item, cell)} */}
                        {item[cell.field]}
                      </StyledTableCell>)
                    }

                    <StyledTableCell align="right"><button disabled={checkAcess} onClick={() => navigate(`/${path}/${item._id}`)}>Alterar</button></StyledTableCell>
                    <StyledTableCell align="right"><button disabled={checkAcess} onClick={() => deleteRecord(item._id, item.name, api, getData, path)}>Excluir</button></StyledTableCell>
                  </StyledTableRow>
                :
                <StyledTableCell colSpan={7} align="center">
                  <Button sx={{ mr: 1.5 }} variant="outlined" onClick={() => CountPage('decrease', page, data, setPage)}>{'<'}</Button>Página {item.page} de {item.from}
                  <Button sx={{ ml: 1.5 }} variant="outlined" onClick={() => CountPage('increase', page, data, setPage)}>{'>'}</Button>
                </StyledTableCell>
              ))}

            </TableBody>
        </Table>
      </TableContainer>

      <Grid gap={3}
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            className="gridButton">

        <Link to={'/'}>
          <Button variant="contained">Voltar</Button>
        </Link>
      </Grid>

      </> }
  </div>
  );
};

export default TableList;
