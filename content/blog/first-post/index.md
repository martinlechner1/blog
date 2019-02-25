---
title: How I deployed this blog
date: "2019-02-25T22:50:32.169Z"
description: From zero to hero
---

This blog post will show you how to create and deploy a blog built with Gatsby on Netlify. This will focus on the 'glue', not the specifics of each platform. I'm also assuming that you own a domain with an admin panel, which allows you to set `CNAME` records.

## Step 0) Get familiar with Gatsby

Gatsby has a nice tutorial, please [check it out](https://www.gatsbyjs.org/tutorial/) to get familiar with the concepts.

## Step 1) Create a blog from a template

```
  npx gatsby new blog https://github.com/gatsbyjs/gatsby-starter-blog
  cd blog
  npm run develop
```

Go to http://localhost:8000 and view the result. Edit the files until you are happy.

## Step 2) Publish to GitHub

Create a new repo on GitHub and follow the instructions to publish your local blog code there.

## Step 3) Create Netlify account and link the blog repo

I used Github SSO for it. On the Admin Panel click `New Site from Git` and add your Github repo. This will create `some-cryptic-name.netlify.com`. For the blog I decided to configure the continous delivery to run from master. Configuration felt straight forward.

## Step 4) Add your domain

Now let's get to the part where I struggled a bit. Go to the Domain Managment in Netlify and click `Add custom domain`. Choose either www.yourdomain.com or xxx.yourdomain.com.

## Step 5) Add CNAME Record

Log into your domain admin panel (I'm using porkbun.com) and create a new CNAME dns record mapping the value you chose in the previous step to `some-cryptic-name.netlify.com`. Go back to Netlify panel and wait a couple of minutes until it was picked up. I did not change my nameservers to Netlify, since this might break the other configured settings on the domain. I guess this is only needed when using Netlify DNS.

## Step 6) HTTPS

Once the DNS link worked, Netlify will start creating a ssl certificate for you. It says "Waiting on DNS propagation" in the https area of the domain management. Sit back and wait a bit until `Your site has HTTPS enabled` appears. Congratulations you can visit your blog now at: https://xxx.yourdomain.com

For me it was a bit unclear that Step 6 happens automatically once Step 5 was confirmed. Overall I had a pretty smooth experience in setting this up although the DNS setup was a bit confusing at first.
