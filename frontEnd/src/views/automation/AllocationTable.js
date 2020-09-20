import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AllocationSlider from '../../components/AllocationSlider';
import axios from 'axios'
import url from '../../url'
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container' ;

const useStyles = makeStyles({
  table: {
    minWidth: 250,
  },
});
let sendVals;
const getID = () => {
  return localStorage.getItem("id")
  // return '5f668a67cd1885550c833916'
}

export default function AllocationTable() {
  const [rows, setRows] = React.useState([]);
  const [maxAlloc,setMaxAlloc]= React.useState(100)
  const [valArr,setValArr]= React.useState({})
  const [usedAlloc,setUsedAlloc]=React.useState()
  
  useEffect(() => {
    loadRows();
  }, []);
  const loadRows = () => {
    axios
      .get(`${url}/portfolios/addTickers/${getID()}`)
      .then(res => {
        console.log('Current Assets', res.data.tickerData);
        const ro = res.data.tickerData;
        
        ro.forEach(r=>{
          r.allocation = 100/ro.length
        })
        setRows(ro);
      })
      .catch(err => console.log(err));
  };
  const postAllocations = () => {
      console.log(this.fieldEditor1.state)
      // axios.post(`${url}/portfolios/addTickers/${getID()}/?tickers=${selected.toString()}`)
  }
  const classes = useStyles();
  

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="caption table">
        <caption>Select your desired allocation using the sliders above</caption>
        <TableHead>
          <TableRow>
            {/* <TableCell align="right">Delete Stock</TableCell> */}
            <TableCell>Stock</TableCell>
            <TableCell align="right">Allocation amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.symbol}>
              <TableCell component="th" scope="row">
                {row.symbol}
              </TableCell>
              <TableCell align="right"><AllocationSlider/></TableCell>
              {/* <TableCell align="right"><AllocationSlider
              ref={{(eval('var' + "allocationEditor" + row.symbol)} => {this.fieldEditor1 = fieldEditor1;}
              {...props}
              /></TableCell> */}
              {/* <TableCell align="right"><AllocationSlider
                ref={(fieldEditor1) => {this.fieldEditor1 = fieldEditor1;}}
              /></TableCell> */}
              {/* <TableCell align="right"><AllocationSlider/></TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
          variant="contained"
          color="primary"
          onClick={postAllocations}
          >Save Allocations - Only Press Once</Button>
    </TableContainer>
  );
}

