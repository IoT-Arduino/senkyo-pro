import React,{Component} from "react"
import { Link,graphql } from 'gatsby'
import Layout from '../components/layout'
import { Pie } from 'react-chartjs-2';

class senkyo10Template extends Component  {

  constructor(props){
    super(props)
    this.state = {
        chartData:{
          labels: [],
          datasets:[
              {
                  label:'Giinsuu',
                    data:[],
                    backgroundColor:[
                      'rgba(255, 99, 132, 0.6)',
                      'rgba(54, 162, 235, 0.6)'
                     ]
              }
          ]
        },
        chartData2:{
          labels: [],
          datasets:[
              {
                  label:'Giinsuu',
                    data:[],
                    backgroundColor:[
                      'rgba(255, 99, 132, 0.6)',
                      'rgba(54, 162, 235, 0.6)'
                     ]
              }
          ]
        },
        chartData3:{
          labels: [],
          datasets:[
              {
                  label:'Giinsuu',
                    data:[],
                    backgroundColor:[
                      'rgba(255, 99, 132, 0.6)',
                      'rgba(54, 162, 235, 0.6)'
                     ]
              }
          ]
        },
        chartData4:{
          labels: [],
          datasets:[
              {
                  label:'Giinsuu',
                    data:[],
                    backgroundColor:[
                      'rgba(255, 99, 132, 0.6)',
                      'rgba(54, 162, 235, 0.6)'
                     ]
              }
          ]
        }
    }
  }

  getChartData = () => {
    const { data } = this.props
    const edges = data.allAirtable.edges[0].node.data
    const syugiTotal = parseInt(edges.s10_syu_shou,10) + parseInt(edges.s10_syu_hirei,10)
    const sangiTotal = parseInt(edges.s10_san_shou,10) + parseInt(edges.s10_san_hirei,10)

    const shigiOther = 29839 - edges.s10_shigi_ttl
    const kengiOther = 2609 - edges.s10_kengi_ttl
    const syugiOther = 465 - parseInt(syugiTotal)
    const sangiOther = 245 - parseInt(sangiTotal)

    console.log(syugiOther)

    let seitouName = []
    let shigiSuu = []
    let kengiSuu = []
    let syugiSuu = []
    let sangiSuu = []

    seitouName.push("自民党")
    seitouName.push("その他")

    shigiSuu.push(parseInt(edges.s10_shigi_ttl))
    shigiSuu.push(parseInt(shigiOther))

    kengiSuu.push(parseInt(edges.s10_kengi_ttl))
    kengiSuu.push(parseInt(kengiOther))

    syugiSuu.push(parseInt(syugiTotal))
    syugiSuu.push(parseInt(syugiOther))

    sangiSuu.push(parseInt(sangiTotal))
    sangiSuu.push(parseInt(sangiOther))

    this.setState({
      chartData:{
        labels: seitouName,
        datasets:[
            {
                label:'Shigisuu',
                  data:shigiSuu,
                  backgroundColor:[
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)'
                  ]
            }
        ]
      },
      chartData2:{
        labels: seitouName,
        datasets:[
            {
                label:'Kenggisuu',
                  data:kengiSuu,
                  backgroundColor:[
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)'
                  ]
            }
        ]
      },
      chartData3:{
        labels: seitouName,
        datasets:[
            {
                label:'Syugisuu',
                  data:syugiSuu,
                  backgroundColor:[
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)'
                  ]
            }
        ]
      },
      chartData4:{
        labels: seitouName,
        datasets:[
            {
                label:'sangisuu',
                  data:sangiSuu,
                  backgroundColor:[
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)'
                  ]
            }
        ]
      }
    })


  }
  
  componentDidMount(){
    this.getChartData()
  }

  render(){
    const { data,pageContext } = this.props
    const { chartData,chartData2,chartData3,chartData4 } = this.state
    const edges = data.allAirtable.edges[0].node.data

    // Giin Total
    const syuTotal = parseInt(edges.s10_syu_shou,10) + parseInt(edges.s10_syu_hirei,10)
    const sanTotal = parseInt(edges.s10_san_shou,10) + parseInt(edges.s10_san_hirei,10)

    // in
    const cma_s10_in_touhi = String(edges.s10_in_touhi).replace(/(\d)(?=(\d\d\d)+$)/g, '$1,')
    const cma_s10_in_kifu = String(edges.s10_in_kifu).replace(/(\d)(?=(\d\d\d)+$)/g, '$1,')
    const cma_s10_in_jigyou = String(edges.s10_in_jigyou).replace(/(\d)(?=(\d\d\d)+$)/g, '$1,')
    const cma_s10_in_honshibu = String(edges.s10_in_honshibu).replace(/(\d)(?=(\d\d\d)+$)/g, '$1,')
    const cma_s10_in_seitoukoufu = String(edges.s10_in_seitoukoufu).replace(/(\d)(?=(\d\d\d)+$)/g, '$1,')
    const cma_s10_in_other = String(edges.s10_in_other).replace(/(\d)(?=(\d\d\d)+$)/g, '$1,')

    //out
    const cma_s10_out_jinkenhi = String(edges.s10_out_jinkenhi).replace(/(\d)(?=(\d\d\d)+$)/g, '$1,')
    const cma_s10_out_other = String(edges.s10_out_other).replace(/(\d)(?=(\d\d\d)+$)/g, '$1,')
    const cma_s10_out_jimusho = String(edges.s10_out_jimusho).replace(/(\d)(?=(\d\d\d)+$)/g, '$1,')
    const cma_s10_out_soshiki = String(edges.s10_out_soshiki).replace(/(\d)(?=(\d\d\d)+$)/g, '$1,')
    const cma_s10_out_senkyo = String(edges.s10_out_senkyo).replace(/(\d)(?=(\d\d\d)+$)/g, '$1,')
    const cma_s10_out_kikanshi = String(edges.s10_out_kikanshi).replace(/(\d)(?=(\d\d\d)+$)/g, '$1,')
    const cma_s10_out_senden = String(edges.s10_out_senden).replace(/(\d)(?=(\d\d\d)+$)/g, '$1,')
    const cma_s10_out_other_2 = String(edges.s10_out_other_2).replace(/(\d)(?=(\d\d\d)+$)/g, '$1,')

    //total
    const inTotal = edges.s10_in_touhi + edges.s10_in_kifu + edges.s10_in_jigyou + edges.s10_in_honshibu + edges.s10_in_seitoukoufu + edges.s10_in_other

    const cma_inTotal = String(inTotal).replace(/(\d)(?=(\d\d\d)+$)/g, '$1,')

    const outTotal = edges.s10_out_jinkenhi + edges.s10_out_other + edges.s10_out_jimusho + edges.s10_out_soshiki + edges.s10_out_senkyo + edges.s10_out_kikanshi + edges.s10_out_senden + edges.s10_out_other_2

    const cma_outTotal = String(outTotal).replace(/(\d)(?=(\d\d\d)+$)/g, '$1,')

    console.log(pageContext)
    console.log(chartData4)

    return (
      <Layout>

      <h2>{edges.s10_seitou_name}</h2>

      <div className="mt-4">
        <h3>政党議員数</h3>
        <table>
          <tbody>
                <tr>
                    <td>市区町村議会議員数</td>
                    <td>{edges.s10_shigi_ttl}人</td>
                </tr>
                <tr>
                    <td>県議会議員数</td>
                    <td>{edges.s10_kengi_ttl}人</td>
                </tr>
                <tr>
                    <td>衆議院議員数（小選挙区）</td>
                    <td>{edges.s10_syu_shou}人</td>
                </tr>
                <tr>
                    <td>衆議院議員数（比例区）</td>
                    <td>{edges.s10_syu_hirei}人</td>
                </tr>
                <tr>
                    <td>衆議院議員数（合計）</td>
                    <td>{syuTotal}人</td>
                </tr>
                <tr>
                    <td>参議院議員数（小選挙区）</td>
                    <td>{edges.s10_san_shou}人</td>
                </tr>
                <tr>
                    <td>参議院議員数（比例区）</td>
                    <td>{edges.s10_san_hirei}人</td>
                </tr>
                <tr>
                    <td>参議院議員数（合計）</td>
                    <td>{sanTotal}人</td>
                </tr>
            </tbody>
          </table>
      </div>

      <div>

      <h3>議員数シェア（円グラフ）</h3>

      {/* 
            <div className="relative h-64 w-9/10 mx-auto my-14">
          <Pie
            data={chartData}
            options={{
                title:{
                  display:true,
                  text:`${edges.s10_seitou_name}の市区会議員シェア`,
                  fontSize:18
                },
                legend:{
                  display:false,
                  position:'top'
                },
                responsive: true,
                maintainAspectRatio: false
              }}
          />
          <Pie
            data={chartData2}
            options={{
                title:{
                  display:true,
                  text:`${edges.s10_seitou_name}の県議会議員シェア`,
                  fontSize:18
                },
                legend:{
                  display:false,
                  position:'top'
                },
                responsive: true,
                maintainAspectRatio: false
              }}
          />
      </div>
      
      */}


      <div className="relative h-64 w-9/10 mx-auto my-14">
      <Pie data={chartData3}
        options={{
            title:{
              display:true,
              text:`${edges.s10_seitou_name}の衆議院議員シェア`,
              fontSize:18
            },
            legend:{
              display:false,
              position:'top'
            },
            responsive: true,
            maintainAspectRatio: false
          }}
      />
      <Pie
        data={chartData4}
        options={{
            title:{
              display:true,
              text:`${edges.s10_seitou_name}の参議院議員シェア`,
              fontSize:18
            },
            legend:{
              display:false,
              position:'top'
            },
            responsive: true,
            maintainAspectRatio: false
          }}
      />
      
      </div>


      </div>

      <div className="mt-4">
      <h3>政党の財政</h3>
      <h4 className="mt-2">政党収入合計{cma_inTotal}</h4>
        <table>
          <tbody>
                <tr>
                    <td>党費</td>
                    <td>{cma_s10_in_touhi}</td>
                </tr>
                <tr>
                    <td>寄付収入</td>
                    <td>{cma_s10_in_kifu}</td>
                </tr>
                    <tr>
                    <td>事業収入</td>
                    <td>{cma_s10_in_jigyou}</td>
                </tr>
                <tr>
                    <td>本部支部交付金収入</td>
                    <td>{cma_s10_in_honshibu}</td>
                </tr>
                <tr>
                    <td>政党交付金収入</td>
                    <td>{cma_s10_in_seitoukoufu}</td>
                </tr>
                <tr>
                    <td>その他収入</td>
                    <td>{cma_s10_in_other}</td>
                </tr>
          </tbody>
        </table>

      <h4 className="mt-2">政党支出合計{cma_outTotal}</h4>

      <table>
      <tbody>
            <tr>
                <td>人件費</td>
                <td>{cma_s10_out_jinkenhi}</td>
            </tr>
            <tr>
                <td>光熱費・備品費</td>
                <td>{cma_s10_out_other}</td>
            </tr>
                <tr>
                <td>事務所費</td>
                <td>{cma_s10_out_jimusho}</td>
            </tr>
            <tr>
                <td>組織活動費</td>
                <td>{cma_s10_out_soshiki}</td>
            </tr>
            <tr>
                <td>選挙関係費</td>
                <td>{cma_s10_out_senkyo}</td>
            </tr>
            <tr>
                <td>機関紙費</td>
                <td>{cma_s10_out_kikanshi}</td>
            </tr>
            <tr>
                <td>宣伝費</td>
                <td>{cma_s10_out_senden}</td>
            </tr>
            <tr>
                <td>その他支出</td>
                <td>{cma_s10_out_other_2}</td>
            </tr>
      </tbody>
    </table>

      </div>


     <div className="mt-8">政党トピックス</div>
     {data.allMarkdownRemark.edges.map(({ node }) => (
      <div key={node.fields.slug}>
          <h3>
          <Link to={`/posts/${node.fields.slug}`}>
            {node.frontmatter.title}</Link>
            <span style={{ color:'#bbb'}}> - {node.frontmatter.date}</span>
          </h3>
          <p>{node.excerpt}</p>
      </div>
  ))}


      </Layout>
    );
   }

}

export default senkyo10Template


export const query = graphql`

query($slug:String){
    allAirtable(
      filter: {data: {s10_code: {eq: $slug}},table: {eq: "s10_seitou"}},
      sort: {fields: data___s10_code, order: ASC}
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


    allMarkdownRemark(filter: {frontmatter: {senkyo: {eq:  $slug}}}) {
      edges {
        node {
          excerpt
          fields{
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
