import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { Container, Grid, makeStyles, CardHeader } from '@material-ui/core';
import Page from 'src/components/Page';
import LatestOrders from '../../components/LatestOrders';
import PerformanceSummary from '../../components/PerformanceSummary';
import TodaysChange from '../../components/TodaysChange';
import TotalFollowers from '../../components/TotalFollowers';
import TotalBalance from '../../components/TotalBalance';
import OverviewDonut from '../../components/OverviewDonut';
import TodaysMoney from '../../components/TodaysMoney';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  const [todaysChange, setTodaysChange] = useState()
  const [totalFollowers, setFollowers] = useState()
  const [portfolioAllocations, setPortAllocations] = useState()
  const [totalBalance, setBalance] = useState()

  useEffect(() => {
    loadTodaysChange()
    //loadPortfolioAllocations()
  }, []);

  const loadTodaysChange = () => {
    console.log('TODAYS CHANGE')
    var currUid = localStorage.getItem("id") //exemplar call to local storage

    axios.get(`/performance/overall-performance?days=2/${currUid}`)
    .then(res => {
      console.log("Todays Change", res.data)
        setTodaysChange(res.data) // returns at Number that represents a percent.
    })
    .catch(err => console.log(err));
  }

  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Typography variant="h1">FOLLOWER</Typography>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TodaysChange change={todaysChange} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalFollowers />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TodaysMoney />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalBalance />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <PerformanceSummary />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <OverviewDonut />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <LatestOrders />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;