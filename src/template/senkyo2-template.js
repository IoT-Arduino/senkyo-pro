import React,{Component} from "react"
import { HorizontalBar } from 'react-chartjs-2';
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from "../components/seo"
import Topics from '../components/topics'

class senkyo2Template extends Component  {
  
  constructor(props){
    super(props)
    this.state = {
        chartData:{
          labels: [],
          datasets:[
              {
                  label:'Population',
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
    const edges = data.allAirtable.edges[0].node.data

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

    population.push(parseInt(edges.s2_v_nineties))
    population.push(parseInt(edges.s2_v_eighties))
    population.push(parseInt(edges.s2_v_seventies))
    population.push(parseInt(edges.s2_v_sixties))
    population.push(parseInt(edges.s2_v_fifties))
    population.push(parseInt(edges.s2_v_forties))
    population.push(parseInt(edges.s2_v_thirries))
    population.push(parseInt(edges.s2_v_twenties))
    population.push(parseInt(edges.s2_v_teen))

    this.setState({
      chartData:{
        labels: Labels,
        datasets:[
            {
                label:'Population',
                  data:population,
                  backgroundColor:[
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)'
                  ],
                  // datalabels: {  color: '#FFCE56' }
            }
        ]
      },
    })

  }
  

  componentDidMount(){
    this.getChartData()
  }

  render(){
    const { data } = this.props
    const { chartData } = this.state
    const edges = data.allAirtable.edges[0].node.data
    const s2_last_toku_rate 
    = Math.round(edges.s2_chou_toku_votes / edges.s2_chou_ef_vote *10000 ) /100

    const cma_s2_ttl_pop = String(edges.s2_ttl_pop).replace(/(\d)(?=(\d\d\d)+$)/g, '$1,')
    const cma_s2_mitsudo = String(edges.s2_mitsudo).replace(/(\d)(?=(\d\d\d)+$)/g, '$1,')
    const cma_s2_ttl_votes = String(edges.s2_ttl_votes).replace(/(\d)(?=(\d\d\d)+$)/g, '$1,')
    const cma_s2_housyu_y = String(edges.s2_housyu_y).replace(/(\d)(?=(\d\d\d)+$)/g, '$1,')
    const cma_s2_ef_vote = String(edges.s2_ef_vote).replace(/(\d)(?=(\d\d\d)+$)/g, '$1,')
    const cma_s2_last_vote = String(edges.s2_last_vote).replace(/(\d)(?=(\d\d\d)+$)/g, '$1,')

    const cma_s2_chou_ef_vote = String(edges.s2_chou_ef_vote).replace(/(\d)(?=(\d\d\d)+$)/g, '$1,')
    const cma_s2_chou_toku_votes = String(edges.s2_chou_toku_votes).replace(/(\d)(?=(\d\d\d)+$)/g, '$1,')

    return (
      <Layout>
      <SEO title={edges.s2_shiku_chouson+"選挙区情報"} />
      <h2 className="text-center mb-4">{edges.s2_shiku_chouson}</h2>

      <h3>選挙区データ</h3>
      <div className="sm:flex border-2 rounded sm:justify-around py-4 text-center w-2/3 m-auto">
        <div className="text-center">
          <p>人口</p>
          <p className="text-center">{cma_s2_ttl_pop}人</p>
        </div>
        <div className="text-centerr mt-4 sm:mt-0">
          <p>人口密度</p>
          <p className="text-center">{cma_s2_mitsudo}人</p>
        </div>
        <div className="text-center mt-4 sm:mt-0">
          <p>有権者数*推計</p>
          <p className="text-center">{cma_s2_ttl_votes}人</p>
       </div>
      </div>


      <div className="relative h-64 w-9/10 mx-auto my-4">
        <HorizontalBar
          data={chartData}
          options={{
              title:{
                display:true,
                text:`${edges.s2_shiku_chouson}の年代別有権者数`,
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

      <div className="block md:flex mt-8">

        <div className="mt-8 md:w-1/3 md:px-3">
        <h3>議会・議員データ</h3>
        <table  className="border-2 mt-2 ml-8 md:ml-0">
        <tbody>
              <tr>
                  <td className="w-2/5 px-2 bg-gray-200 border-b-2">議員定数</td>
                  <td className="text-right w-40 px-2 border-b-2">{edges.s2_giinteisuu}</td>
              </tr>
              <tr>
                  <td className="w-2/5 px-2 bg-gray-200 border-b-2">議員報酬</td>
                  <td className="text-right w-40 px-2 border-b-2">{cma_s2_housyu_y}円/年</td>
              </tr>
              <tr>
                  <td className="w-2/5 px-2 bg-gray-200 border-b-2">議員任期</td>
                  <td className="text-right w-40 px-2 border-b-2">{edges.s2_g_ninki}</td>
              </tr>
            </tbody>
        </table>
      </div>

      <div className="mt-8 md:w-1/3 md:px-3">
      <h3>議会選挙データ</h3>
      <table className="border-2 mt-2 ml-8 md:ml-0">
      <tbody>
            <tr>
                <td className="w-2/3 px-2 bg-gray-200 border-b-2">前回投票率</td>
                <td className="text-right w-24 px-2 border-b-2">{edges.s2_giin_vrate}%</td>
            </tr>
            <tr>
                <td className="w-2/3 px-2 bg-gray-200 border-b-2">前回有効投票数</td>
                <td className="text-right w-24 px-2 border-b-2">{cma_s2_ef_vote}</td>
            </tr>
            <tr>
                <td className="w-2/3 px-2 bg-gray-200 border-b-2">最下位当選得票数</td>
                <td className="text-right w-24 px-2 border-b-2">{cma_s2_last_vote}</td>
            </tr>
            <tr>
                <td className="w-2/3 px-2 bg-gray-200 border-b-2">最下位当選得票率</td>
                <td className="text-right w-24 px-2 border-b-2">{edges.s2_last_toku_rate}%</td>
            </tr>
            <tr>
                <td className="w-2/3 px-2 bg-gray-200 border-b-2">最下位当選有権者比率</td>
                <td className="text-right w-24 px-2 border-b-2">{edges.s2_last_yuu_rate}%</td>
            </tr>
            <tr>
                <td className="w-2/3 px-2 bg-gray-200 border-b-2">議員任期</td>
                <td className="text-right w-24 px-2 border-b-2">{edges.s2_g_ninki}</td>
            </tr>
      </tbody>
      </table>
    </div>


        { !edges.s2_chou_ef_vote ? (
          <p></p>
        ) : (
          <div className="mt-8 md:w-1/3 md:px-3">
          <h3>首長選挙データ</h3>
          <table className="border-2 mt-2 ml-8 md:ml-0">
          <tbody>
                <tr>
                    <td className="w-2/3 px-2 bg-gray-200 border-b-2">前回投票率</td>
                    <td className="text-right w-24 px-2 border-b-2">{edges.s2_chou_vrate}%</td>
                </tr>
                <tr>
                    <td className="w-2/3 px-2 bg-gray-200 border-b-2">前回有効投票数</td>
                    <td className="text-right w-24 px-2 border-b-2">{cma_s2_chou_ef_vote}</td>
                </tr>
                <tr>
                    <td className="w-2/3 px-2 bg-gray-200 border-b-2">当選者得票数</td>
                    <td className="text-right w-24 px-2 border-b-2">{cma_s2_chou_toku_votes}</td>
                </tr>
                <tr>
                    <td className="w-2/3 px-2 bg-gray-200 border-b-2">当選者得票率</td>
                    <td className="text-right w-24 px-2 border-b-2">{s2_last_toku_rate}%</td>
                </tr>
                <tr>
                    <td className="w-2/3 px-2 bg-gray-200 border-b-2">連続在任期</td>
                    <td className="text-right w-24 px-2 border-b-2">{edges.s2_chou_re_elected}</td>
                </tr>
                <tr>
                    <td className="w-2/3 px-2 bg-gray-200 border-b-2">首長任期</td>
                    <td className="text-right w-24 px-2 border-b-2">{edges.s2_chou_ninki}</td>
                </tr>
          </tbody>
          </table>
        </div>
        )}


      </div>

      <Topics topics={data.allMarkdownRemark.edges}/>
      
      </Layout>
    );
   }

}

export default senkyo2Template


export const query = graphql`

query($slug:String!){
    allAirtable(filter: {data: {s2_code: {eq: $slug}},table: {eq: "s2_shiku"}}) {
      edges {
        node {
          data {
            s2_bosyu
            s2_chou_ef_vote
            s2_chou_ninki
            s2_chou_re_elected
            s2_chou_toku_votes
            s2_chou_vrate
            s2_code
            s2_filter_code
            s2_ef_vote
            s2_link_flag
            s2_g_ninki
            s2_giin_vrate
            s2_giinteisuu
            s2_housyu_m
            s2_housyu_y
            s2_houtei_toku
            s2_last_toku_rate
            s2_last_vote
            s2_last_yuu_rate
            s2_menseki
            s2_mitsudo
            s2_pref
            s2_shiku
            s2_shiku_chouson
            s2_ttl_pop
            s2_ttl_votes
            s2_v_eighties
            s2_v_fifties
            s2_v_forties
            s2_v_nineties
            s2_v_seventies
            s2_v_sixties
            s2_v_teen
            s2_v_thirries
            s2_v_twenties
          }
        }
      }
    }


    allMarkdownRemark(filter: {frontmatter: {senkyo: {eq:  $slug}}}) {
      edges {
        node {
          excerpt(format: PLAIN, truncate: true, pruneLength: 60)
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
