import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import { rhythm } from "../utils/typography"
import Image from "gatsby-image"

class Layout extends React.Component {
  render() {
    const { children } = this.props
    let header

    const NavLink = props => (
      <li style={{ marginRight: 16, marginBottom: 0 }}>
        <a
          style={{
            boxShadow: `none`,
            color: "var(--textNormal)",
          }}
          href={props.link}
        >
          {props.title}
        </a>
      </li>
    )

    const headerQuery = graphql`
      query HeaderQuery {
        avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
          childImageSharp {
            fixed(width: 100, height: 100) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        site {
          siteMetadata {
            author
            social {
              twitter
              github
              xing
              linkedIn
              flickr
            }
          }
        }
      }
    `

    header = (
      <StaticQuery
        query={headerQuery}
        render={data => {
          const { author, social } = data.site.siteMetadata
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "left",
              }}
            >
              <Image
                fixed={data.avatar.childImageSharp.fixed}
                alt={author}
                style={{
                  marginRight: rhythm(1 / 2),
                  marginBottom: 0,
                  minWidth: 100,
                  borderRadius: `100%`,
                }}
                imgStyle={{
                  borderRadius: `50%`,
                }}
              />
              <div style={{ flexGrow: 1 }}>
                <Link
                  style={{
                    boxShadow: `none`,
                    textDecoration: `none`,
                    color: "var(--textLink)",
                  }}
                  to={`/`}
                >
                  <h2
                    style={{
                      marginLeft: 20,
                      marginTop: 10,
                      marginBottom: 0,
                      width: "100%",
                    }}
                  >
                    Martin Lechner
                  </h2>
                </Link>
                <nav role="navigation">
                  <ul
                    style={{
                      flexWrap: "wrap",
                      listStyle: "none",
                      padding: 0,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "left",
                      marginLeft: 20,
                      marginTop: 10,
                    }}
                  >
                    <NavLink link="/blog" title="Blog" />
                    <NavLink
                      link={`https://twitter.com/${social.twitter}`}
                      title="Twitter"
                    />
                    <NavLink
                      link={`https://www.linkedin.com/in/${social.linkedIn}`}
                      title="LinkedIn"
                    />
                    <NavLink
                      link={`https://www.xing.com/profile/${social.xing}`}
                      title="Xing"
                    />
                    <NavLink
                      link={`https://github.com/${social.github}`}
                      title="Github"
                    />
                    <NavLink
                      link={`https://www.flickr.com/photos/${social.flickr}`}
                      title="Flickr"
                    />
                  </ul>
                </nav>
              </div>
            </div>
          )
        }}
      />
    )

    const footer = (
      <footer>
        <Link style={{ color: `var(--textLink)` }} to={"/blog"}>
          Blog
        </Link>
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
    )

    return (
      <div
        style={{
          backgroundColor: "var(--bg)",
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(32),
          padding: `${rhythm(3 / 4)} ${rhythm(3 / 4)}`,
        }}
      >
        <header>{header}</header>
        <main>{children}</main>
        {footer}
      </div>
    )
  }
}

export default Layout
