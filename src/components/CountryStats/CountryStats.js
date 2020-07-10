import React,{useState, useEffect} from 'react'
import {Grid, Typography, NativeSelect, FormControl, FormLabel} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import {Bar, Doughnut, Pie} from 'react-chartjs-2'

import CountryCards from './CountryCards'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    form:{
        marginBottom:10,
    },
    totalCases:{
        backgroundColor:"rgba(255, 183, 77,1)",
        minHeight: 100,
        width:"75%",
        
    },
    recovered:{
        backgroundColor:"rgba(129, 199, 132,1)",
        minHeight: 100,
        width:"75%",
        
    },
    deaths:{
        backgroundColor:"rgba(229, 115, 115,1)",
         minHeight: 100,
         width:"75%",
    },
  }));

const CountryStats = () => {

    const classes = useStyles();
    const [country, setCountry] = useState('Pakistan')
    const [countryData, setCountryData] = useState({})
    const [countriesNames, setCountriesNames] = useState([])
    const [chart, setChart] = useState("Bar")
    const URL = "https://covid19.mathdro.id/api/countries"

    useEffect(()=>{
        const countryApi = async ()=> {
            //fetch country name
            const countriesApi = await fetch(`${URL}`)
            const countryJson   = await countriesApi.json()
            const { countries } = countryJson
            const updatedCountries = countries.map(country=> country.name)

            //fetch country data
            const fetchCountryData = await fetch(`https://covid19.mathdro.id/api/countries/${country}`)
            const countryDataJson = await fetchCountryData.json()
             
            console.log("country1:", countryDataJson)
            
            setCountryData(countryDataJson)    
            setCountriesNames(updatedCountries)
        }
        countryApi()
    },[country])
    
    const BarChart = (
        countryData.confirmed ?(
            <Bar
            data={{
            labels: ['Infected', 'Recovered', 'Deaths'],
            datasets: [
                {
                label: 'People',
                backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                data: [countryData.confirmed.value, countryData.recovered.value, countryData.deaths.value],
                },
            ],
            }}
            options={{
            legend: { display: false },
            title: { display: true, text: `Current state in ${country}` },
            }}
        />
        ): "Loading"
    )

    const PieChart = (
        countryData.confirmed ?(
            <Pie
            data={{
            labels: ['Infected', 'Recovered', 'Deaths'],
            datasets: [
                {
                label: 'People',
                backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                data: [countryData.confirmed.value, countryData.recovered.value, countryData.deaths.value],
                },
            ],
            }}
            options={{
            legend: { display: false },
            title: { display: true, text: `Current state in ${country}` },
            }}
        />
        ): "Loading"
    )

    const DoughnutChart = (
        countryData.confirmed ?(
            <Doughnut
            data={{
            labels: ['Infected', 'Recovered', 'Deaths'],
            datasets: [
                {
                label: 'People',
                backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                data: [countryData.confirmed.value, countryData.recovered.value, countryData.deaths.value],
                },
            ],
            }}
            options={{
            legend: { display: false },
            title: { display: true, text: `Current state in ${country}` },
            }}
        />
        ): "Loading"
    )
    
    
  return (
      <div className={classes.root}>
    <Grid
        container
        justify= "center"
        spacing={4}
        width="100%"
    >
    <Grid item xs={12}>
        <Typography 
            align='center' 
            color='primary' 
            variant='h3'
            gutterBottom
        >
            Country Specific Stats
        </Typography>
    </Grid>
    <Grid item container xs={12} align='center' >
        
        <Grid item xs ={6}>
        <FormControl className={classes.form}>
        <FormLabel component="legend">Select Country</FormLabel>
        <NativeSelect 
            defaultValue="" 
            onChange={(e) => {setCountry(e.target.value)}}
            >
                <option value="select">Select</option>
                {countriesNames.map((countryName, i)=> 
                    <option key={i} value={countryName}>
                    {countryName}
                    </option>)}
            </NativeSelect>
        
        </FormControl>
        
        </Grid>

        <Grid item xs ={6}><FormControl className={classes.form}>
        <FormLabel component="legend" >Select Chart</FormLabel>
        <NativeSelect 
                    defaultValue=""
                    onChange={(e) => {setChart(e.target.value)}}
                   
                >
                    <option value="select">Select</option>
                    <option value="Bar">Bar</option>
                    <option value="Doughnut">Doughnut</option>
                    <option value="Pie">Pie</option>
                </NativeSelect>
            
        </FormControl></Grid>
    
        
    </Grid>
    <Grid 
        item 
        container 
        xs={12} 
        sm={4} 
        direction="row" 
        spacing={2} 
        width="100%"
        alignItems='center'
    >
        <Grid item xs={12} >
            <Typography variant='h6' align= "center" gutterBottom color="Secondary">{country? `Country Name: ${country}` : "Enter Country"}</Typography>
        </Grid>   
        <Grid item xs={12} align='center' >
            <CountryCards 
                title="Infected"  
                total={countryData.confirmed? countryData.confirmed.value: null}
                styles={classes.totalCases}
            />
        </Grid>

        <Grid item xs={12} align='center'>
            <CountryCards 
                title="Recovered"
                total={countryData.confirmed? countryData.recovered.value: null}
                styles={classes.recovered}
            />
        </Grid>

        <Grid item xs={12} align='center'>
            <CountryCards 
                title="Deaths"
                total={countryData.confirmed? countryData.deaths.value: null}
                styles={classes.deaths}
            />
        </Grid>
        </Grid>

        <Grid 
            item 
            container 
            xs={12} sm={8} 
            align='center'
            >
            <Grid item xs={12}>
            <Typography variant='h6' color="Secondary">Country Chart </Typography>
            </Grid>
            <Grid item xs={12}>
            {(chart==="Bar")? BarChart : (chart==="Doughnut")? DoughnutChart:(chart==="Pie")? PieChart:null}   
            </Grid>    
        </Grid>
            
    </Grid>
    </div>
  )
}

export default CountryStats
