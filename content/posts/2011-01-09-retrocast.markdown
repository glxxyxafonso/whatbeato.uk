---
categories: english tech-stuff
date: "2011-01-09T00:01:00Z"
disqusid: 580 http://arrifana.org/blog/?p=580
excerpt: Retrocast is an experiment, a proof of concept, an hack, and nothing else
  but this.
frontimage: /assets/retrocast-1.jpg
oldurl: http://arrifana.org/blog/2011/01/retrocast/
promote: true
title: Retrocast
aliases:
- /english/tech-stuff/2011/01/09/retrocast
---

Retrocast is an experiment, a proof of concept, an hack, and nothing else but this.

You may have heard of the new gaming platforms like [OnLive][1] or [Meo Jogos][2] (which the company I work for launched recently). They’re a new paradigm in what comes to gaming: you don’t need a console or an expensive PC, you’ll pay a cheap flat fee or renting cost to play the high end games, all the processing power and game rendering is done on the Datacenter and the video is streamed to your house, all in real time. All you need is a thin client to use the service which, in a simplified way, should be able to decode video and send your gamepad commands over the network to the game cloud.

Technologies like these are bleeding edge. There are many challenges related to the quality of the network, scalability, firewalls, etc, but mostly: [very low latency][3] video streaming is difficult. In order for these platforms to work, the roundtrip latency between a gamepad command (ie: you press fire) and the first video frame related to that command being rendered in your client (ie: you actually **see** the gun being fired) must be less than 100ms in order to “fool” the human brain and have the same real time experience that you would have with local consoles. It’s not easy, trust me.

I’m a sucker for retrogames, great and emerging technologies, experimentation and hacking. This idea of doing a poor man’s version of a streaming gaming on demand platform was ringing in my head for quite some time, so in a rainy weekend I decided to take matters with my own hands and glue this thing together.

#### How it works

 * It uses [Quartz Composer][4] on the (osx) server
 * It uses [Open Emu][5] (great piece of sw, btw) to run the roms
 * It uses [Websockets][6] to send the game commands, then little daemon translates the events to local UDP, which are broadcasted to quartz and catched by the network patch, which are processed by the javascript patch, which are then sent to the game emulator, as if it was a true gamepad
 * It uses a virtual camera driver, which catches the QC buffers
 * It uses a virtual sound driver
 * It uses Skype and Applescript
 * It’s fully automated, running in the corner

### In detail

#### Open Emu

First, what is Open Emu? From the website: “Open Emu is an open source project to bring game emulation to OS X as a first class citizen, leveraging modern OS X technologies such as Cocoa, Core Animation and Quartz, and 3rd party libraries like Sparkle for auto-updating. Open Emu is based on a modular architecture, allowing for game emulators as plugins, this means Open Emu can support a host of different emulation engines and back-ends while retaining a familiar OS X native front-end.”.

I’ll translate this: Open Emu is the work of geniuses, it’s a kick-ass piece of software that basically allows you to run a full emulator inside the Quartz Composer environment, giving you full modularity and control over the video and the emulator inputs (ie: keyboard).

#### Quartz Composer

QC is a visual programing environment that allows you to prototype visualizations using the powerful graphical technologies of OSX, including Quartz, Core Image/Animation, OpenGL, etc. Additionally, it provides the “artist” with a rich library of patches, connectors that you can use to interface your composition with external sources. It’s pretty powerful, but for some reason it’s not well known to many.

Here’s a screenshot of the Retrocast composition running in QC with the Open Emu patch.

![pic1.png](/assets/retrocast-1.jpg "pic1.png")

#### Skype

You know what Skype is. What you might not know is that Skype “offers” you very low-latency video (and audio) codec settings for free because of its videoconferencing capabilities.

It got me thinking that if I could use Skype to stream the games instead of a custom streaming server, not only it could solve the low latency requirement, but it would also be a darned cool setup to show off.

Well, it turns out that I managed to do just that. Here’s how:

First, with the aid of [CamTwist][7], I was able to run my Retrocast Quartz Composition, that is to say the video portal and the game emulation, inside a system’s recognized virtual camera. See [here][8] on how to do that.

Second, for the audio, I did pretty much the same thing, this time using [Soundflower][9], a free inter-application Audio routing utility for OSX. With this, I was able to capture the Quartz Composition audio and have it available as a standard OSX audio input device, as if it was a Mic.

Third, the easy part: I set up Skype to use the virtual camera and the virtual sound driver as inputs and had it running under the “retrocast” nickname.

Now, automation. Whenever someone would call “retrocast” in Skype, I would need it to auto answer that call, start the video conversation, and to hangup calls on hold too. Using the [Applescript dictionary][10] browser, I found that Skype on Mac is scriptable and supports one single command, “send”,  just enough to send commands to the application using the [Skype Public API][11], which is feature rich enough to do exactly what I need.

I had a 15 minutes Applescript class (thanks Google) and coded a loop that runs in the background and does exactly what I need.

Here’s a screenshot of Skype running.

![Skype with CamTwist and Applescript](/assets/retrocast-2.jpg "Skype with CamTwist and Applescript")

#### Controlling and Websockets

The hard part was done, but now I needed a way to actually input the game commands to the emulator through the network.

I’d been wanting to try out Websockets for some time, so here was my chance. I combined several technologies to achieve this: first, I coded the [Javascript client][12], and a small HTML[ dashboard page][13], then I coded a small daemon in PHP that would listen for Websocket connections and transcode the incoming commands into something that Quartz Composer could catch locally and use.

For this last part, I used an old hack of mine: The [QC Network events][14] protocol.

Boom, the circle was closed now. I had the emulator running, sending the video and audio through Skype, and getting the game command through a Webpage, using Websockets. Rock on baby, it worked.

Also, I was amazed (still am) with the fact that overall the latency isn’t that bad and the games are actually playable. This is impressive considering that we’re emulating a game, sending its video and audio through virtual devices to the Skype application, which streams everything via the Internet to the user, and getting the gamepad commands through javascript, in a webpage, using websockets, that are read with PHP, transcoded to UDP and sent to Quartz Composer, then interpreted (using Javascript inside QC, by the way) and then finally used by the emulator. Uff.

Here’s an high level diagram of the whole thing:

![pic1.png](/assets/retrocast-3.jpg "pic1.png")

#### Give it a try

Get your Skype client running and head up to this page [http://retrocast.labs.sapo.pt/][15]

Make sure you have a modern browser and read the instructions carefully.

If the line is busy, your call will be hung up, keep trying until you get a free slot. I hope this doesn’t get picked by a big blog. If it does, forget it, try the day after, I have one single Mac Mini handling one call at a time on a DSL line. I guess I could engineer this to handle several calls at once but that’s not fun and time is not abundant around here.

In case you can’t try it, here’s a video of what would happen.

#### Demo

{% include youtube.html id="EbTTM0W72gA" %}

#### Next Steps

When is the next free weekend?

No, seriously, using the QCView class and VLCKit with x264 is being worked on… maybe. We’re thinking HTML5 .

Also, I’ve been thinking that you can take this concept to many other crazy ideas and have endless fun at your workplace, or at events and parties.

For instance, you can use a Kinect to control the game using [OpenKinect][16] and something[ like this][17].

Or how about using [CMU Sphinx][18] to control the gameplay using your voice?

Or you can use your iPhone4 and Skype with video to make the call, that’s fun too.

Arduinos, sensors, etc. And I’m sure you can think of other ideas.

#### Conclusion

You may have noticed that this project wasn’t about hard-core coding. Some coding was needed but most of all, it was about having a good idea, knowing what was needed, hacking , experimenting and glueing stuff together.

I’ll take some credit but this small project was only possible because of the great software I used. A very special mention to Open Emu which I find beautifully well designed, many thanks to [Dan Winckler][19] and the rest of team, with whom I exchanged some emails about this project, for coding this.

Also, a quick word about the demoed games. I may have owned these roms in the very distant past but I know I’m crossing the copyright line here by using them with this. It’s all about 30 seconds of fun guys, not profit, no cease and desist letters to the geek mkay?

Hope you enjoyed this post. Questions? Fire away.


[1]: http://www.onlive.com/
[2]: http://jogos.meo.pt/
[3]: http://x264dev.multimedia.cx/archives/249
[4]: http://developer.apple.com/graphicsimaging/quartz/quartzcomposer.html
[5]: http://openemu.org/
[6]: http://en.wikipedia.org/wiki/WebSockets
[7]: http://allocinit.com/index.php?title=CamTwist
[8]: http://allocinit.com/index.php?title=CamTwist.QCInstructions
[9]: http://cycling74.com/products/soundflower/
[10]: http://developer.apple.com/library/mac//AppleScript/Conceptual/AppleScriptX/Concepts/work_with_as.html%23//apple_ref/doc/uid/TP40001568-1153006
[11]: http://developer.skype.com/accessories
[12]: http://retrocast.labs.sapo.pt/retrocast.js
[13]: http://retrocast.labs.sapo.pt/
[14]: http://arrifana.org/blog/2007/11/leopards-quartz-composer-and-network-events/
[15]: http://retrocast.labs.sapo.pt/
[16]: http://openkinect.org/wiki/Main_Page
[17]: https://github.com/stoulouse/Quartz-Composer-Open-Kinect-Plugin
[18]: http://cmusphinx.sourceforge.net/
[19]: http://danwinckler.com/