import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class ReadingList extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const books = data.booksJson.books

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Books" keywords={[`books`, `scala`, `blog`, `react`]} />
        <h1>Books</h1>
        <p>This page displays a collection of books I quite enjoyed reading:</p>
        <ul style={{ listStyle: "none", marginLeft: 0 }}>
          {books.map(book => (
            <li key={book.title} style={{ paddingBottom: "1rem" }}>
              <h3 style={{ marginBottom: "0.5rem" }}>{book.title}</h3>
              <p>{book.text}</p>
            </li>
          ))}
        </ul>
      </Layout>
    )
  }
}

export default ReadingList

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    booksJson {
      books {
        title
        text
      }
    }
  }
`
