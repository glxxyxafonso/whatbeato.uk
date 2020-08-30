---
layout: post
title:  "Marteladas"
date: 2006-01-24 00:01:00
excerpt: "“Martelada” is the Portuguese word for what browser engines have to do to deal with the Web. The Web is broken in ways no one can imagine. I recently got involved in writing a small program to clone web pages and had to deal with rudimentary manual html parsing. Did you knew that:"
oldurl: "http://arrifana.org/blog/2006/01/marteladas/"
disqusid: "91 http://arrifana.org/blog/?p=91"
categories: english tech-stuff
---

“Martelada” is the Portuguese word for what browser engines have to do to deal with the Web. The Web is broken in ways no one can imagine. I recently got involved in writing a small program to clone web pages and had to deal with rudimentary manual html parsing. Did you knew that:

1. [Yahoo!’s Homepage][1] refers to URLs in anchors without parenthesis or apostrophes just to spare a few bytes (and then they have a huge 30k banner at the same time) in the form [ ?][2]

2. Saw this on [Slashdot][3]. Instead of http://poke.w3.org/ you can just link to //poke.w3.org and your browser will understand that //=http:// ? Will work with parenthesis, apostrophes or nothing.

3. In Javascript or CSS (a newly created standard) you can easily see url(” url(‘ or url(//this.works.com and they all work, apparently.

This may be common sense to any HTML parser developer or experienced web designer, but I was kind of shocked. And I’m sure there’s hundreds more.

[1]: http://www.yahoo.com/
[2]: /images/ihavestandards.gif
[3]: http://slashdot.org/
