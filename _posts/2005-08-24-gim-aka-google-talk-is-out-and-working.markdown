---
layout: post
title:  "GIM aka Google Talk is Out and working"
date: 2005-08-24 00:08:00
excerpt: "It’s old news for Internet standards but Google Talk has opened their server (not the service yet)."
oldurl: "http://arrifana.org/blog/2005/08/gim-aka-google-talk-is-out-and-working/"
disqusid: "33 http://arrifana.org/blog/?p=33"
frontimage: "/assets/gim-aka-google-talk-is-out-and-working-1.jpg"
categories: english tech-stuff
---

It’s old news for Internet standards but Google Talk has opened their server (not the service yet).

Enough to confirm it’s XMPP/Jabber. I was able to use my Gmail account both with Psi, iChat and AdiumX (libgaim based so all clients based on GAIM should work).

 * Works with plain 5222 connections but you need TLS (Gaim clients and iChat support that)
 * Works with SSL 5223 with any client, including Psi.
 * You need to set “allow plain passwords” if your client has that option.
 * S2S seems closed for the moment and no DNS SRV records are available for google.com, gmail,com or talk.gmail.com yet.
 * No agents or components can be found while browsing (disco, agents or browse) for any of those domains.

There’s some integration with the GMail webmail already, namely:

 * Common contact lists. You can see your IM buddies in your E-Mail contact list. No distintion is made. JIDs are E-mails period!
 * If you add a gmail E-mail account to your Webmail account list, the XMPP server will send you a presence subscription of type none for the new contact. I guess their client will react to that and ask a subscribe to other peer immediatly.
 * No new e-mail alerts or webbased presence icons are visible yet.

Some questions without answers (yet):

 * Which XMPP server are they using ? It’s not XCP from Jabber Inc. because we run one at .pt and it’s doesn’t behave like one. Obviously doesn’t seem like any Opensource server too. Best bet is that it’s their own work, and we’re very curious.
 * Are they opening S2S at all ? We hope we don’t see Google on the IM federation business. That’s so NOT Jabber, NOT good.
 * VoIP details ? We’ll have to wait for tomorow.
 * What kind of integration will we see with their other services Blogs, Search, AdWords, Gmail ? Google over XMPP would be very sexy !
 * Google is mainly a Web application. Is WebIM planed ? poll/bind will be supported ?
 * What will be the mid term impact of this on the Jabber community, adoption, JSF and JEP standards/adoption?
 * Will Google be the reason for closing the pubsub JEP and kickoff missing for it’s wide adoption ?

Some links:

[Pedro Melo][1]‘s my first Gmail IM buddy[Slashdot News entry][2][Smashworld][3]

And pic:

[![psi](/assets/gim-aka-google-talk-is-out-and-working-2.jpg "psi")][4]

I think this is a great day for the Jabber community and the Opensource movement in general of proportions I haven’t seem in a while, I feel happy.

PS: Their server seems to be up and down closing connections. They must be readying the beast.

[1]: http://www.simplicidade.org/notes/
[2]: http://it.slashdot.org/article.pl?sid=05/08/23/2316223&threshold=-1&tid=217&tid=218
[3]: http://www.smashsworld.com/2005/08/im-on-google-talk-right-now.php
[4]: /uploads/psi.jpg
