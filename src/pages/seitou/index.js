import React from "react"
import { HorizontalBar,Pie } from 'react-chartjs-2';
import { Link,graphql } from 'gatsby'
import Layout from "../../components/layout"
import SEO from "../../components/seo"

class SeitouIndex extends React.Component  {

  render(){

    return (
      <Layout>
        <SEO title="Page two" />
        <h1>政党情報一覧</h1>
        <p>Welcome to page 2</p>
        <Link to="/">Go back to the homepage</Link>
      </Layout>   
      )

    }
  }

export default SeitouIndex
