import React, { useState } from 'react';
import PortStepper from './PortStepper';
import {
  Box,
  Container,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import Page from 'src/components/Page';
import ProductCard from './LeaderCard';
import data from './data';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  }
}));

const LeaderList = () => {
  const classes = useStyles();
  const [products] = useState(data);

  return (
    <Page
      className={classes.root}
      title="Automations"
    >
      <Container maxWidth={false}>
  
        <Box mt={3}>
          <Typography variant='h1'>Create your own automated portfolio using the steps below</Typography>
          <PortStepper/>
          
        </Box>
      </Container>
    </Page>
  );
};

export default LeaderList;
