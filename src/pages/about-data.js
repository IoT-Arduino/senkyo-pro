import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styles from "../styles/posts.module.css"

const AboutData = () => {
  return (
    <Layout>
      <SEO title="各種データについて" />

      <div className={styles.post}>
        <div>
          <h2>選挙区データについて</h2>
          <h3>１）対象地方自治体（選挙区）</h3>
          <p>
            衆議院比例ブロック、都道府県、政令指定都市、政令指定都市の区、特別区、市町村（人口10万人以上）
            <br />
            対象としていない選挙区 :
            衆議院小選挙区,県議会選挙の選挙区域,市町村（人口10万人未満）
          </p>
          <h3>２）有権者数</h3>
          <a href="https://www.soumu.go.jp/menu_news/s-news/01gyosei02_02000177.html">
            参考データ：平成30年1月1日住民基本台帳年齢階級別人口（市区町村別）（日本人住民）
          </a>
          <p>
            *年代別有権者数　10代のデータについては、18歳と19歳のみを対象とする為に、元データにある、15歳から19歳の区分データの2/5としている。したがって、実際の有権者数（選挙人数）とは厳密には異なります。
          </p>
          <h3>
            ３）地方公共団体の議会の議員（市区会議員、県議会議員）の議員報酬
          </h3>
          　
          <a href="https://www.soumu.go.jp/main_sosiki/jichi_gyousei/c-gyousei/kyuuyo/h29_kyuuyo_1.html">
            参考データ：平成２９年4月1日地方公務員給与実態調査結果(総務省）
          </a>
          　　　 　　<h3>４）投票数、開票数</h3>
          <p>各地方自治体のホームページ等を参照。</p>
          　　
        </div>

        <div>
          <h2>政党別データの根拠資料「議員数」ついて</h2>
          <h3>１）市区会議員と県会議員</h3>
          <a href="https://www.soumu.go.jp/main_content/000608468.pdf">
            参考資料：総務省の地方公共団体の議会の議員及び長の所属党派別人員調等（平成３０年１２月３１日現在）
          </a>

          <h3>２）国会議員</h3>
          <p>
            最新の選挙開票時の議席数（その後、入党、離党等により人員の増減がありますので現状と乖離があります。）
          </p>

          <h2>「収支データ」について </h2>
          <a href="http://www.soumu.go.jp/main_content/000656633.pdf">
            参考資料：平成３０年分政治資金収支報告の概要（総務大臣届出分）
          </a>

          <h3>１）収入について</h3>
          <p>
            上記資料、３　政党本部の収支規模から作成。ただし、収入合計から借入金を除いています。
          </p>

          <h3>２）支出について 一部小項目について集約表記しています。</h3>
          <p>
            光熱費と備品・消耗品費　=>　光熱費・備品費　に集約
            <br />
            政資パーティ、その他、調査研究費、寄付交付金、その他の経費　=>　その他支出　に集約
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default AboutData
