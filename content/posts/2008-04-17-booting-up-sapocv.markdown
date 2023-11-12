---
categories: portuguese tech-stuff
date: "2008-04-17T00:04:00Z"
disqusid: 366 http://arrifana.org/blog/?p=366
excerpt: 'update: Apparently this post had some unexpected echo all over the blogs.
  Thanks all for your feedback, we’re proud. My friend Pedro was crazy and kind enough
  to translate the post to english.'
frontimage: /assets/booting-up-sapocv-1.jpg
oldurl: http://arrifana.org/blog/2008/04/booting-up-sapocv/
promote: true
title: Booting up sapo.cv
aliases:
- /portuguese/tech-stuff/2008/04/17/booting-up-sapocv
---

![](/assets/booting-up-sapocv-1.jpg "photo 1")

**update:** Apparently this post had some unexpected echo all over the blogs. Thanks all for your feedback, we’re proud. My friend Pedro was crazy and kind enough to [translate the post to english][1].

Ontem lançámos o [SAPO Cabo Verde][2]. A sensação de ter um SAPO fora de Portugal é no mínimo estranha, é um misto de orgulho e de medo, em que a segunda das sensações advém certamente do facto de nunca termos pensado muito nisto, na hipótese de actuarmos fora do rectângulo. É o tal síndroma que nos persegue, aos Portugueses em geral, para aí desde o tempo em que deixámos de pensar que somos grandes.
O projecto já cozinhava há uns largos meses. Não vou aqui discutir nem as razões nem os objectivos, alguém o fará por mim, vou só falar de tecnologia. Tecnologicamente falando, instanciar o SAPO fora de Picoas foi um desafio muito interessante. Uma coisa é escalarmos dentro do mesmo Datacenter mas outra coisa é sair do útero, distribuir conteúdos em pontos do globo distintos e distantes e reutilizar a mesma tecnologia mas em contextos diferentes e com características diferentes da nossa realidade mantendo ao mesmo tempo uma arquitectura global.

Ainda é cedo para falar. Posso estar a mandar foguetes antes do tempo e sair-me o tiro pela culatra, mas de qualquer forma achei relevante fazer este post e partilhar convosco a nossa experiência:

### SOA

Nos últimos 2-3 anos andámos a queimar pestanas e a limpar a casa para conseguir montar uma arquitectura de sistemas baseada em serviços, vulgo [SOA][3]. E conseguimos. O nosso [BUS de serviços][4] está de pé e com uma vasta oferta de conteúdos que usamos e reutilizamos quer internamente quer com parceiros ou público em geral. Mas o BUS é mais do que um HUB de APIs, faz mais do que isso. Faz transformações de um formato para outro de qualquer método (ie: [RSS][5] para [JSON][6]), logging, controle de acessos, proxying, caching, gera documentação e código para todas as linguagens com base nos contratos dos serviços, é um mundo. E é só por causa deste valor todo que suportamos o fundamentalismo do seu incansável e convicto mentor em relação às guerras de SOAP vs REST. Em 2008 vamos colocar o nosso BUS em Opensource, está decidido.

E foi quando deixámos de apregoar SOA para efectivamente o praticar que conseguimos realizar projectos como o [SAPO Mobile][7], que não é mais do que um “cliente” rico do portfolio do BUS (ok, é mais do que isso, mas é para perceberem). O [services.sapo.pt][8] é hoje uma peça fulcral na forma como concebemos e montamos os nossos projectos e permitiu-nos não só baixar drasticamente a complexidade dos desenvolvimentos bem somo os tempos de produção dos mesmos. Cabo Verde não existiria nos moldes actuais se não fosse estes esforço silencioso e quase inglório (porque durante muito tempo não representou output para a empresa) que a tecnologia do SAPO teve durante os últimos anos.

### Broker

![](/assets/booting-up-sapocv-2.jpg "photo 2")

O [Broker][9] é outro dos “building-blocks” do SAPO. Foi escrito e re-escrito de raíz por nós (embora a primeira versão tenha sido baseada no [Mantaray][10]) e é um dos nossos projectos [Opensource][11]. Basicamente e sem entrar em muitos detalhes é uma nuvem gigante de agentes que está presente no Backend de todos os servidores do SAPO, distribuida, e que permite a qualquer aplicação a troca de mensagens e eventos, de forma completamente assíncrona (fire and forget) e em tempo real. Cada evento viaja dentro de um tópico (ou namespace). Os “clients” podem ser produtores ou consumidores de eventos (think [pubsub][12], think uma rádio a emitir numa determinada frequência e um sem número de ouvintes que a sintonizam).

A Homepage do SAPO é completamente dependente do Broker. Cada um dos frontends da Homepage tem um agente que o gestor de conteúdos notifica (através do Broker) cada vez uma zona da Homepage precisa de ser queimada. A Homepage também produz eventos de Broker no browser, com chamadas da AJAX (ie: cada click que se faz numa notícia).

A beleza do Broker é aquilo que eu chamo de “decoupling”. Imaginem mashups de eventos em vez de feeds. Imaginem que alguém no SAPO quer montar um serviço que incrementa um contador por cada vez que alguém pesquisa por “Cabo Verde” na Pesquisa do SAPO e que cada vez que um [JID][13] do SAPO Messenger, que é colaborador da empresa, faz login dispara-lhe uma mensagem de IM com o número de pesquisa feita por esse termos até à data. O exemplo é estúpido, é da hora, mas o ponto é: Qualquer pessoa no SAPO pode fazer este serviço, não depende de ninguém, não depende da malta da Pesquisa, nem do SAPO Messenger. Basta-lhe consumir os tópicos apropriados que já estão na nuvem e que estão documentados e cujos eventos está a ser gerados, em tempo real, pelas plataformas do SAPO.

Neste momento já temos mais de 100 tópicos a gerarem notificações e com um tráfego agregado na nuvem de mais de 1000 eventos por segundo. A regra de ouro é, qualquer serviço novo que realize uma acção relevante (ie: Alguém faz o upload de um vídeo no SAPO Vídeos, alguém faz login no SAPO Mail) deve produzir uma mensagem e publicar num tópico no Broker.

O Broker é crucial para a nossa escalabilidade e fiabilidade (o decoupling permite-nos na prática reduzir o número de dependências das aplicações e as característica de assincronismo e fire-and-forget reduzem o risco de falta de recursos e performance).

Este é daqueles produtos que temos de advogar mais. O tempo é escasso e é-nos difícil passar a mensagem para fora mas não hajam dúvidas: se procuram um framework de messaging entre aplicações, espreitem isto.

Cabo Verde tem uma nuvem própria de eventos a correr “lá” e partilha uma série de tópicos com Portugal (ie: O gestor de conteúdos reside cá).

### CDN

![](/assets/booting-up-sapocv-3.jpg "photo 3")

Durante anos tive a Akamai à perna a [tentar vender-me][14] soluções de [CDN][15]. Mas por muito que se goste da Akamai (e gosto) a solução nunca fez grande sentido. Na realidade não há muitos problemas de descentralização da entrega de conteúdos quando as maiores redes de acesso ADSL, Cabo e Móvel são da mesma empresa.

Mas entretanto a realidade alterou-se. Não só a rede de acesso cresceu muito e tornou-se complexa sendo necessário encontrar formas de estarmos mais próximos da last-mile, como o Cabo se separou, como entretanto o SAPO se internacionalizou e passou a ter mais do que um Datacenter em mais do que um País. O próprio perfil de conteúdo alterou-se drasticamente. Há 5 anos atrás não havia vídeo na Internet, só para dar um exemplo.

O SAPO Vídeos é o nosso serviço mais exigente no que diz respeito a entrega de conteúdos. Neste momento está a gerar quase 2Gbit/s de largura de banda em média durante todo o dia. Quando construímos a plataforma pensámos muito sobre a melhor forma de resolver o problema dos altos débitos e do futuro crescimento do serviço. E acabámos por construir uma solução de CDN caseira baseada em arquitectura de rede, [NAS][16], DNS e [Squids][17] invertidos.

Esta mesma solução permitiu-nos levar o [SAPO Vídeos][18] para Cabo Verde, optimizando a entrega local dos vídeos (através da nossa CDN) mas mantendo o “core” do serviço (gestão, master dos vídeos, webUI) em Portugal, Picoas. Isto quer dizer que, com alguma magia de DNS (ver mais abaixo) em Cabo Verde os mesmos vídeos de [http://videos.sapo.pt/][19] são servidos a partir do Datacenter da CV Multimédia por forma a não abusar de um muito limitado link internacional que o País tem.

### Bricolage, gestão de conteúdos

![](/assets/booting-up-sapocv-4.jpg "photo 4")

O [Bricolage][20] é um gestor de conteúdos (enterprise-class for all you suits) Opensource e nesta tecnologia estão assentes alguns dos nossos Websites mais importantes, incluindo as Homepages de Portugal e Cabo Verde, o DN e o JN, entre outros. Workflow, autorizações, versioning e XML é com o Bric. Poucos sites precisarão de um canhão destes, a curva de aprendizagem não é pequena. É impróprio para cardíacos.

Mas depois de feito o deployment e de uma boa formação das equipas editoriais, esta besta é poderosa e de confiança.

A Homepage do SAPO em Cabo Verde é editorialmente gerida a partir do Backoffice alojado em Picoas, numa infra-estrutura partilhada com a Homepage de .pt. Os frontends em Cabo Verde são notificados (via broker) quando há conteúdo novo e isso despoleta um processo de actualização e re-processamento das páginas.

### Imagens, CSS e conteúdo estático

As nossas farms de Imagens e de conteúdo estático (ie: [http://h.s.sapo.pt/][21] [http://js.sapo.pt/][22]) possuem réplicas exactas e locais em Cabo Verde ([http://h.sapo.cv][23]  [http://js.sapo.cv][24]). A replicação é feita com [rsync][25]. As farms estáticas são processos de [lighttpd][26] (dois por máquina para aproveitar os Xeon) em Linux e com [epoll e cabeçalhos de Expires gigantes][27]. Em testes conseguimos esgotar as interfaces de Gigabit de um destes servidores. A carga? 2. Uptime do nosso static1 (de 3):

```
root:/servers/lighthttpd/etc# uptime
 01:08:13 up 553 days, 11:36,  1 user,  load average: 0.01, 0.01, 0.00
root:/servers/lighthttpd/etc# ps ax |grep lightt
 2019 ?  S 429:53 /sbin/lighttpd -D -f /servers/lighthttpd/etc/httpd1.conf
 2039 ?  S 370:24 /sbin/lighttpd -D -f /servers/lighthttpd/etc/httpd2.conf
```

### Rsync

![](/assets/booting-up-sapocv-5.jpg "photo 5")

O [rsync][25] é um dos nossos canivetes suíços dentro do SAPO. É usado para replicar árvores inteiras de conteúdos, para fazer a passagem de projectos para produção que estejam distribuídos por vários servidores, para gerir repositórios de pacotes Debian, para replicar a nossa farm de [Web thumbnails][29], etc, etc. É muito eficiente porque faz cópias incrementais e comparativas e porque prima pela simplicidade e pela performance. Comporta-se muito bem também em cenários de conectividade remota. Só para terem uma ideia, há pessoas [corajosas o suficiente para fazerem backups][30] de servidores e dos seus computadores pessoais com rsync. 

Cabo Verde depende muito dos nossos processos integrados de passagem para produção e replicação de conteúdos, que passam necessariamente pelo rsync.

### Monitorização e Métricas, Nagios e Cacti

![](/assets/booting-up-sapocv-6.jpg "photo 6")

Desde sempre que usamos o [Nagios][31] para monitorização e alarmes e o [Cacti][32] para métricas de sistemas, mais dois produtos Opensource de qualidade. Em Cabo Verde usámos a mesma aproximação e estamos activamente a tentar ligar as duas instâncias (quatro) para termos uma visão integrada de tudo, do SAPO como um todo. Em teoria é bem possível, não só porque o software é Opensource mas porque é baseado em sondas, scripts e SNMP.

### DNS patch

![](/assets/booting-up-sapocv-7.jpg "photo 7")

Os nossos DNS primário e secundário correm em cima de [djbdns][33]. Adicionámos-lhe [um patch][34] (com contribuições poderosas do nosso Über Sysadmin [japc][35]) que basicamente nos permitem dar respostas diferentes para ponto geográficos diferentes. Como base de dados de georeferenciação usa a [GeoIP][36]. Very nice.

Já estão a adivinhar não? Se alguém em Cabo Verde pedir um ficheiro de .js a [http://js.sapo.pt/][37] o DNS encarrega-se de lhe resolver o nome para um IP dos nossos servidores em .cv (que também respondem a js.sapo.pt) e o conteúdo é servido localmente. Se alguém fizer o mesmo noutra parte qualquer do mundo, o DNS resolve para o IP de Picoas. Este conceito é aplicado em inúmeros cenários do projecto.

### Instanciação e Templating

![](/assets/booting-up-sapocv-8.jpg "photo 8")

Outra mudança de mindset para nós foi a de passarmos a pensar nas plataformas dos projectos como sendo sistemas capazes de correr em contextos diferentes com comportamento diferentes mas sempre com uma base comum, um chapéu. E capazes também de se instanciarem, total ou parcialmente, fora do seu habitat natural, neste caso Picoas.

Isto na prática exigiu de nós um cumprimento mais rigoroso de um conjunto de boa práticas que nem sempre foram a regra: Usar sempre templating (ie: smarty, mason, template-toolkit) e CSS, prepararmos-nos para o multilingue, configurações dinâmicas dos serviços (por contexto, ie: bases de dados, memcacheds, etc), modularização e reutilização de componentes web (ie: mashups), repensar os procedimentos de passagem de desenvolvimento a produção (a contar os cenário de multi-hosting, multi-site).

### libsapojs & Widgets

![](/assets/booting-up-sapocv-9.jpg "photo 9")

Outro projecto que fizemos em 2007 e que nos ajudou em Cabo Verde foi a nossa [library de Javascript][38]. No fundo estamos a falar do mesmo, reutilização de componentes e distribuição. Os Widgets que desenvolvemos em Portugal ficam, através dos procedimentos de passagem a produção e replicação, automagicamente disponíveis em todo o universo SAPO, tal como um mapa do Google num blog se auto-actualiza sob o comando do seu dono.

### Em suma:

Estes são só alguns exemplos do tipo de preocupações que tivemos quando começámos a pensar no Internacional. Conselhos? Sim, alguns:

1. Uma boa arquitectura de sistemas é crucial para a evolução de qualquer projecto de TI. Nós, por questões históricas e heranças (legacy de mergers and stuff), aprendemos isto a bater com a cabeça na parede. Custou-nos mais. Não facilitem. Facilitem em tudo mas uma má arquitectura num projecto que quer crescer é um tiro no pé no médio-longo prazo.

2. Especifiquem por excesso, raciocinem top-down. Pensem à frente do tempo. É preferível perder 2 dias a colocar [gettext][39] nos templates, mesmo que não se use ainda, do que depois perder 1 mês a fazer refactoring de tudo para acomodar os novos requisitos. Definam um conjunto de boas práticas e cumpram-nas religiosamente. As áreas de negócio vão ficar irritadas por causa do famigerado time-to-market mas arranjem uma firewall e percam tempo no início, não durante. Eu sei que isto é uma lapalissada mas tem que ser dito. 

3. APIs são ouro, são a cola da Internet. Estruturem e façam interfaces para tudo, e anunciem-nos, mesmo que não usem. Seja RSS, XML, JSON, SOAP, Microformatos, o que for. Desde que seja um formato estruturado, até sou capaz de suportar WSDL. [HTML scrapping][40] ou logins para aceder a uma schema mutante de Mysql é que não, por favor. Produzam matéria prima, mesmo que seja inútil, e publiquem-na, de preferência de forma assíncrona para o caso dos eventos. Alguém algures, dentro ou fora da organização pode reutilizar esse material para construir um novo serviço, “decoupled” dos plataformas e dos autores das fontes, como deve ser.

4. Simplifiquem, não compliquem. O ser humano é complicado por natureza, temos uma tendência natural para nos metermos em alhadas e depois racionalizar tudo com explicações estapafúrdias. Para quê usar um SQL se o schema não é relacional? O filesystem é das bases de dados mais robusta e testadas do planeta, funciona impecável para queries do tipo chave/valor. Para quê um “full blown Apache Webserver” quando na realidade o que nos interessa é performance HTTP? Talvez um [lighty][41] seja mais adequado. Balanceamento [Layer4][42], não será um simples [perlbal][43] mais eficaz e robusto do que um dispendioso e obscuro equipamento de rede? Etc.

Para fechar, fica aqui o testemunho de que é possível construir uma arquitectura de um Portal Web completamente distribuída, modular, reutilizável  e flexível com produtos Opensource e prata da casa. Não se assustem nem se deixem levar à primeira pelos discursos dramáticos dos consultores e dos fabricantes (so called carrier-grade). A nós deu-nos muito gozo montar isto, agora é deixar amadurecer, aprender um pouco mais, e lançarmos-nos a maiores vôos.

[1]: http://pfig.livejournal.com/208601.html
[2]: http://sapo.cv/
[3]: http://en.wikipedia.org/wiki/Service-oriented_architecture
[4]: http://services.sapo.pt/
[5]: http://services.sapo.pt/Search/RSS?q=sapo
[6]: http://services.sapo.pt/Search/JSON?q=sapo
[7]: http://m.sapo.pt/
[8]: http://services.sapo.pt/
[9]: http://trac.softwarelivre.sapo.pt/broker
[10]: http://sourceforge.net/projects/mantaray/
[11]: http://trac.softwarelivre.sapo.pt/broker/browser/trunk
[12]: http://www.xmpp.org/extensions/xep-0060.html-howitworks
[13]: http://xmpp.org/
[14]: http://www.arturai.com/nm_quemsomos.php?lingua=en&ss_id=&ss_user=&ss_desc=&ss_menu=30&id=37
[15]: http://en.wikipedia.org/wiki/Content_Delivery_Network
[16]: http://en.wikipedia.org/wiki/Network-attached_storage
[17]: http://www.squid-cache.org/
[18]: http://videos.sapo.cv/
[19]: http://videos.sapo.pt/
[20]: http://www.bricolage.cc/
[21]: http://h.s.sl.pt/css/pt-main.css
[22]: http://js.sapo.pt/SAPO/
[23]: http://h.sapo.cv/css/cv-main.css
[24]: http://js.sapo.cv/SAPO/0.1/lib.js
[25]: http://samba.anu.edu.au/rsync/
[26]: http://www.lighttpd.net/
[27]: http://trac.lighttpd.net/trac/wiki/Docs%253APerformance
[28]: http://samba.anu.edu.au/rsync/
[29]: http://trac.softwarelivre.sapo.pt/libsapojs/wiki/Snippets/Webthumbs.js
[30]: http://www.enterprisenetworkingplanet.com/netos/article.php/1573881
[31]: http://www.nagios.org/
[32]: http://www.cacti.net/
[33]: http://cr.yp.to/djbdns.html
[34]: http://code.google.com/p/geoipdns/
[35]: http://japc.uncovering.org/
[36]: http://www.maxmind.com/app/city
[37]: http://js.sapo.pt/
[38]: http://trac.softwarelivre.sapo.pt/libsapojs
[39]: http://www.gnu.org/software/gettext/manual/gettext.html
[40]: http://en.wikipedia.org/wiki/Screen_scraping
[41]: http://www.lighttpd.net/
[42]: http://products.nortel.com/go/product_content.jsp?segId=0&parId=0&prod_id=25080
[43]: http://www.danga.com/perlbal/