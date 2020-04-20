import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { library } from '@fortawesome/fontawesome-svg-core'
import { faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons"

export const footer = () => {
    return (
        <footer className="text-center bg-gray-300 py-3 px-2 md:flex justify-around">

        <div>
          © {new Date().getFullYear()}
          {` `}
          選挙区・政党データサイト(β)
        </div>

        <ul className="flex justify-center mt-3 md:mt-0">
            <li className="mr-3">
              <a href="https://twitter.com/DengenT?lang=ja">
                <FontAwesomeIcon
                  icon={faTwitter}
                  style={{ color: "#777", fontSize: "1.2rem" }}
                />
              </a>
            </li>
            <li>
              <a href="https://github.com/IoT-Arduino/senkyo-pro">
                <FontAwesomeIcon
                  icon={faGithub}
                  style={{ color: "#777", fontSize: "1.2rem" }}
                />
              </a>
            </li>
          </ul>

        </footer>
    )
}

export default footer