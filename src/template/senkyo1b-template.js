import React,{Component} from "react"
import { Bar,HorizontalBar } from 'react-chartjs-2';
import { Link,graphql } from 'gatsby'
import Layout from '../components/layout'

class senkyo1bTemplate extends Component  {
  
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

    population.push(parseInt(edges.s1_v_nineties))
    population.push(parseInt(edges.s1_v_eighties))
    population.push(parseInt(edges.s1_v_seventies))
    population.push(parseInt(edges.s1_v_sixties))
    population.push(parseInt(edges.s1_v_fifties))
    population.push(parseInt(edges.s1_v_forties))
    population.push(parseInt(edges.s1_v_thirries))
    population.push(parseInt(edges.s1_v_twenties))
    population.push(parseInt(edges.s1_v_teen))

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
    const markdown = data.allMarkdownRemark
    const cityBlock = data.cityBlock

    console.log(pageContext)

    return (
      <Layout>

  <HorizontalBar
  data={chartData}
  options={{
      title:{
        display:true,
        text:`${edges.s1_pref}の年代別有権者数`,
        fontSize:25
      },
      legend:{
        display:true,
        position:'top'
      }
    }}
  />

     <div>
      {edges.s1_pref}<br />
      {edges.ttl_pop}<br />
      {edges.ttl_votes}<br />
     </div>

     <div>傘下自治体(人口10万人以上)</div>
     {cityBlock.edges.map(({ node }) => (
      <div key={node.data.s2_code}>
          <h3>
          <Link to={`/senkyo/${node.data.s2_code}`}>
            {node.data.s2_shiku_chouson}</Link>
          </h3>
      </div>
            ))}

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

export default senkyo1bTemplate


export const query = graphql`

query($slug:String!,$codeFilter:String!){
  allAirtable(
    filter: {data: {s1_code: {eq: $slug}},table: {eq: "s1_todou"}},
    sort: {fields: data___s2_code, order: ASC}
    ) {
      edges {
        node {
          data {
            s1_code
            s1_chou_ef_vote
            s1_chou_ninki
            s1_chou_re_elected
            s1_chou_toku_votes
            s1_chou_vrate
            s1_g_ninki
            s1_gikai_teisu
            s1_housyu_m
            s1_housyu_y
            s1_pref
            s1_san_teisu
            s1_syu_block
            s1_syu_block_code
            s1_teate
            s1_ttl_pop
            s1_ttl_votes
            s1_v_eighties
            s1_v_fifties
            s1_v_forties
            s1_v_nineties
            s1_v_seventies
            s1_v_sixties
            s1_v_teen
            s1_v_thirries
            s1_v_twenties
          }
        }
      }
    }

    cityBlock: allAirtable(
      filter: {data: {s2_filter_code: {eq: $codeFilter},s2_link_flag: {eq: 1}}, table: {eq: "s2_shiku"}},
      sort: {fields: data___s2_code, order: ASC}
      ) {
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
