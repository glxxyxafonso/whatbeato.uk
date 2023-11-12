---
categories: english tech-stuff
date: "2005-09-27T00:09:00Z"
disqusid: 40 http://arrifana.org/blog/?p=40
excerpt: I just tried to compile speirs’s Fotobilder iPhoto Plugin to use a modified
  version of our internal (SAPO’s) API, and translate it to Portuguese. So I downloaded
  the beta from XCode2.2 and gave it try.
oldurl: http://arrifana.org/blog/2005/09/xcode2-first-steps/
title: XCode2 first steps
aliases:
- /english/tech-stuff/2005/09/27/xcode2-first-steps
---

I just tried to compile [speirs’s Fotobilder iPhoto Plugin][1] to use a modified version of our internal (SAPO’s) API, and translate it to Portuguese. So I downloaded the beta from [XCode2.2][2] and gave it try.

The last time I used a graphical IDE was on the glorious [Amiga][3] days, with the famous [SAS/C][4] compiler. I long adopted the trusty portable gnu utils/bash/gnumake/vi IDE. So I was relutant.

But [XCode][5] is beautiful. Apart for not being able to use “vi” decently, it just rocks. Without reading a single document or book, just out of common sense and knowledge I was able to install it XCode, the needed extra packages and frameworks, get the source code from [speir’s SVN][6], change the target for 10.4, edit the widgets to Portuguese, compile everything and run the program.

I even tried to build a universal binary for the [new operating system][7] spreading on the black market, which would work fine if it wouldn’t depend on [Iconara DOM][8]‘s PPC only framework.

Next step: learn [Objective-C][9]. The [FAQ][10] was a good start but any good book recommendations ?

[1]: http://www.livejournal.com/users/fraserspeirs/894516.html
[2]: http://connect.apple.com/cgi-bin/WebObjects/MemberSite.woa/wa/getSoftware?fileID=19767&source=x&code=y
[3]: http://www.amiga.com/
[4]: http://www.sas.com/products/sasc/
[5]: http://www.apple.com/macosx/features/xcode/
[6]: http://speirs.org/svn/Fotobilder/
[7]: http://www.macbidouille.com/news/2005-09-26/
[8]: http://www.iconara.net/developer/products/DOM/
[9]: http://developer.apple.com/documentation/Cocoa/Conceptual/ObjectiveC/ObjC.pdf
[10]: http://www.faqs.org/faqs/computer-lang/Objective-C/faq/