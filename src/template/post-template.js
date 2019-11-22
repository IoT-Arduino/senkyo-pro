import React from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'


const PostTemplate =  ({ data: post,pageContext }) =>{
  console.log(pageContext)
  return(

      <Layout>
          <h1>{post.markdownRemark.frontmatter.title}</h1>
          <h4>{post.markdownRemark.timeToRead} {post.markdownRemark.timeToRead > 1 ? "minute" : "minutes" }</h4>
          <div dangerouslySetInnerHTML={{ __html: post.markdownRemark.html}}   />

          <div>{post.allMarkdownRemark.edges[0].node.frontmatter.title}</div>
          <div>{post.allMarkdownRemark.edges[1].node.frontmatter.title}</div>

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