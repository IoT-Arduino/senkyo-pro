import React from "react"
import { Link,graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = (props) => {

  const s1a = props.data.s1a
  const s1b = props.data.s1b
  const s3 = props.data.s3
  const s10 = props.data.s10
  const news = props.data.allMarkdownRemark

  console.log(s10)

  return (
    <Layout>
      <SEO title="Home" />

      <div>選挙区トピックス</div>
      {news.edges.map(({ node }) => (
       <div key={node.fields.slug}>
           <h3>
           <Link to={`/posts/${node.fields.slug}`}>
             {node.frontmatter.title}</Link>
             <span style={{ color:'#bbb'}}> - {node.frontmatter.date}</span>
           </h3>
           <p>{node.excerpt}</p>
       </div>
       ))}

      <div>衆議院比例ブロック</div>
      {s1a.edges.map(({ node }) => (
        <div key={node.data.s1_code}>
            <h3>
            <Link to={`/senkyo/${node.data.s1_code}`}>
              {node.data.s1_syu_block}</Link>
            </h3>
        </div>
      ))}

      <div>県</div>
      {s1b.edges.map(({ node }) => (
        <div key={node.data.s1_code}>
            <h3>
            <Link to={`/senkyo/${node.data.s1_code}`}>
              {node.data.s1_pref}</Link>
            </h3>
        </div>
      ))}

      <div>政令指定都市</div>
      {s3.edges.map(({ node }) => (
        <div key={node.data.s3_code}>
            <h3>
            <Link to={`/senkyo/${node.data.s3_code}`}>
              {node.data.s3_shiku_chouson}</Link>
            </h3>
        </div>
      ))}

      <div>政党データ</div>
      {s10.edges.map(({ node }) => (
        <div key={node.data.s10_code}>
            <h3>
            <Link to={`/seitou/${node.data.s10_code}`}>
              {node.data.s10_seitou_name}</Link>
            </h3>
        </div>
      ))}

    </Layout>
  )

}


export default IndexPage

export const query = graphql`

query{

        s1a:allAirtable(
          filter: {data: {s1_code: {glob: "SHB*"}}, table: {eq: "s1_todou"}}
          sort: {fields: data___s1_code, order: ASC}
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

        s1b:allAirtable(
          filter: {data: {s1_code:{regex: "/^(?!S)/"}}, table: {eq: "s1_todou"}}
          sort: {fields: data___s1_code, order: ASC}
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


        s3:allAirtable(
          filter:  {data: {s3_kei_flag: {glob: "計*"}},table: {eq: "s3_seirei"}}
          sort: {fields: data___s3_code, order: ASC}
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

        s10:allAirtable(
          filter:  { table: {eq: "s10_seitou"}}
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

        allMarkdownRemark(limit: 4, sort: {fields: frontmatter___date, order: DESC}) {
          edges {
            node {
              excerpt
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