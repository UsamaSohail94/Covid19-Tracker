import React from 'react'
import {Card, CardContent, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import CountUp from 'react-countup'

const useStyles = makeStyles((theme)=>({
    root: {
      minWidth: 200,
      margin:10
    },
    cardItem: {
    },
    title: {
    
    },
    total: {
      marginBottom: 12,
    
    },
  }));


const CountryCards = ({title, total, styles}) => {
    const classes = useStyles();
  return (
      // eslint-disable-next-line
    <Card className={classes.root,styles} align='center' >
      <CardContent>
        <Typography variant="h6" className={classes.title} color="textPrimary" gutterBottom>
         {title}
        </Typography>
        
        <Typography className={classes.total} color="textPrimary" variant="h4">
            <CountUp
                start={0}
                end={total}
                duration={2.75}
                separator=","
            />      
        </Typography>
        
      </CardContent>
    </Card>
  )
}

export default CountryCards
