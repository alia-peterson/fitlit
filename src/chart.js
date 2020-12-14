// Our labels along the x-axis
const weekdays = ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday']
// For drawing the lines
let ounces = []
let hours = []
let quality = []
let steps = []
let flights = []
let minutes = []

const hydration = document.querySelector("#graph--hydration")
const sleep = document.querySelector("#graph--sleep")
const stepsAndMinutes = document.querySelector("#graph--steps")

function createGraphs() {
  const hydrationChart = new Chart(hydration, {
    type: 'line',
    data: {
      labels: weekdays,
      datasets: [
        {
          data: ounces,
          label: 'Ounces',
          borderColor: "#3e95cd",
          fill: true,
          defaultFontSize: 12
        }
      ]
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
          backgroundColor: "#3e95cd",
          fill: false
        },
        {
          data: quality,
          label: 'Quality',
          borderColor: "#3e95cd",
          fill: false
        }
      ]
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
          fill: false
        },
        {
          data: minutes,
          label: 'Minutes',
          borderColor: "#3e95cd",
          fill: false
        }
      ]
    }
  })
}
