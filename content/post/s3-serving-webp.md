+++
categories = ["Tech", "WebP", "Web", "AWS", "HTML5"]
date = "2014-12-12T12:08:12+07:00"
description = "How to serve both WebP and JPEG in an S3/Cloudfront static site"
draft = false
title = "Serving WebP & JPEG in a static S3 site"
+++

Part of why I built this site is so I can share the moments everytime
I go and shoot sunrise. I want people,
especially my family and friends, to see how beautiful the world is
and so that they too can enjoy what I've seen that morning or evening
(if it's a sunset shoot).

Recently, my *other half* ~~complained~~told me that she's unable to
view my pics because her internet is too slow. For me this was just
unacceptable because I want her to see my photos too, especially since
we're in an LDR. And since I thought the images are already small and
have already exhausted all the image optimization techniques I could
think of, where else do I go from here?

Enter [**WebP**](https://developers.google.com/speed/webp/?csw=1).

Playing around with WebP and figuring out how much savings I'd get by
serving WebP images in addition to JPG, the space and time savings I
saw was just fantastic from an optimization perspective. Some of the
images even compress to as much as 50% from the original JPG. Multiply
those savings to the number of photos I have now and in the future,
that's a huge win in terms of page load time and web hosting cost. So
it definitely convinced me that I really need to serve WebP alongside
JPG. But how? [AWS](https://aws.amazon.com) S3/Cloudfront is great but
it doesn't support Content Negotiation if your site is being served
from an S3 bucket such as this one. I surely don't want a backend
server because that defeats having a cost-effective site in the first
place.

Enter the [**&lt;picture&gt;**](http://www.html5rocks.com/en/tutorials/responsive/picture-element/) element.

The **&lt;picture&gt;** element is a new HTML5 element created to
support responsive images on the web and is also great for ***art
direction***. It allows you to use the powerful
[**img srcset**](http://caniuse.com/#feat=srcset) in a very flexible
way. But another benefit and advantage of the picture element is its
availability to serve different types of image formats according to
your needs via the **&lt;source&gt;** *type* attribute . Since it's
basically markup, all you need to do is to add *type="image/webp"* to the
*&lt;source&gt;* element and the browser takes care of serving the
necessary image type as per the image types the browser supports. No
need to launch a backend server instance just so you can serve
**WebP**.

Since *&lt;picture&gt;* is still new, I suggest that you use a
polyfill such as
[picturefill](https://github.com/scottjehl/picturefill) so you can use
the *&lt;picture&gt;* element today!
