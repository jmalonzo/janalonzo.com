+++
date = "2017-04-05T19:26:39+10:00"
description = "Goog's canary release engineering"
categories = ["Tech", "Release Engineering", "Bookmarks"]
title = "Google Canaries"
draft = false
+++

There are some interesting release engineering and strategies in Google Cloud's blog post [How release canaries can save your bacon - CRE life lessons](https://cloudplatform.googleblog.com/2017/03/how-release-canaries-can-save-your-bacon-CRE-life-lessons.html).

For example, on canary'ing web clients:

> One solution is to version your JavaScript files (first release in a /v1/ directory, second in a /v2/ etc.). Then the rollout simply consists of changing the resource links in your root pages to reference the new (or old) versions.

... which is a great alternative to individually-hashed assets.
