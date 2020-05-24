import React, { Component } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Topics from "../components/topics"

import S1aChart from "../components/charts/populationChart.js"

class senkyo1bTemplate extends Component {

  render() {
    const { data } = this.props
    const edges = data.allAirtable.edges[0].node.data
    const cityBlock = data.cityBlock

    // propsでわたすchartデータ用
    const population = [
      edges.s1_v_nineties,
      edges.s1_v_eighties,
      edges.s1_v_seventies,
      edges.s1_v_sixties,
      edges.s1_v_fifties,
      edges.s1_v_forties,
      edges.s1_v_thirries,
      edges.s1_v_twenties,
      edges.s1_v_teen,
    ]

    const cma_s1_ttl_pop = String(edges.s1_ttl_pop).replace(
      /(\d)(?=(\d\d\d)+$)/g,
      "$1,"
    )
    const cma_s1_ttl_votes = String(edges.s1_ttl_votes).replace(
      /(\d)(?=(\d\d\d)+$)/g,
      "$1,"
    )
    const cma_s1_housyu_y = String(edges.s1_housyu_y).replace(
      /(\d)(?=(\d\d\d)+$)/g,
      "$1,"
    )

    const s1_chou_toku_rate =
      Math.round((edges.s1_chou_toku_votes / edges.s1_chou_ef_vote) * 10000) /
      100

    const cma_s1_chou_ef_vote = String(edges.s1_chou_ef_vote).replace(
      /(\d)(?=(\d\d\d)+$)/g,
      "$1,"
    )
    const cma_s1_chou_toku_votes = String(edges.s1_chou_toku_votes).replace(
      /(\d)(?=(\d\d\d)+$)/g,
      "$1,"
    )

    return (
      <Layout>
        <SEO title={edges.s1_pref + "選挙区情報"} />
        <h2 className="text-center mb-4">{edges.s1_pref}</h2>

        <h3>選挙区データ</h3>
        <div className="sm:flex border-2 rounded sm:justify-around py-4 text-center w-2/3 m-auto">
          <div className="text-center">
            <p>人口</p>
            <p className="text-center">{cma_s1_ttl_pop}人</p>
          </div>
          <div className="text-center mt-4 sm:mt-0">
            <p>有権者数*推計</p>
            <p className="text-center">{cma_s1_ttl_votes}人</p>
          </div>
        </div>

        <div className="relative h-64 w-9/10 mx-auto my-4">
          <S1aChart
            title={edges.s1_pref}
            population={population}
          ></S1aChart>
        </div>

        <div className="block md:flex mt-8">
          <div className="mt-8 md:w-2/5 md:px-3">
            <h3>都道府県議会・議員データ</h3>
            <table className="border-2 mt-2 ml-8 md:ml-0">
              <tbody>
                <tr>
                  <td className="w-2/5 px-2 bg-gray-200 border-b-2">
                    議員定数
                  </td>
                  <td className="text-right w-40 px-2 border-b-2">
                    {edges.s1_gikai_teisu}
                  </td>
                </tr>
                <tr>
                  <td className="w-2/5 px-2 bg-gray-200 border-b-2">
                    議員報酬
                  </td>
                  <td className="text-right w-40 px-2 border-b-2">
                    {cma_s1_housyu_y}円/年
                  </td>
                </tr>
                <tr>
                  <td className="w-2/5 px-2 bg-gray-200 border-b-2">
                    議員任期
                  </td>
                  <td className="text-right w-40 px-2 border-b-2">
                    {edges.s1_g_ninki}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {edges.s1_chou_ef_vote > 0 ? (
            <div className="mt-8 md:w-1/3 md:px-3">
              <h3>首長選挙データ</h3>
              <table className="border-2 mt-2 ml-8 md:ml-0">
                <tbody>
                  <tr>
                    <td className="w-2/3 px-2 bg-gray-200 border-b-2">
                      前回投票率
                    </td>
                    <td className="text-right w-24 px-2 border-b-2">
                      {edges.s1_chou_vrate}%
                    </td>
                  </tr>
                  <tr>
                    <td className="w-2/3 px-2 bg-gray-200 border-b-2">
                      前回有効投票数
                    </td>
                    <td className="text-right w-24 px-2 border-b-2">
                      {cma_s1_chou_ef_vote}
                    </td>
                  </tr>
                  <tr>
                    <td className="w-2/3 px-2 bg-gray-200 border-b-2">
                      当選者得票数
                    </td>
                    <td className="text-right w-24 px-2 border-b-2">
                      {cma_s1_chou_toku_votes}
                    </td>
                  </tr>
                  <tr>
                    <td className="w-2/3 px-2 bg-gray-200 border-b-2">
                      当選者得票率
                    </td>
                    <td className="text-right w-24 px-2 border-b-2">
                      {s1_chou_toku_rate}%
                    </td>
                  </tr>
                  <tr>
                    <td className="w-2/3 px-2 bg-gray-200 border-b-2">
                      連続在任期
                    </td>
                    <td className="text-right w-24 px-2 border-b-2">
                      {edges.s1_chou_re_elected}
                    </td>
                  </tr>
                  <tr>
                    <td className="w-2/3 px-2 bg-gray-200 border-b-2">
                      首長任期
                    </td>
                    <td className="text-right w-24 px-2 border-b-2">
                      {edges.s1_chou_ninki}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : edges.s1_chou_ef_vote === 0 ? (
            <div className="mt-8 md:w-1/3 md:px-3">
              <h3>首長選挙データ</h3>
              <table className="border-2 mt-2 ml-8 md:ml-0">
                <tbody>
                  <tr>
                    <td className="w-2/3 px-2 bg-gray-200 border-b-2">
                      当選者得票数
                    </td>
                    <td className="text-right w-34 px-2 border-b-2">
                      無投票当選
                    </td>
                  </tr>
                  <tr>
                    <td className="w-2/3 px-2 bg-gray-200 border-b-2">
                      連続在任期
                    </td>
                    <td className="text-right w-34 px-2 border-b-2">
                      {edges.s1_chou_re_elected}
                    </td>
                  </tr>
                  <tr>
                    <td className="w-2/3 px-2 bg-gray-200 border-b-2">
                      首長任期
                    </td>
                    <td className="text-right w-34 px-2 border-b-2">
                      {edges.s1_chou_ninki}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <p></p>
          )}

          <div className="mt-8 md:w-3/5 md:px-3">
            <h3>傘下自治体(人口10万人以上)</h3>
            <div className="flex flex-wrap mx-2 ml-8 md:ml-0">
              {cityBlock.edges.map(({ node }) => (
                <div
                  key={node.data.s2_code}
                  className="mx-4 my-2 bg-white hover:bg-gray-200 border-2 font-bold py-2 px-4 rounded-full"
                >
                  <h3>
                    <Link
                      to={`/senkyo/${node.data.s2_code}`}
                      className="text-blue-500"
                    >
                      {node.data.s2_shiku_chouson}
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

export default senkyo1bTemplate

export const query = graphql`
  query($slug: String!, $codeFilter: String!) {
    allAirtable(
      filter: { data: { s1_code: { eq: $slug } }, table: { eq: "s1_todou" } }
      sort: { fields: data___s2_code, order: ASC }
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
      filter: {
        data: { s2_filter_code: { eq: $codeFilter }, s2_link_flag: { eq: 1 } }
        table: { eq: "s2_shiku" }
      }
      sort: { fields: data___s2_code, order: ASC }
    ) {
      edges {
        node {
          data {
            s2_code
            s2_shiku_chouson
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
