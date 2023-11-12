---
categories: portuguese tech-stuff
date: "2007-12-16T00:12:00Z"
disqusid: 277 http://arrifana.org/blog/?p=277
excerpt: Cá vai então.
frontimage: /assets/ftth-fiber-to-the-home-1.jpg
oldurl: http://arrifana.org/blog/2007/12/ftth-fiber-to-the-home/
title: FTTH, Fiber to the home
aliases:
- /portuguese/tech-stuff/2007/12/16/ftth-fiber-to-the-home
---

![](/assets/ftth-fiber-to-the-home-1.jpg "photo 1")

Cá vai então.

Antes de mais um disclaimer. Eu trabalho na PT.COM, a empresa do [SAPO][1] e que pertence ao grupo [Portugal Telecom][2]. Este é um post sobre tecnologia. Quem achar que isto é publicidade, ou quiser fazer deste post um pretexto para desabafar sobre as políticas da banda larga em Portugal, ou desatinar em geral, por favor faça-me já um favor e rume a outras paragens.

Esclareço também que o post anterior não tem assim tanto de enigmático para os mais atentos. Simplesmente entrei nos testes de [FTTH][3] (Fiber to the home) que estão a ser feitos pela PT Comunicações na zona da Expo (e em Miraflores também, salvo erro). Este é um tema relativamente público já.

“To the home” e não “To the premises”, atenção. A preciosa da fibra entra-me pela casa dentro e só aterra por trás da televisão na sala no terminal ONT (Optical Network Terminal).

O transporte é feito sobre GPON (Gigabit [Passive Optical Network][4]), ou o standard ITU-T [G.984][5] como queiram. Pelo que leio é a norma mais popular (ou mais impingida pelos fabricantes, vá) entre os operadores que já andam por aí a brincar com fibra nos clientes finais. [Verizon][6] comes to mind.

O terminal é um simpático (made in China) [Huawei Echolife HG810][7]. Aqui termina a fibra e começa Ethernet, que por sua vez se liga a uma gateway de tripla brincadeira [2Wire 270HGV][8] responsável por fazer PPPoE para o ISP e pelo Home networking.

Um dos bónus do piloto é o serviço [Meo][9]. Ora como isto é à grande, meti 3 caixas Meo em casa. Uma na sala com [HDMI][10], outra na cozinha e outra num quarto. Duas das caixas estão ligadas por Ethernet directamente ao router 2Wire e a terceira está indirectamente ligada através de um adaptador de cabo coaxial para Ethernet, um [Corinex AV200][11]. A minha casa é relativamente nova e nos tubos de PVC do cabo coaxial cabem facilmente dois cabos. Um dos planos para o futuro é meter RJ45 na casa toda.

Em relação ao meu Home Networking há um twist. Eu já tinha um acesso [ADSL][12] a 8mbit/s com IP fixo e decidi mantê-lo. Vai daí que desliguei o Wifi do 2wire e liguei-o numa configuração no mínimo estranha ao meu velho amigo  [Speedtouch 780][13]. Desta forma, num único SSID tenho acesso às duas redes com 802.11b/g. Com esta conversa começo a ter motivos de sobra para justificar queimar dinheiro numa [AirPort Extreme][14] só para ter Gigabit ethernet e [802.11n][15]. Viva ao luxo.

O downlink do GPON está neste momento limitado nos 50Mbits/s mas a tecnologia permite débitos muito superiores a estes, haja equipamento terminal e home networking que se aguentem à bronca e que tire proveito disso. O uplink é de 25Mbits/s.

A instalação desta trangalheira toda durou quase uma manhã inteira mas é justo dizer que a parte fulcral (passagem da fibra, soldadura, ligação do equipamento terminal e activação das contas) não demorou do que 1h30m. O piloto também está a testar os procedimentos de instalação e dimensionamento das equipas, e a optimizá-los.

Conclusões do fim de semana.

*Bom:*

Globalmente o piloto e a solução montada funcionam muito bem. O teste extremo que fiz foi meter as 3 caixas Meo em simultâneo ligadas num canal HD e ao mesmo tempo sacar um Kernel 2.6 do [ftp.linux.pt][16]. Impressive shit. As 3 TVs nem pestanejaram e o download esteve próximo dos +-2.5Mbytes/s. Com uma televisão ligada num canal normal tenho downloads de 5Mbytes/s e com o serviço dedicado à Internet consigo chegar aos >7Mbytes/s.

![](/assets/ftth-fiber-to-the-home-2.jpg "photo 2")

Durante este teste umas das Meo estava ligada ao switch do Speedtouch que colou o CPU nos 100% e se borrou todo, comecei a perder pacotes no Wifi. Claramente o bichinho não estava a contar com estes throughputs. Passei o Meo para o switch do 2wire e ficou tudo OK.

A solução de Ethernet sobre cabo coaxial funciona bem, nunca falhou.

O Meo é um bom produto e tem imensas possibilidades, permita-nos a plataforma avançar com as nossas ideias (hint). Não vou elaborar muito mais, consultem o [thread gigante][17] sobre isto no [Blog do Nuno][18].

*Menos bom:*

O router 2wire é meio, er.., merdoso. Está certo que os meus standards estão altos com o Speedtouch 750 mas a falta de um interface CLI e de controle avançado sobre as tabelas de IP, NAT e routing irrita-me profundamente. Nem consigo meter um alias nas interfaces daquilo. Also, o interface Wifi não funciona bem com o meu Mac e desliguei-o (embora também não dê muito crédito ao Wifi do meu Leopard 10.5.1 que IMHO está completamente partido). A única coisa que aquilo parece ter de bom é a performance bruta para lidar com a largura de banda toda que tem em mãos. Já deu para perceber que aquilo é um FreeBSD embbeded qualquer, a porta de ssh responde com esta assinatura “SSH-2.0-OpenSSH_3.4p1 FreeBSD-20020702″ mas não consegui entrar.

As caixas do Meo são muito grandes para cenários menos comuns. Por exemplo, num quarto tenho uma televisão flat colada à parede, sem móveis. É virtualmente impossível acomodar lá uma caixa daquele tamanho. Urge uma caixa minimalista para a versão sem disco do Meo.

*Conclusões*

Isto sim, é o futuro. Ainda nem pensei nas aplicações práticas do lado da Internet para este tipo de acessos mas é um salto quantitativo e qualitativo muito grande, não hajam dúvidas.

Aliás, FTTH/GPON é só um dos meios de distribuição de futuro que estão na mesa. Acho que os próximos tempos vão ser giros no que respeito à evolução da Banda Larga no mundo e (depois) em Portugal. Outra conversa que podemos ter num destes posts é o que a [White Space Coalition][19] está a tentar fazer nos E.U.A. e o que standards como o [802.22][20] e outra tecnologias baseadas em “[Cognitive Radio][21]” podem fazer por nós.

Pronto e agora continuem-se a roer até aparecerem as ofertas comerciais ou terem a mesma sorte que eu.

[Mais fotos aqui][22]

[1]: http://sapo.pt/
[2]: http://www.telecom.pt/
[3]: http://en.wikipedia.org/wiki/FTTH
[4]: http://en.wikipedia.org/wiki/Passive_optical_network
[5]: http://en.wikipedia.org/wiki/G.984
[6]: http://newscenter.verizon.com/press-releases/verizon/2006/page.jsp?itemID=30078536
[7]: http://www.huawei.com/mobileweb/en/products/view.do?id=700
[8]: http://www.2wire.com/
[9]: ttp://www.meo.pt/
[10]: http://en.wikipedia.org/wiki/HDMI
[11]: http://www.corinex.com/web/docx.nsf/(w)/eng-corinex_av200_cablelan_adapter
[12]: http://adsl.sapo.pt/
[13]: http://www.thomson-broadband.co.uk/codepages/content3.asp?c=7&ProductID=528
[14]: http://www.apple.com/airportextreme/
[15]: http://www.apple.com/wireless/80211/
[16]: http://ftp.linux.pt/pub/linux/kernel/v2.6/
[17]: http://blog.sig9.net/2007/07/09/meo-review/
[18]: http://blog.sig9.net/
[19]: http://en.wikipedia.org/wiki/White_Spaces_Coalition
[20]: http://www.ieee802.org/22/
[21]: http://en.wikipedia.org/wiki/Cognitive_radio
[22]: http://fotos.sapo.pt/celso/gallery/0000cepx