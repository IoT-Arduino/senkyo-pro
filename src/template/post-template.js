import React from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'


const PostTemplate =  ({ data: post,pageContext }) =>{
  console.log(post)
  return(

      <Layout>
          <h1>{post.markdownRemark.frontmatter.title}</h1>
          <p>{post.markdownRemark.frontmatter.date}</p>
          <div dangerouslySetInnerHTML={{ __html: post.markdownRemark.html}}  
             className="my-10" />

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