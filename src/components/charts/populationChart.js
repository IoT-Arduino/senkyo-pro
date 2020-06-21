import React, { Component } from "react"
import { HorizontalBar } from "react-chartjs-2"

export default class incomeChart extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
          chartData: {
            labels: [],
            datasets: [
              {
                label: "Population",
                data: [],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.6)",
                  "rgba(54, 162, 235, 0.6)",
                  "rgba(255, 206, 86, 0.6)",
                  "rgba(75, 192, 192, 0.6)",
                  "rgba(153, 102, 255, 0.6)",
                  "rgba(255, 159, 64, 0.6)",
                  "rgba(255, 99, 132, 0.6)",
                ],
              },
            ],
          },
        }
      }

  getChartData = () => {
 
    let Labels = []
    let population = []

    Labels.push("90代以上")
    Labels.push("80代")
    Labels.push("70代")
    Labels.push("60代")
    Labels.push("50代")
    Labels.push("40代")
    Labels.push("30代")
    Labels.push("20代")
    Labels.push("10代")

    const populationData = this.props.population
    population = populationData

    this.setState({
      chartData: {
        labels: Labels,
        datasets: [
          {
            label: "Population",
            data: population,
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
            ],
          },
        ],
      },
    })
  }

  componentDidMount() {
    this.getChartData()
  }

  render(props) {
    const { chartData } = this.state
    const title = this.props.title
    const chartTitle = `${title}の年代別有権者数`

    return (
        <HorizontalBar
        data={chartData}
        options={{
          title: {
            display: true,
            text: chartTitle ,
            fontSize: 18,
          },
          legend: {
            display: false,
            position: "top",
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  callback: function(label, index, labels) {
                    return label
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  },
                },
              },
            ],
          },
          plugins: {
            datalabels: {
              display: true,
              color: "#777",
              anchor: "end",
              align: "start",
              offset: -50,
              font: {
                weight: "bold",
                size: "11",
              },
              formatter: value => {
                return value
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              },
            },
          },
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
      )
  }
}
