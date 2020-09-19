import React, { useState } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Leaders from './Leaders';
import Toolbar from './Toolbar';
import data from './data';
import LeaderCard from '../automation/LeaderCard';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));


const FollowerSocialView = () => {
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const classes = useStyles();
  
  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  let leaders = [
    { name: 'Mr. Trades', chg: 14.23 },
    { name: 'Rashad', chg: 24.85 },
    { name: 'David', chg: -4.2 },
    { name: 'Nathan', chg: 13.34 },
    { name: 'Carrie', chg: -10.45 },
    { name: 'Allie', chg: 1.03 },
    { name: 'Clint', chg: 2.34 },
    { name: 'Adnan', chg: -12.45 },
    { name: 'Dana', chg: 0.04 },
    { name: 'Kevin', chg: -2.41 }
  ];

  return (
    <Page className={classes.root} title="Leaders">
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Grid container spacing={1}>
            {leaders.map(({ name, chg }) => (
              <LeaderCard name={name} chg={chg} />
            ))}
          </Grid>
          <Pagination
            component="div"
            count={leaders.length}
            variant="outlined"
            color="primary"
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default FollowerSocialView;
