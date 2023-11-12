---
categories: english tech-stuff
date: "2008-04-21T00:04:00Z"
disqusid: 369 http://arrifana.org/blog/?p=369
excerpt: I’ve posted about personal productivity and GTD recently (in Portuguese)
  and got a lot of feedback, either from the Blog or other means (thanks all, really).
  So after a lot of testing and fiddling I think I finally settled with a nice setup
  which works for me. This post will try to describe it, in English just because the
  target audience is broader.  First of all a few notes.
frontimage: /assets/getting-things-done-part-ii-1.jpg
oldurl: http://arrifana.org/blog/2008/04/getting-things-done-part-ii/
promote: true
title: Getting things done – Part II
aliases:
- /english/tech-stuff/2008/04/21/getting-things-done-part-ii
---

![](/assets/getting-things-done-part-ii-1.jpg "photo 1")

I’ve posted about [personal productivity and GTD][1] recently (in Portuguese) and got a lot of feedback, either from the Blog or other means (thanks all, really). So after a lot of testing and fiddling I think I finally settled with a nice setup which works for me. This post will try to describe it, in English just because the target audience is broader.

First of all a few notes.

Some of this stuff, if not all, might not work for you. Each person has it’s own set of characteristics and requirements and, while for some a simple Moleskine or a set of index cards is enough, for others no, not really. So let’s start with that, my characteristics.

I’m completely E-Mail centric, it’s my primary form of communication and collaboration, it stands above the phone, paper or even real person-to-person interaction. Scary, but true. So consequentially my E-Mail client, now OSX’s [Mail.app][2], is undoubtedly my desktop soul mate. My life depends heavily on the complicity I have with this beast. I only used 3 clients in my whole life: [elm][3], [mutt][4] (elm on dopes) and Mail.app (SMTP clients that is, I’m excluding UUCP and Fidonet). It took me ages to leave mutt behind even when “powerful” graphical clients were already widely available (like [Evolution][5] or [Thunderbird][6]). I still use it occasionally. So, when [shit like this][7] happens, I stress, a lot. I get hundreds of messages per day, not counting spam.

One other tool I use to communicate professionally is IM. In my case I use the [OSX version][8] of the SAPO Messenger (the best [XMPP][9] out there, trust me). IM is very ineffective in what comes to GTD, I’ll explain this later. Work also comes in other transports: SMS, voice and paper. (No, twitter messaging still doesn’t qualify as work, sorry).

My life is mobile. I’m constantly moving from one place to another and my laptop isn’t always there. It’s meetings, travelling, late night phone calls, weekend interruptions, you name it, it’s my sad life. My mobile phone is also one my most important instruments for personal task management and messaging and It has been carefully hand picked since my first Ericsson [GA628][10]. I now use an [iPhone][11].

I have multiple contexts in my job. I’m a founder, a manager, a programmer and a sys-admin. These different contexts force me to constantly evaluate my priorities and re-organize my time, my most important (and finite, unfortunately )resource. Also, in each context I have different states. For instance, I might have taken the morning off to fix some bugs and I’ll be in a state of concentration and sequencial work, or I might be closing small late tasks and the IM is blinking, my CEO is sending me SMSes and I have a boring meeting in 10 minutes (not related).

Based on this reality, I had several requirements for my setup:

 * APIs. Sooner or later I’d want to do something funky with my data. Some XML/REST based API for whatever service I’d choose was needed.
 * Mobility. As I said. I currently use an iPhone which has a decent browser and all but I was aiming a richter integration. A subset of Mobility is Synchronization.
 * Tight E-Mail integration. IM would be nice.
 * Syndication. RSS and iCalendar, mainly.
 * Support for different contexts and status.

And the solution:

**Hiveminder:**

![](/assets/getting-things-done-part-ii-2.jpg "photo 2")

The core tool I ended up choosing was [Hiveminder][12] (thanks to those who referenced it to me). Feature wise Hiveminder is unbeatable.  It’s Web based and has everything you’d expect from a GTD application plus it provides RSS/Atom and iCalendar feeds, a mobile version of the website (with some iPhone goodies), Twitter integration, Jabber/IM integration (through a jid-bot), SMTP/E-Mail integration and a well documented and simple [web API][13] (with [OAuth][14] support). Also it supports contexts, groups, scheduled tasks, tags, reports, tinyurls and a small language to add tasks they call [braindump][15].

But the sell point lies in the [pro version][16] with their [IMAP interface][17]. For a mere well deserved  $30 USD/year, Hiveminder provides a virtual IMAP mailbox view to your tasks. But it’s not just the fact that you can see your task as normal E-mail messages that’s great. What’s killer about it is that it has virtual IMAP folders which can be used to mimic real Hiveminder actions as you drag messages to them. For instance, say you a task called “Pay bill” in your Inbox, if you drag this message to the /Actions/Hide for/Days/03 days/ folder, you’re actually manipulating the task’s properties and delaying the task for 3 days. You have virtual folders to **Complete** and **Hide** tasks, **groups** and special **braindump** folders for advanced usage. 

Add this to the fact I can define personal E-Mail addresses (as many as I want) inside Hiveminder to create specific tasks with specific properties. Think of them as buckets, each one with associated braindump. For instance, I can have [zpto1.hiveminder.com][18] which is use to create tasks under the tag “work” and another [zpto2.hiveminder.com][19] for tasks under the tag “personal”. Creating a task is as easy as sending (or forwarding) an E-mail to these addresses.

So why is this great? Well, read my characteristics and requirements again. This single feature is a three in one solution. 1. I can still be **E-mail centric** and manage all my tasks using Mail.app, my E-Mail client. I use Mail.app to create, complete, modify and categorize tasks. 2. **Mobility** solved. My iPhone (and most modern 2G/3G phones) has a very rich E-mail client, with IMAP. 3. **Synchronizations** solved. And offline operations too. It’s just E-Mail messages and IMAP operations queued and waiting for connectivity.

In fact I don’t use the Web version of Hiveminder at all.

**Zero Inbox:**

![](/assets/getting-things-done-part-ii-3.jpg "photo 3")

Ok, so managing tasks is easy and sleek now. But I still had to figure how to tame my enormous flow of daily E-Mail messages in a productive, integrated and organized way.

Short story short, the Zero Inbox is a simple concept: keep your inbox empty. This may seem trivial (some of my colleagues said to me they’ve been doing this for years) but it’s not that easy if you get an average 50 work related messages a day (I did the math, yes). Problem is, most work related E-Mails require feedback or action. In other words, they require two of your most valuable resources: time and attention. And neither are abundant. Logically if you have no way to handle them as they arrive, they’ll just stack up. My last Inbox (the root, not the folders) had a pile of 25.000 messages for the year of 2007, god knows the percentage of unanswered E-Mails it contained and the cause-consequence effects it had on my professional life.

Your Inbox is your desk. If it’s not clean it will hunt you with a feeling of personal chaos, and you’ll never catch up again until you take expensive drastic measures.

There’s lots of advice on how to keep your Inbox zeroed. [43folders][20] has a whole [series of related articles][21] on the subject that you can read, they’re very popular. I’d suggest you take 50 minutes of your time just watch [this video][22] from [Merlin Mann][23].

I followed some general advice and married the concept with Hiveminder. So here’s my strategy. To keep my Inbox empty I have to take one of 3 actions for each incoming message:

 *  If it’s trash (ie: spam or a result of a cronjob) delete it immediately.
 * If it’s just informative, read and archive. Archiving means moving the messages to the /Archive folder for eternal disregard (ok, and for Spotlight searches too).
 * If it requires an action (be it just answering the message or doing actual work first) I’ll either do it immediately because I have time or, and this is the innovative part, **just forward the E-mail to one of Hiveminder’s E-Mail addresses**, and it will auto-magically create a task with the message’s subject. After forwarding the message, I’ll just archive it and take it off the Inbox.

The delete/archive/forward decision is simple and fast. It won’t steal your concentration from other threads and it’s resource inexpensive.

The other tip I have for your regarding E-mail is to change your auto-check to 1 hour periods or more. Receiving an E-mail is an attention sucker. Just the fact that my Dock’s icon shows some number of unread E-Mails is enough to lit my curiosity sensors. Which leads me to the next subject:

**Instant Messaging**

![](/assets/getting-things-done-part-ii-4.jpg "photo 4")

I use IM for ages, both personally and professionally. In the context of work IM is anti-GTD. It’s useful for the initiator but very ineffective for the receiver. The sender uses IM to satisfy real-time, casual needs and finds in IM an easy way to get the “victim”‘s attention. Now, again, attention may be something the teens have in excess (specially for the oposite sex) but it’s not so for most hard working (and married) guys like me. IM is an attention sucker and a concentration assassin.

The other thing I find amusing about the IM is the person’s “status”. The status is ment to indicate if a person’s available to talk, or if he’s busy, or away. In the early days of IM this was sort of honored by our tech savvy friends it’s true. But today, please, for gods sake, either just remove this stupid property or reduce it to 3 standard messages: “Available to flirt”, “Busy but tolerant” and “Bug off, die far!”. Anything in between isn’t working these days, really.

So what happens when your attention gets frequently requested? You’ll be unable to do any kind of sequential work or work that requires a great deal of time and focus. If you pretend to do any of the last follow my advice: turn off your IM client or turn yourself invisible (oh yes, this “state” works fine too).

Having said this, one last thing: use [XMPP][9]. It’s the only standard open IM network and protocol available. 

Hiveminder [supports a XMPP/Jabber based bot][25]. You can add it to your buddylist and “talk” with him and list, modify or create new tasks. It’s geekish but I don’t use it, I don’t find it productive or handy because the only way to interact with it is by typing text and commands and/or using copy&paste for descriptions.

Mail.app is my world.

**Geek tool**

![](/assets/getting-things-done-part-ii-5.jpg "photo 5")

[Geektool][26] is a small OSX application which can be used to display system logs, shell command outputs, etc. in your Desktop space. Pretty nice. I use it to display my Hiveminder tasks, both work and personal, in my background, using the output of the todo.pl command. The [todo.pl][27] is simple script, provided by Hiveminder and inspired by Gina Trapani’s [todo.txt website][28], which connects to their API, logs in, and just dumps my tasks.

Having my task list on the screen, in a non-intrusive way (it’s part of the background image), is very handy. I just need to hit the exposé’s “Desktop” shortcut to get a hold of them, it’s the perfect complement for the IMAP folder.

**Calendar**

![](/assets/getting-things-done-part-ii-6.jpg "photo 6")

Hiveminder exports both RSS and iCalendar feeds. Fact is, I don’t need them. They work fine though. Maybe the iCalendar feed is useful to you if you have an iPod. I never used iCal to do task management, it sucks at it, I just use it for what it’s supposed to do best (and indeed does): manage my time.

**Mail Act-On**

![](/assets/getting-things-done-part-ii-7.jpg "photo 7")

[Mail Act-On][29] is a must-have Mail.app plugin. It associates mail rules to keystrokes. This is great to use with the Hiveminder’s virtual IMAP folders. After a few rules configured I can now complete or delay tasks with a simple keystroke. So fast. Now I don’t even need to drag the message into the correct folder with the mouse. Check my rules:

**Support**

So far Hiveminder’s support has been great. I’ve sent them two E-mails and had an answer back in a few days. On of them was a feature request for the IMAP interface (I asked the to include a X-Hiveminder-Tags header for easy filtering based on the task tags) and it was implemented in 24h. No complaints here.

**Summary**

This setup worked for me. I’ve been using it for 3 weeks now and it’s been very productive. I actually kept my Inbox near zero levels and got everyone feedback or created tasks out of their messages. I highly recommend it. 

[1]: /portuguese/tech-stuff/2008/03/19/getting-things-done.html
[2]: http://www.apple.com/macosx/features/mail.html
[3]: http://instinct.org/elm/
[4]: http://www.mutt.org/
[5]: http://www.gnome.org/projects/evolution/
[6]: http://www.mozilla.com/thunderbird/
[7]: http://the.taoofmac.com/space/links/2008/03/24/2328
[8]: http://trac.softwarelivre.sapo.pt/sapo_msg_mac
[9]: http://www.xmpp.org/
[10]: http://www.gsmarena.com/ericsson_ga_628-105.php
[11]: http://www.apple.com/iphone/
[12]: http://hiveminder.com/
[13]: http://hiveminder.com/help/reference/API.html
[14]: http://oauth.net/
[15]: http://hiveminder.com/help/reference/tasklists/braindump.html
[16]: http://hiveminder.com/pro
[17]: http://bestpractical.typepad.com/worst_impractical/2008/03/post.html
[18]: mailto:zpto1.hiveminder.com
[19]: mailto:zpto2.hiveminder.com
[20]: http://www.43folders.com/
[21]: http://www.43folders.com/izero
[22]: http://video.google.com/videoplay?docid=973149761529535925&hl=en
[23]: http://www.merlinmann.com/
[24]: http://www.xmpp.org/
[25]: http://bestpractical.typepad.com/worst_impractical/2007/11/hiveminder-on-j.html
[26]: http://projects.tynsoe.org/en/geektool/
[27]: http://hiveminder.com/news/39-todopl-or-how-i-learned-to-stop-worrying-and-love-the-command-line
[28]: http://todotxt.com/
[29]: http://www.indev.ca/MailActOn.html