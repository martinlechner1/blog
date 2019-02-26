import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class NotFoundPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
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
          All content on this website is, unless stated otherwise, subject to
          the [BY-NC-SA
          license](https://creativecommons.org/licenses/by-nc-sa/4.0/). The
          content may therefore be copied and redistributed at any time for
          non-commercial purposes, provided my name is mentioned and the same
          license terms apply. All other content is subject to German copyright.
        </p>
      </Layout>
    )
  }
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
