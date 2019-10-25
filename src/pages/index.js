import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Martin Lechner"
          keywords={[`portfolio`, `scala`, `blog`, `react`]}
        />
        <h2>Hi, my name is Martin,</h2>
        <p>
          functional programming advocate and full stack engineer at{" "}
          <strong>Autoscout24</strong>. I love crafting clean code, building
          great teams, coaching other folks and building data driven products.
          My tech toolbox includes Scala, Typescript, Node, React and AWS.
        </p>
        <p>
          I've been addicted to programming since school, launching my first
          bigger webapp while studying at <strong>Helmholtz-Zentrum</strong> to
          visualize biological networks. After a year at{" "}
          <strong>Telefonica Germany</strong> moving data around and analyzing
          the data warehouse, I started my first full time job at{" "}
          <strong>Jambit</strong>, a munich based software consultancy. Working
          on many different projects with good people helped my learn quite a
          lot in the time being there.
        </p>
        <p>
          When looking for a new challenge, I stumbled upon{" "}
          <strong>Autoscout24</strong>, which impressed me with their tech stack
          and full dev-ops driven approach. Being new to this mindset led to a
          steep learning curve, picking up{" "}
          <a
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: "var(--textLink)",
            }}
            href="https://medium.com/scout24-engineering/what-i-learned-in-my-first-year-at-autoscout24-57266cd3246b"
          >
            many things in my first year.
          </a>{" "}
          Currently I'm driving functional programming adoption with the
          typelevel ecosystem, building ai driven data products and coaching
          other developers.
        </p>
      </Layout>
    )
  }
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
