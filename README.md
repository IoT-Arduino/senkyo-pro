
<h1 align="center">
  選挙区・国政政党データサイト（β）
</h1>

## 💫 DemoSiteのアドレスと内容

[選挙区・国政政党データサイト（β）](https://senkyo-pro.netlify.com/)

### 選挙区毎の各種データ
（衆議院比例ブロック、参議院比例、政令指定都市、地方自治体（有権者数10万人以上）  
  
- 人口、年代別有権者数（棒グラフ）
- 議会議員データ（議員定数、議員報酬、議員任期）
- 議会選挙データ（前回投票率、前回有効投票数、最下位当選得票数、最下位当選得票率、最下位当選有権者比率）、議員任期
- 首長選挙データ（前回投票率、前回有効投票数、当選者得票数、当選者得票率、連続在任期、首長任期）

### 国政政党データ
- 国政政党情報比較（収入比較：棒グラフ、政党別議員数割合：円グラフ）
- 政党議員数（市区町村議会議員数、県議会議員数、衆議院議員数、参議院議員数）
- 議員数シェア（円グラフ）
- 政党の財政（項目別政党収入：円グラフ、項目別政党支出：円グラフ）

[各種データの根拠資料について](https://senkyo-pro.netlify.app/aboutData)



## 🧐 プログラム・フォルダ構成

AirTableのデータベースから、各地方自治体毎の選挙区情報のページを自動作成。  
数値データのグラフ表示はChart.jsを使用。  
CSSはtailwindcssを使用。  

src/  
　├ components/  
　├ images/  
　├ posts/  
　├ pages/  
　├ template/  
　   ├ blog-template.js  
　   ├ post-template.js  
　   ├ senkyo10-template.js  
　   ├ senkyo1a-template.js  
　   ├ senkyo1b-template.js  
　   ├ senkyo2-template.js      
　   └ senkyo3-template.js  
gatsby-node.js  
gatsby-config.js   
README.MD    
  
  
1.  **`src/components`**: header.js,seo.js,layout.js,topics.js 等

2.  **`src/images`**: 画像ファイルを保存するフォルダ。

3.  **`src/posts`**: ブログポストのマークダウンデータファイル。

4.  **`src/pages`**: 各ページの定義ファイル。

5.  **`src/template`**: 選挙区ページのテンプレートファイル。Airtableデータベースと連携。

6.  **`gatsby-node.js`**: ページの自動生成の定義情報等。

7.  **`gatsby-config.js`**: プラグインの設定情報等。
  
  
## GatsbyPlugins  

* [gatsby-plugin-prefetch-google-fonts](https://www.gatsbyjs.org/packages/gatsby-plugin-prefetch-google-fonts/?=gatsby%20google%20fonts)
* [gatsby-source-airtable](https://www.gatsbyjs.org/packages/gatsby-source-airtable/)
* [gatsby-plugin-react-helmet](https://www.gatsbyjs.org/packages/gatsby-plugin-react-helmet/?=gatsby-plugin-react-helmet)
* [gatsby-plugin-postcss](https://www.gatsbyjs.org/packages/gatsby-plugin-postcss/)
* [gatsby-plugin-purgecss](https://www.gatsbyjs.org/packages/gatsby-plugin-purgecss/)

## References 

* [Gatsby.js Official](https://www.gatsbyjs.org/)
* [Airtable](https://www.airtable.com/)
* [tailwindcss](https://tailwindcss.com/)
* [tailwind CheetSheet](https://nerdcave.com/tailwind-cheat-sheet)
* [Chart.js](https://www.chartjs.org/)
* [react-chartjs-2](https://github.com/jerairrest/react-chartjs-2)
* [chartjs-plugin-datalabels](https://chartjs-plugin-datalabels.netlify.app)

## 🚀 Deploy

Netlify





