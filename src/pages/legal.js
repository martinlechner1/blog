import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { useTracking } from "../tracking/tracking"

const LegalPage = props => {
  const { data } = props
  const siteTitle = data.site.siteMetadata.title
  useTracking("/legal")

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title="Legal Notice" />
      <h1>Legal notice</h1>
      <p>
        Responsible in accordance with § 5 TMG and § 55 RfStV: <br />
        Martin Lechner
        <br />
        Klosterstrasse 6d
        <br /> 82284 Grafrath, Germany
        <br /> <a href="mailto:martin@lechner.work">martin@lechner.work</a>
        <br />
        This is a private, non-commercial website.
      </p>

      <h2> Copyright</h2>
      <p>
        All content on this website is, unless stated otherwise, subject to the{" "}
        <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
          BY-NC-SA license
        </a>
        . The content may therefore be copied and redistributed at any time for
        non-commercial purposes, provided my name is mentioned and the same
        license terms apply. All other content is subject to German copyright.
      </p>
    </Layout>
  )
}

export default LegalPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
