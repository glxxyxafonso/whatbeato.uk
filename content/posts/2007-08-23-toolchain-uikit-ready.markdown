---
categories: english iphone tech-stuff
date: "2007-08-23T00:08:00Z"
disqusid: 237 http://arrifana.org/blog/?p=237
excerpt: Ok guys this is warning. Lots of iPhone related posts will follow. I know
  it’s sick and you’re not interested but there’s just too much fun going on here,
  sorry. This is your chance to unsubscribe this feed or drop this blog.
oldurl: http://arrifana.org/blog/2007/08/toolchain-uikit-ready/
title: Toolchain & UIKit ready
aliases:
- /english/iphone/tech-stuff/2007/08/23/toolchain-uikit-ready
---

Ok guys this is warning. Lots of iPhone related posts will follow. I know it’s sick and you’re not interested but there’s just too much fun going on here, sorry. This is your chance to unsubscribe this feed or drop this blog.

This post is dedicated to João Pavão and João Pedro. These two ([img1][1], [img2][2]) images are self-explanatory. :p

Two nights struggling with pre-alpha software, sparse docs and a couple of problems due to my “non 10.4/10.3 environment”, and I finally managed to get the iPhone toolchain, cross-compiler and frameworks working, after which compiling “my” [first native application][3] for the iPhone was easy.

For those interested (again note that I’m not using 10.4 or 10.3), I used the [MacPorts version of the toolchain][4]. You’ll  need XCode installed, of course. Then just follow these two simple steps:

```
cd /opt/local/arm-apple-darwin/include/;rm -fr CoreGraphics;ln -s /Developer/SDKs/MacOSX10.4u.sdk/System/Library/Frameworks/ApplicationServices.framework/Frameworks/CoreGraphics.framework/Headers CoreGraphics
```

Then place [this specs file][5] in /opt/local/arm-apple-darwin/etc

That’s it. Enjoy.

```
mbpcelsini:helloworld celso$ make
arm-apple-darwin-cc -c   hello.m -o hello.o
arm-apple-darwin-cc -c   HelloApplication.m -o HelloApplication.o
arm-apple-darwin-ld -lobjc -framework CoreFoundation -framework Foundation -framework UIKit -framework LayerKit -syslibroot /opt/local/arm-apple-darwin/heavenly /opt/local/arm-apple-darwin/csu/crt1.o -lSystem -lgcc_s_v6.1 -lm -L/opt/local/arm-apple-darwin/lib -larmfp -o Hello hello.o HelloApplication.o
```

[1]: http://celso.arrifana.org/iphone/imgs/DSC00225.JPG
[2]: http://celso.arrifana.org/iphone/imgs/DSC00226.JPG
[3]: http://iphone.fiveforty.net/wiki/index.php/UIKit_Hello_World
[4]: http://landonf.bikemonkey.org/code/iphone/Toolchain_In_MacPorts.20070812.html
[5]: /iphone/files/arm-cc-specs