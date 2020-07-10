import React,{useState, useEffect} from 'react'
import {Line} from 'react-chartjs-2'



const Charts = () => {
  const [dailyData, setDailyData] = useState([])


useEffect(()=>{
    const getDailyData = async ()=>{
        const ApiResponce = await fetch('https://covid19.mathdro.id/api/daily')
        const ApiJson = await ApiResponce.json()
        console.log("ApiJson: ",ApiJson)
        const  updatedData = ApiJson.map(data => ({ 
            confirmed: data.confirmed.total,
            deaths: data.deaths.total,
            date: data.reportDate,
        }))
        console.log("updatedData: ", updatedData)
        setDailyData(updatedData)
        console.log("dailyData: ", dailyData)
    }
    getDailyData()
},[dailyData])



     const Chart = (
        dailyData[0]?(<Line 
            data={
                {
                    labels: dailyData.map(({date})=> date),
                    datasets:[{
                                    data: dailyData.map(({confirmed})=> confirmed),
                                    label: 'infected',
                                    
                                    borderColor: "lightBlue",
                                    fill: true,
                                    
                                },
                                {
                                    data: dailyData.map(({deaths})=> deaths),
                                    label: 'deaths',
                                    backgroundColor: 'rgba(255,0,0,0.5)',
                                    borderColor: "red",
                                    fill: true,

                                }
                                ],
                            }
                        }
                        
                        />
                        ):null
                        )
  
  
    return (
    <div>
        
             {Chart}
           
    </div>
  )
}

export default Charts
