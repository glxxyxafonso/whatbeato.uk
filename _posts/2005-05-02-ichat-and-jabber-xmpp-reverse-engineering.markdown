---
layout: post
title:  "iChat and Jabber. XMPP reverse engineering."
date: 2005-05-2 00:05:00
excerpt: "iChat and XMPP/Jabber. Well it’s weekend and I decided to waste some time on something cool (“waste” is not exactly the term as working with Jabber is part of my professional activity, but I sure could find something more useful on my top_pri_todo_lst.txt, but not as fun)."
oldurl: "http://arrifana.org/blog/2005/05/ichat-and-jabber-xmpp-reverse-engineering/"
disqusid: "5 http://arrifana.org/blog/?p=5"
frontimage: "/assets/ichat-and-jabber-xmpp-reverse-engineering-1.jpg"
categories: tech-stuff
---

**iChat and XMPP/Jabber**

Well it’s weekend and I decided to waste some time on something cool (“waste” is not exactly the term as working with Jabber is part of my professional activity, but I sure could find something more useful on my top_pri_todo_lst.txt, but not as fun).

Ok 29 of April has finally arrived, Tiger was unleashed and I just love it. One of the most exciting new features is iChat support for the Jabber protocol (aka XMPP). Since XMPP support was announced on Tiger a few months ago, I’ve been most curious on how would they implement it and which JEPs would they support, if any.

The company I work for runs a Jabber server (XCP) from Jabber Inc. for quite some time and we’ve built our own Windows IM client using and modifying a ton of JEPs. Right now we’re in very high profile with our own [Instant Messaging][5] product and I’m very interested in seeing how it could interoperate with other IM clients, specialy iChat since I’m a huge MacOSX fan.

For starters [Pedro][6] just told me he saw a post on [Julian Missig][7]‘s (the author of [Gabber][8] and Gabber2 for Linux, my favorite Jabber client for Linux in the early days) [Blog][9]  describing the basics behind iChat XMPP implementation. The article is great to start with. The debug tip is most usefull and will save me some time.

So let’s start:

**Avatars**

There’s really no perfect JEP proposal for avatars. All that I’ve seen are very bad on scaling when you tens of thousand registered users (like we do). Even using client side cache and “only retrieve when absolutely necessary” techniques, if you have a big roster you may be generating huge amounts of in-band XML data to send your avatar and receive your friend’s pictures.

There’s a lot of discussion around this on the JEP lists and things tend to forward to something around a [pubsub][10] implementation (see [JEP-0084][11] for instance) but if you wanna do it right now you might as well choose between these two most popular ones:

- [JEP-0008][12] – User Avatars
We use a very small variant of this on SAPO and we’re already experiencing the symptoms described above.
- [JEP-0054][13] – Use the vcard-temp server storage. vCards are an existing and widely used standard for personal user information data, thei’re used in Mobile phones, Desktop agendas, Internet apps, etc. Create a new vcard field and store the photo there.

Both have the same kind of problems. The second one relies more on the server and is more secure as you can only retrieve ones vcard if the user is subscribed on your roster. However vcard-temp is.. wel.. awful. For instance you cannot retrieve a special element (filter output data) of the user’s vcard, you always have to get the full data. If you a 20k photo on it, well… you get the “picture” ![:)](/assets/ichat-and-jabber-xmpp-reverse-engineering-1.jpg ":)")  Not good.

iChat uses the vcard-temp JEP to store the user’s photo, like this:

```
<iq from=’celso@sapo.pt/iChat’ id=’iChat_AFB20E9D’ to=’celso@sapo.pt/iChat’ type=’error’>
<vCard xmlns=’vcard-temp’>
<TEL><PAGER/><WORK/><NUMBER/></TEL>
<CLASS/>
<WORKCELL/>
<NICKNAME>juggler</NICKNAME>
<N><GIVEN/><FAMILY/><MIDDLE/></N>
<HOMECELL/>
<TITLE>Director</TITLE>
<LOCATION/>
<EMAIL><INTERNET/><USERID>celso@sapo.pt</USERID></EMAIL>
<URL>http://celso.arrifana.org/</URL>
<ADR><WORK/><EXTADD/><STREET/><LOCALITY/><REGION/><PCODE/><COUNTRY/></ADR>
<FN>Celso Martinho</FN>
<DESC>Nada…</DESC>
<BDAY/><MARITALSTATUS/>
<ROLE>CTO</ROLE><ORG>
<ORGNAME>PT.COM</ORGNAME>
<ORGUNIT>Direcção de Tecnologia de Produto</ORGUNIT></ORG>
<GENDER/>
<PHOTO>
<TYPE>image/jpeg</TYPE>
<BINVAL>
BASE64 binary data here with your photo
</BINVAL>
</PHOTO>
</vCard>
```

BASE64 binary data here with your photo
This should work with most servers. Ours has an Oracle xdb backend with a strict vcard schema so we had to edit it to support iChat. This is also a problem because XCP uses a generic Oracle table to store field/value vcard items and the “value” column has a max 256 bytes size. In order to store photos in there we’d had to increase that to 20k or 30k and I have to see the impact of that on lab first.

As for local iChat cache, I did a simple obvious

```
celso:~/Library$ find . -name ‘iChat*’
./Caches/iChat
./Images/iChat Recent Pictures
./Logs/CrashReporter/iChat.crash.log
./Logs/CrashReporter/iChatAgent.crash.log
Inspected and saw nothing relevant. It seems that iChat doesn’t cache vcards at all (this is scary) but further investigation is required.
```

**Presence:**

iChat uses the [JEP-0115][14]  Entity Capabilities to exchange client capabilities using embedded data in the presence packet.

```
<presence from=’leite@netcabo.pt/iChat’ to=’celso@sapo.pt’>
<priority>0</priority>
<x xmlns=’vcard-temp:x:update’/>
<c node=’apple:ichat:caps’ ver=’388′ xmlns=’http://jabber.org/protocol/caps’/>
<x xmlns=’http://jabber.org/protocol/tune’/>
</presence>

<presence from=’leite@netcabo.pt/iChat’ to=’celso@sapo.pt’><priority>0</priority>
<x xmlns=’vcard-temp:x:update’/>
<c ext=’avcap avavail maudio audio’ node=’apple:ichat:caps’ ver=’388′ xmlns=’http://jabber.org/protocol/caps’/>
<x xmlns=’http://jabber.org/protocol/tune’/>
</presence>
```

If you turn your iSight on it will add the “video” cap:

```
<presence>
<priority>0</priority>
<x xmlns=”vcard-temp:x:update”/>
<c xmlns=”http://jabber.org/protocol/caps” node=”apple:ichat:caps” ver=”388″ ext=”avavail maudio mvideo video avcap audio”/>
<x xmlns=”http://jabber.org/protocol/tune”/>
</presence>
```

**Presence and Capabilities:**

avcap – Audio video capacity. This is always sent on iChat.
avavail – Audio video available. This is always sent on iChat even if don’t have iSight.
maudio – May receive video. Always on.
mvideo – May receive audio. Always on.
audio – May send audio. This is sent if you have a microphone connected. On my powerbook it’s always sent. Can’t turn it off.
video – May send video. This is sent when your iSight is connected and turned on.

**iChat and Disco**

iChat will also answer to Disco queries and report it’s capabilities. Ie:

ICHAT RECEIVES:

```
<iq from=’morroco@sapo.pt/Casa’ to=’celso@sapo.pt/iChat’ type=’get’><query xmlns=’http://jabber.org/protocol/disco#info’/></iq>
2005-05-09 02:34:33.900 iChatAgent[15534] [XMLStream] Sent: <iq type=”result” to=”morroco@sapo.pt/Casa”>
```

ICHAT SENDS:

```
<query xmlns=”http://jabber.org/protocol/disco#info”>
<identity category=”client” type=”pc” name=”iChatAgent”/>
<feature var=”http://jabber.org/protocol/bytestreams”/>
<feature var=”vcard-temp:x:update”/>
<feature var=”http://jabber.org/protocol/si”/>
<feature var=”http://jabber.org/protocol/si/profile/file-transfer”/>
<feature var=”http://jabber.org/protocol/xhtml-im”/>
<feature var=”apple:profile:bundle-transfer”/>
<feature var=”apple:iq:vc:available”/>
<feature var=”apple:iq:vc:multiaudio”/>
<feature var=”jabber:iq:version”/>
<feature var=”apple:iq:vc:audio”/>
<feature var=”http://jabber.org/protocol/disco#info”/>
<feature var=”http://jabber.org/protocol/sipub”/>
<feature var=”apple:iq:vc:multivideo”/>
<feature var=”apple:iq:vc:capable”/>
</query>
</iq>
```

**Presence and iTunes:**

[JEP-0118][15]: User Tune. iChat uses this (**correction: **announces the xmlns http://jabber.org/protocol/tune but doesn’t, see below) to tell the other peer which iTunes music are your listening. When you play a music on iTunes, iChat sends this presence packet to the server (and the server will broadcast it to all your roster friends). The packet includes the artist name, the song name and the iTMS link for your to buy the music (if available). Very clever stuff.

```
<presence from=’leite@netcabo.pt/iChat’ to=’celso@sapo.pt’>
<status>Driving On 9 – The Breeders</status>
<priority>0</priority>
<x xmlns=’vcard-temp:x:update’/>
<c ext=’avcap avavail maudio audio’ node=’apple:ichat:caps’ ver=’388′ xmlns=’http://jabber.org/protocol/caps’/>
<x xmlns=’http://jabber.org/protocol/tune’>
<title>Driving On 9</title>
<x xmlns=’jabber:x:oob’>
<url>itms://itunes.com/album?p=27552046&i=27552037</url>
</x>
<artist>The Breeders</artist>
<source>Last Splash</source>
</x>
</presence>
```

**However: **Julian pointed out and I should have looked into it that JEP-0118 uses pubsub and NOT a presence packet extention like Apple did. Also, iChat is using the  field which is just BAD.****

**File transfer:**

File transfer JEPs are (**correction: **were! Temas pointed that most clients today implement Bytestreams well) another mess.

Some widely adopted JEPs for file transfer are:

[JEP-0066][16]: Out of Band Data. This proposal is in wide use within the available Jabber clients. It uses the XML stream to exchange file information and location but posts and downloads the file itself using out of band data (ie: an HTTP post/get). We use this JEP at SAPO.

[JEP-0065][17]: SOCKS5 Bytestreams. This is also very popular and it seems to be the current way to go. Psi implements [this][18].
Related JEPs:

[JEP-0095][19]: Stream Initiation. This is a generic proposal to negotiate in-band or out-of-band XML streams between 2 peers to use for transfer of any kind kind of data.

iChat uses both JEP-0095 to negociate the file transfer JEP and then JEP-0065 (Bytestreams) and the file transfer protocol. It uses both the Direct Connection and the Mediated Connection implementations.

**File Transfer Mediated Connection:**
I’m (celso.pt) sending a file to my friend leite.pt. We’re both under NAT routers. Here’s the result:

SENT:

Using “si” I ask Leite which stream-method we should use:

```
<iq type=”set” id=”iChat_1FFF40D4″ to=”leite@netcabo.pt/iChat”>
<si xmlns=”http://jabber.org/protocol/si” id=”sid_D4EE3AA1″ mime-type=”binary/octet-stream” profile=”http://jabber.org/protocol/si/profile/file-transfer”>
<file xmlns=”http://jabber.org/protocol/si/profile/file-transfer” xmlns:ichat=”apple:profile:transfer-extensions” name=”ichat.txt” size=”8535″ ichat:posixflags=”000001A4″/><feature xmlns=”http://jabber.org/protocol/feature-neg”>
<x xmlns=”jabber:x:data” type=”form”>
<field type=”list-single” var=”stream-method”><option>
<value>http://jabber.org/protocol/bytestreams</value>
</option>
</field>
</x>
</feature>
</si>
</iq>
```

RECEIVED:

My friend replied back telling me to use “Bytestreams” (ps: the same used by Psi).

```
<iq from=’leite@netcabo.pt/iChat’ id=’iChat_1FFF40D4′ to=’celso@sapo.pt/iChat’ type=’result’>
<si xmlns=’http://jabber.org/protocol/si’>
<feature xmlns=’http://jabber.org/protocol/feature-neg’><x type=’submit’ xmlns=’jabber:x:data’><field var=’stream-method’><value>http://jabber.org/protocol/bytestreams</value></field></x></feature></si>
</iq>
```

SENT:

Ok, lets use JEP-0065, I’ve just started a local [Socks][20] server for you, here’s the my IP and PORT for you to connect to:

```
<iq type=”set” id=”iChat_8AC064CB” to=”leite@netcabo.pt/iChat”>
<query xmlns=”http://jabber.org/protocol/bytestreams” sid=”sid_D4EE3AA1″>
<streamhost jid=”celso@sapo.pt/iChat” host=”10.0.0.100″ port=”44333″/>
</query>
</iq>
```

```
celso:~/Desktop$ netstat -an|grep 44333
tcp4       0      0  *.44333                *.*                    LISTEN
celso:~/Desktop$ lsof |grep 44333
iChatAgen 20730 celso   10u    IPv4 0x034b8244        0t0      TCP *:44333 (LISTEN)
```

RECEIVED:

leite.pt can’t obviously connect to my NAT 10.0.0.100 IP address, so return an error.

```
<iq from=’leite@netcabo.pt/iChat’ id=’iChat_8AC064CB’ to=’celso@sapo.pt/iChat’ type=’error’>
<error code=’404′ type=’cancel’>
<item-not-found xmlns=’urn:ietf:params:xml:ns:xmpp-stanzas’/>
</error>
</iq>
```

Leite got this on it’s logs:

```
2005-05-01 23:58:19.813 iChatAgent[13532] WARNING: SocketStream: CFStream error 1/61 occurred on input strea2005-05-01 23:58:19.814 iChatAgent[13532] WARNING: SOCKSStream: CFStream error 1/61 occurred on input
```

If I was on a public unfirewalled IP address, things should be fine acording the rest of JEP-0065 definition. Must read a bit more. Must find a way for iChat to announce a middleman public Socks server.

JEP-0065′s Direct Connection definition worked just fine between iChat and a Psi client on the same local network worked just fine. No more debug needed here just try it yourself.

**Gateways:**

iChat doesn’t support Gateways, well it doesn’t support browsing (you could use [Browse JEP-0011][21] or the new not so adopted [Disco JEP-0030][22]) them or registering them.. You have to use Psi or any other client that works with jabber:iq:register ([JEP-0077: In-Band Registration][23]).

After you register the Gateways, iChat will work fine with them. Our SMSIM gateway works fine too.

**Groups:**

iChats uses server side Jabber groups as definied in the main [XMPP RFC3921][24]  and they work just fine. This is great because I can aggregate all my MSN and SMS contacts on different groups.

**Still todo:**

- I’m determined to reverse engineer the Audio/Video calls using Jabber, I’ll leave this for the next free weekend.
- Multiuser chat. Haven’t had time to figure this out but I suspect bad things here.

**In conclusion:****Correction: **I still find iChat’s approach to XMPP well done although I was post-warned (thanks Julian, Justin and Temas) and confirmed that they are not only breaking some JEPs (see the iTunes implementation) but also not doing the most correct usage of the more extensible ones (see the XHTML-IM stuff).

Out of topic If you need a very good MSN gateway, use this one [PyMSTt][25] by [James Bunton][26].  We’re funding the PyMSNt project and it’s very robust we have more than 700+ concurrent users on it all the time, and growing.

One thing I miss on iChat is a plugin architecture or at least an API to extend it. No automator actions either too but I might be missing something. I know it’s not ment to be an advanced or bloated IM client but hey, leave that option to the end user. Open the doors to iChat like you did with Dashboard.

Anyway I’ve changed to iChat and dropped all the [Adiumx][27] and [ProteusX][28] of life (libgaim is soo bad implementing XMPP by the way). I still use Psi for Jabber development. If I could only use Psi’s core with the iChat’s looks and OS integration !

Also, I’ve read the MacOSX Tiger Server will include a Jabber server with it. Still don’t know which one. This is also very good news.

Now if only Google would adopt XMPP for their IM offering the rest of the world would surely thank them. I would.

Disclaimer: this article is superficial and was done in a hurry. It may include mistakes or incomplete / incorrect information.


[5]: http://messenger.sapo.pt/
[6]: http://www.simplicidade.org/notes/
[7]: http://missig.org/julian/blog/
[8]: http://gabber.sourceforge.net/
[9]: http://missig.org/julian/blog/2005/04/30/ichat-and-jabber/
[10]: http://www.jabber.org/jeps/jep-0060.html
[11]: http://www.jabber.org/jeps/jep-0084.html
[12]: http://www.jabber.org/jeps/jep-0008.html
[13]: http://www.jabber.org/jeps/jep-0054.html
[14]: http://www.jabber.org/jeps/jep-0115.html
[15]: http://www.jabber.org/jeps/jep-0118.html
[16]: http://www.jabber.org/jeps/jep-0066.html
[17]: http://www.jabber.org/jeps/jep-0065.html
[18]: http://delta.affinix.com/specs/stream.html
[19]: http://www.jabber.org/jeps/jep-0095.html
[20]: http://www.socks.permeo.com/
[21]: http://www.jabber.org/jeps/jep-0011.html
[22]: http://www.jabber.org/jeps/jep-0030.html
[23]: http://www.jabber.org/jeps/jep-0077.html
[24]: http://www.xmpp.org/specs/rfc3921.html
[25]: http://msn-transport.jabberstudio.org/
[26]: http://msn-transport.jabberstudio.org/?page=contact
[27]: http://www.adiumx.com/
[28]: http://www.defaultware.com/proteus/
