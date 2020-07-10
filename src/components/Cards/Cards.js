import React from 'react';
import {Card,CardContent,Typography} from '@material-ui/core';
import CountUp from 'react-countup'


export default function SimpleCard({total, text, label, style}) {
console.log(text)
  return (
    <div>
    <Card 
    className={style}
    > 
      <CardContent >
      <Typography variant="h6" align="center" color="textPrimary">
          {label}     
        </Typography>
          <Typography variant="h4" align="center">
          <CountUp
          start={0}
          end={total}
          duration={2.75}
          separator=","
        />     
          </Typography>
          <Typography variant="h6" align="center" color="textSecondary">
          {text}     
        </Typography>
      </CardContent>
    </Card>
    </div>
  );
} 