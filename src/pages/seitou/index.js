import React from "react"
import { Link,graphql } from 'gatsby'
import Layout from "../../components/layout"
import SEO from "../../components/seo"

import { HorizontalBar,Pie } from 'react-chartjs-2';
// import ChartDataLabels from 'chartjs-plugin-datalabels';


class SeitouIndex extends React.Component  {

  constructor(props){
    super(props)
    this.state = {
        chartData:{
          labels: [],
          datasets:[
              {
                  label:'Syushi',
                    data:[],
                    backgroundColor:[
                      'rgba(255, 99, 132, 0.6)',
                      'rgba(54, 162, 235, 0.6)',
                      'rgba(255, 206, 86, 0.6)',
                      'rgba(75, 192, 192, 0.6)',
                      'rgba(153, 102, 255, 0.6)',
                      'rgba(255, 159, 64, 0.6)',
                      'rgba(255, 99, 132, 0.6)'
                     ]
              }
          ]
        },
        chartData2:{
          labels: [],
          datasets:[
              {
                  label:'ShigiSuu',
                    data:[],
                    backgroundColor:[
                      'rgba(255, 99, 132, 0.6)',
                      'rgba(54, 162, 235, 0.6)',
                      'rgba(255, 206, 86, 0.6)',
                      'rgba(75, 192, 192, 0.6)',
                      'rgba(153, 102, 255, 0.6)',
                      'rgba(255, 159, 64, 0.6)',
                      'rgba(255, 99, 132, 0.6)'
                     ]
              }
          ]
        },
        chartData3:{
          labels: [],
          datasets:[
              {
                  label:'KengiSuu',
                    data:[],
                    backgroundColor:[
                      'rgba(255, 99, 132, 0.6)',
                      'rgba(54, 162, 235, 0.6)',
                      'rgba(255, 206, 86, 0.6)',
                      'rgba(75, 192, 192, 0.6)',
                      'rgba(153, 102, 255, 0.6)',
                      'rgba(255, 159, 64, 0.6)',
                      'rgba(255, 99, 132, 0.6)'
                     ]
              }
          ]
        },
        chartData4:{
          labels: [],
          datasets:[
              {
                  label:'SyugiSuu',
                    data:[],
                    backgroundColor:[
                      'rgba(255, 99, 132, 0.6)',
                      'rgba(54, 162, 235, 0.6)',
                      'rgba(255, 206, 86, 0.6)',
                      'rgba(75, 192, 192, 0.6)',
                      'rgba(153, 102, 255, 0.6)',
                      'rgba(255, 159, 64, 0.6)',
                      'rgba(255, 99, 132, 0.6)'
                     ]
              }
          ]
        },
        chartData5:{
          labels: [],
          datasets:[
              {
                  label:'SangiSuu',
                    data:[],
                    backgroundColor:[
                      'rgba(255, 99, 132, 0.6)',
                      'rgba(54, 162, 235, 0.6)',
                      'rgba(255, 206, 86, 0.6)',
                      'rgba(75, 192, 192, 0.6)',
                      'rgba(153, 102, 255, 0.6)',
                      'rgba(255, 159, 64, 0.6)',
                      'rgba(255, 99, 132, 0.6)'
                     ]
              }
          ]
        }
    }
  }

  getChartData = () => {
    const { data } = this.props
    const edges = data.s10.edges

    // 政党収入

    let seitouName = []
    let seitouName1 = []
    let incomeAmount = []

    edges.forEach(element => {
      let incomeTotal =  
      parseInt(element.node.data.s10_in_touhi) 
      + parseInt(element.node.data.s10_in_kifu) 
      + parseInt(element.node.data.s10_in_jigyou) 
      + parseInt(element.node.data.s10_in_honshibu) 
      + parseInt(element.node.data.s10_in_seitoukoufu) 
      + parseInt(element.node.data.s10_in_other)

      incomeAmount.push(incomeTotal)
      seitouName.push(element.node.data.s10_seitou_name)
      seitouName1.push(element.node.data.s10_seitou_name)
    }
    )

    seitouName1.push("Other")
    

    // 市議会議員数
    let ShigiSuu = []
    let shigiSeitouTotal = 0

    edges.forEach(element => {
      ShigiSuu.push(element.node.data.s10_shigi_ttl)
      shigiSeitouTotal = parseInt(shigiSeitouTotal) + parseInt(element.node.data.s10_shigi_ttl)
    })

    let ShigiOther = 29839 - shigiSeitouTotal

    ShigiSuu.push(String(ShigiOther))

   // 県議会議員数
   let KengiSuu = []
   let kengiSeitouTotal = 0

   edges.forEach(element => {
    KengiSuu.push(element.node.data.s10_kengi_ttl)
    kengiSeitouTotal = parseInt(kengiSeitouTotal) + parseInt(element.node.data.s10_kengi_ttl)
  })

  let KengiOther = 2609 - kengiSeitouTotal

  KengiSuu.push(String(KengiOther))

  // 衆議院議員数

  let SyugiSuu = []
  let SyugiSeitouTotal = 0

  edges.forEach(element => {
   let SyuTotal = parseInt(element.node.data.s10_syu_hirei)+parseInt(element.node.data.s10_syu_shou)
   SyugiSuu.push(SyuTotal)
   SyugiSeitouTotal = parseInt(SyugiSeitouTotal) + parseInt(SyuTotal)
 })

 let SyugiOther = 465 - SyugiSeitouTotal
 SyugiSuu.push(String(SyugiOther))


  //　参議院議員数
  let SangiSuu = []
  let SangiSeitouTotal = 0

  edges.forEach(element => {
   let SanTotal = parseInt(element.node.data.s10_san_hirei)+parseInt(element.node.data.s10_san_shou)
   SangiSuu.push(SanTotal)
   SangiSeitouTotal = parseInt(SangiSeitouTotal) + parseInt(SanTotal)
  })

  let SangiOther = 248 - SangiSeitouTotal
  SangiSuu.push(String(SangiOther))


    this.setState({
      chartData:{
        labels: seitouName,
        datasets:[
            {
                label:'政党収入合計',
                  data:incomeAmount,
                  backgroundColor:[
                      'rgba(255, 99, 132, 0.6)',
                      'rgba(54, 162, 235, 0.6)',
                      'rgba(255, 206, 86, 0.6)',
                      'rgba(75, 192, 192, 0.6)',
                      'rgba(153, 102, 255, 0.6)',
                      'rgba(255, 159, 64, 0.6)',
                      'rgba(255, 99, 132, 0.6)'
                  ]
            }
        ]
      },
      chartData2:{
        labels: seitouName1,
        datasets:[
            {
                label:'ShigiSuu',
                  data:ShigiSuu,
                  backgroundColor:[
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                   ]
            }
        ]
      },
      chartData3:{
        labels: seitouName1,
        datasets:[
            {
                label:'ShigiSuu',
                  data:KengiSuu,
                  backgroundColor:[
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                   ]
            }
        ]
      },
      chartData4:{
        labels: seitouName1,
        datasets:[
            {
                label:'ShigiSuu',
                  data:SyugiSuu,
                  backgroundColor:[
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                   ]
            }
        ]
      },
      chartData5:{
        labels: seitouName1,
        datasets:[
            {
                label:'ShigiSuu',
                  data:SangiSuu,
                  backgroundColor:[
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                   ]
            }
        ]
      },

    })
  }


  componentDidMount(){
    this.getChartData()
  }

  render(){

   const { chartData,chartData2,chartData3,chartData4,chartData5 } = this.state
   const s10 = this.props.data.s10

    return (
      <Layout>
        <SEO title="国政政党情報一覧" />
        <h1 className="my-4">国政政党情報一覧</h1>
        <h2>政党収入比較</h2>
        <div className="mx-8 mt-2 sm:px-8 text-xs">平成３０年分政治資金収支報告の概要（総務省）をもとに作成。<br />れいわ新選組とNHKから国民を守る党のデータは、平成３１年分の資料が公開後データ更新予定です。</div>

        <div className="relative h-64 w-9/10 mx-auto my-4">
          <HorizontalBar
          data={chartData}
          options={{
              title:{
                display:true,
                text:`政党の収入比較`,
                fontSize:18
              },
              legend:{
                display:false,
                position:'bottom',
                labels:{
                  boxWidth:15,
                  padding:5
                }
              },
              responsive: true,
              maintainAspectRatio: false
            }}
            className="mb-8"
          />


        </div>

        <h2 className="mt-10">政党別議員割合</h2>
        <div className="flex flex-wrap my-8">
          <div className="relative h-64 w-10/10 mx-auto my-14">
          <Pie data={chartData2}
            options={{
                title:{
                  display:true,
                  text:`市議会議員政党別割合`,
                  fontSize:18
                },
                legend:{
                  display:false,
                  position:'top'
                },
                plugins: {
                  // Change options for ALL labels of THIS CHART
                  datalabels: {
                      color: '#777',
                      display:"auto"
                 }},
                responsive: true,
                maintainAspectRatio: false
              }}
          />
        </div>

        <div className="relative h-64 w-10/10 mx-auto my-14">
        <Pie data={chartData3}
          options={{
              title:{
                display:true,
                text:`県議会議員政党別割合`,
                fontSize:18
              },
              legend:{
                display:false,
                position:'top'
              },
              plugins: {
                // Change options for ALL labels of THIS CHART
                datalabels: {
                    color: '#777',
                    display:"auto"
               }},
              responsive: true,
              maintainAspectRatio: false
            }}
        />
      </div>
      </div>

      <div className="flex flex-wrap my-12">

      <div className="relative h-64 w-10/10 mx-auto my-14">
      <Pie data={chartData4}
        options={{
            title:{
              display:true,
              text:`衆議院議員政党別割合`,
              fontSize:18
            },
            legend:{
              display:false,
              position:'top'
            },
            plugins: {
              // Change options for ALL labels of THIS CHART
              datalabels: {
                  color: '#777',
                  display:"auto"
             }},
            responsive: true,
            maintainAspectRatio: false
          }}
      />
    </div>

    <div className="relative h-64 w-10/10 mx-auto my-14">
    <Pie data={chartData5}
      options={{
          title:{
            display:true,
            text:`参議院議員政党別割合`,
            fontSize:18
          },
          legend:{
            display:false,
            position:'top'
          },
          plugins: {
            // Change options for ALL labels of THIS CHART
            datalabels: {
                color: '#777',
                display:"auto"
           }},
          responsive: true,
          maintainAspectRatio: false
        }}
    />
  </div>
      

        
        </div>

        <div className="my-4 px-4 max-w-6xl mx-auto">
        <h2 className="my-4">各政党データへのリンク</h2>
        <div className="flex flex-wrap">
          {s10.edges.map(({ node }) => (
            <div key={node.data.s10_code}
              className="mx-4 my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
                <Link to={`/seitou/${node.data.s10_code}`} className="text-white">
                  {node.data.s10_seitou_name}</Link>
            </div>
          ))}
        </div>
      </div>
      
      </Layout>   
      )
    }
  }

export default SeitouIndex

export const query = graphql`

query{
        s10:allAirtable(
          filter:  { table: {eq: "s10_seitou"}}

          sort: {fields: data___s10_in_total, order: DESC} 

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
                s10_in_total
              }
            }
          }
        }
  }
`
