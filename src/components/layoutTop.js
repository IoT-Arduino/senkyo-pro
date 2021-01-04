import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from "./footer"
import "../styles/tailwind.css"

const LayoutTop = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQueryTop {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        siteTitle={data.site.siteMetadata.title}
        className="sm:text-xl text-2xl"
      />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}

LayoutTop.propTypes = {
  children: PropTypes.node.isRequired,
}

export default LayoutTop
