import React, { Component } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Topics from "../components/topics"

import S1aChart from "../components/charts/populationChart.js"

class senkyo3Template extends Component {

  render() {
    const { data } = this.props
    const edges = data.allAirtable.edges[0].node.data
    const cityBlock = data.cityBlock

    // propsでわたすchartデータ用
    const population = [
      edges.s3_v_nineties,
      edges.s3_v_eighties,
      edges.s3_v_seventies,
      edges.s3_v_sixties,
      edges.s3_v_fifties,
      edges.s3_v_forties,
      edges.s3_v_thirries,
      edges.s3_v_twenties,
      edges.s3_v_teen,
    ]

    //　当選者得票率の計算
    const s3_last_toku_rate =
      Math.round((edges.s3_chou_toku_votes / edges.s3_chou_ef_vote) * 10000) /
      100

    return (
      <Layout>
        <SEO title={edges.s3_shiku_chouson + "選挙区情報"} />
        <h2 className="text-center mb-4">
          {edges.s3_shiku_chouson}　(政令指定都市)
        </h2>

        <h3>選挙区データ</h3>
        <div className="sm:flex border-2 rounded sm:justify-around py-4 text-center w-2/3 m-auto">
          <div className="text-center">
            <p>人口</p>
            <p className="text-center">{edges.s3_ttl_pop.toLocaleString()}人</p>
          </div>
          <div className="text-center mt-4 sm:mt-0">
            <p>有権者数*推計</p>
            <p className="text-center">{edges.s3_ttl_votes.toLocaleString()}人</p>
          </div>
        </div>

        <div className="relative h-64 w-9/10 mx-auto my-4">

        <S1aChart
        title={`${edges.s3_shiku_chouson}`}
        population={population}
      ></S1aChart>


        </div>

        <div className="block md:flex mt-8">
          <div className="mt-8 md:w-1/3 md:px-3">
            <div>
              <h3>議会・議員データ</h3>
              <table className="border-2 mt-2 ml-8 md:ml-0">
                <tbody>
                  <tr>
                    <td className="w-2/5 px-2 bg-gray-200 border-b-2">
                      議員定数
                    </td>
                    <td className="text-right w-40 px-2 border-b-2">
                      {edges.s3_giinteisuu}
                    </td>
                  </tr>
                  <tr>
                    <td className="w-2/5 px-2 bg-gray-200 border-b-2">
                      議員報酬
                    </td>
                    <td className="text-right w-40 px-2 border-b-2">
                      {edges.s3_housyu_y.toLocaleString()}円/年
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {edges.s3_chou_ef_vote > 0 ? (
              <div className="mt-4">
                <h3>首長選挙データ</h3>
                <table className="border-2 mt-2 ml-8 md:ml-0">
                  <tbody>
                    <tr>
                      <td className="w-2/3 px-2 bg-gray-200 border-b-2">
                        前回投票率
                      </td>
                      <td className="text-right w-24 px-2 border-b-2">
                        {edges.s3_chou_vrate}%
                      </td>
                    </tr>
                    <tr>
                      <td className="w-2/3 px-2 bg-gray-200 border-b-2">
                        前回有効投票数
                      </td>
                      <td className="text-right w-24 px-2 border-b-2">
                        {edges.s3_chou_ef_vote.toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td className="w-2/3 px-2 bg-gray-200 border-b-2">
                        当選者得票数
                      </td>
                      <td className="text-right w-24 px-2 border-b-2">
                        {edges.s3_chou_toku_votes.toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td className="w-2/3 px-2 bg-gray-200 border-b-2">
                        当選者得票率
                      </td>
                      <td className="text-right w-24 px-2 border-b-2">
                        {s3_last_toku_rate}%
                      </td>
                    </tr>
                    <tr>
                      <td className="w-2/3 px-2 bg-gray-200 border-b-2">
                        連続在任期
                      </td>
                      <td className="text-right w-24 px-2 border-b-2">
                        {edges.s3_chou_re_elected}
                      </td>
                    </tr>
                    <tr>
                      <td className="w-2/3 px-2 bg-gray-200 border-b-2">
                        首長任期
                      </td>
                      <td className="text-right w-24 px-2 border-b-2">
                        {edges.s3_chou_ninki}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : edges.s3_chou_ef_vote === 0 ? (
              <div className="mt-4">
                <h3>首長選挙データ</h3>
                <table className="border-2 mt-2 ml-8 md:ml-0">
                  <tbody>
                    <tr>
                      <td className="w-1/2 px-2 bg-gray-200 border-b-2">
                        当選者得票数
                      </td>
                      <td className="text-right w-34 px-2 border-b-2">
                        無投票当選
                      </td>
                    </tr>
                    <tr>
                      <td className="w-1/2 px-2 bg-gray-200 border-b-2">
                        連続在任期
                      </td>
                      <td className="text-right w-34 px-2 border-b-2">
                        {edges.s3_chou_re_elected}
                      </td>
                    </tr>
                    <tr>
                      <td className="w-1/2 px-2 bg-gray-200 border-b-2">
                        首長任期
                      </td>
                      <td className="text-right w-34 px-2 border-b-2">
                        {edges.s3_chou_ninki}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <p></p>
            )}
          </div>

          <div className="mt-8 md:w-2/3 md:px-3">
            <h3>傘下自治体</h3>
            <div className="flex flex-wrap mx-2 ml-8 md:ml-0">
              {cityBlock.edges.map(({ node }) => (
                <div
                  key={node.data.s3_code}
                  className="mx-4 my-2 bg-white hover:bg-gray-200 border-2 font-bold py-2 px-4 rounded-full"
                >
                  <h3>
                    <Link to={`/senkyo/${node.data.s3_code}`}>
                      {node.data.s3_shiku_chouson}
                    </Link>
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Topics topics={data.allMarkdownRemark.edges} />
      </Layout>
    )
  }
}

export default senkyo3Template

export const query = graphql`
  query($slug: String!, $codeFilter: Date!) {
    allAirtable(
      filter: { data: { s3_code: { eq: $slug } }, table: { eq: "s3_seirei" } }
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

    cityBlock: allAirtable(
      filter: {
        data: { s3_filter_code: { eq: $codeFilter }, s3_kei_flag: { ne: "計" } }
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

    allMarkdownRemark(filter: { frontmatter: { senkyo: { eq: $slug } } }) {
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
  }
`
