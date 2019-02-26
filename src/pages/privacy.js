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
        <SEO title="Privacy" />
        <h1>Privacy</h1>
        <p>
          Responsible in accordance with the data protection laws: <br />
          Martin Lechner
          <br />
          Klosterstrasse 6d
          <br /> 82284 Grafrath, Germany
        </p>
        <h2>General information</h2>
        <p>
          As the operator of lechner.work it is important to me that you know
          exactly which personal data is collected on this website, how it is
          processed, and how you can influence it. In particular, I would like
          to stress that I have no interest in your data. These will only be
          collected and stored for technical reasons. In doing so, I adhere to
          the principle of data minimization.
        </p>
        <h2>Hosting and access log</h2>
        lechner.work is currently delivered by netlify. The terms of [netlify's
        stance](https://www.netlify.com/gdpr/) on gdpr apply. I have no access
        to any data the hoster might collect.
        <h2>SSL encryption</h2>
        When using https, the data transfer between the web server and your
        browser is encrypted using SSL.
        <h2>Cookies</h2>
        By default, no cookies are set on this website. External service
        providers that are linked to this website via iframes, for example (see
        also “Embeds or widgets”), usually set their own cookies in order to
        function better. If you do not wish to have cookies set here, I
        recommend that you deactivate the cookie function in your browser.
        <h2>Embeds or widgets</h2>
        Blog posts can contain content from other web servers, as I like to use
        specialized providers especially for media content like videos. The
        external content is usually integrated into so-called iframes, thus
        opening a connection to the servers of other companies that provide
        exactly this service. Currently, lechner.work offers embedded content
        from: <br />
        {/*YouTube, LLC, 901 Cherry Ave, San Bruno, CA 94066, USA
        (see their privacy policy) <br />*/}
        {/*Vimeo, Inc., 555 West 18th Street, New York,
        New York 10011, USA (see their privacy policy) <br />*/}
        You may find an older blog post that includes a widget from another
        company. If this is the case, I would be happy to hear from you and add
        it to the list. If you want to completely prevent your access data from
        being collected via iframes on the servers of other companies, I
        recommend a tracking blocker like uBlock Origin, which can be configured
        accordingly.
        <h2>Statistics and tracking</h2>I renounce any form of web statistics,
        tracking or fingerprinting. It does not interest me who you are, where
        you come from, where you go or how many you are.
        <h2>Information, correction and deletion</h2>
        You have the right to receive information about your personal data
        stored by me at any time. You also have the right to have your personal
        data or parts thereof corrected or deleted. To do so, send an email to
        <a href="mailto:martin@lechner.work">martin@lechner.work</a>. Please
        note that when you receive this email personal data will be stored in my
        mail account (see next section).
        <h2>Email</h2>
        If you contact me by email at{" "}
        <a href="mailto:martin@lechner.work">martin@lechner.work</a>, I will
        store all the information you send me. I do this in order to be able to
        react appropriately to your contacting me. I keep direct emails to me
        permanently in my email account, which is hosted by Protonmail in
        Switzerland.
        <h2>Modification of the data protection declaration</h2>
        comply with current legal requirements or to explain changes to my
        infrastructure. Your renewed visit will then be subject to the new
        privacy policy.
        <h2>Questions about data protection</h2>
        If you have any questions about data protection, please send an email to
        <a href="mailto:martin@lechner.work">martin@lechner.work</a>.
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
