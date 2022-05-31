function ChartData(){
    let clusterCenters=[
        {x:33.125,y:23.875},
        {x:39.375,y:28.25},
        {x:34.25,y:27},
        
    ]
        // for(let i=0;i<k;i++){
        //     while(true){
        //         let a= Number((Math.random()*100).toFixed(2));
        //         let b=Number((Math.random()*100).toFixed(2))
        //         if(a>=20 && a<60 && b>=10 && b<40){
        //             clusterCenters.push({x:a,y:b})
        //             break;
        //         }
                
        //     }
        // }
    
    const colors=['green', 'red','blue','yellow','purple','hotpink','black','orange','brown','grey']
    return{
        datasets:[{
            label:"Employee data chart",
            data: clusterCenters.concat(dataSet().map((dataPoint)=>{return {
                x:dataPoint.Age, y:dataPoint.Body_mass_index
            }                
            })),
            pointStyle: clusterCenters.map(clusterCenter => 'triangle').concat(dataSet().map(dataPoint => "circle")),
            pointRadius: clusterCenters.map(clusterCenter =>10).concat(dataSet().map(dataPoint => 5.5)),
            pointBackgroundColor: colors.slice(0,k) ,
            showLine:false,
            backgroundColor:"aqua"
        }]
    }
}

function chartOptions(){
    return {
        maintainAspectRatio: false,
        legend:{
            labels:
            {
                fontSize:20
            }
        },
        responsive:true,
        scales:{
            xAxes:[
                {
                    display:true,
                    scaleLabel:{
                        display:true,
                        labelString: "Age level",
                        fontSize:20
                    },
                    ticks:{
                        fontSize:20,
                        max:60,
                        min:20
                
                    }
                }
            ],
            yAxes:[
                {
                    display:true,
                    scaleLabel:{
                        display:true,
                        labelString: "Body_mass_index level",
                        fontSize:20
                    },
                    ticks:{
                        fontSize:20,
                        max:40,
                        min:10
                
                    }
                }
            ]
        }
    }
}