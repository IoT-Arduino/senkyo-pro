import React,{Component} from "react"
import { Bar,HorizontalBar } from 'react-chartjs-2';
import { Link,graphql } from 'gatsby'
import Layout from '../components/layout'

class senkyo3Template extends Component  {
  
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

    population.push(parseInt(edges.s3_v_nineties))
    population.push(parseInt(edges.s3_v_eighties))
    population.push(parseInt(edges.s3_v_seventies))
    population.push(parseInt(edges.s3_v_sixties))
    population.push(parseInt(edges.s3_v_fifties))
    population.push(parseInt(edges.s3_v_forties))
    population.push(parseInt(edges.s3_v_thirries))
    population.push(parseInt(edges.s3_v_twenties))
    population.push(parseInt(edges.s3_v_teen))

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

    console.log(cityBlock)

    return (
      <Layout>

  <HorizontalBar
  data={chartData}
  options={{
      title:{
        display:true,
        text:`${edges.s3_shiku_chouson}の年代別有権者数`,
        fontSize:25
      },
      legend:{
        display:true,
        position:'top'
      }
    }}
  />

     <div>
      {edges.pref}<br />
      {edges.ttl_pop}<br />
      {edges.ttl_votes}<br />
     </div>

     <div>傘下自治体</div>
      {cityBlock.edges.map(({ node }) => (
        <div key={node.data.s3_code}>
            <h3>
            <Link to={`/senkyo/${node.data.s3_code}`}>
              {node.data.s3_shiku_chouson}</Link>
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

export default senkyo3Template


export const query = graphql`

query($slug:String!,$codeFilter:Date!){
    allAirtable(filter: {data: {s3_code: {eq: $slug}},table: {eq: "s3_seirei"}}) {
      edges {
        node {
          data {
            s3_chou_ef_vote
            s3_chou_ninki
            s3_chou_re_elected
            s3_chou_toku_votes
            s3_chou_vrate
            s3_code
            s3_ef_vote
            s3_g_ninki
            s3_giin_vrate
            s3_giinteisuu
            s3_housyu_m
            s3_housyu_y
            s3_kei_flag
            s3_last_vote
            s3_pref
            s3_shiku_chouson
            s3_ttl_pop
            s3_ttl_votes
            s3_v_eighties
            s3_v_fifties
            s3_v_forties
            s3_v_nineties
            s3_v_seventies
            s3_v_sixties
            s3_v_teen
            s3_v_thirries
            s3_v_twenties
          }
        }
      }
    }



    cityBlock:allAirtable(
      filter: {data: {s3_filter_code: {eq: $codeFilter}, s3_kei_flag: {ne: "計"}},table: {eq: "s3_seirei"}},
      sort: {fields: data___s3_code, order: ASC}
      ) {
      edges {
        node {
          data {
            s3_chou_ef_vote
            s3_chou_ninki
            s3_chou_re_elected
            s3_chou_toku_votes
            s3_chou_vrate
            s3_code
            s3_filter_code
            s3_ef_vote
            s3_giin_vrate
            s3_g_ninki
            s3_giinteisuu
            s3_housyu_m
            s3_housyu_y
            s3_kei_flag
            s3_last_vote
            s3_pref
            s3_shiku_chouson
            s3_ttl_pop
            s3_ttl_votes
            s3_v_eighties
            s3_v_fifties
            s3_v_forties
            s3_v_nineties
            s3_v_seventies
            s3_v_sixties
            s3_v_teen
            s3_v_thirries
            s3_v_twenties
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
