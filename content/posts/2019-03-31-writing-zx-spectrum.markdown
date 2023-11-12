---
categories: retrocomputing
date: "2019-03-31T00:08:00Z"
excerpt: I’m a sucker for all things 8-bit. I had multiple Spectrum and C64 machines
  in my youth (still own a few today) and at that age, I was somewhat proficient at
  BASIC, Z80 and 6510 assembly code.
title: Writing a ZX Spectrum game
aliases:
- /retrocomputing/2019/03/31/writing-zx-spectrum
---

![](/assets/zx1.gif "zx1")

As part of our [T-shirt challenge][1] this year at Pixels Camp, we decided that one of the steps would require the hunter to access some sort of retro-computer in the venue, enter some secret codes, and get the instructions for the next step, if successful.
As some of you know, I’m a sucker for all things 8-bit. I had multiple Spectrum and C64 machines in my youth (still own a few today) and at that age, I was somewhat proficient at BASIC, Z80 and 6510 assembly code. I remember the days when all we had were the occasional [programming magazine][2] in the kiosk and the help of our close-by IRL friends. There was no Internet, no online PDFs, nothing. Access to information was expensive and scarce.

![](/assets/zx2.jpg "zx2")

One day my parents offered me the Bible, [The Complete Spectrum ROM Disassembly][3] book. They couldn’t have imagined then that they were doing a big mistake and heavily contributing to the formation of my acute INTP Myers Briggs profile.

Obviously, I basically disappeared from planet earth for months to come. The same happened with the C64 and later with the Amiga.

Fast forward to today, for reasons I can’t quite explain or agree with, the team at Bright Pixel has long revoked my right to code. They argue nonsense stuff like technical debt issues, refactoring risks, lack of testing and other excuses. It seems they rather see me managing and running the company than putting my state of the art tech talent at the service of our projects. Go figure.

But they couldn’t stop me coding a ZX Spectrum game, could they?

No, they couldn’t.

## Here’s the story

![](/assets/zx3.jpg "zx3")

First, we needed a working ZX Spectrum. We took the dust off of a few machines we had laying around at my place and in our hardware museum. In total, we initially gathered an original ZX Spectrum 48K, a Sinclair ZX Spectrum+, and a powerful ZX Spectrum 128K.

When we turned them on to see if they worked, we found out that they kind of didn’t. One would boot but had a faulty keyboard, the other wouldn’t boot at all, and the other would boot but required some weird ULA warming up before it worked properly (a [common problem][4] with some models, we came to discover).

A few scavenger sessions later, after swapping keyboard membranes, cutting and fixing their broken connection ribbons, and learning their tricks, we finally got the 48K and the 128K fully working.

Next up, better image quality.

We needed to get rid of the RF signal and use video composite instead. Hacking the 48K was easy, it’s a well-known mod that only requires a soldering iron, a wire cutter and a bit of patience. The 128K was even easier. It turns out that its DIN connector has an available video composite pin, all we needed to do was solder a simple DIN to RC cable, and voilà, crisp video.

### Loading the program

![](/assets/zx4.jpg "zx4")

Now on to load a program to the computer. This turned out to be quite a task. You kids wouldn’t remember, but back then, most programs and games were loaded to 8-bit computers like the ZX Spectrum using audio cassettes and tape players like the one in the picture.

Loading a cassette game was in itself a challenge.

First, the cassette needed to be in good conditions (tape tends to demagnetize and deteriorate over time very easily, we often had to copy our favorite games to backup cassettes, just in case); second the tape player needed the right volume and pitch settings in order to work well with the computer modem, and last the azimuth of the tape player head had to be properly calibrated. If any of these factors failed, then we would get the infamous dreaded “R Tape loading error, 0:1” message and would need to restart the process all over again. Side note, a typical 48K game would take about 5–10 minutes to load from tape.

![](/assets/zx5.jpg "zx5")

Today, however, we don’t use tape players or cassettes anymore. Instead we decode and “play” [TZX files][5] (a common file format for preserving computer tapes of the ZX Spectrum and C64), or simply play a WAV audio file, from a modern computer or a mobile phone’s sound output directly to the ZX Spectrum modem input jack, which means that we don’t have to worry about the tape quality or the azimuth anymore.

We do have to worry about other things though. One is the tape leads, which need to be mono, not the commonly available stereo ones we have today, and the other is still the volume and pitch of the audio. Long story short, most mobile phones we tried didn’t work. Either the volume was too low, or the mono cable wouldn’t work with the phone jack.

We tried a Raspberry Pi for the job but it didn’t work either. Volume was too low, and worse, the BCM2835’s PWM sound quality was terrible (the RPi doesn’t have a DAC. It uses PWM fed into a low pass filter to produce analogue audio), and the ZX Spectrum didn’t like it.

After spending some time fiddling with different setups, we finally got one right:

* Raspberry Pi with a [USB sound adapter][6] for better quality, volume maxed, using the playtape tool, from the [tape2wav][7] utilities, to play TZX files directly to the sound output.
* Connected to a [pre-amp mixer table][8] with proper stereo and mono cables.
* Connected to the ZX Spectrum “ear” input jack.
* Connected to a [1084S-D1 monitor][9] (the best analog computer monitor ever made, hands off) over composite video.

![](/assets/zx6.jpg "zx6")

> ZX 48K + Raspberry Pi + Pre-amp

![](/assets/zx7.jpg "zx7")

> ZX Spectrum 128K connected to 1084S using Video Composite, via its DIN connector

### Coding the program

My first approach to writing the ZX Spectrum program was to use [ZX80Asm][10] and go low level machine code all the way, but I quickly realized this route would require me more than a week to get up to date and get the things done.

Then I found [ZXBasic][11], a Sinclair ZX Spectrum BASIC compiler for modern systems where you can use both an improved BASIC language and inline Z80 assembly where it makes sense, generate a compiled and optimized binary and pack it into a ready to use TZX file. Pretty cool. Active community around it too.

I also found [Colorator][12], a graphics editor that allows you to import PNG files, paint them, and then export to ZX Spectrum [SCR screen files][13].

![](/assets/zx8.png "zx8")

Isa took the bite and designed the 8-bit graphics, a generic Pixels Camp logo, and two Lost inspired screens.

I had to revisit how the ZX Spectrum [screen layout][14] works and write a [small tool][15] to convert the SCR files into buffers that I could use to feed the fast [assembly sub-routines][16] to draw and paint the screen; this took me a while, but it was fun. Low level is fun.

Now that I had all the pieces in place, putting them together and code the rest of the logic was easy.

You can find the code, the resources, and a working TZX file which you can feed to an emulator or a real machine here, in this [Github repository][17].

You can also read more about our Pixels Camp v3.0 T-shirt [challenge here][18].

![](/assets/zx9.png "zx9")

> The final result, running in Pixels Camp

I hope you enjoyed this write up. Doing this was nostalgic and fun; it reminded me of the good old days when programming required understanding the machine internals, all the way to the silicon chips, CPU instructions, registers, interrupts and memory maps. I miss that.

If I find the time, I might take the challenge and go for a C64 game next.

[1]: https://killmaster.github.io/2019/03/24/the-tshirt-challenge
[2]: https://en.wikipedia.org/wiki/Input_(magazine)
[3]: http://www.worldofspectrum.org/infoseekid.cgi?id=2000076
[4]: https://spectrumforeveryone.com/technical/zx-spectrum-ula-types/
[5]: https://www.worldofspectrum.org/TZXformat.html
[6]: https://www.amazon.com/Vention-Headphone-Microphone-Raspberry-Ultrabook/dp/B07CTDMMCT
[7]: https://github.com/leiradel/tape2wav
[8]: https://www.amazon.co.uk/Behringer-802-Input-Bus-Mixer/dp/B000J5XS3C
[9]: https://archive.org/details/Commodore_1084S_Monitor_Users_Guide_1988_Commodore
[10]: https://www.nongnu.org/z80asm/
[11]: https://github.com/boriel/zxbasic
[12]: https://github.com/yomboprime/colorator
[13]: http://www.zx-modules.de/fileformats/scrformat.html
[14]: http://www.overtakenbyevents.com/lets-talk-about-the-zx-specrum-screen-layout/
[15]: https://github.com/PixelsCamp/tshirt-gate/blob/master/2019/zxspectrum/tools/convert.js
[16]: https://github.com/PixelsCamp/tshirt-gate/tree/master/2019/zxspectrum/lib
[17]: https://github.com/PixelsCamp/tshirt-gate/tree/master/2019/zxspectrum
[18]: https://killmaster.github.io/2019/03/24/the-tshirt-challenge