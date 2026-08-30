---
title: "Bolig eller indeksfond? Én linje avgjør det meste"
pubDate: 2026-08-31T01:30:00+02:00
description: "Jeg har regnet på 62 leiligheter gjennom årene. Her er formelen som forteller hvilken yield en utleiebolig faktisk må ha — og hvorfor svaret er tre tall, ikke ett."
tags: ["norsk", "økonomi", "bolig"]
author: "Mathias Haugsbø"
showToc: true
draft: true
---

Jeg har et regneark. Det har vokst i årevis, én kolonne per leilighet jeg har vært på visning på eller bare glodd på i FINN-appen på en søndag. 62 av dem er ferdig utregnet: kjøpesum, oppussing, felleskostnader, leie, lån, avdrag.

Og likevel har jeg aldri klart å svare skikkelig på det enkleste spørsmålet:

> **Hvilken yield må egentlig til før dette gir mening?**

For alternativet er ikke å gjøre ingenting. Alternativet er å sette den samme egenkapitalen i et globalt indeksfond, aldri se på den igjen, og bruke helgene på noe annet enn å bytte sikringsskap.

Jeg har bygget [en kalkulator](/bolig-vs-indeksfond/) som svarer på det. Her er hva jeg lærte av å lage den.

## Formelen

Se bort fra skatt, avdrag og omkostninger et øyeblikk. Da er avkastningen på egenkapitalen i en belånt bolig ren aritmetikk: leieoverskuddet, pluss verdistigningen, minus renten på lånet, delt på egenkapitalen.

Setter du den lik indeksfondets avkastning og løser for yielden, faller terskelen ut av seg selv:

```
y* = R × (1 − B) + r × B − g
```

- `y*` — netto yield boligen må ha
- `R` — forventet avkastning i indeksfondet
- `B` — belåningsgrad
- `r` — lånerenten
- `g` — årlig verdistigning

Det er hele greia. En linje.

## Fortegnet er poenget

Se på hva som skjer når `B` øker. Terskelen beveger seg **mot renten** og **bort fra** indeksfondets avkastning.

Med andre ord: så lenge du låner billigere enn indeksfondet gir, *senker* mer gjeld kravet til yield. Det føles feil første gang man ser det. Men det er bare gearing — du tjener differansen mellom lånerenten og avkastningen på hele boligens verdi, ikke bare på egenkapitalen din.

Med dagens tall — 7 % forventet i fondet, 80 % belåning, 5 % rente, 3,5 % verdistigning:

```
7,0 % × 0,20 + 5,0 % × 0,80 − 3,5 % = 1,9 %
```

**1,9 % netto yield.** Det er lavt. Nesten hvilken som helst utleiebolig i Bergen klarer det.

Så da er saken avgjort? Nei. Det er her jeg tok feil i mange år.

## Det er tre terskler, ikke én

«Gir det mening» er egentlig tre forskjellige spørsmål:

| Spørsmål | Terskel (80 % lån, 5 % rente) |
| --- | --- |
| Slår den indeksfondet? | 2,7 % |
| Dekker leien renten? | 3,9 % |
| Betaler den sine egne avdrag? | 6,0 % |

*(2,7 % og ikke 1,9 % fordi den fulle simuleringen tar med skatt, salgsomkostninger og avdrag.)*

Den siste er den som gjør vondt. **6,0 % netto yield** for at boligen skal klare seg selv hver måned. Av mine 62 leiligheter klarer **7**.

De andre 55 krever at du sprøyter inn penger. Ofte 3 000–8 000 kroner i måneden, hver måned, i mange år. Regnestykket sier fortsatt at du tjener på det — men bare hvis du faktisk *har* de pengene, hver måned, uansett hva som skjer med jobben, renten eller leietakeren.

Det er forskjellen på å ha rett og å overleve.

## Fella i mitt eget regneark

Da jeg regnet om alle 62 boligene oppdaget jeg noe pinlig: kolonnen jeg hadde kalt «Yield» var **brutto**.

Den regnet leieinntekt etter ledighet delt på totalpris — men trakk aldri fra felleskostnader, kommunale avgifter eller forsikring. Og vedlikehold sto ikke i arket i det hele tatt.

Forskjellen er ikke liten:

- Median **brutto** yield: **6,2 %**
- Median **netto** yield: **4,6 %**
- Median netto **med vedlikehold**: **~3,9 %**

Over to prosentpoeng forsvant. Det forklarer hvorfor leiligheter jeg hadde notert som «5,4 % yield, ser bra ut» kom ut med negativ avkastning på egenkapitalen i min egen kolonne lenger ned. Tallene motsa hverandre i samme regneark, og jeg hadde ikke lagt merke til det.

Vedlikehold er den vanligste grunnen til at yield ser bedre ut på papiret enn på konto. Sett av 0,7 % av boligverdien i året. Det er ikke pessimisme, det er bad som skal pusses opp.

## Maksprisen: gang månedsleien

Snu regnestykket. Låser du yielden, faller maksprisen ut — og fordi driftskostnadene stort sett følger leien, blir svaret **lineært**. Én multiplikator du kan gange månedsleien med, på visningen, i hodet:

```
maks kjøpesum = månedsleie × k
k = 12 (1 − ledighet − drift) ÷ (y* (1 + dok) + vedlikehold)
```

Med dagens forutsetninger:

| | Multiplikator |
| --- | --- |
| For å slå indeksfondet | **259 × månedsleien** |
| For null kontantstrøm | **131 × månedsleien** |
| Det jeg faktisk betalte (median) | 190 × månedsleien |

En leilighet som leies ut for 20 000 i måneden: betal maks 5,2 millioner hvis du bare skal slå fondet, maks 2,6 millioner hvis den skal betale sine egne avdrag. Jeg har i snitt betalt 3,8 millioner. Midt imellom — som forventet, og ubehagelig presist.

## Det lille rommet vinner

Jeg brukte mine egne leieintervaller: 17–22k for ett soverom, 18–22k for to, 26–30k for tre, 32–38k for fire.

Legg merke til de to første. **Ett og to soverom leies ut for nesten det samme.** Det andre soverommet er verdt kanskje tusen kroner i måneden.

Regnet om til maks pris per kvadratmeter:

| | Maks kr/m² |
| --- | --- |
| 1 soverom (45 m²) | **98 000 – 127 000** |
| 2 soverom (62 m²) | 75 000 – 92 000 |
| 3 soverom (85 m²) | 79 000 – 92 000 |
| 4 soverom (108 m²) | 77 000 – 91 000 |

Ettromsleiligheten forsvarer **omtrent 30 % høyere kvadratmeterpris** enn alt annet. Leien følger ikke arealet — den følger antall dører du kan låse. Det er derfor små enheter vinner per kvadratmeter, hver gang.

Spranget fra to til tre soverom er derimot ekte: +8 000 i måneden, altså over to millioner i maksbudsjett.

## Renten og verdistigningen gjør hele jobben

Yield og kjøpesum kan du regne ut på visningen. Renten de neste femten årene og verdistigningen i samme periode kan du ikke.

Skru renten fra 5 % til 7 % og verdistigningen fra 3,5 % til 2 %, altså omtrent 2023:

- Nødvendig yield: 2,7 % → **5,0 %**
- Multiplikator: 259 × → **84 ×**
- Boliger som holder mål: 47 av 62 → **15 av 62**
- Boliger som betaler egne avdrag: 7 → **1**

Det er den samme porteføljen. Den samme leien. Bare to tall som er utenfor din kontroll, og hele konklusjonen snur.

Det er ikke et argument mot bolig. Det er et argument for å vite hvilken vei du satser, og for å ha margin nok til å ta feil.

## Det aritmetikken ikke ser

Modellen sammenligner forventede kroner. Den sammenligner ikke:

- **Risiko.** Med 80 % lån gir 3,5 % verdistigning deg 17,5 % på egenkapitalen — men et fall på 22,5 % nuller den. Indeksfondet er ubelånt.
- **Spredning.** Ett bygg, én by, én leietaker om gangen, mot tusenvis av selskaper i titalls land.
- **Tid.** Visninger, kontrakter, vannlekkasjer, inkasso, oppussing mellom leietakere. Sett en timepris på det og trekk den fra yielden.
- **Likviditet.** Fondet selges på en dag. Boligen på et kvartal, og du kan ikke selge et halvt bad.
- **Banken.** Utlånsforskriften stresstester deg på dagens rente pluss 3 prosentpoeng. Den femte boligen får du sjelden kjøpt, uansett hva regnearket sier.

## Prøv den selv

Kalkulatoren ligger her: **[Hvilken yield må boligen ha?](/bolig-vs-indeksfond/)**

Dra i belåningsgrad, rente, verdistigning og skatt, og se alle 62 boligene skifte farge. Du kan lime inn en FINN-annonse så fyller den ut prisantydning, felleskostnader, kommunale avgifter og eieform automatisk. Og alle innstillingene ligger i URL-en, så et scenario kan deles som en lenke.

Konklusjonen min etter å ha bygget den: bolig med lån slår indeksfondet på forventning ganske komfortabelt, så lenge du låner billigere enn fondet gir og prisene stiger. Men marginen er tynnere enn den føles, den avhenger av to tall ingen av oss kjenner, og prisen for meravkastningen betales i likviditet og søndager.

Det er fortsatt en god handel. Bare ikke den gratis lunsjen den ofte selges som.
