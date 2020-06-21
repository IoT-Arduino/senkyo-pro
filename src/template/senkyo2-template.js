import React, { Component } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Topics from "../components/topics"

import S1aChart from "../components/charts/populationChart.js"

class senkyo2Template extends Component {
  render() {
    const { data } = this.props
    const edges = data.allAirtable.edges[0].node.data

    // propsでわたすchartデータ用
    const population = [
      edges.s2_v_nineties,
      edges.s2_v_eighties,
      edges.s2_v_seventies,
      edges.s2_v_sixties,
      edges.s2_v_fifties,
      edges.s2_v_forties,
      edges.s2_v_thirries,
      edges.s2_v_twenties,
      edges.s2_v_teen,
    ]

    //　当選者得票率の計算
    const s2_chou_toku_rate =
      Math.round((edges.s2_chou_toku_votes / edges.s2_chou_ef_vote) * 10000) /
      100

    return (
      <Layout>
        <SEO title={edges.s2_shiku_chouson + "選挙区情報"} />
        <h2 className="text-center mb-4">{edges.s2_shiku_chouson}</h2>

        <h3>選挙区データ</h3>
        <div className="sm:flex border-2 rounded sm:justify-around py-4 text-center w-2/3 m-auto">
          <div className="text-center">
            <p>人口</p>
            <p className="text-center">{edges.s2_ttl_pop.toLocaleString()}人</p>
          </div>
          <div className="text-centerr mt-4 sm:mt-0">
            <p>人口密度</p>
            <p className="text-center">{edges.s2_mitsudo.toLocaleString()}人</p>
          </div>
          <div className="text-center mt-4 sm:mt-0">
            <p>有権者数*推計</p>
            <p className="text-center">
              {edges.s2_ttl_votes.toLocaleString()}人
            </p>
          </div>
        </div>

        <div className="relative h-64 w-9/10 mx-auto my-4">
          <S1aChart
            // data={s1a}
            title={`${edges.s2_shiku_chouson}`}
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
                    {edges.s2_giinteisuu}
                  </td>
                </tr>
                <tr>
                  <td className="w-2/5 px-2 bg-gray-200 border-b-2">
                    議員報酬
                  </td>
                  <td className="text-right w-40 px-2 border-b-2">
                    {edges.s2_housyu_y.toLocaleString()}円/年
                  </td>
                </tr>
                <tr>
                  <td className="w-2/5 px-2 bg-gray-200 border-b-2">
                    議員任期
                  </td>
                  <td className="text-right w-40 px-2 border-b-2">
                    {edges.s2_g_ninki}
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
                    {edges.s2_giin_vrate}%
                  </td>
                </tr>
                <tr>
                  <td className="w-2/3 px-2 bg-gray-200 border-b-2">
                    前回有効投票数
                  </td>
                  <td className="text-right w-24 px-2 border-b-2">
                    {edges.s2_ef_vote.toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <td className="w-2/3 px-2 bg-gray-200 border-b-2">
                    最下位当選得票数
                  </td>
                  <td className="text-right w-24 px-2 border-b-2">
                    {edges.s2_last_vote.toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <td className="w-2/3 px-2 bg-gray-200 border-b-2">
                    最下位当選得票率
                  </td>
                  <td className="text-right w-24 px-2 border-b-2">
                    {edges.s2_last_toku_rate}%
                  </td>
                </tr>
                <tr>
                  <td className="w-2/3 px-2 bg-gray-200 border-b-2">
                    最下位当選有権者比率
                  </td>
                  <td className="text-right w-24 px-2 border-b-2">
                    {edges.s2_last_yuu_rate}%
                  </td>
                </tr>
                <tr>
                  <td className="w-2/3 px-2 bg-gray-200 border-b-2">
                    議員任期
                  </td>
                  <td className="text-right w-24 px-2 border-b-2">
                    {edges.s2_g_ninki}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {edges.s2_chou_ef_vote > 0 ? (
            <div className="mt-8 md:w-1/3 md:px-3">
              <h3>首長選挙データ</h3>
              <table className="border-2 mt-2 ml-8 md:ml-0">
                <tbody>
                  <tr>
                    <td className="w-2/3 px-2 bg-gray-200 border-b-2">
                      前回投票率
                    </td>
                    <td className="text-right w-24 px-2 border-b-2">
                      {edges.s2_chou_vrate}%
                    </td>
                  </tr>
                  <tr>
                    <td className="w-2/3 px-2 bg-gray-200 border-b-2">
                      前回有効投票数
                    </td>
                    <td className="text-right w-24 px-2 border-b-2">
                      {edges.s2_chou_ef_vote.toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td className="w-2/3 px-2 bg-gray-200 border-b-2">
                      当選者得票数
                    </td>
                    <td className="text-right w-24 px-2 border-b-2">
                      {edges.s2_chou_toku_votes.toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td className="w-2/3 px-2 bg-gray-200 border-b-2">
                      当選者得票率
                    </td>
                    <td className="text-right w-24 px-2 border-b-2">
                      {s2_chou_toku_rate}%
                    </td>
                  </tr>
                  <tr>
                    <td className="w-2/3 px-2 bg-gray-200 border-b-2">
                      連続在任期
                    </td>
                    <td className="text-right w-24 px-2 border-b-2">
                      {edges.s2_chou_re_elected}
                    </td>
                  </tr>
                  <tr>
                    <td className="w-2/3 px-2 bg-gray-200 border-b-2">
                      首長任期
                    </td>
                    <td className="text-right w-24 px-2 border-b-2">
                      {edges.s2_chou_ninki}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : edges.s2_chou_ef_vote === 0 ? (
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
                    <td className="text-right w-24 px-2 border-b-2">
                      {edges.s2_chou_re_elected}
                    </td>
                  </tr>
                  <tr>
                    <td className="w-2/3 px-2 bg-gray-200 border-b-2">
                      首長任期
                    </td>
                    <td className="text-right w-24 px-2 border-b-2">
                      {edges.s2_chou_ninki}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <p></p>
          )}
        </div>

        <Topics topics={data.allMarkdownRemark.edges} />
      </Layout>
    )
  }
}

export default senkyo2Template

export const query = graphql`
  query($slug: String!) {
    allAirtable(
      filter: { data: { s2_code: { eq: $slug } }, table: { eq: "s2_shiku" } }
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
