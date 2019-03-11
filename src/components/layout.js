import React from "react"
import { Link, StaticQuery } from "gatsby"
import { rhythm } from "../utils/typography"
import Image from "gatsby-image"

class Layout extends React.Component {
  render() {
    const { children } = this.props
    let header

    const bioQuery = graphql`
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
            }
          }
        }
      }
    `

    header = (
      <StaticQuery
        query={bioQuery}
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
                    <li style={{ marginRight: 16, marginBottom: 0 }}>
                      <Link
                        style={{
                          boxShadow: `none`,
                          color: "var(--textNormal)",
                        }}
                        to={`/blog`}
                      >
                        Blog
                      </Link>
                    </li>
                    <li style={{ marginRight: 16, marginBottom: 0 }}>
                      <a
                        style={{
                          boxShadow: `none`,
                          color: "var(--textNormal)",
                        }}
                        href={`https://twitter.com/${social.twitter}`}
                      >
                        Twitter
                      </a>
                    </li>
                    <li style={{ marginRight: 16, marginBottom: 0 }}>
                      <a
                        style={{
                          boxShadow: `none`,
                          color: "var(--textNormal)",
                        }}
                        href="https://www.linkedin.com/in/martin-lechner-01b99056"
                      >
                        LinkedIn
                      </a>
                    </li>
                    <li style={{ marginRight: 16, marginBottom: 0 }}>
                      <a
                        style={{
                          boxShadow: `none`,
                          color: "var(--textNormal)",
                        }}
                        href="https://www.xing.com/profile/Martin_Lechner37"
                      >
                        Xing
                      </a>
                    </li>
                    <li>
                      <a href={`https://github.com/${social.github}`}>Github</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          )
        }}
      />
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
        <footer>
          <Link style={{ color: `var(--textLink)` }} to={"/blog"}>
            Blog
          </Link>
          {` • `}
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
