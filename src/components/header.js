import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header
    className="bg-blue-500 mb-1"
  >
    <div
      className="py-4 px-3 max-w-6xl mx-auto"
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          className="text-white no-underline px-2"
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: `選挙Pro`,
}

export default Header
