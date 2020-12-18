const weekdays = ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday']

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

let hydrationChart = new Chart(hydration, {})
let sleepChart = new Chart(sleep, {})
let stepsAndMinutesChart = new Chart(stepsAndMinutes, {})
let flightChart = new Chart(stairFlights, {})
let stepGoalChart = new Chart(stepGoal, {})

function createGraphs() {
  hydrationChart.destroy()
  sleepChart.destroy()
  stepsAndMinutesChart.destroy()
  flightChart.destroy()
  stepGoalChart.destroy()

  hydrationChart = new Chart(hydration, {
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
      legend: {
        labels: {
          fontColor: '#BDBDBD'
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#BDBDBD',
          },
          scaleLabel: {
            display: true,
            labelString: 'Ounces',
            fontSize: 16,
            fontColor: '#BDBDBD'
          }
        }],
        xAxes: [{
          ticks: {
            fontColor: '#BDBDBD',
          },
          scaleLabel: {
            display: true,
            labelString: 'Days of the Week',
            fontSize: 16,
            fontColor: '#BDBDBD'
          }
        }]
      },
      title: {
        display: true,
        text: 'Hydration Data',
        fontSize: 20,
        fontColor: '#BDBDBD'
      }
    }
  })

  sleepChart = new Chart(sleep, {
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
      maintainAspectRatio: false,
      legend: {
        labels: {
          fontColor: '#BDBDBD'
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#BDBDBD',
          },
          scaleLabel: {
            display: true,
            labelString: 'Quantity',
            fontSize: 16,
            fontColor: '#BDBDBD'
          }
        }],
        xAxes: [{
          ticks: {
            fontColor: '#BDBDBD',
          },
          scaleLabel: {
            display: true,
            labelString: 'Days of the Week',
            fontSize: 16,
            fontColor: '#BDBDBD'
          }
        }]
      },
      title: {
        display: true,
        text: 'Sleep Data',
        fontSize: 20,
        fontColor: '#BDBDBD'
      }
    }
  })

  stepsAndMinutesChart = new Chart(stepsAndMinutes, {
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
      maintainAspectRatio: false,
      legend: {
        labels: {
          fontColor: '#BDBDBD'
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#BDBDBD',
          },
          scaleLabel: {
            display: true,
            labelString: 'Quantity',
            fontSize: 16,
            fontColor: '#BDBDBD'
          }
        }],
        xAxes: [{
          ticks: {
            fontColor: '#BDBDBD',
          },
          scaleLabel: {
            display: true,
            labelString: 'Days of the Week',
            fontSize: 16,
            fontColor: '#BDBDBD'
          }
        }]
      },
      title: {
        display: true,
        text: 'Activity Data',
        fontSize: 20,
        fontColor: '#BDBDBD'
      }
    }
  })

  flightChart = new Chart(stairFlights, {
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
      maintainAspectRatio: false,
      legend: {
        labels: {
          fontColor: '#BDBDBD'
        }
      },
      title: {
        display: true,
        text: 'Flights of Stairs Climbed',
        fontSize: 20,
        fontColor: '#BDBDBD'
      }
    }
  })

  stepGoalChart = new Chart(stepGoal, {
    type: 'doughnut',
    data: {
      labels: ['Step Progress', 'Steps Remaining'],
      datasets: [
        {
          data: [stepProgress, stepsRemaining],
          backgroundColor: ['rgb(225,150,50)', 'rgb(235,202,152)'],
          label: 'Steps'
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        labels: {
          fontColor: '#BDBDBD'
        }
      }
    }
  })

}
