import React,{Component} from "react"
import { Link,graphql } from 'gatsby'
import Layout from '../components/layout'

class senkyo10Template extends Component  {
  

  

  // componentDidMount(){
  //   this.getChartData()
  // }

  render(){
    const { data,pageContext } = this.props
    const edges = data.allAirtable.edges[0].node.data

    console.log(pageContext)

    return (
      <Layout>

      <h2>{edges.s10_seitou_name}</h2>

      <div>
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
                    <td>{edges.s10_syu_hirei　+ edges.s10_syu_shou}人</td>
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
                    <td>{edges.s10_san_shou + edges.s10_san_hirei}人</td>
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

export default senkyo10Template


export const query = graphql`

query($slug:String){
    allAirtable(
      filter: {table: {eq: "s10_seitou"}},
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
