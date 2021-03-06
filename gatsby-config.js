require('dotenv').config({
  path:`.env`,
})

module.exports = {
  siteMetadata: {
    title: `選挙区・政党データサイト(β)`,
    description: `選挙区（衆議院比例ブロック、参議院比例ブロック、都道府県、政令都市　等）のデータおよび国政政党のデータポータルサイト`,
    author: `@Maruo`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_TRACKING_ID,
      },
    },
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
        icon: `src/images/favicon-sen.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_APIKEY,
        tables: [
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
  ],
}
