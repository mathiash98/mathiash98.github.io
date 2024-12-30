---
title: "Remove Buzzer in Electronics"
pubDate: 2022-09-28T23:52:00+01:00
description: "How to disable buzzers in home electronics."
tags: ["electronics"]
author: "Mathias Haugsbø"
showToc: false
---

So I installed a shiny new mediocre panel heater from Namron (Namron WBL0636) for my tenants. It was cheap, looks ok and and heats the room. So what else could you ask for? Not much.

After a while they started complaining about hearing some beeping sounds, and did not understand where they came from. I did not know neither, but after some time I understood that the heater must be the reason. So I looked up the manual and sure enough I found these "amazing beeping features"; it creates a LOUD buzzer beep sound 10 times every 30 minutes after a power outage. And it beeps every time the window is opened and the temperature falls be 5 degrees.

From the manual:

> In case of a power outage, the buzzer will start to ring 10 times every 30 minutes indicating that a power outage has occurred. Press any key on the thermostat to stop the ringing.

> In case of a window is open in the room, the heater has a window opening remind function. If the temperature drops more than 5°C within 10 minutes, the buzzer will ring 3 times.

So how do we stop the buzzer? I looked online on user manuals and facebook posts of other frustrating customers, but Elektroimportøren and Namron says that it is impossible to disable it, so then the only option is to remove the buzzer...

As the proper manly man I am, I took the case in my own hands (as we say in Norway). I removed the heater from the wall and started disassembling it to look for the annoying buzzer. It was nowhere to be found in the display and button circuit so it had to be deeper down.

![Display & buttons unit](/de-buzzify/Display_button_unit.jpg)
![Display & buttons circuit unit](/de-buzzify/Display_button_unit_circuit.jpg)

Inside the heater there is a power supply and circuit board for connecting the multiple safety temperature sensors aaaand a really annoying buzzer. The buzzer can be identified by a round black plastic with a small hole in the middle of it.

![Display & buttons circuit unit](/de-buzzify/Power_supply_circuit.jpg)

It can make sense to desolder and completely remove the buzzer, but this should not be done. This is because you do not know how the buzzer participates in the electronic circuit, it might actually be critical for keeping some low tech electronic running stable. Instead you should "disable" the buzzer by removing the metal plate inside the buzzer which is the evil kid making loud sounds. Like described in [this lovely YouTube video.](https://www.youtube.com/watch?v=cNZ-w5XYVZ8)

- Read more about buzzers on Wikipedia here: [Wikipedia buzzer](https://en.wikipedia.org/wiki/Buzzer).

Find some pliers and go ahead, pull that bad boy out and you are good to go.
![Display & buttons circuit unit](/de-buzzify/Buzzer_removal_plier.jpg)

Screw everything back together and test out your new shiny silent panel heater!

Thankfully Namron has stopped producing these heaters with a buzzer in the new models they sell now. I hope the person that designed the product with a super useful buzzer has learned that this is not something users want.

Subscribe to my RSS feed to get a notification the next time I publish a rant.
