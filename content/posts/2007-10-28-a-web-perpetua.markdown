---
categories: portuguese tech-stuff
date: "2007-10-28T00:10:00Z"
disqusid: 261 http://arrifana.org/blog/?p=261
excerpt: 'Ao tornarem-se páginas web em aplicações assíncronas, perde-se a tradicional
  noção de actividade através animação do browser (vulgo “E” do IE a rodar, ou spinwheel
  no Safari, ou o que quer que o tema do Firefox tenha). '
frontimage: /assets/a-web-perpetua-1.jpg
oldurl: http://arrifana.org/blog/2007/10/a-web-perpetua/
title: A Web perpétua
aliases:
- /portuguese/tech-stuff/2007/10/28/a-web-perpetua
---

Ao tornarem-se páginas web em aplicações assíncronas, perde-se a tradicional noção de actividade através animação do browser (vulgo “E” do IE a rodar, ou spinwheel no Safari, ou o que quer que o tema do Firefox tenha). 

Assim sendo, com o advento do Ajax, chegou também a praga das [spin-wheels][1] nas páginas. Foi a resposta óbvia, com  inspiração gráfica no Safari, para o problema da falta de feedback que o UI deixou de dar ao utilizador quando a página está a “carregar”. E de certa forma tornou-se numa norma para os sites modernos.

No início até achei piada às spinners. Primeiro porque eram muito giras, claro. Segundo porque na Web, como em muitas outras coisas na vida, a percepção conta muito. E não tenham dúvidas que só por terem a bolinha a rodar estão a cortar a percepção do tempo que uma página demora a carregar por 2 ou mais. A reação natural é “isto está-se a mexer!”. Eu próprio devo ter uns quantos E-Mails que disparei à malta a pedir para meter o rodízio nas páginas.

O problema é que a coisa começou a abandalhar. Ou porque se tornou moda, ou porque os conhecimentos de Javascript se vulgarizaram, mas de repente todos os web developers sentiram um desejo incontrolável pelo utilização recursiva do $(‘spindiv’).style.display=’block’;

O problema é, meus caros, que não basta saber ligar a roda. Também é preciso saber desligá-la. Ou seja, já que estão a tentar replicar o comportamento de uma aplicação à séria, então tenham em conta que também devem notificar o utilizador quando há um erro, um timeout, ou qualquer outra situação anormal.

É que a abundância de rodízios mal montados anda a tornar a Web muito mais lenta e a dar má reputação a uma ideia que até era boa. Ainda no outro dia fiquei 2 minutos a olhar para uma página, hipnotizado pela roda, só para perceber mais tarde (via Firebug) que aquilo já tinha estoirado por outros motivos.

Ou pelo menos é a percepção que tenho…

![](/assets/a-web-perpetua-1.gif "photo 1")

[1]: http://www.napyfab.com/ajax-indicators/