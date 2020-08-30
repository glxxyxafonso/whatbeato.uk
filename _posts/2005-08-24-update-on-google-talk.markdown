---
layout: post
title:  "Update on Google Talk"
date: 2005-08-24 00:08:00
excerpt: "Well it’s out and lots of question have been answered both with the availability of the service and with a minimalist Developers FAQ on the site."
oldurl: "http://arrifana.org/blog/2005/08/update-on-google-talk/"
disqusid: "34 http://arrifana.org/blog/?p=34"
frontimage: "/assets/update-on-google-talk-1.jpg"
categories: english tech-stuff
---

Well it’s out and lots of question have been answered both with the [availability][1] of the service and with a minimalist [Developers FAQ][2] on the site.

In a nutshell:

 * S2S and DNS SRV records are turned off. They don’t clarify if they’re going to open them, many speculate they will. For now they ask us to send them an E-Mail asking for federation. I did and received an Automatic reply with a ticket ID.
 * When we invite a friend to GMail from our account, regardless of it’s E-Mail domain (initially I thought It would happen to .com contacts), it’s added to the XMPP roster. This is weird because they don’t have XMPP S2S open yet so I can’t IM them. But it’s the proof Gmail has a strong unified contact list engine behind the scenes.
 * There’s a [group][3] for Google Talk discussions available.
 * There’s some people asking for [Asterisk’s][4] native protocol [IAX][5] too.
 * The VoIP/SIP people is wondering if they’re going to use [ENUM][6] which would open the service further and contribute for interoperability.
 * There are rumours that iChat could do voice call to Google Talk. Not true. Hoax.
 * There’s no offline messages support. Rather than that, Google’s client uses GMail’s Webmail to send an E-Mail to your offline buddies.
 * VoIP implementation and relationship with XMPP as not *yet* been reverse engineered but it’s on many people’s TODO.list, including mine.
 * Just crossed my mind that if you want, you now have a very easy and well [documented][7] API to authenticate Gmail E-mail’s credentials.
 * As you would expect from using XMPP you can logon with as many clients as you want (tried two) with the same account at the same time.
 * People talked to me about Google Desktop integration but I haven’t checked.
 * File transfers and avatars are not supported by Google’s client yet, so no JEP adoption advocacy for now ![:)](/assets/update-on-google-talk-1.jpg ":)")
 * Google’s client uses [JEP-0115][8] to query/inform the other peer’s client capabilities and reports the “voice-v1″ capability.
 * Google’s client doesn’t respond to disco queries.
 * Google’s client doesn’t send or react to jabber:x:event messages.

**UPDATE**: There’s an interesting [thread][9] going on the JSF members list. And a [reply from stpeter][10] which I fully subscribe.

[1]: http://www.google.com/talk/
[2]: http://www.google.com/talk/developer.html
[3]: http://groups.google.com/group/google-talk-open
[4]: http://www.asterisk.org/
[5]: http://www.cornfed.com/iax.pdf
[6]: http://www.ietf.org/rfc/rfc2916.txt
[7]: http://www.ietf.org/rfc/rfc3920.txt
[8]: http://www.jabber.org/jeps/jep-0115.html
[9]: http://mail.jabber.org/pipermail/members/2005-August/003336.html
[10]: http://mail.jabber.org/pipermail/members/2005-August/003347.html
