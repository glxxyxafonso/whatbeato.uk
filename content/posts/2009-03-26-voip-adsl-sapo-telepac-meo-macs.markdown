---
categories: portuguese tech-stuff
date: "2009-03-26T00:03:00Z"
disqusid: 441 http://arrifana.org/blog/?p=441
excerpt: Há já algum tempo que os clientes ADSL da PT são “brindados” com um número
  VoIP (ou numeração 30, se preferirem).
frontimage: /assets/voip-adsl-sapo-telepac-meo-macs-1.jpg
oldurl: http://arrifana.org/blog/2009/03/voip-adsl-sapotelepacmeo-macs/
title: VoIP ADSL SAPO/Telepac/Meo & Macs
aliases:
- /portuguese/tech-stuff/2009/03/26/voip-adsl-sapo-telepac-meo-macs
---

![voip1](/assets/voip-adsl-sapo-telepac-meo-macs-1.jpg "voip1")

Há já algum tempo que os clientes ADSL da PT são “brindados” com um número VoIP (ou numeração 30, se preferirem).

Na configuração mais típica o cliente tem tudo configurado no *router* em casa e só tem que ligar o velho telefone analógio na parte de trás para usufruir do novo número.

Para os mais internautas o SAPO oferece aos utilizadores de *windows* um cliente de messaging que agrega IM e VoIP na mesma aplicação e aonde também podem utilizar o serviço no PC, é o [SAPO Messenger][1].

Para os *geeks* que gostam de sofrer e de experimentar umas coisas é possível utilizar um client de VoIP genérico com o nosso serviço, só precisam de saber alguns dados primeiro e basta fazer uma pesquisa para perceber quais são. A aplicação mais popular e mais completa (eu diria *overkill*) é o [X-Lite][2] (gratuita e multi-plataforma).

Mas para Mac não havia realmente nada que me satisfizesse, nada que fosse realmente OSX-*grade*. O X-Lite é uma aberração em termos de peso e interface e as alternativas fazem tudo menos o que me interessa mais, simplesmente chamadas de voz. Há umas semanas atrás o [Eduardo][3] chamou-me à atenção de um pequeno projecto chamado [telephone][4] que nasceu no Google code. Brilhante, um client de VoIP para Mac, minimalista, feito em Objective-C e Cocoa e que integra com o ambiente OSX, nomeadamente com o Address Book.

Infelizmente na altura, depois de muito tentarmos não foi possível colocar a aplicação a funcionar com o nosso serviço. Mas recentemente surgiu um *update* e *voilá*. Este **é o client de VoIP** para Mac, ponto final. Aqui ficam os passos para o configurarem com o vosso número 30:

Vão às *Prefs*, depois às *Accounts* e adicionem uma conta nova, no *Full Name* metam o vosso nome (tanto faz), no SIP Address metam **+35130xxxxxxx.sapo.pt** (subtituam pelo vosso número, e se forem clientes Telepac substituam sapo por telepac), no* Registry Server* metam **voip.sapo.pt**, no *User Name* **+35130xxxxxxx** e finalmente escrevam a vossa *password*, não toquem na tab *Advanced*, não é preciso. Activem o *Use this account.*

![voip2](/assets/voip-adsl-sapo-telepac-meo-macs-2.jpg "voip2")

Depois, na janela principal vão à tab *Network*. Activem o *Use ICE*, usem o *Outbound Proxy ***proxy.voip.sapo.pt** e o *Port* é o **5070**.

![voip3](/assets/voip-adsl-sapo-telepac-meo-macs-3.jpg "voip3")

That’s it. Tudo pronto para fazer e receber chamadas com o vosso novo número 30.

**UPDATE:** Se tiverem problemas tentem desligar o suporte ICE na tab Network.


[1]: http://messenger.sapo.pt
[2]: http://www.counterpath.com/x-lite.html
[3]: http://poingg.com/
[4]: http://code.google.com/p/telephone/