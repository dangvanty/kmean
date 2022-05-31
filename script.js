const k = 3;
alert("chọn giá trị mặc định của K =3")
const chart =new Chart(document.querySelector("#chart"),{
    type:"scatter",
    data:ChartData(),
    options:chartOptions()
}) 

let preventCalllBack=false


document.addEventListener('keydown', async()=>{
if(!preventCalllBack){
        preventCalllBack=true
        
    let clusterCentersLocs=['nhom'];
    let clusterCentersNewLocs=['tam'];
    while(JSON.stringify(clusterCentersLocs)!=JSON.stringify(clusterCentersNewLocs)){
        clusterCentersLocs=[]
        for(let i=0;i<k;i++){
            clusterCentersLocs.push(chart.data.datasets[0].data[i])
        }
        await labelDataPoints()
        await recenterClusterCenters()

        clusterCentersNewLocs=[]
        for(let i=0;i<k;i++){
            clusterCentersNewLocs.push(chart.data.datasets[0].data[i])
        }
    }
    alert('Hoàn thành thuật toán! Mở console để thấy kết quả')
    consoleResults()
}
})

function consoleResults(){
    const cluster =getClusters()
    for(let i=0; i<cluster.length;i++){
        console.log(`nhóm ${String.fromCharCode(i+65)} nhân viên:`)
        console.table(cluster[i])
    }
}

function recenterClusterCenters(){
    return new Promise(async(resolve,reject)=>{
        const clusters=getClusters()
        console.log( typeof clusters)
        // for (let i=0; i<clusters.length;i++){
        //     let sumX = 0
        //     let sumY = 0
        //     for(let j=i;j<clusters.length;j++){
        //         sumX= sumX + clusters[j].x
        //         sumY= sumY + clusters[j].y
        //     }
        //     if(clusters.length){
        //         chart.data.datasets[0].data[i]={x:Number((sumX/clusters.length).toFixed(2)),y:Number((sumY/clusters.length).toFixed(2))}
        //     }

        // }
    clusters.forEach((cluster,i)=>{
        let sumX = 0
        let sumY = 0
        cluster.forEach((dataPoint,j)=>{
            sumX= sumX + dataPoint.x
            sumY= sumY + dataPoint.y
        })
        if(cluster.length){
            chart.data.datasets[0].data[i]={x:Number((sumX/cluster.length).toFixed(2)),y:Number((sumY/cluster.length).toFixed(2))}
        }
      
    })
    // console.log(clusters)
    chart.update(3000)
    await new Promise(resolve =>setTimeout(resolve,3000))
    resolve()
    })
}

function getClusters(){
    let clusters=[]
    for(let i=0;i<k;i++){
        clusters.push([])
    }
    const colors=['green', 'red','blue','yellow','purple','hotpink','black','orange','brown','grey'].slice(0,k)

    for(let i=k; i<chart.data.datasets[0].data.length;i++){
        for(let j=0; j<colors.length;j++){
            if(chart.data.datasets[0].pointBackgroundColor[i]==colors[j]){
                clusters[j].push(chart.data.datasets[0].data[i])
            }
        }
    }
    return clusters
}
function labelDataPoints(){
    return new Promise ( async(resolve,reject)=>{
        dataSet().forEach((dataPoint,i)=>{
            let distances=[]
            for(let j=0;j<k;j++){
                const clusterCenterX=chart.data.datasets[0].data[j].x
                const clusterCenterY =chart.data.datasets[0].data[j].y
                distances.push(Math.sqrt(((clusterCenterX-dataPoint.Age)**2)+((clusterCenterY-dataPoint.Body_mass_index)**2)))
            }
            const minValue=Math.min.apply(Math,distances)
            const index =distances.indexOf(minValue)
            chart.data.datasets[0].pointBackgroundColor[i+k]=chart.data.datasets[0].pointBackgroundColor[index]
        })
        chart.update(2000)
        await new Promise(resolve =>setTimeout(resolve,2000))
        resolve()
    })
    
}