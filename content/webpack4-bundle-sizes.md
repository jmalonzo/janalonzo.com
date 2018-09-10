---
draft: false
title: "Webpack 4 bundle sizes"
categories: ["Webpack"]
description: "Tweaking Webpack 4 bundle size"
date: 2018-03-23T19:00:00+11:00
---
# Webpack 4 bundle sizes

**TL;DR**: Analyze your Webpack bundles and tweak the default settings to achieve your performance goals. The default webpack settings are great but you can squeeze more out of it if need be.

Earlier this week I got curious and started looking at our app bundles. A week or so ago we upgraded [Webpack](https://webpack.js.org) to version 4 and I was wondering if our production performance is similar or better to Webpack v3, and was surprised that our entry point bundle is bigger in v4 than in v3!

We did a lot of work in ensuring that our app loads in less than 2 seconds in Webpack v3 and below. We had multiple CommonChunks to ensure that our First Meaningful Paint is around 1.5 seconds or at least less than 2s. In essence, we kept our vendor and entry chunks as small as possible to achieve these goals.

In version 4, we had to throw away our CommonsChunk setup since the new version doesn't support it anymore, and instead have bundling defaults that are probably good enough for most cases but requires more tweaking to achieve what I wanted for our app.

Analyzing our bundles with [bundle-buddy](https://github.com/samccone/bundle-buddy), I'm seeing a (26k-sized) node package included in at least 7 bundles! Well, that's not right. The app is an SPA and including redundant code in 7 bundles just loads more code than it needs to. The surprising thing here is most of the third-party code was correctly placed in a vendor bundle except for this one.

In v4, there's a *splitChunks* config to specify a minimum chunk size before webpack needs to split the bundle. The option is *minSize* and the default is 30000 (bytes). So in this case, I wanted to force webpack to put the package in the vendor bundle so I tweaked the *minSize* to 25000. Sure enough that worked and the results from bundle-buddy was clear of any oversized third-party code.

My next task will be looking at *cacheGroups* and split the vendor code as that's one of the biggest chunks in the app to date. Webpack now looks at bundle size and even though that makes sense for most cases, sometimes bundle groupings are more important where it makes sense, regardless of package size.

