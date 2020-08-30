---
layout: post
title:  "flare, Flex SDK and Mac OSX"
date: 2008-03-17 00:03:00
excerpt: "I wanted to play with flare, a flash based visualization library (also based in the prefuse visualization toolkit) I discovered in eTech. I despise Eclipse and IDEs in general so I aimed for a free, command line + Textmate based environment. This is how I got it working. Not that it’s hard, but here it is in writing to avoid common pitfalls (talk about niche posts)."
oldurl: "http://arrifana.org/blog/2008/03/flare-flex-sdk-and-mac-osx/"
disqusid: "354 http://arrifana.org/blog/?p=354"
frontimage: "/assets/flare-flex-sdk-and-mac-osx-1.jpg"
categories: english tech-stuff
---

![](/assets/flare-flex-sdk-and-mac-osx-1.jpg "photo 1")

I wanted to play with [flare][1], a flash based visualization library (also based in the [prefuse][2] visualization toolkit) I discovered in eTech. I despise Eclipse and IDEs in general so I aimed for a free, command line + [Textmate][3] based environment. This is how I got it working. Not that it’s hard, but here it is in writing to avoid common pitfalls (talk about niche posts).

Note 1: I have no experience with Actionscript, Flash or Flex.

Note 2: I’m assuming you’re on Leopard, although Tiger should work fine.

Abode provides a command line based SDK (not the commercial “Builder” product) with the flash compiler, libs and frameworkds called Flex SDK, which they [opensourced][4] recently.

First of all, the recently announced [Flex 3 SDK][5] won’t work with the current version of flare. It kept complaining about “Error: could not find source for resource bundle containers” with the flare.flex module. This is apparently a known [bug][6] but who am I to say. Also, Flex 3 had problems with the compc shell wrapper. If you really wanna give it a try, get rid of the double quotes in the last line of the script (“#$” should be just #$).

So, as we speak, use [Flex 2 SDK][7] ([MTASC][8] might work too, but I lack time so you try it Won’t work, flare requires Actionscript 3). Download the file and unzip the archive to:

```
/Developer/SDKs/Flex/*
```

Add this line to your ~/.profile file for convenience:

```
export FLEX_HOME=/Developer/SDKs/Flex/
```
  
Now [get flare][9] and unzip it (I used the build 20080219 and unzipped it the /servers/flare/ but any other path will work). Edit build.xml and substitute these two lines:

Now run “ant all”. If everything goes well you should get something like this at end:

```
BUILD SUCCESSFUL
Total time: 21 seconds
```

Now [TextMate][10]. TM already has a very good [ActionScript bundle][11]. If you’re into OSX, Textmate and Flash I recommend subscribing the [maintainer’s blog][12]. So I did just two little tweaks, one to build my projects with “ant” and the other to test the .swf in Firefox. Just go the Bundle editor->Edit commands, select the ActionScript bundle, and add two commands, both under the “source.actionscript” scope:

```
  To build: Save=All Files, Commands: ant, Input: None, Output: Show as HTML, Activation: Command-B
  To test in Firefox: Save=Nothing, Commands: open -a Firefox *.html, Input: None, Output: Discard, Activation: Command-R
```

You don’t need to use ant to build your projects. You can do the same with a Makefile or with a plain simple shell script. I just followed flare’s example.

Now a simple project. Let’s use the example in [flare’s tutorial][13]. Here’s a [tarball][14] with the .as and build.xml ready to work with the described environment and Textmate. You’ll need a local webserver for this example to work (due to the flash security restrictions I could load the data from file://), you’ll figure it out from the source.

For debugging I had to install the [Flash Player with Debug][15] first. Then get this lib called [ThunderBolt][16]. It will enable logging through the great [Firebug][17] extension (which I’m assuming you have, otherwise you shouldn’t be reading this) with a simple Logger.error(“zbr..”);

Works. Hope this useful to someone.

[1]: http://flare.prefuse.org/
[2]: http://prefuse.org/
[3]: http://macromates.com/
[4]: http://labs.adobe.com/wiki/index.php/Flex:Open_Source
[5]: http://www.adobe.com/products/flex/
[6]: http://tech.kevinkaz.com/index.cfm/2007/11/2/Cairngorm-221-and-Flex-Builder-3--Missing-Resource-Bundle
[7]: http://labs.adobe.com/technologies/flex/sdk/flex2sdk.html
[8]: http://www.mtasc.org/
[9]: http://sourceforge.net/project/showfiles.php?group_id=98962&package_id=249895
[10]: http://macromates.com/
[11]: http://macromates.com/svn/Bundles/trunk/Bundles/ActionScript.tmbundle/
[12]: http://bomberstudios.com/
[13]: http://flare.prefuse.org/doc/tutorial/
[14]: http://celso.arrifana.org/uploads/Tutorial.tgz
[15]: http://www.adobe.com/support/flashplayer/downloads.html
[16]: http://code.google.com/p/flash-thunderbolt/
[17]: http://www.getfirebug.com/
