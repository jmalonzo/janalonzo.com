---
categories: ["Tech", "Web", "Layout", "CSS"]
date: "2015-03-01T17:30:46+11:00"
description: "Flexbox is a new way to do layout in the web. Here are my thoughts."
draft: false
title: "Flexbox"
---

# Flexbox

I've been interested in newer web technologies lately due to my recent work
assignment. I'm not a designer per se so when I started to design this site,
I've fallen back to using [Bootstrap](http://www.getbootstrap.com) and use its
built-in styles to quickly bring up the site. Not a bad idea for an initial
conception, but as time goes by I've been wanting to get my hands dirty.

# What is Flexbox?

From [MDN](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Flexible_boxes):

> The CSS3 Flexible Box, or flexbox, is a layout mode providing for the
> arrangement of elements on a page such that the elements behave predictably
> when the page layout must accommodate different screen sizes and different
> display devices. For many applications, the flexible box model provides an
> improvement over the block model in that it does not use floats, nor do the
> flex container's margins collapse with the margins of its contents.*

That's right. It's an improvement from the age-old way of doing layout for your sites.

I think for me, one of the main reasons why I love Flexbox is that it's very
easy to conceptualize in your head, and is very easy to reason with, especially
with the CSS properties that came with it.

For example, do you want the contents of your Flexbox to wrap when it overflows?
Just add <code>flex-wrap: wrap</code> to your stylesheet. Do you want to center
content horizontally and vertically? Just add <code>align-items: center</code>
and <code>justify-content: center</code> and be done with it.

It's this familiarity, and albeit *English-like* grammar of the properties that
makes it really useful and painless to use. Try using them on your site whenever
you can. You can simplify a lot of code just by using Flexbox. I know I did.
