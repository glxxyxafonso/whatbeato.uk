---
layout: post
title:  "A presença já não é o que era"
date: 2008-05-4 00:05:00
excerpt: "Update 1: Por coincidência o TechCrunch tem hoje um artigo precisamente sobre a oportunidade de usar uma infra-estrutura como o XMPP para suportar um Twitter “bem feito”."
oldurl: "http://arrifana.org/blog/2008/05/a-presenca-ja-nao-e-o-que-era/"
disqusid: "370 http://arrifana.org/blog/?p=370"
frontimage: "/assets/a-presenca-ja-nao-e-o-que-era-1.jpg"
categories: portuguese tech-stuff
---

![](/assets/a-presenca-ja-nao-e-o-que-era-1.jpg "photo 1")

**Update 1:** Por coincidência o TechCrunch [tem hoje um artigo][1] precisamente sobre a oportunidade de usar uma infra-estrutura como o XMPP para suportar um Twitter “bem feito”.

**Update 2:** [Um bom artigo][2] do [Mickaël Rémond][3] da Process-one sobre a utilização do XMPP e do pubsub num serviço do tipo Twitter/micro-blogging.

**Update 3:** [A malta do Psi][4] também anda a fazer umas brincadeiras com estes conceitos (via [Melo][5]).

Durante anos, na relação que tenho com certos e determinados operadores móveis (o plural é só para confundir, faz de conta que os MVNOs também contam vá), defendi que o Instant Messaging não tem interesse absolutamente nenhum num telefone móvel. Não tem interesse porque todas as pessoas neste País têm um telemóvel (ou vários) e estão permanentemente ligados, a maior parte durante a noite inclusive. Os portugueses estão permanentemente disponíveis com o telemóvel, é seguro dizer. E portanto colocar uma aplicação de IM no telefone acrescenta o quê em relação ao SMS que é praticamente gratuito e que possivelmente funciona na mais bem trabalhada aplicação nativa que qualquer aparelho pode trazer? Informação de presença não é. Nada, não há absolutamente nada de relevante no IM no telemóvel a não ser uma ligeira sensação efémere de que estamos na crista da onda a falar com os amigos do PC num teclado de 9 teclas. E então quando me falavam de tarifários a cobrar à mensagem…

Mas estas coisas já se sabe, se o vizinho do lado dá um pontapé numa pedra nós temos que um pontapé num calhau, mesmo que arrisquemos partir o dedo grande. E imagino que seja assim em todo lado, aliás, sei que é. E durante anos isto fez-me muita confusão. Mais tarde percebi que estes e outros produtos que os operadores móveis querem replicar da Internet do PC (da qual só percebem a popularidade, mas não a mecânica) são apenas uma fachada para comunicar aquilo que realmente interessa no mundo móvel (por enquanto): o tarifário de voz, SMS e dados. Adiante.No outro dia, com amigos, divagava sobre o que é que torna o [twitter][6] tão inútil e tão viciante ao mesmo tempo. Não são certamente as notificações gratuitas por SMS, já desliguei isso tudo, não sobrevive ao teste da vida real. Não é também pelo social networking, já estamos no período post-web2.0 certo? Nem o facto de ser micro-blogging e de nos exigir uma grande capacidade de síntese, leia-se só permitir 140 caracteres por mensagem provavelmente por causa da história dos SMSes (para mim isto é uma limitação). E também não deve ser por causa dos inúmeros problemas de performance e de disponibilidade que o serviço tem sofrido ultimamente. Mas há algo, porque aquilo agarra-nos. O que é? Eu diria que é isto:

1. Ranking. A nossa eterna e involuntária necessidade de nos superarmos e de nos pavonearmos junto dos nossos mais próximos que nos está cravada no DNA, e não se armem em insensíveis a isto. Ele é meter um número ao lado da fotografia do utilizador e é vê-lo matar-se por fazer cresce-lo. Neste caso o “game score” é o número de “followers” de cada um tem. Não é um grande número e até o metem ali disfarçado de “stats” mas é um número. Ver “[How Game Mechanics Can Make Your App More Fun][7]“.

2. Social Networking, se calhar afinal até é. Qual é o detalhe? A grande diferença para o Instant Messaging é que as relações individuais são públicas para todos. Qualquer um pode ver no meu perfil quem são as pessoas que eu sigo. Há aqui uma pirâmide de reputação quase perversa mas que funciona muito bem. A primeira coisa que eu fiz quando revisitei o twitter e o comecei a usar mais regularmente foi vasculhar os perfis das pessoas por quem eu mais reconheço interesse, e aí encontrar umas outras tantas que subscrevi pela reputação herdada dos anteriores.

3. Não é push (ver ponto 4 sobre o melhor do E-Mail). As mensagens são lidas on-demand, com a periodicidade que eu bem entender ou à distância de uma short-key dependendo do client que usar ([twitterrific][8] no meu caso), não sou incomodado com popups de janelas e notificações de growl. Isto lembra-me que usar o Twitter através do [bot de XMPP][9] é adulterar esta característica, nunca o faria.

4. A mais importante e voltando à introdução do post, é instant messaging mas sem presença. Agrega as principais vantagens do IM, do IRC e do E-Mail: É instantâneo e é social, mas não tem informação de presença. Eu já disse [mais do que uma vez][10] que a presença está em desuso. Porquê? Porque nós, com o advento da mobilidade e com os saltos qualitativos que os dados móveis, o acesso aos portáteis, os “smart-phones”, as redes wifi e o acesso à Internet em geral deram nos últimos anos (e vão continuar a dar), estamos-nos a tornar todos deuses do online. Nós estamos a ficar progressivamente omnipresentes na Internet, quer gostemos quer não.

O meu ponto, para não desviar muito, é: até que ponto a presença vista como informação de disponibilidade, um dos bastiões das plataformas emergentes de messaging dos últimos anos (IMS, SIP e SIMPLE, XMPP, etc.), continua a ser importante? 

Do meu ponto de vista continua a ser importante mas talvez não nos moldes em que inicialmente foi pensada, não apenas para transportar a disponibilidade dos meus correspondentes. A funcionalidade da presença pode ser muito interessante se puder ser extendida e se puder transportar outro tipo de meta-informação associada à minha pessoa e que nos dias que correm é muito mais importante do que a minha conhecida omnipresença na Internet, nomeadamente: Geo-localização, avatars, estado de espírito, a música que está a tocar no iTunes, etc, etc, etc.

E é talvez aqui que o [XMPP][11], como plataforma extensível de messaging e de presença, pode marcar a diferença em relação a outras. [Isto sim][12], faz sentido. [Já dei o toque][13] à malta da [Process-One][14] para fazerem uma proposta ao Twitter, agora que eles estão a [ponderar mudar de plataforma][15]. (smile).

[1]: http://www.techcrunch.com/2008/05/05/twitter-can-be-liberated-heres-how/
[2]: http://www.process-one.net/en/blogs/article/introducing_the_xmpp_application_server/
[3]: http://www.process-one.net/en/blogs/user/mremond/
[4]: http://el-tramo.be/blog/psi-jaiku
[5]: http://www.simplicidade.org/notes
[6]: http://twitter.com/
[7]: http://www.oreillynet.com/conferences/blog/2006/03/how_game_mechanics_can_make_yo.html
[8]: http://iconfactory.com/software/twitterrific
[9]: http://blog.twitter.com/2006/10/use-twitter-by-instant-message.html
[10]: http://celso.arrifana.org/archives/447-Getting-things-done-Part-II.html
[11]: http://www.xmpp.org/
[12]: http://www.xmpp.org/extensions/xep-0163.html
[13]: http://friendfeed.com/e/f94c0dd6-8d2a-12ab-53d3-00e085f9c04d
[14]: http://www.process-one.net/en/
[15]: http://tech.slashdot.org/tech/08/05/02/1516208.shtml
