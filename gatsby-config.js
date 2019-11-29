require('dotenv').config({
  path:`.env`,
})

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_APIKEY,
        tables: [
          {
            baseId: process.env.AIRTABLE_BASEID,
            tableName: `PG-Salary`,
          },
          {
            baseId: process.env.AIRTABLE_BASEID,
            tableName: `PG-Demand`,
          },
          {
            baseId: process.env.AIRTABLE_BASEID_SENPRO,
            tableName: `senpro-1`,
          },
          {
            baseId: process.env.AIRTABLE_BASEID_SENPRO,
            tableName: `s1_todou`,
          },
          {
            baseId: process.env.AIRTABLE_BASEID_SENPRO,
            tableName: `s2_shiku`,
          },
          {
            baseId: process.env.AIRTABLE_BASEID_SENPRO,
            tableName: `s3_seirei`,
          },
          {
            baseId: process.env.AIRTABLE_BASEID_SENPRO,
            tableName: `s10_seitou`,
          },
        ]
      }
    },
    // `gatsby-plugin-postcss`
    {
        resolve: `gatsby-plugin-postcss`,
        options: {
          postCssPlugins: [
            require("tailwindcss"),
            // require("./tailwind.config.js"), // Optional: Load custom Tailwind CSS configuration
          ],
        },
      },
      {
        resolve: `gatsby-plugin-purgecss`,
        options: {
          printRejected: false,
          develop: false,
          tailwind: true
        },
      },
    // {
    //   resolve: `gatsby-plugin-sass`,
    //   options: {
    //     postCssPlugins: [
    //       require("tailwindcss"),
    //       // require("./tailwind.config.js"), // Optional: Load custom Tailwind CSS configuration
    //     ],
    //   },
    // },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
