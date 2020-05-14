import React, { Component } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Pie } from "react-chartjs-2"
import ChartDataLabels from 'chartjs-plugin-datalabels';

class senkyo10Template extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Giinsuu",
            data: [],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
            ],
          },
        ],
      },
      chartData2: {
        labels: [],
        datasets: [
          {
            label: "Giinsuu",
            data: [],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
            ],
          },
        ],
      },
      chartData3: {
        labels: [],
        datasets: [
          {
            label: "Giinsuu",
            data: [],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
            ],
          },
        ],
      },
      chartData4: {
        labels: [],
        datasets: [
          {
            label: "Giinsuu",
            data: [],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
            ],
          },
        ],
      },
      chartData5: {
        labels: [],
        datasets: [
          {
            label: "Income",
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
            datalabels: { color: "#FFCE56" },
          },
        ],
      },
      chartData6: {
        labels: [],
        datasets: [
          {
            label: "Expense",
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
            datalabels: { color: "#FFCE56" },
          },
        ],
      }
    }
  }

  getChartData = () => {
    const { data } = this.props
    const edges = data.allAirtable.edges[0].node.data
    const syugiTotal =
      parseInt(edges.s10_syu_shou, 10) + parseInt(edges.s10_syu_hirei, 10)
    const sangiTotal =
      parseInt(edges.s10_san_shou, 10) + parseInt(edges.s10_san_hirei, 10)

    const shigiJapanTotal = 29839
    const kengiJapanTotal = 2609
    const SyugiJapanTotal = 465
    const SangiJapanTotal = 248

    const shigiOther = shigiJapanTotal - edges.s10_shigi_ttl
    const kengiOther = kengiJapanTotal - edges.s10_kengi_ttl
    const syugiOther = SyugiJapanTotal - parseInt(syugiTotal)
    const sangiOther = SangiJapanTotal - parseInt(sangiTotal)

    let seitouName = []
    let shigiSuu = []
    let kengiSuu = []
    let syugiSuu = []
    let sangiSuu = []

    seitouName.push(edges.s10_seitou_name)
    seitouName.push("その他")

    shigiSuu.push(parseInt(edges.s10_shigi_ttl))
    shigiSuu.push(parseInt(shigiOther))

    kengiSuu.push(parseInt(edges.s10_kengi_ttl))
    kengiSuu.push(parseInt(kengiOther))

    syugiSuu.push(parseInt(syugiTotal))
    syugiSuu.push(parseInt(syugiOther))

    sangiSuu.push(parseInt(sangiTotal))
    sangiSuu.push(parseInt(sangiOther))

    let incomeLabel = []
    let incomeAmount = []

    incomeLabel.push("党費")
    incomeLabel.push("寄付収入")
    incomeLabel.push("事業収入")
    incomeLabel.push("本部支部交付金収入")
    incomeLabel.push("政党交付金収入")
    incomeLabel.push("その他")

    incomeAmount.push(parseInt(edges.s10_in_touhi))
    incomeAmount.push(parseInt(edges.s10_in_kifu))
    incomeAmount.push(parseInt(edges.s10_in_jigyou))
    incomeAmount.push(parseInt(edges.s10_in_honshibu))
    incomeAmount.push(parseInt(edges.s10_in_seitoukoufu))
    incomeAmount.push(parseInt(edges.s10_in_other))

    let expenseLabel = []
    let expenseAmount = []

    expenseLabel.push("人件費")
    expenseLabel.push("光熱費・備品費")
    expenseLabel.push("事務所費")
    expenseLabel.push("組織活動費")
    expenseLabel.push("選挙関係費")
    expenseLabel.push("機関紙費")
    expenseLabel.push("宣伝費")
    expenseLabel.push("その他支出")

    expenseAmount.push(parseInt(edges.s10_out_jinkenhi))
    expenseAmount.push(parseInt(edges.s10_out_other))
    expenseAmount.push(parseInt(edges.s10_out_jimusho))
    expenseAmount.push(parseInt(edges.s10_out_soshiki))
    expenseAmount.push(parseInt(edges.s10_out_senkyo))
    expenseAmount.push(parseInt(edges.s10_out_kikanshi))
    expenseAmount.push(parseInt(edges.s10_out_senden))
    expenseAmount.push(parseInt(edges.s10_out_other_2))

    this.setState({
      chartData: {
        labels: seitouName,
        datasets: [
          {
            label: "Shigisuu",
            data: shigiSuu,
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
            ],
          },
        ],
      },
      chartData2: {
        labels: seitouName,
        datasets: [
          {
            label: "Kenggisuu",
            data: kengiSuu,
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
            ],
          },
        ],
      },
      chartData3: {
        labels: seitouName,
        datasets: [
          {
            label: "Syugisuu",
            data: syugiSuu,
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
            ],
          },
        ],
      },
      chartData4: {
        labels: seitouName,
        datasets: [
          {
            label: "sangisuu",
            data: sangiSuu,
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
            ],
          },
        ],
      },
      chartData5: {
        labels: incomeLabel,
        datasets: [
          {
            label: "sangisuu",
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
            datalabels: { color: "#777" },
          },
        ],
      },
      chartData6: {
        labels: expenseLabel,
        datasets: [
          {
            label: "sangisuu",
            data: expenseAmount,
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
            datalabels: { color: "#777" },
          },
        ],
      },
      options:{
        title: {
          display: true,
          text: `${edges.s10_seitou_name}の市区会議員シェア`,
          fontSize: 18,
        },
        legend: {
          display: false,
          position: "top",
        },
        plugins: {
          datalabels: {
            color: "#777",
            display: true,
            anchor: "end",
            align: "start",
            offset: 10,
            font: {
              weight: "bold",
              size: "25",
            },
            formatter: (value,context) => {
              //　パーセント表示にする計算式
              const devided =((value / shigiJapanTotal) * 100).toFixed(1)
 
              if (context.dataIndex == 0) {
                return devided + " %"
              } else {
                return ""
              }
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
      options2:{
        title: {
          display: true,
          text: `${edges.s10_seitou_name}の県議会議員シェア`,
          fontSize: 18,
        },
        legend: {
          display: false,
          position: "top",
        },
        plugins: {
          datalabels: {
            color: "#777",
            display: true,
            anchor: "end",
            align: "start",
            offset: 10,
            font: {
              weight: "bold",
              size: "25",
            },
            formatter: (value,context) => {
              //　パーセント表示にする計算式
              const devided =((value / kengiJapanTotal) * 100).toFixed(1)
 
              if (context.dataIndex == 0) {
                return devided + " %"
              } else {
                return ""
              }
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
      options3:{
        title: {
          display: true,
          text: `${edges.s10_seitou_name}の衆議院議員シェア`,
          fontSize: 18,
        },
        legend: {
          display: false,
          position: "top",
        },
        plugins: {
          datalabels: {
            color: "#777",
            display: true,
            anchor: "end",
            align: "start",
            offset: 10,
            font: {
              weight: "bold",
              size: "25",
            },
            formatter: (value,context) => {
              //　パーセント表示にする計算式
              const devided =((value / SyugiJapanTotal) * 100).toFixed(1)
 
              if (context.dataIndex == 0) {
                return devided + " %"
              } else {
                return ""
              }
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
      options4:{
        title: {
          display: true,
          text: `${edges.s10_seitou_name}の参議院議員シェア`,
          fontSize: 18,
        },
        legend: {
          display: false,
          position: "top",
        },
        plugins: {
          datalabels: {
            color: "#777",
            display: true,
            anchor: "end",
            align: "start",
            offset: 10,
            font: {
              weight: "bold",
              size: "25",
            },
            formatter: (value,context) => {
              //　パーセント表示にする計算式
              const devided =((value / SangiJapanTotal) * 100).toFixed(1)
 
              if (context.dataIndex == 0) {
                return devided + " %"
              } else {
                return ""
              }
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      }
    })
  }

  componentDidMount() {
    this.getChartData()
  }

  render() {
    const { data } = this.props
    const {
      chartData,
      chartData2,
      chartData3,
      chartData4,
      chartData5,
      chartData6,
      options,
      options2,
      options3,
      options4
    } = this.state
    const edges = data.allAirtable.edges[0].node.data

    // Giin Total
    const syuTotal =
      parseInt(edges.s10_syu_shou, 10) + parseInt(edges.s10_syu_hirei, 10)
    const sanTotal =
      parseInt(edges.s10_san_shou, 10) + parseInt(edges.s10_san_hirei, 10)

    // in
    const cma_s10_in_touhi = String(edges.s10_in_touhi).replace(
      /(\d)(?=(\d\d\d)+$)/g,
      "$1,"
    )
    const cma_s10_in_kifu = String(edges.s10_in_kifu).replace(
      /(\d)(?=(\d\d\d)+$)/g,
      "$1,"
    )
    const cma_s10_in_jigyou = String(edges.s10_in_jigyou).replace(
      /(\d)(?=(\d\d\d)+$)/g,
      "$1,"
    )
    const cma_s10_in_honshibu = String(edges.s10_in_honshibu).replace(
      /(\d)(?=(\d\d\d)+$)/g,
      "$1,"
    )
    const cma_s10_in_seitoukoufu = String(edges.s10_in_seitoukoufu).replace(
      /(\d)(?=(\d\d\d)+$)/g,
      "$1,"
    )
    const cma_s10_in_other = String(edges.s10_in_other).replace(
      /(\d)(?=(\d\d\d)+$)/g,
      "$1,"
    )

    //out
    const cma_s10_out_jinkenhi = String(edges.s10_out_jinkenhi).replace(
      /(\d)(?=(\d\d\d)+$)/g,
      "$1,"
    )
    const cma_s10_out_other = String(edges.s10_out_other).replace(
      /(\d)(?=(\d\d\d)+$)/g,
      "$1,"
    )
    const cma_s10_out_jimusho = String(edges.s10_out_jimusho).replace(
      /(\d)(?=(\d\d\d)+$)/g,
      "$1,"
    )
    const cma_s10_out_soshiki = String(edges.s10_out_soshiki).replace(
      /(\d)(?=(\d\d\d)+$)/g,
      "$1,"
    )
    const cma_s10_out_senkyo = String(edges.s10_out_senkyo).replace(
      /(\d)(?=(\d\d\d)+$)/g,
      "$1,"
    )
    const cma_s10_out_kikanshi = String(edges.s10_out_kikanshi).replace(
      /(\d)(?=(\d\d\d)+$)/g,
      "$1,"
    )
    const cma_s10_out_senden = String(edges.s10_out_senden).replace(
      /(\d)(?=(\d\d\d)+$)/g,
      "$1,"
    )
    const cma_s10_out_other_2 = String(edges.s10_out_other_2).replace(
      /(\d)(?=(\d\d\d)+$)/g,
      "$1,"
    )

    //total
    const inTotal =
      edges.s10_in_touhi +
      edges.s10_in_kifu +
      edges.s10_in_jigyou +
      edges.s10_in_honshibu +
      edges.s10_in_seitoukoufu +
      edges.s10_in_other

    const cma_inTotal = String(inTotal).replace(/(\d)(?=(\d\d\d)+$)/g, "$1,")

    const outTotal =
      edges.s10_out_jinkenhi +
      edges.s10_out_other +
      edges.s10_out_jimusho +
      edges.s10_out_soshiki +
      edges.s10_out_senkyo +
      edges.s10_out_kikanshi +
      edges.s10_out_senden +
      edges.s10_out_other_2

    const cma_outTotal = String(outTotal).replace(/(\d)(?=(\d\d\d)+$)/g, "$1,")

    const s10 = this.props.data.s10

    return (
      <Layout>
      　<SEO title={edges.s10_seitou_name+"の議員数シェアと収支データ"} />
        <h1>{edges.s10_seitou_name}のデータ</h1>

        <div className="mt-4">
          <h2 className="mb-4">政党議員数</h2>
          <table className="border-2 mt-2 mx-auto mb-8">
            <tbody>
              <tr>
                <td className="px-2 bg-gray-200 border-b-2">
                  市区町村議会議員数
                </td>
                <td className="text-right w-24 px-2 border-b-2">
                  {edges.s10_shigi_ttl}人
                </td>
              </tr>
              <tr>
                <td className="px-2 bg-gray-200 border-b-2">県議会議員数</td>
                <td className="text-right w-24 px-2 border-b-2">
                  {edges.s10_kengi_ttl}人
                </td>
              </tr>
              <tr>
                <td className="px-2 bg-gray-200 border-b-2">
                  衆議院議員数（小選挙区）
                </td>
                <td className="text-right w-24 px-2 border-b-2">
                  {edges.s10_syu_shou}人
                </td>
              </tr>
              <tr>
                <td className="px-2 bg-gray-200 border-b-2">
                  衆議院議員数（比例区）
                </td>
                <td className="text-right w-24 px-2 border-b-2">
                  {edges.s10_syu_hirei}人
                </td>
              </tr>
              <tr>
                <td className="px-2 bg-gray-200 border-b-2">
                  衆議院議員数（合計）
                </td>
                <td className="text-right w-24 px-2 border-b-2">
                  {syuTotal}人
                </td>
              </tr>
              <tr>
                <td className="px-2 bg-gray-200 border-b-2">
                  参議院議員数（小選挙区）
                </td>
                <td className="text-right w-24 px-2 border-b-2">
                  {edges.s10_san_shou}人
                </td>
              </tr>
              <tr>
                <td className="px-2 bg-gray-200 border-b-2">
                  参議院議員数（比例区）
                </td>
                <td className="text-right w-24 px-2 border-b-2">
                  {edges.s10_san_hirei}人
                </td>
              </tr>
              <tr>
                <td className="px-2 bg-gray-200 border-b-2">
                  参議院議員数（合計）
                </td>
                <td className="text-right w-24 px-2 border-b-2">
                  {sanTotal}人
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="my-6">議員数シェア（円グラフ）</h2>
        <div className="flex flex-wrap flex-start my-8">
          <div className="relative h-64 w-9/10 mx-auto my-14">
            <Pie
              data={chartData}
              options={options}
            />
          </div>

          <div className="relative h-64 w-9/10 mx-auto my-14">
            <Pie
              data={chartData2}
              options={options2}
            />
          </div>
        </div>

        <div className="flex flex-wrap flex-start my-8">
          <div className="relative h-64 w-9/10 mx-auto my-14">
            <Pie
              data={chartData3}
              options={options3}
            />
          </div>

          <div className="relative h-64 w-9/10 mx-auto my-14">
            <Pie
              data={chartData4}
              options={options4}
            />
          </div>
        </div>

        <div>
          {edges.s10_code === "seitou180" || edges.s10_code === "seitou170" ? (
            <div className="mt-8 mb-8">
              <h2>政党の財政(収入と支出)</h2>
              <div className="my-4 px-4">
                {edges.s10_seitou_name}
                の政党収支データは平成３１年分政治資金収支報告の概要の公開後データ更新予定です。
              </div>
            </div>
          ) : (
            <div className="mt-8 mb-8">
              <h2>政党の財政(収入と支出)</h2>

              <div className="relative h-64 w-9/10 mx-auto my-14">
                <Pie
                  data={chartData5}
                  options={{
                    title: {
                      display: true,
                      text: `${edges.s10_seitou_name}の政党収入(項目別）`,
                      fontSize: 18,
                    },
                    legend: {
                      display: true,
                      position: "bottom",
                      labels: {
                        boxWidth: 15,
                        padding: 5,
                      },
                    },
                    plugins: {
                      datalabels: {
                        color: "#36A2EB",
                        display: "auto",
                      },
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              </div>

              <table className="border-2 my-8 mx-auto">
                <tbody>
                  <tr>
                    <td className="px-2 bg-gray-200 border-b-2">党費</td>
                    <td className="text-right w-24 px-2 border-b-2">
                      {cma_s10_in_touhi}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 bg-gray-200 border-b-2">寄付収入</td>
                    <td className="text-right w-24 px-2 border-b-2">
                      {cma_s10_in_kifu}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 bg-gray-200 border-b-2">事業収入</td>
                    <td className="text-right w-24 px-2 border-b-2">
                      {cma_s10_in_jigyou}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 bg-gray-200 border-b-2">
                      本部支部交付金収入
                    </td>
                    <td className="text-right w-24 px-2 border-b-2">
                      {cma_s10_in_honshibu}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 bg-gray-200 border-b-2">
                      政党交付金収入
                    </td>
                    <td className="text-right w-24 px-2 border-b-2">
                      {cma_s10_in_seitoukoufu}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 bg-gray-200 border-b-2">その他収入</td>
                    <td className="text-right w-24 px-2 border-b-2">
                      {cma_s10_in_other}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 bg-gray-400 border-b-2">政党収入合計（千円）</td>
                    <td className="text-right w-24 px-2 border-b-2 bg-gray-400">
                      {" "}
                      {cma_inTotal}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="relative h-64 w-9/10 mx-auto my-14">
                <Pie
                  data={chartData6}
                  options={{
                    title: {
                      display: true,
                      text: `${edges.s10_seitou_name}の政党支出(項目別）`,
                      fontSize: 18,
                    },
                    legend: {
                      display: true,
                      position: "bottom",
                      labels: {
                        boxWidth: 15,
                        padding: 5,
                      },
                    },
                    plugins: {
                      // Change options for ALL labels of THIS CHART
                      datalabels: {
                        color: "#36A2EB",
                        display: "auto",
                      },
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              </div>
              <table className="border-2 my-8 mx-auto">
                <tbody>
                  <tr>
                    <td className="px-2 bg-gray-200 border-b-2">人件費</td>
                    <td className="text-right w-24 px-2 border-b-2">
                      {cma_s10_out_jinkenhi}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 bg-gray-200 border-b-2">
                      光熱費・備品費
                    </td>
                    <td className="text-right w-24 px-2 border-b-2">
                      {cma_s10_out_other}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 bg-gray-200 border-b-2">事務所費</td>
                    <td className="text-right w-24 px-2 border-b-2">
                      {cma_s10_out_jimusho}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 bg-gray-200 border-b-2">組織活動費</td>
                    <td className="text-right w-24 px-2 border-b-2">
                      {cma_s10_out_soshiki}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 bg-gray-200 border-b-2">選挙関係費</td>
                    <td className="text-right w-24 px-2 border-b-2">
                      {cma_s10_out_senkyo}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 bg-gray-200 border-b-2">機関紙費</td>
                    <td className="text-right w-24 px-2 border-b-2">
                      {cma_s10_out_kikanshi}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 bg-gray-200 border-b-2">宣伝費</td>
                    <td className="text-right w-24 px-2 border-b-2">
                      {cma_s10_out_senden}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 bg-gray-200 border-b-2">その他支出</td>
                    <td className="text-right w-24 px-2 border-b-2">
                      {cma_s10_out_other_2}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 bg-gray-400 border-b-2">
                      政党支出合計（千円）
                    </td>
                    <td className="text-right w-24 px-2 border-b-2 bg-gray-400">
                      {cma_outTotal}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-8">
          {data.allMarkdownRemark.edges.length > 0 ? (
            <h3>政党トピックス</h3>
          ) : (
            <p> </p>
          )}
        </div>

        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.fields.slug}>
            <h3>
              <Link to={`/posts/${node.fields.slug}`}>
                {node.frontmatter.title}
              </Link>
              <span style={{ color: "#bbb" }}> - {node.frontmatter.date}</span>
            </h3>
            <p>{node.excerpt}</p>
          </div>
        ))}

        <div className="my-4 max-w-6xl mx-auto">
          <h2>他の国政政党データ</h2>
          <div className="flex flex-wrap">
            {s10.edges.map(({ node }) => (
              <div
                key={node.data.s10_code}
                className="mx-4 my-2 bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                <Link
                  to={`/seitou/${node.data.s10_code}`}
                  className="text-white"
                >
                  {node.data.s10_seitou_name}
                </Link>
              </div>
            ))}
          </div>

          <div className="w-3/5 mx-4 my-2 bg-white-500 hover:bg-blue-200 text-center font-bold py-2 px-4 rounded-full border-blue border-2">
            <Link to={`/seitou`} className="text-gray">
              国政政党情報一覧比較
            </Link>
          </div>
        </div>
      </Layout>
    )
  }
}

export default senkyo10Template

export const query = graphql`
  query($slug: String) {
    allAirtable(
      filter: { data: { s10_code: { eq: $slug } }, table: { eq: "s10_seitou" } }
      sort: { fields: data___s10_code, order: ASC }
    ) {
      edges {
        node {
          data {
            s10_code
            s10_kengi_ttl
            s10_san_hirei
            s10_san_shou
            s10_seitou_name
            s10_shigi_ttl
            s10_syu_hirei
            s10_syu_shou
            s10_out_soshiki
            s10_out_senkyo
            s10_out_senden
            s10_out_other_2
            s10_out_other
            s10_out_kikanshi
            s10_out_jinkenhi
            s10_out_jimusho
            s10_in_touhi
            s10_in_seitoukoufu
            s10_in_other
            s10_in_kifu
            s10_in_jigyou
            s10_in_honshibu
          }
        }
      }
    }

    s10: allAirtable(
      filter: { table: { eq: "s10_seitou" }, data: { s10_code: { ne: $slug } } }
      sort: { fields: data___s10_code, order: ASC }
    ) {
      edges {
        node {
          data {
            s10_code
            s10_seitou_name
          }
        }
      }
    }

    allMarkdownRemark(filter: { frontmatter: { senkyo: { eq: $slug } } }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date
            category
            senkyo
          }
        }
      }
    }
  }
`
