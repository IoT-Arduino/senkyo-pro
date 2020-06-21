import React, { Component } from "react"
import { Link, graphql } from "gatsby"
import SEO from "../components/seo"
import Layout from "../components/layout"
import Topics from "../components/topics"

import S1aChart from "../components/charts/populationChart.js"

class senkyo1aTemplate extends Component {

  render() {
    const { data } = this.props
    const edges = data.allAirtable.edges[0].node.data
    const kenblock = data.kenblock

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


    return (
      <Layout>
        <SEO title={edges.s1_syu_block + "ブロック選挙区情報"} />
        <h2 className="text-center mb-4">
          衆議院比例{edges.s1_syu_block}ブロック
        </h2>

        <h3>選挙区データ</h3>
        <div className="sm:flex border-2 rounded sm:justify-around py-4 text-center w-2/3 m-auto">
          <div className="text-center">
            <p>人口</p>
            <p className="text-center">{edges.s1_ttl_pop.toLocaleString()}人</p>
          </div>
          <div className="text-center mt-4 sm:mt-0">
            <p>有権者数*推計</p>
            <p className="text-center">{edges.s1_ttl_votes.toLocaleString()}人</p>
          </div>
        </div>

        <div className="relative h-64 w-9/10 mx-auto my-4">
          <S1aChart
            // data={s1a}
            title={`${edges.s1_syu_block}ブロック`}
            population={population}
          ></S1aChart>
        </div>

        <div className="block md:flex mt-8">
          <div className="mt-8 md:w-1/3 md:px-3">
            <h3>議会・議員データ</h3>
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
                    {edges.s1_housyu_y.toLocaleString()}円/年
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

          <div className="mt-8 md:w-1/3 md:px-3">
            <h3>議会選挙データ</h3>
            <table className="border-2 mt-2 ml-8 md:ml-0">
              <tbody>
                <tr>
                  <td className="w-2/3 px-2 bg-gray-200 border-b-2">
                    前回投票率
                  </td>
                  <td className="text-right w-24 px-2 border-b-2">
                    {edges.s1_giin_vrate}%
                  </td>
                </tr>
                <tr>
                  <td className="w-2/3 px-2 bg-gray-200 border-b-2">
                    前回有効投票数
                  </td>
                  <td className="text-right w-24 px-2 border-b-2">
                    {edges.s1_ef_vote.toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <td className="w-2/3 px-2 bg-gray-200 border-b-2">
                    最下位当選得票数
                  </td>
                  <td className="text-right w-24 px-2 border-b-2">
                    {edges.s1_last_vote.toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <td className="w-2/3 px-2 bg-gray-200 border-b-2">
                    最下位当選得票率
                  </td>
                  <td className="text-right w-24 px-2 border-b-2">
                    {edges.s1_last_toku_rate}%
                  </td>
                </tr>
                <tr>
                  <td className="w-2/3 px-2 bg-gray-200 border-b-2">
                    最下位当選有権者比率
                  </td>
                  <td className="text-right w-24 px-2 border-b-2">
                    {edges.s1_last_yuu_rate}%
                  </td>
                </tr>
                <tr>
                  <td className="w-2/3 px-2 bg-gray-200 border-b-2">
                    議員任期
                  </td>
                  <td className="text-right w-24 px-2 border-b-2">
                    {edges.s1_g_ninki}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 md:w-1/3 md:px-3">
            <h3>該当選挙区都道府県</h3>
            <div className="flex flex-wrap mx-2 ml-8 md:ml-0">
              {kenblock.edges.map(({ node }) => (
                <div
                  key={node.data.s1_code}
                  className="mx-4 my-2 bg-white hover:bg-gray-200 border-2 font-bold py-2 px-4 rounded-full"
                >
                  <h3>
                    <Link
                      to={`/senkyo/${node.data.s1_code}`}
                      className="text-blue-500"
                    >
                      {node.data.s1_pref}
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

export default senkyo1aTemplate

export const query = graphql`
  query($slug: String!) {
    allAirtable(
      filter: { data: { s1_code: { eq: $slug } }, table: { eq: "s1_todou" } }
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
            s1_giin_vrate
            s1_ef_vote
            s1_last_vote
            s1_last_toku_rate
            s1_last_yuu_rate

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

    kenblock: allAirtable(
      filter: {
        table: { eq: "s1_todou" }
        data: { s1_syu_block_code: { eq: $slug } }
      }
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
