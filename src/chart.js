// Our labels along the x-axis
const weekdays = ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday']
// For drawing the lines
let ounces = []
let hours = []
let quality = []
let steps = []
let flights = []
let minutes = []
let stepProgress
let stepsRemaining

const hydration = document.querySelector('#graph--hydration')
const sleep = document.querySelector('#graph--sleep')
const stepsAndMinutes = document.querySelector('#graph--steps')
const stairFlights = document.querySelector('#graph--stairs')
const stepGoal = document.querySelector('#graph--step-goal')

function createGraphs() {
  const hydrationChart = new Chart(hydration, {
    type: 'line',
    data: {
      labels: weekdays,
      datasets: [
        {
          data: ounces,
          label: 'Ounces',
          borderColor: 'rgb(225,150,50)',
          fill: true,
          backgroundColor: 'rgb(232,182,101)'
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Ounces',
            fontSize: 16
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Days of the Week',
            fontSize: 16
          }
        }]
      },
      title: {
        display: true,
        text: 'Hydration Data',
        fontSize: 20
      }
    }
  })

  const sleepChart = new Chart(sleep, {
    type: 'bar',
    data: {
      labels: weekdays,
      datasets: [
        {
          data: hours,
          label: 'Hours',
          backgroundColor: 'rgb(225,150,50)',
          fill: true
        },
        {
          data: quality,
          label: 'Quality',
          backgroundColor: 'rgb(235,202,152)',
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Quantity',
            fontSize: 16
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Days of the Week',
            fontSize: 16
          }
        }]
      },
      title: {
        display: true,
        text: 'Sleep Data',
        fontSize: 20
      }
    }
  })

  const stepsAndMinutesChart = new Chart(stepsAndMinutes, {
    type: 'bar',
    data: {
      labels: weekdays,
      datasets: [
        {
          type: 'line',
          data: steps,
          label: '100 Steps',
          fill: false,
          borderColor: 'rgb(225,150,50)'
        },
        {
          data: minutes,
          label: 'Minutes',
          backgroundColor: 'rgb(235,202,152)',
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Quantity',
            fontSize: 16
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Days of the Week',
            fontSize: 16
          }
        }]
      },
      title: {
        display: true,
        text: 'Activity Data',
        fontSize: 20
      }
    }
  })

  const flightChart = new Chart(stairFlights, {
    type: 'doughnut',
    data: {
      labels: ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday'],
      datasets: [
        {
          data: flights,
          backgroundColor: ['#E57373', '#9575CD', '#FFCA28','#BDBDBD', '#FF7043','#42A5F5', '#26A69A'],
          label: 'Flights'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: 'Flights of Stairs Climbed'
      }
    }
  })

  const goalGraph = new Chart(stepGoal, {
    type: 'doughnut',
    data: {
      labels: ['Step Progress', 'Steps Remaining'],
      datasets: [
        {
          data: [stepProgress, stepsRemaining],
          backgroundColor: ['#E57373', '#26A69A'],
          label: 'Steps'
        }
      ]
    },
    options: {
      maintainAspectRatio:false,
      title: {
        display: true,
      }
    }
  })

}
