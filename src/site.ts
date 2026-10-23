export const SITE = {
  name: "Martin Lechner",
  title: "Martin Lechner",
  description:
    "Martin Lechner works on developer experience at Personio. Writing, talks and book recommendations on engineering and leadership.",
  email: "martin@lechner.work",
}

export const SOCIAL = {
  linkedIn: "https://www.linkedin.com/in/martin-lechner-01b99056",
  github: "https://github.com/martinlechner1",
  flickr: "https://www.flickr.com/photos/m4rt1",
}

export const formatDate = (date: Date) =>
  date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
