import React from 'react';
import PropTypes, { number } from 'prop-types';
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
    window.location = `/user/dmitchell217`;
  };
  const random = data => {
    let i;
    let lastNum = 9000;
    for (i = 0; i < 25; i++) {
      let operators = [
        {
          sign: '+',
          method: function(a, b) {
            return a + b;
          }
        },
        {
          sign: '-',
          method: function(a, b) {
            return a - b;
          }
        }
      ];
      let randNum = Math.floor(Math.random() * 700); 
      let selectedOperator = Math.floor(Math.random() * operators.length);
      let thisNum = Math.floor(Math.random() * (randNum) + 1);
      console.log(selectedOperator);
      let pushNum = operators[selectedOperator].method(lastNum, thisNum);
      data.push(pushNum);
      console.log(data);
      lastNum=pushNum
    }
  };
  let charInfo = [];
  let data = [];
  random(data);
  let data1=data[0]
  let data2=data[data.length-1]
  let neg;
  data1>data2 ? neg='-': neg='';
  const series = [
    {
      name: 'Overall Performance',
      data: data
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
      curve: 'smooth',
      width: 2
    },
    fill: {
      gradient: {
        enabled: true,
        opacityFrom: 0.55,
        opacityTo: 0
      }
    },
    yaxis: {
      min: 6700
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
      text: `${neg}${((data[data.length - 1] / data[0]) * 10).toFixed(2)}%   (${
        leader.followers
      } followers)`,
      offsetX: 0,
      style: {
        fontSize: '14px'
      }
    }
  };
  console.log(data[0],data[data.length-1])
  
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
