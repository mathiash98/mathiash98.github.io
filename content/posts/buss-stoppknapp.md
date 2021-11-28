---
title: "Skyss Buss Stoppknapp"
date: 2021-11-28T15:03:18+01:00
description: "En hyllest til skyss osbussen sin stopp knapp"
tags: ["norsk", "design", "knapp"]
categories: ["interesting", "design"]
author: "Mathias Haugsbø"
showToc: false
---

Jeg har ikke vært noe engasjert i knapper tidligere. Men det endret seg på en tur hjem til foreldrene mine på osbussen. Når stoppet nærmet seg trykket jeg som vanlig på stoppknappen. Det var rett og slett kjærlighet ved første trykk!

La oss begynne med et bilde av en kjedelig vanlig knapp. Denne knappen er helt ålreit:

![Bilde av en kjedelig knapp med teksten: STOP og punktskrift: STOP](/buss-stoppknapp/normal-kjedelig-knapp.jpg)

- (Et raskt søk på punktskrift på Store Norske Leksikon (https://snl.no/punktskrift), så ser man at prikkene står for "STOP")

Og så har vi et bilde av en perfekt stoppknapp. Denne er helt nydelig:

![Bilde av den perfekte knappen med teksten: STOP og punktskrift: S](/buss-stoppknapp/perfekt-stoppknapp.jpg)

Men er ikke knappene helt like da? Jo de er ganske like og oppfyller viktige krav for en stoppknapp:

|       Krav       | Kjedelig knapp | Perfekt knapp |
| :--------------: | :------------: | :-----------: |
|    Synlighet     |       ✔️       |      ✔️       |
|   Blindeskrift   |       ✔️       |      ✔️       |
| Lett å trykke på |       ✔️       |      ✔️       |
| Haptic feedback  |       ❌       |      ✔️       |

Men hva gjør denne knappen så spesiell? Spør du kanskje. Da har du rett og slett ikke prøvd denne knappen. Når man trykker på den får man umiddelbar feedback på trykkingen iform av et klikk og at man spretter litt når man har trykket langt nok. Vanskelig å forklare. Mens den normale kjedelige knappen ikke har en slik klikk, som fører til at du ikke vet hvor langt ned du må trykke for å få respons.

La meg prøve å visualisere med en html knapp med litt css stiler: (trykk og hold for å se effekten)

{{< rawhtml >}}
<button class="knapp kjedelig">Kjedelig</button>
<button class="knapp perfekt">Perfekt</button>

<style>
.knapp {
    border: 7px solid #F6D922;
    border-radius: 5px;
    padding: 5px 10px;
    margin: 8px;
    background-color: #C74243;
    color: white;
    transition: all 0.2s;
    box-shadow:
		0 1px 2px rgba(0,0,0,0.2),
		inset 0 -2px 0 rgba(0,0,0,0.25),
		inset 0 -30px 30px -30px rgba(0,0,0,0.15);
}
.kjedelig:active {
    transform: translateY(4px);
    box-shadow:
		0 0 0 rgba(0,0,0,0),
		inset 0 2px 2px rgba(0,0,0,0.6),
		inset 0 -30px 30px -30px rgba(0,0,0,0.5),
		0 2px 0 rgba(255,255,255,0.5);
}

.perfekt:active {
    
    animation: push 0.2s;
}
@keyframes push{
    0% {
        transform: translateY(3px);
    }
  75%  {
      transform: translateY(4px);
      box-shadow:
		0 0 0 rgba(0,0,0,0),
		inset 0 2px 2px rgba(0,0,0,0.6),
		inset 0 -30px 30px -30px rgba(0,0,0,0.5),
		0 2px 0 rgba(255,255,255,0.5);
    }
  100% {transform: translateY(3px);}
}
</style>

{{< /rawhtml >}}

- Legg merke til hvordan den gode knappen gir en form for haptic feedback når du trykker på den. Mens den kjedelige bare synker ned til du ikke kan trykke hardere lenger.
  - Merker du at noe mangler når du trykker på den kjedelige knappen? Jeg lurer ihvertfall på når jeg skal slutte å trykke. Det er dette som gjør den perfekte knappen til en perfekt knapp i mine øyne.

Håper du har fått litt interesse for knapper rundt deg etter dette innlegget. Det er mye annet man kan si om brukervennlig design generelt sett. Men jeg tror jeg stopper innlegget her.

Ps. følg RSS feeden min for å få varsel neste gang jeg legger ut et innlegg.
