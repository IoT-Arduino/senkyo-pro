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
    console.log(data)

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
