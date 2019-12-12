import React from 'react'

export const footer = () => {
    return (
        <footer className="text-center bg-gray-300 py-2 px-2 mt-16">
          © {new Date().getFullYear()}
          {` `}
          選挙Proドットコム
        </footer>
    )
}

export default footer