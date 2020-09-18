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

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex',
//     flexDirection: 'column'
//   },
//   statsItem: {
//     alignItems: 'center',
//     display: 'flex'
//   },
//   statsIcon: {
//     marginRight: theme.spacing(1)
//   }
// }));

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    maxHeight: 200,
    width: '30%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

export default function LeaderCard({ name, chg, ...rest }) {
  
  const classes = useStyles();
  const series = [
    {
      name: 'XYZ MOTORS',
      data: [
        [1, 34],
        [3.8, 43],
        [5, 31],
        [10, 43],
        [13, 33],
        [15, 43],
        [18, 33],
        [20, 52]
      ]
    }
  ];
  let options = {
    chart: {
      type: 'area',
      height: 160,
      sparkline: {
        enabled: true
      }
    },
    stroke: {
      curve: 'smooth'
    },
    fill: {
      opacity: 0.3,
      color: '#0A6D03'
    },
    yaxis: {
      min: 0
    },
    colors: ['#0A6D03'],
    title: {
      text: `${name}`,
      offsetX: 0,
      style: {
        fontSize: '24px'
      }
    },
    subtitle: {
      text: `${chg}`,
      offsetX: 0,
      style: {
        fontSize: '14px'
      }
    }
  };

  return (
    <Card className={clsx(classes.root)} {...rest}>
      <CardContent>
        <AreaChart series={series} options={options} />
      </CardContent>
    </Card>
  );
}

LeaderCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};