---
layout: layout.liquid
home: true
footer: Copyright © 2020 Jan Michael Alonzo
sidebar: false
title: Jan's Log
---

## whoami

I'm Jan Michael and I love [tech](https://github.com/jmalonzo), [photography, and travel](https://instagram.com/jmalonzo).

I'm a [Senior Dev](https://linkedin.com/in/jmalonzo) at [Taguchi](http://www.taguchi.com.au). I do [twitter](https://twitter.com/jmalonzo) occasionally.

My [PGP public key](https://keybase.io/jmalonzo)

## recent

<ul class="recent__lists">
{% assign logs = collections.logs | reverse %}
{% for post in logs limit:10 %}
<li>
    <a href="{{ post.url }}">{{ post.data.title }}</a>
    <em>{{ post.date | date: "%Y-%m-%d" }}</em>
</li>
{% endfor %}
</ul>
