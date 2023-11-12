---
categories: english tech-stuff
date: "2007-11-25T00:11:00Z"
disqusid: 272 http://arrifana.org/blog/?p=272
excerpt: Back in the Tiger days, Quartz Composer had few support for network sources.
  The RSS feed patch was pretty much the only way we had to read data from the net,
  but it was way too limited (no streaming, not event based, not extendable, no input
  or output triggers).
oldurl: http://arrifana.org/blog/2007/11/leopards-quartz-composer-and-network-events/
promote: true
title: Leopard’s Quartz Composer and Network events
aliases:
- /english/tech-stuff/2007/11/25/leopards-quartz-composer-and-network-events
---

Back in the Tiger days, Quartz Composer had few support for network sources. The [RSS feed][1] patch was pretty much the only way we had to read data from the net, but it was way too limited (no streaming, not event based, not extendable, no input or output triggers).

I needed a way to get data from the Network in the form of events that I could reuse in a quartz composition. So our resident mac programmer coded [this custom made patch][2] based on sparse non official documentation found on the internet. And it worked great. We have about 5 plasma screens with mac minis over at work running it for months, no problems whatsoever.

Now Leopard comes along and QC had a major upgrade and I’m drooling, but ironically 1. Apple publishes an [API to develop custom patches][3] (which is good news) but 2. Our patch for Tiger doesn’t work anymore and needs a rewrite.

Then I found 2 patches in the new “[Network][4]” category: Network Broadcaster and Network Receiver. They are meant to connect several qtz compositions across the network and exchange messages between them. But maybe I can use them for something else…

I wrote a quartz composition to broadcast messages using UDP and multicast and started debugging and I discovered that the packets are really simple non-crippled text messages, four bytes per character iso-latin encoded chunks. So if you want to broadcast the message “Apple”, you’ll send this over UDP “\0\0\0A\0\0\0p\0\0\0p\0\0\0l\0\0\0e”

So I wrote a small php script ([download][5]) to broadcast messages:

```
#!/usr/bin/php -q
<?php
$socket = stream_socket_client('udp://225.0.0.0:50000');
for($i=0;$i<strlen($argv[1]);$i++) $b.="\0\0\0".$argv[1][$i];
fwrite($socket,$b,strlen($argv[1])*4);
fclose($socket);
?>
```

And a sample composition to test the concept. [Download here][6] and run it on Quartz Composer. After which just type:

```
$ ./broadcast.php "message number 1"
$ ./broadcast.php "message number 2"
...
```

And happily see them scroll up your screen.

This is just a proof of concept. I rewrote all my most complex compositions to use the Network Receiver patch and they all work  fine. Using UDP over TCP is also an advantage because you don’t have to worry about the producer as the connection is stateless, and using a multicast group is great for broadcast scenarios (ie: multiple compositions on multiple computers consuming the same data).

Now imagine the possibilities and have loads of fun.

[1]: http://developer.apple.com/documentation/GraphicsImaging/Conceptual/QuartzComposerUserGuide/qc_editor/chapter_3_section_3.html
[2]: http://trac.softwarelivre.sapo.pt/broker/wiki/qtzplugin
[3]: http://developer.apple.com/documentation/GraphicsImaging/Conceptual/QuartzComposer_Patch_PlugIn_ProgGuide/index.html
[4]: http://developer.apple.com/documentation/GraphicsImaging/Conceptual/QuartzComposerUserGuide/qc_editor/chapter_3_section_3.html#//apple_ref/doc/uid/TP40005381-CH202-DontLinkElementID_13
[5]: /assets/broadcast.zip
[6]: /assets/network_leopard.zip