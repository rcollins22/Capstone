import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import AreaChart from '../../mixins/AreaChart';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    maxHeight: 200,
    minWidth: '30%',
    paddingBottom: theme.spacing(3),
    margin: 7
  }
}));

export default function LeaderCard({ leader, ...rest }) {
  const now = new Date();
  const monthAgo = now.setDate(now.getDate() - 30);
  const classes = useStyles();
  let charData = leader.data;
  const switchUrl = () => {
    window.location = `/user/${leader.id}`;
  };

  const series = [
    {
      name: 'Overall Performance',
      data: leader.data
    }
  ];
  let options = {
    chart: {
      type: 'area',
      height: 100,
      sparkline: {
        enabled: true
      }
    },
    stroke: {
      curve: 'smooth'
    },
    fill: {
      opacity: 0.1,
      color: '#0A6D03'
    },
    yaxis: {
      min: 0
    },
    // xaxis: {
    //   type: 'datetime',
    //   min: new Date('01 Mar 2012').getTime(),
    //   tickAmount: 6
    // },
    colors: ['#0A6D03'],
    title: {
      text: `${leader.name}`,
      offsetX: 0,
      style: {
        fontSize: '24px'
      }
    },
    subtitle: {
      text: `${leader.monthlyPerformance.toFixed(2)}%   (${
        leader.followers
      } followers)`,
      offsetX: 0,
      style: {
        fontSize: '14px'
      }
    }
  };

  return (
    <Card className={clsx(classes.root)} {...rest} onClick={switchUrl}>
      <CardContent>
        <Grid>
          <AreaChart series={series} options={options} />
        </Grid>
      </CardContent>
    </Card>
  );
}

LeaderCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};
