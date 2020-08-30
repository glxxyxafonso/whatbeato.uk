---
layout: post
title:  "Bastidores do Benfica vs Nápoles"
date: 2008-10-4 00:10:00
excerpt: "Há umas semanas fez-se uma reunião histórica lá no trabalho, a primeira de uma série de tantas para começar a preparar um evento que na minha opinião entrará directo para a história dos momentos SAPO: a transmissão de um jogo de futebol importante ao vivo na Internet, neste caso o Benfica/Nápoles. A oportunidade fez parte de um pacote mais abrangente que incluiu o lançamento do canal Benfica, que como sabem é um exclusivo do Meo, com a sua primeira emissão ao vivo."
oldurl: "http://arrifana.org/blog/2008/10/bastidores-do-benfica-vs-napoles/"
disqusid: "304 http://arrifana.org/blog/?p=304"
frontimage: "/assets/bastidores-do-benfica-vs-napoles-1.jpg"
categories: portuguese tech-stuff
---

Há umas semanas fez-se uma reunião histórica lá no trabalho, a primeira de uma série de tantas para começar a preparar um evento que na minha opinião entrará directo para a história dos momentos SAPO: a transmissão de um jogo de futebol importante ao vivo na Internet, neste caso o Benfica/Nápoles. A oportunidade fez parte de um pacote mais abrangente que incluiu o lançamento do canal Benfica, que como sabem é um exclusivo do Meo, com a sua primeira emissão ao vivo.

Decidiu-se também, que no caso da transmissão pela Internet, iríamos abrir o acesso não só aos nossos clientes mas também aos restantes clientes dos outros ISPs nacionais, e conseguimos ainda garantir direitos de transmissão para uma série de países, incluíndo alguns PALOPs. Perfeito, este projecto tinha todos os ingredientes para se tornar histórico no SAPO: escala, riscos, desafios e muita adrenalina. Foi daqueles raros projectos que consegue transformar um elefante como a PT numa startup cheia de gana, motivação e cooperação. Foi lindo.

Ora, para um evento extraordinário exigem-se medidas extraordinárias e quando a empresa está em absoluta sintonia as coisas tornam-se mais fáceis. Aparecem equipamentos de rede e servidores em duas semanas que demorariam meses a encomendar, fazem-se soluções engenhosas em flash que nunca tínhamos ponderado, ligam-se infra-estruturas de transmissão de sinal vídeo em poucos dias que estavam por um fio há meses, eu sei lá. Tudo normal acho eu, afinal de contas quando se tem cem projectos em mão é preciso estabelecer prioridades.

Depois houve uma reunião particularmente interessante, aquela em que tentámos estimar a audiência online. Como é que estimamos uma coisa que nunca foi feita, em condições que nunca existiram para um público alvo que é caracterizado por ser completamente incerto? Não estimamos, metemos o dedo no ar, multiplicamos por quatro e damos o nossos melhor. A palavra chave aqui é **sobredimensionamento**. Mas tínhamos alguns indicadores: ninguém consegue ver o jogo na televisão a não ser que seja cliente Meo, a palavra passa depressa na Internet e há Benfiquistas obstinados até dizer chega neste País (e fora dele também). As probabilidades de sermos surpreendidos por uma avalanche eram altas.

Então o que é que fizemos?

Primeiro usámos a infra-estrutura recente do SAPO Vídeos para fazer a transmissão. Reforçámos a farm com 16 novos servidores (yep) quad-core com 4 placas de rede cada um, 3 das quais em giga ethernet ligadas aos routers de saída 1 a quarta ligada ao backend. Ou seja, cada servidor estava pronto para debitar 3 Gigabit/s de streams para a Internet. E reforçamos o equipamento de rede (cisco) para aumentar a capacidade de switching e de portas. No total criámos uma plataforma capaz de debitar um total de cerca de 40 Gigabit/s de conteúdo vídeo. Poderoso, digo eu.

O streaming foi feito em flash (portabilidade foi um requisito absoluto e o flash está instalado em >98% dos computadores) usando o codec H.264 e com um perfil de qualidade (bit-rate e frame-rate) elevado o suficiente para se conseguir ver um jogo de futebol em full-screen em condições boas. Quem teve a oportunidade de experimentar deverá concordar que a qualidade de imagem era excepcional. Este perfil gastaria em média entre 200 a 300kbit/s mas tinha picos de 600Kbit/s. O servidor que usámos para fazer streaming foi o da [Wowza][1], a correr em Linux, e que recomendamos vivamente.

Portanto usámos a estratégia clássica da engenharia, dissemos ao produto que estávamos prontos para 30.000 streams, preparámos-nos para os 50.000 e na prática chegamos aos > 60.000 streams. Isso até nos permitiu brincar com a imagem do evento e usar a metáfora do estádio da Luz que leva 65000(?) pessoas.

Não estão impressionados? Deviam estar.

A fonte do sinal de vídeo foi retirada directamente do headend do IPTV em Monsanto, com um plano B em Picoas usando directamente uma caixa Meo e ainda ponderámos um plano C a partir do Meo satélite, não fosse alguma coisa correr mesmo muito mal.

A malta da rede do acesso ADSL fez um levantamento exaustivo do grau de ocupação dos DSLAMs no País todo, identificámos os mais problemáticos e tomámos medidas de precaução com esses. Montámos um proceso com a equipa de operações e prevenção da PT Comunicações e tivemos informação em tempo real, online, do grau de ocupação da rede. A nossa estratégia, muito honestamente, seria a de informar no site o cliente que não poderia ver o jogo porque o seu DSLAM não tinha mais capacidade disponível. Felizmente só tivemos um alarme durante durante todo o jogo com um DSLAM em Vila Franca de Xira que chegou aos 70% de ocupação. Montaram-se também processos de atendimento a clientes, especialmente por causa do subscrições do Meo e do Meo Sat de última hora.

O site foi todo montado para ser estático com um único pedido dinâmico. Este pedido fazia duas coisas 1. obtinha a origem do IP (por causa dos direitos de transmissão para o estrangeiro) 2. Se o IP fosse nosso (PTC) interagia com o Radius (o sistema de autenticação dos clientes ADSL) para saber em que DSLAM se encontrava (ver parágrafo anterior para perceber).

As páginas e o player de flash foram todas servidas por 3 frontends dedicados a correr [nginx][2]. Esqueçam [Apache][3], esqueçam [lighttpd][4]. Querem “extreme performance” e modularidade ao mesmo tempo? Dêem uma vista de olhos ao nginx. Não se deixem levar pelo aspecto cru da página, o [autor][5] é um senhor. O player de flash foi especialmente feito para esta emissão e trocava uma série de mensagens com outros elementos da página, cliente side. Por exemplo, se durante a emissão vissem uma repetição (aqueles vídeos do lado direito com as jogadas principais), o player pausava o stream (para poupar largura de banda), passava o vídeo da jogada e no fim retomava o stream sem o desligar (para o utilizador nao “perder o lugar”). Pretty clever.

Às 18h15 começou a emissão. Por essa altura já os blogs e fórums tinham feito o seu trabalho (apesar de só termos anunciado a transmissão na manhã do mesmo dia) e 15 minutos depois já estavam 9.000 marrecos pendurados na emissão. Foi o primeiro indicador de que isto ia ser grande. Às 19h15 estavam 30.000, às 20h15 (início do jogo) estavam 40.000 pessoas ligadas e muito pouco tempo depois ultrapassamos a marca das 60.000 streams.

Os servidores de streaming tinham dois soft-limits: 1. número máximo de ligações concorrentes para clientes ADSL SAPO/PT. 2. número máximo para outros clientes (outros ISPs e estrangeiro). O Vitor foi ajustando esses limites à medida que o jogo decorria, nas consolas dos 16 servidores.

A rede ADSL SAPO não foi um problema. De facto só tivemos um alarme durante o jogo e não foi sequer grave. A grande maioria dos nossos clientes tiveram condições para ver o jogo com boas condições sem percalços graves a assinalar.

Também tivemos um pequeno problema com o som. Em circunstâncias ainda não apuradas, alguns cliente ficaram sem som durante a emissão, nada que não se resolvesse com um reload da página (ou com a TSF) mas foi chato, especialmente porque o problema não se manifestou nem nos inúmeros testes que fizemos nem na simulação de carga de 2ª feira. É algo que ficámos de ver como trabalho para casa.

O que correu menos bem foi a transmissão para os restantes ISPs. Porquê? Muito simples, porque a maior parte das ligações de peering entre a PT (ou antiga Telepac) e esses mesmos ISPs bateram completamente no tecto, flat lines. O peering existe porque os ISPs preferem trocar tráfego nacional (teoricamente mais barato) entre eles do que gastarem os seus links internacionais para fazer o mesmo. Até aqui tudo bem, mas o que está mal, IMHO, é que estes links não estão de todos preparados para surpresas como esta porque a capacidade dos mesmos em condições normais já é, na maior dos parte dos casos, bem superior a 60%.

Eu nem quero discutir o modelo do peering que existe, o ponto não é esse. O meu ponto é apenas garantir-vos que o peering nacional simplesmente não está preparado para um evento desta magnitude. De resto nem o peering nem a Internet, é justo dizer. A única forma de garantir QoS numa transmissão ao vivo com exigências anormais é com um controlo total da infra-estrutura ponto a ponto, desde o sinal até à casa do cliente. Podemos discutir as tecnologias emergentes de P2P ou a utilização de CDNs, todas têm vantagens e desvantagens, mas no fim do dia mantenho o que disse.

Portanto, por volta 19h já o link de um outro grande ISP Português estava completamente saturado. E mal começou o jogo saturaram praticamente todos os outros que têm expressão nacional no mercado residencial. Muitos clientes desses ISPs conseguiram ver o jogo, uns com soluções e outros não conseguiam de todo.

![](/assets/bastidores-do-benfica-vs-napoles-1.jpg "photo 1")

(a linha vermelha é o limite físico da linha, a linha azul é o tráfego de saída)

É claro que o povo não quer saber destes detalhes para nada, nem os [jornais][6], *especialmente* quando se trata de um jogo do Benfica. Vai daí que de entre inúmeros elogios, lá surge o comentário incisivo do Benfiquista insatisfeito. Da sua perspectiva, e percebo isso perfeitamente, o SAPO disse que dava mas afinal isto não funciona muito bem. E tirando os meios da especialidade, nem vale a pena tentar dar explicações à malta, porque só vai piorar. Até tivemos direito a [cartoon no DN][7] e tudo (o que só por si é motivo de orgulho, diga-se). É claro que disto tudo tiram-se conclusões para o futuro, também aprendemos umas coisas.

Dito isto, considerem-se informados. Segue-se agora alguma estatística, números, que é o que vocês querem:

- 16 servidores com 3Gb/s de capacidade e mais de 4500 streams em alta qualidade e H.264, cada um.
- Infra-estrutura de rede local capaz de debitar 40Gb/s.
- Ultrapassámos os 60.000 streams em simultâneo na segunda parte do jogo (não ultrapassamos antes porque fomos conservadores e fomos abrindo a torneira ao longo do tempo). Usámos [Flash9][8] com [H.264][9] e streaming em [rtmp][10].
- Mais de 270.000 pessoas tentaram ver o jogo.
- Mais de 10.000 pessoas tentaram ver o jogo a partir do estrangeiro, a maior parte conseguiu, mas alguns não puderam por questões de direitos de transmissão. Tivemos um testemunho de um amigo que viu o jogo em Angola com uma placa móvel 3G. O país que mais acessos teve foi a Suiça.
- 36% das tentativas de ver o jogo vieram dos nossos clientes ADSL (com taxas de sucesso muito elevadas), 58% das tentativas vieram de outros ISPs nacionais (com algum sucesso mas mas também com alguns problemas) e 6% das tentativas vieram do estrangeiro.
- Debitámos mais de 9Gbit/s de tráfego adicional para dentro da nossa rede ADSL, debitámos mais de 10Gbit/s para os links de peering dos restantes ISPs (não conseguimos mais, pelo exposto).

Esta foi sem margem para dúvidas a maior transmissão ao vivo feita na Internet em Portugal com números dignos de eventos e audiências mundiais, e tendo em conta que foi um jogo do Benfica, eu diria que tudo o que vier a seguir são amendoins e que isto foi o teste extremo de uma infra-estrutura que decididamente não vamos desmontar.

Termino com um dos gráficos de tráfego, esclarecedor da dimensão que isto teve numa plataforma já de si produtora de quantidades massivas de tráfego, o SAPO Vídeos.

![](/assets/bastidores-do-benfica-vs-napoles-2.jpg "photo 2")

Acho que é esta a força do Benfica.

PS1: Eu sou Sportinguista!
PS2: Obrigado Vitor, Guilherme, Rui, Marco, Paulo e Alvim. Eu estou para aqui a falar mas foram vocês que montaram isto tudo.
PS3: Há videos dos bastidores durante o decorrer do jogo, das equipas do SAPO, da rede e das operações e das Pizzas. Fica o compromisso de os editar e de meter na Net.

[1]: http://www.wowzamedia.com/
[2]: http://nginx.net/
[3]: http://www.apache.org/
[4]: http://www.lighttpd.net/
[5]: http://sysoev.ru/en/
[6]: http://www.agenciafinanceira.iol.pt/noticia.php?id=998198&div_id=1728
[7]: http://dn.sapo.pt/cartoons/cartoon.html?edicao=2008%252F10%252F04&ts=1223078400
[8]: http://www.adobe.com/products/flashplayer/
[9]: http://en.wikipedia.org/wiki/H.264
[10]: http://en.wikipedia.org/wiki/Real_Time_Messaging_Protocol
[11]: http://developers.sapo.pt/
