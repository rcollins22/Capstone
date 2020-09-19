import React, {useState, useEffect} from 'react';
import FundsSlider from '../automation/elements/FundsSlider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Card';
import { Container } from '@material-ui/core';
import axios from 'axios'
import url from '../../url'

const getID = () => {
  // return localStorage.getItem("id")
  return '5f651667e37bfe1ffb9871d8'
}


let usableBal = 2347.23

export default function SelectAllocation() {
// const [projectedBalance, setProjectedBalance] = useState()
const [availableBalance, setAvailableBalance] = useState()
  useEffect(() => {
    loadAvailableBalance()
  }, []);
const loadAvailableBalance = () => {
  axios.get(`${url}/users/balance/${getID()}`)
  .then(res => {
    console.log("Todays Change", res.data.returnValue)
    setAvailableBalance(res.data.returnValue) // returns at Number that represents a percent.
  })
  .catch(err => console.log(err));
}
const addFunds = () => {
  let fundsPercent = 50 // NEEDS TO BE DYNAMIC
  let fundAmount = fundsPercent*0.01*availableBalance
  axios.post(`${url}/portfolios/addFunds/${getID}/${fundAmount}`)
  .then(res => {
    console.log("Adding funds", res.data)
  })
  .catch(err => console.log(err));
}
  return (
    <Container>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Typography variant="h1">
          Select the desired allocation for your new portfolio
        </Typography>
        <br/>
    <Typography variant="h3">Avaliable Balance: ${availableBalance}</Typography>
      </Grid>
      <Grid>
          <br/>
        <FundsSlider avail = {availableBalance}/>
      </Grid>
    </Container>
  );
};
