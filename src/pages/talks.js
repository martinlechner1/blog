import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { useTracking } from "../tracking/tracking"

const Talks = props => {
  const { data } = props
  const siteTitle = data.site.siteMetadata.title
  const talks = data.talksJson.talks
  useTracking("/talks")

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title="Talks" keywords={[`talks`, `scala`, `blog`, `react`]} />
      <h1>Talks</h1>
      <ul style={{ listStyle: "none", marginLeft: 0 }}>
        {talks.map(talk => (
          <li key={talk.title}>
            <a href={talk.link} target="_blank" rel="noopener noreferrer">
              {talk.title}
            </a>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default Talks

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    talksJson {
      talks {
        title
        link
      }
    }
  }
`
