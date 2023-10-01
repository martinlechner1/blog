import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { useTracking } from "../tracking/tracking"

const BlogIndex = props => {
  const { data } = props
  const siteTitle = data.site.siteMetadata.title
  useTracking("/index")

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO
        title="Martin Lechner"
        keywords={[`portfolio`, `scala`, `blog`, `react`]}
      />
      <h2>Hi, my name is Martin,</h2>
     <p>I work on developer experience at Personio and care a lot about people, tech and good coffee.
          </p>
          </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
