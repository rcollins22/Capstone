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

const useStyles = makeStyles({
  table: {
    minWidth: 250,
  },
});

const getID = () => {
  return localStorage.getItem("id")
  // return '5f668a67cd1885550c833916'
}

// function createData(stock, allocation) {
//   return { stock, allocation};
// }

// const rows = [
//     createData('Apple', 'AAPL', 3.7, 67),
//     createData('Tesla', 'TSLA', 25.0, 51),
//     createData('GE', 'GE', 1.0, 24),
//     createData('Twitter', 'TWTR', 6.0, 24),
//     createData('Groupon', 'GRP', 6.0, 49),
//     createData('Homewell', 'HWL', 3.2, 87),
//     createData('The Home Depot', 'THD', 9.0, 37),
//     createData('Jelly Belly', 'JB', -2.3, 94),
//     createData('Walmart', 'WM', 26.0, 65),
//     createData('kellogs', 'KLG', 0.2, 98),
//     createData('Microsoft', 'MSFT', -6.3, 81),
//     createData('Splunk', 'SPLK', -19.0, 9),
//     createData('Bitcoin', 'BTC', 18.0, 63)
//   ];

export default function AllocationTable() {
  const [rows, setRows] = useState([]);
  // const [allValues, setAllValues] = useState([]);
  useEffect(() => {
    loadRows();
  }, []);
  const loadRows = () => {
    axios
      .get(`${url}/portfolios/addTickers/${getID()}`)
      .then(res => {
        console.log('Current Assets', res.data.tickerData);
        const r = res.data.tickerData;
        setRows(r);
        // setAllValues(r)
      })
      .catch(err => console.log(err));
  };
  const postAllocations = () => {
      // axios.post(`${url}/portfolios/addTickers/${getID()}/?tickers=${selected.toString()}`)
  }
  const classes = useStyles();

  const calculateValuesMax = (updatedItem) => {
    console.log(rows)
    let othersValue = rows.filter(v => v.symbol != updatedItem.symbol)
    .reduce((a, c) => c.allocation+a, 0)
    console.log(othersValue)
    updatedItem.allocation = othersValue + updatedItem.allocation > 100 ? 100-othersValue : updatedItem.allocation
    setRows([...rows.filter(v => v.symbol != updatedItem.symbol), updatedItem].sort((a,b)=> a.symbol < b.symbol ? -1:1))
  }

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
              <TableCell align="right"><AllocationSlider value = {row.allocation} calculcateMax = {calculateValuesMax} symbol = {row.symbol}/></TableCell>
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
