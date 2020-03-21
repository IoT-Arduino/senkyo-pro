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
            label: "Syushi",
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
    const { data } = this.props
    const edges = data.edges

    // 政党収入

    let seitouName = []
    let incomeAmount = []

    edges.forEach(element => {
      let incomeTotal =
        parseInt(element.node.data.s10_in_touhi) +
        parseInt(element.node.data.s10_in_kifu) +
        parseInt(element.node.data.s10_in_jigyou) +
        parseInt(element.node.data.s10_in_honshibu) +
        parseInt(element.node.data.s10_in_seitoukoufu) +
        parseInt(element.node.data.s10_in_other)

      incomeAmount.push(incomeTotal)
      seitouName.push(element.node.data.s10_seitou_name)
    })

    this.setState({
      chartData: {
        labels: seitouName,
        datasets: [
          {
            label: "政党収入合計",
            data: incomeAmount,
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
    })
  }

  componentDidMount() {
    this.getChartData()
  }

  render() {
    const { chartData } = this.state
    const s10 = this.props.data

    return (

        <HorizontalBar
          data={chartData}
          options={{
            title: {
              display: true,
              text: `政党の収入比較`,
              fontSize: 18,
            },
            legend: {
              display: false,
              position: "bottom",
              labels: {
                boxWidth: 15,
                padding: 5,
              },
            },
            responsive: true,
            maintainAspectRatio: false,
          }}
        //   className="mb-8"
        />
      )
  }
}
