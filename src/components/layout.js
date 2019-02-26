import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: "var(--textLink)",
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `var(--textLink)`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      )
    }
    return (
      <div
        style={{
          backgroundColor: "var(--bg)",
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(32),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header>{header}</header>
        <main>{children}</main>
        <footer>
          <a
            style={{ color: `var(--textLink)` }}
            href={`https://twitter.com/m4nl5r`}
          >
            Twitter
          </a>
          {` • `}
          <a
            style={{ color: `var(--textLink)` }}
            href={`https://github.com/martinlechner1`}
          >
            Github
          </a>
          {` • `}
          <a style={{ color: `var(--textLink)` }} href="/rss.xml">
            RSS Feed
          </a>{" "}
          {` • `}
          <Link style={{ color: `var(--textLink)` }} to={"/legal"}>
            Legal notice
          </Link>
          {` • `}
          <Link style={{ color: `var(--textLink)` }} to={"/privacy"}>
            Privacy
          </Link>
        </footer>
      </div>
    )
  }
}

export default Layout
