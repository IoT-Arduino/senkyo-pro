import React from "react"
import { Link, graphql } from "gatsby"
import LayoutTop from "../components/layoutTop"
import SEO from "../components/seo"
import IncomeChart from "../components/incomeChart"

const IndexPage = props => {
  const s1a = props.data.s1a
  const s1b = props.data.s1b
  const s3 = props.data.s3
  const s10 = props.data.s10
  const news = props.data.allMarkdownRemark

  // propsでわたすchartデータ用
  const s10i = props.data.s10i

  return (
    <LayoutTop>
      <SEO title="Home" />

      <div className="sm:flex py-2 max-w-6xl mx-auto">
        <div className="my-2 px-4 sm:w-3/5">
          <h2 className="font-bold text-gray-700">
            選挙区・国政政党データトピックス
          </h2>
          {news.edges.map(({ node }) => (
            <div key={node.fields.slug} className="my-2 p-2">
              <h3 className="my-1 hover:bg-blue-100">
                <Link to={`/posts/${node.fields.slug}`}>
                  {node.frontmatter.title}
                  <span
                    style={{ color: "#bbb" }}
                    className="block md:inline-block"
                  >
                    {" "}
                    {node.frontmatter.date}
                  </span>
                </Link>
              </h3>
              <p>{node.excerpt}</p>
            </div>
          ))}
          <div className="mx-4 mt-5 mb-10 bg-white-500 hover:bg-blue-200 text-center font-bold py-2 px-4 rounded-full border-blue border-2">
            <Link to={`/blog`} className="text-blue">
              選挙区・政党記事一覧
            </Link>
          </div>
        </div>

        <div className="my-4 px-4 sm:w-2/5">
          <h3 className="font-bold text-gray-700">国政政党データ</h3>
          <div className="flex flex-wrap">
            {s10.edges.map(({ node }) => (
              <div
                key={node.data.s10_code}
                className="mx-4 my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
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

          <div className="mx-4 my-2 bg-white-500 hover:bg-blue-200 text-center font-bold py-2 px-4 rounded-full border-blue border-2">
            <Link to={`/seitou`} className="text-blue">
              国政政党情報一覧比較
            </Link>
          </div>

          <div className="my-10 mr-6 relative h-64">
            <IncomeChart data={s10i}></IncomeChart>
          </div>
        </div>
      </div>

      <div className="my-0 mx-0 bg-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="px-4 pb-2 pt-4 w-40 font-bold text-gray-700 border-bt w-40 rounded">
            選挙区データ
          </h2>
        </div>

        <div className="px-4 py-2 max-w-6xl mx-auto">
          <div className="my-2">
            <h3>衆議院比例ブロック</h3>
            <div className="flex flex-wrap">
              {s1a.edges.map(({ node }) => (
                <div key={node.data.s1_code} className="mx-4">
                  <Link to={`/senkyo/${node.data.s1_code}`}>
                    {node.data.s1_syu_block}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="my-2">
            <h3>都道府県</h3>
            <div className="flex flex-wrap">
              {s1b.edges.map(({ node }) => (
                <div key={node.data.s1_code} className="mx-4">
                  <Link to={`/senkyo/${node.data.s1_code}`}>
                    {node.data.s1_pref}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="my-2">
            <h3>政令指定都市</h3>
            <div className="flex flex-wrap">
              {s3.edges.map(({ node }) => (
                <div key={node.data.s3_code} className="mx-4">
                  <Link to={`/senkyo/${node.data.s3_code}`}>
                    {node.data.s3_shiku_chouson}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <p className="mx-10 my-10">
          <Link to="about-data">各種データの根拠資料について</Link>
        </p>
      </div>
    </LayoutTop>
  )
}

export default IndexPage

export const query = graphql`
  query {
    s1a: allAirtable(
      filter: { data: { s1_code: { glob: "SHB*" } }, table: { eq: "s1_todou" } }
      sort: { fields: data___s1_code, order: ASC }
    ) {
      edges {
        node {
          data {
            s1_code
            s1_syu_block
          }
        }
      }
    }

    s1b: allAirtable(
      filter: {
        data: { s1_code: { regex: "/^(?!S)/" } }
        table: { eq: "s1_todou" }
      }
      sort: { fields: data___s1_code, order: ASC }
    ) {
      edges {
        node {
          data {
            s1_code
            s1_pref
          }
        }
      }
    }

    s3: allAirtable(
      filter: {
        data: { s3_kei_flag: { glob: "計*" } }
        table: { eq: "s3_seirei" }
      }
      sort: { fields: data___s3_code, order: ASC }
    ) {
      edges {
        node {
          data {
            s3_code
            s3_shiku_chouson
          }
        }
      }
    }

    s10: allAirtable(
      filter: { table: { eq: "s10_seitou" } }
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
          }
        }
      }
    }

    allMarkdownRemark(
      limit: 5
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          excerpt(format: PLAIN, truncate: true, pruneLength: 60)
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

    s10i: allAirtable(
      filter: { table: { eq: "s10_seitou" } }

      sort: { fields: data___s10_in_total, order: DESC }
    ) {
      edges {
        node {
          data {
            s10_code
            s10_seitou_name
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
