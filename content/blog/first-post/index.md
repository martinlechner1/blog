---
title: How I deployed this blog
date: "2019-02-25T22:50:32.169Z"
description: From zero to hero
---

As first blog post I thought it would be cool to give a rough overview on how this is built and deployed. It will more or less focus on the 'glue' of deploying a Gatsby.js webapp on netlify using your own domain.

## Get familiar with Gatsby

Gatsby has a nice tutorial, please [check it out](https://www.gatsbyjs.org/tutorial/) to get familiar with the concepts. It might be cool to have some experience with React.

## Create a blog from a template

I used the node 10 and npm 6 to run the following commands, which kickstart your blog from a template.

```
  npx gatsby new blog https://github.com/gatsbyjs/gatsby-starter-blog
  cd blog
  npm run develop
```

Go to http://localhost:8000 and view the result. Edit the files until you are happy. You might want to change the pictures, twitter links and maybe add legal and privacy pages (especially in Germany...).

## Publish to GitHub

Create a new repo on GitHub and follow the instructions to publish your local blog code there. My blog sources are found [here](https://github.com/martinlechner1/blog)

## Create Netlify account and link the blog repo

I used Github SSO to sign up to netlify. On the Admin Panel click `New Site from Git` and link your Github repo. This will create `some-cryptic-name.netlify.com`. For the blog I decided to configure the continous delivery to run from master. Configuration felt straight forward by clicking around in the ui.

## Add your domain

This is the part where I struggled a bit. Go to the Domain Managment in Netlify and click `Add custom domain`. Choose either www.yourdomain.com or xxx.yourdomain.com.

## Configure CNAME Record on your domain

Log into your domain admin panel and create a new CNAME DNS record mapping the value you chose in the previous step to `some-cryptic-name.netlify.com`. Go back to Netlify panel and wait a couple of minutes until it was picked up. The domain name becomes green when it has been confirmed. Note: I did not change my nameservers to Netlify, since this might break the other configured settings on the domain. I guess this is only needed when using Netlify DNS for some of the advanced features on the platform.

## HTTPS

Once the DNS link worked, Netlify will start creating a SSL certificate for you. It says "Waiting on DNS propagation" in the https area of the domain management. Sit back and wait a bit until `Your site has HTTPS enabled` appears. Congratulations you can visit your blog now at: https://xxx.yourdomain.com

## Verdict

For me it was a bit unclear that Step 6 happens automatically once Step 5 was confirmed. Overall I had a pretty smooth experience in setting this up although the DNS setup was a bit confusing at first. I immediately felt home in Gatsby, being already familiar with the techstack (React, Graphql). I can really recommend looking into it and playing around, especially since everything is free.
