export const chartRunner = function () {
    let myChart;
    function updateChart() {
        let items = {...localStorage};

        //Sort objects
        let newO = {};
        Object.keys(items).sort(function(a,b){return items[b]-items[a]})
            .map(key => newO[key] = items[key]);

        let resultKeys = Object.entries(newO).slice(0,5).map(entry => entry[0]);
        let resVals = Object.entries(newO).slice(0,5).map(entry => entry[1]);


        let data = {
            labels: resultKeys,
            datasets: [{
                label: '# Searched times',
                data: resVals,
            }]
        };
        if(myChart !== undefined)
         myChart.destroy();

        createChart(data);
    }

    function sortObject(obj) {
        return Object.keys(obj)
            .sort().reduce((a, v) => {
                a[v] = obj[v];
                return a; }, {});
    }

    function createChart(newData){
        let ctx = document.getElementById('myChart');
         myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: newData.labels,
                datasets: [{
                    label: newData.datasets[0].label,
                    data: newData.datasets[0].data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }

        });
    }


    return{updateChart};
}();