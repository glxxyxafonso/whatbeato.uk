---
categories: retrocomputing
date: "2023-10-12T14:08:00Z"
title: Hacking a cheap video upscaler
---

The ingenuity of combining open-source and open hardware in retro computing is a force of creativity and marvel these days.

One of the conundrums with running old computers nowadays is how you display video. I love CRT monitors; I'm a proud owner of a classic [1084S](https://www.c64-wiki.com/wiki/Commodore_1084) that I use with my [C128DCR](https://www.c64-wiki.com/wiki/C128DCR), but they're not easy to find in good condition, are expensive, and are increasingly prone to failure with passing years.

One convenient option is using LCDs instead. To do so, though, you need to convert the old computer's video, typically lower resolution composite or RBG signals using ~15Khz vertical scan rates, to things like VGA at 31Khz or HMDI. 

GBS-8220 is a popular video upscaling device in the retrocomputing community. It's very cheap (hence popular); you can get it for 25 Euros [on Amazon](https://www.amazon.es/s?k=GBS-8220), but it's also horrible. I had one. It's slow, only sometimes works, gets out of sync easily, and so on. However, it has a pretty decent controllable video chip inside.

This weekend I got an upgrade. Good quality video upscaling equipment can cost hundreds of Euros, but I got mine for about ~40 Euros and one soldering iron. The trick? GBS-Control.

[Gbs-control](https://github.com/ramapcsx2/gbs-control) is an alternative firmware for Tvia Trueview5725 based video upscalers like the GBS-8220 that drastically upgrades the device with semi-professional features like very low lag, better video synchronization, on-demand motion adaptive deinterlacing, and great controls over the video settings. It even has a web-based UI you can access from your mobile phone.

To get it working, you need an ESP8266 board like the NodeMCU and an optional external Si5351 [clock generator](https://github.com/ramapcsx2/gbs-control/wiki/Si5351-Clock-Generator-install-notes) for extra precise frequency handling, both costing only a few more Euros. It takes about one hour of soldering and flashing the ESP, and you get an excellent, fully featured, fast video upscaler that works with all your retro computers and consoles.

This is how it started. I used NodeMCU ESP and Si5351 clock generator I bought from Amazon.

![](/assets/gbscontrol1.jpg)

After some wiring, soldering and lots of flux, here it is working, about 30 minutes later.

![](/assets/gbscontrol2.jpg)

Driving a modern LCD via VGA, from my Amiga 1000 15Khz RGB signals, full screen, crazy fast no lag or artifacts I can notice.

![](/assets/gbscontrol3.jpg)

And the Web UI that you can access to control every little detail you can imagine, here using the debug view. Another great feature of GBS-control is that you can save profiles with different settings for different devices.

![](/assets/gbscontrol4.png)

The [Wiki](https://github.com/ramapcsx2/gbs-control/wiki/Build-the-Hardware) has all the steps explained. This [video from RetroRGB](https://www.youtube.com/watch?v=fmfR0XI5czI) goes through the installation too.
