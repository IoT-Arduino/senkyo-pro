import React from 'react'
import {Link,graphql} from 'gatsby'
import SEO from "../components/seo"
import Layout from '../components/layout'


export default ({ data, pageContext }) => {
  const { currentPage, isFirstPage, isLastPage,totalPages } = pageContext
  const nextPage =`/blog/${String(currentPage + 1)}`
  const prevPage = currentPage -1 === 1 ? '/blog' : `/blog/${String(currentPage -1)}`

  return (
    <Layout>
        <SEO title="選挙区記事一覧" />
        <div>
        <h1 style={{display:'inlineBlock',borderBottom:'1px solid'}}>選挙区記事一覧</h1>
                <h4 className="text-right mr-5">{data.allMarkdownRemark.totalCount} Posts</h4>
                {data.allMarkdownRemark.edges.map(({ node }) => (
                    <div key={node.id} className="my-10">
                        <h3>
                        <Link to={`/posts${node.fields.slug}`}>
                          {node.frontmatter.title}</Link>
                          <span style={{ color:'#bbb'}}> - {node.frontmatter.date}</span>
                        </h3>
                        <p className="px-5 my-2">{node.excerpt}</p>
                    </div>
                ))}

                {/* pagination Links */}
                <div style={{
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'space-around',
                  maxWidth:300,
                  margin:'10px auto'
                }}>
                {!isFirstPage && (
                   <Link to={prevPage} rel="prev">
                    Prev Page
                   </Link>
                )}
                {Array.from({ length: totalPages},(_,index)=>(
                  <Link key={index} to={`/blog/${index === 0 ? "" : index + 1}`}>
                    {index + 1}
                  </Link>
                ))}
                {!isLastPage && (
                  <Link to={nextPage} rel="next">
                  Next Page
                 </Link>
                )}
                </div>
        </div>
     </Layout>
)}

export const query = graphql`

query($skip:Int!,$limit:Int!){
  allMarkdownRemark(
    skip:$skip
    limit:$limit
    sort:{fields:[frontmatter___date],order:ASC}
  ){
    totalCount
    edges{
      node {
        fields{
          slug
        }
        id
        frontmatter{
          title
          date(formatString:"MMMM Do, YYYY")
        }
        excerpt
      }
    }
  }
}
`

