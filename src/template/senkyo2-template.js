import React,{Component} from "react"
import { HorizontalBar } from 'react-chartjs-2';
import { Link,graphql } from 'gatsby'
import Layout from '../components/layout'

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
    console.log(edges)

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
    const { data,pageContext } = this.props
    const { chartData } = this.state
    const edges = data.allAirtable.edges[0].node.data
    const s2_last_toku_rate 
    = Math.round(edges.s2_chou_toku_votes / edges.s2_chou_ef_vote *10000 ) /100

    console.log(pageContext)

    return (
      <Layout>

      <h2>{edges.s2_shiku_chouson}</h2>

      <div>
        <h3>選挙区データ</h3>
        <table>
          <tbody>
                <tr>
                    <td>人口</td>
                    <td>{edges.s2_ttl_pop}人</td>
                </tr>
                <tr>
                    <td>有権者数</td>
                    <td>{edges.s2_ttl_votes}人　*推計</td>
                </tr>
              </tbody>
          </table>
      </div>

      <HorizontalBar
      data={chartData}
      options={{
          title:{
            display:true,
            text:`${edges.s2_shiku_chouson}の年代別有権者数`,
            fontSize:25
          },
          legend:{
            display:true,
            position:'top'
          }
        }}
      />

      <div>
        <h3>議会・議員データ</h3>
        <table>
        <tbody>
              <tr>
                  <td>議員定数</td>
                  <td>{edges.s2_giinteisuu}</td>
              </tr>
              <tr>
                  <td>議員報酬</td>
                  <td>{edges.s2_housyu_y}円/年</td>
              </tr>
              <tr>
                  <td>議員任期</td>
                  <td>{edges.s2_g_ninki}</td>
              </tr>
            </tbody>
        </table>
      </div>

      <div>
      <h3>議会選挙データ</h3>
      <table>
      <tbody>
            <tr>
                <td>前回投票率</td>
                <td>{edges.s2_giin_vrate}%</td>
            </tr>
            <tr>
                <td>前回有効投票数</td>
                <td>{edges.s2_ef_vote}</td>
            </tr>
            <tr>
                <td>最下位当選得票数</td>
                <td>{edges.s2_last_vote}</td>
            </tr>
            <tr>
                <td>最下位当選得票率</td>
                <td>{edges.s2_last_toku_rate}%</td>
            </tr>
            <tr>
                <td>最下位当選有権者比率</td>
                <td>{edges.s2_last_yuu_rate}%</td>
            </tr>
            <tr>
                <td>議員任期</td>
                <td>{edges.s2_g_ninki}</td>
            </tr>
      </tbody>
      </table>
    </div>

    <div>
    <h3>首長選挙データ</h3>
    <table>
    <tbody>
          <tr>
              <td>前回投票率</td>
              <td>{edges.s2_chou_vrate}%</td>
          </tr>
          <tr>
              <td>前回有効投票数</td>
              <td>{edges.s2_chou_ef_vote}</td>
          </tr>
          <tr>
              <td>当選者得票数</td>
              <td>{edges.s2_chou_toku_votes}</td>
          </tr>
          <tr>
              <td>当選者得票率</td>
              <td>{s2_last_toku_rate}%</td>
          </tr>
          <tr>
              <td>連続在任期</td>
              <td>{edges.s2_chou_re_elected}</td>
          </tr>
          <tr>
              <td>首長任期</td>
              <td>{edges.s2_chou_ninki}</td>
          </tr>
    </tbody>
    </table>
  </div>


     <div>選挙区トピックス</div>
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
