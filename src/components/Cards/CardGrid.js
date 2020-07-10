import React,{useState, useEffect} from 'react'
import Cards from './Cards'
import Charts from '../Charts/Charts'
import {Grid, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    gridCard:{
        padding:"30px",
        flexGrow: 1,
    },

    totalCases:{
        backgroundColor:"rgba(255, 183, 77,1)",
        minHeight: 100,
        
    },
    recovered:{
        backgroundColor:"rgba(129, 199, 132,1)",
        minHeight: 100,
        
    },
    deaths:{
        backgroundColor:"rgba(229, 115, 115,1)",
         minHeight: 100,
         
    },
  }); 



const CardGrid = () => {

    const classes = useStyles()

    const [globalData, setGlobalData] = useState([{first:1}])
    const [initial, setInitial] = useState(false)

    useEffect(()=>{
         const dataFetch = async ()=> {
             
             try{
                setInitial(true)
                const apiResponce = await fetch('https://api.thevirustracker.com/free-api?global=stats')
                const apiData = await apiResponce.json()
                console.log("apiData :" , apiData)
                setGlobalData(apiData)
               setInitial(false)
             }
             catch (error){
                console.log("error : ", error)
             }
            
        }
        dataFetch()
    },[setGlobalData])

    if(initial){
        return "Loading...."
    }

  return (
      <div>
    <Grid 
    container 
    spacing ={2} 
    className={classes.gridCard}
    justify='center'
    width="100%"
    >
    <Grid item xs={12} >
            <Typography 
                align='center' 
                color='primary' 
                variant='h3'
                >
                Global Stats
            </Typography>
    </Grid>
        <Grid item xs={12} sm={6} md={4} >
            <Cards 
            total={globalData && globalData.results && globalData.results[0].total_cases}
            text="Total No Of Corona Virus Cases"
            label="Infected"
            style={classes.totalCases}
            />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
            <Cards 
            total={globalData && globalData.results && globalData.results[0].total_recovered}
            text="Total No Of Recoveries"r4 
            label="Recovered"
            style={classes.recovered}
            />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
            <Cards 
            total={globalData && globalData.results && globalData.results[0].total_deaths}
            text="Total No Of Deaths"
            label="Deaths"
            style={classes.deaths}
            />
        </Grid>
        <Grid 
            item
            container
            justify='center'
        >
            <Grid item xs={12} sm={8}>
             <Charts />
            </Grid>
        </Grid> 
    </Grid>
    </div>
  )
}

export default CardGrid
