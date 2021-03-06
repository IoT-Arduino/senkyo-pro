import React from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import styles from "../styles/posts.module.css"
import SEO from "../components/seo"

const PostTemplate =  ({ data: post }) =>{

  return(

    <Layout>
      <SEO title={post.markdownRemark.frontmatter.title} />
      <div className="max-w-6xl mx-auto mb-40">
        <div className={styles.post}>
          <h1>{post.markdownRemark.frontmatter.title}</h1>
          <p>{post.markdownRemark.frontmatter.date}</p>
          <div dangerouslySetInnerHTML={{ __html: post.markdownRemark.html}}  
              className="my-0" />
        </div>
      </div>
    </Layout>
  )
  }
export const query = graphql`

query($slug:String!){
    markdownRemark(fields:{
      slug:{eq: $slug}
    }) {
      html
      timeToRead
      frontmatter{
          title
          date
        }
      }
      allMarkdownRemark(filter: {frontmatter: {category: {eq: "senkyo"}}}) {
        edges {
          node {
            excerpt
            frontmatter {
              title
              date
              category
            }
          }
        }
      }

    }

`

export default PostTemplate