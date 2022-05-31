const k = Number(prompt("Chọn giá trị của K"));
const chart =new Chart(document.querySelector("#chart"),{
    type:"scatter",
    data:ChartData()
}) 