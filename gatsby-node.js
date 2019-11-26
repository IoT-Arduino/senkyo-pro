/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path')
const { createFilePath } = require(`gatsby-source-filesystem`)

const PostTemplate = path.resolve('./src/template/post-template.js')
const BlogTemplate = path.resolve('./src/template/blog-template.js')
const senkyo1aTemplate = path.resolve('./src/template/senkyo1a-template.js')
const senkyo1bTemplate = path.resolve('./src/template/senkyo1b-template.js')
const senkyo2Template = path.resolve('./src/template/senkyo2-template.js')
const senkyo3Template = path.resolve('./src/template/senkyo3-template.js')
const senkyo10Template = path.resolve('./src/template/senkyo10-template.js')

exports.onCreateNode = ({ node,getNode,actions }) => {
    const { createNodeField } = actions
    if(node.internal.type === 'MarkdownRemark'){
       const slug = createFilePath({node,getNode,basePath:'posts'})
    
    createNodeField({
        node,
        name: 'slug',
        value: slug,
    })
    }
}

exports.createPages = async ({ graphql,actions }) => {
    const { createPage } = actions
    const result = await graphql(`
    {

        s1a:allAirtable(filter: {data: {s1_code: {glob: "SHB*"}}, table: {eq: "s1_todou"}}) {
          edges {
            node {
              data {
                s1_code
              }
            }
          }
        }

        s1b:allAirtable(filter: {data: {s1_code:{regex: "/^(?!S)/"}}, table: {eq: "s1_todou"}}) {
          edges {
            node {
              data {
                s1_code
              }
            }
          }
        }

        s2:allAirtable(filter: {data: {s2_data_flag: {eq: 1}}, table: {eq: "s2_shiku"}}) {
          edges {
            node {
              data {
                s2_code
              }
            }
          }
        }

        s3:allAirtable(filter:  {data: {s3_kei_flag: {glob: "計*"}},table: {eq: "s3_seirei"}}) {
          edges {
            node {
              data {
                s3_code
              }
            }
          }
        }

        s10:allAirtable(filter:  { table: {eq: "s10_seitou"}}) {
          edges {
            node {
              data {
                s10_code
              }
            }
          }
        }

        allMarkdownRemark{
          edges{
          node{
            fields{
              slug
            }
          }
          }
        }

    }
    `)

   const s1a = result.data.s1a.edges
   s1a.forEach(({ node: s1adata })=>{
    createPage({
        path:`senkyo/${s1adata.data.s1_code}`,
        component:senkyo1aTemplate,
        context:{
            slug:s1adata.data.s1_code
        }
    })
    })


    const s1b = result.data.s1b.edges
    s1b.forEach(({ node: s1bdata })=>{
     createPage({
         path:`senkyo/${s1bdata.data.s1_code}`,
         component:senkyo1bTemplate,
         context:{
             slug:s1bdata.data.s1_code,
             codeFilter:s1bdata.data.s1_code.slice(0,2)
         }
     })
     })

     const s2 = result.data.s2.edges
     s2.forEach(({ node: s2data })=>{
      createPage({
          path:`senkyo/${s2data.data.s2_code}`,
          component:senkyo2Template,
          context:{
              slug:s2data.data.s2_code,
          }
      })
      })

      const s3 = result.data.s3.edges
      s3.forEach(({ node: s3data })=>{
       createPage({
           path:`senkyo/${s3data.data.s3_code}`,
           component:senkyo3Template,
           context:{
               slug:s3data.data.s3_code,
               codeFilter:s3data.data.s3_code.slice(0,4)
           }
       })
       })

       const s10 = result.data.s10.edges
       s10.forEach(({ node: s10data })=>{
        createPage({
            path:`seitou/${s10data.data.s10_code}`,
            component:senkyo10Template,
            context:{
                slug:s10data.data.s10_code,
            }
        })
        })

        console.log(s10)

    const posts = result.data.allMarkdownRemark.edges
    posts.forEach(({ node: post })=>{
        createPage({
            path:`posts${post.fields.slug}`,
            component:PostTemplate,
            context:{
                slug:post.fields.slug
            }
        })
    })
    
    const postsPerPage = 2
    const totalPages = Math.ceil(posts.length / postsPerPage)

    Array.from({ length:totalPages }).forEach((_,index)=> {
      const currentPage = index + 1
      const isFirstPage = index === 0
      const isLastPage = currentPage === totalPages

      createPage({
        path:isFirstPage ? '/blog': `/blog/${currentPage}`,
        component: BlogTemplate,
        context:{
          limit: postsPerPage,
          skip: index * postsPerPage,
          isFirstPage,
          isLastPage,
          currentPage,
          totalPages
        }
      })
    })


}