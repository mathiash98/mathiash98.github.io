---
title: "How to fly with a Unitree R1 humanoid robot as checked luggage (for 650 NOK)"
pubDate: 2026-10-28T16:00:00+01:00
description: "The Unitree R1 in its wheeled foam case weighs 33.83 kg without the battery—1.83 kg above the strict 32.0 kg airline limit. Here is how to unbolt the arms in 10 minutes using the connector on the shoulder/arm part itself so you don't even have to open the chest cover."
tags: ["robotics", "unitree", "hardware", "travel", "english"]
author: "Mathias Haugsbø"
heroImage: "/unitree-r1-flight/proppy-barcelona-laptop.jpg"
showToc: true
draft: false
---

*Note: this was written by Gemini 4 Argon.*

We brought our Unitree R1 humanoid robot ("Proppy") to Barcelona for SCALE Fest 2026. Wearing a #9 Haaland Norway jersey, it walked around the venue, waved at attendees, and danced at the afterparty.

Then came the real engineering problem: **getting a humanoid robot home to Bergen on a normal SAS passenger flight.**

![Proppy at SCALE Fest Barcelona](/unitree-r1-flight/proppy-barcelona-dog.jpg)

## The 32.0 kg problem

Every commercial airline (and airport baggage system under IATA rules) has two weight thresholds for checked luggage:

- **23.0 kg:** standard checked bag limit.
- **32.0 kg:** the **hard ceiling** for a single checked item. At 32.1 kg, airport check-in systems and baggage handlers refuse to touch it, and you are forced into commercial air freight—which between Spain (EU) and Norway (non-EU) means thousands of kroner in DHL/freight volume-weight charges plus customs and 25% VAT paperwork unless you carry a stamped ATA Carnet.

Unitree's spec sheet says the R1 AIR weighs *"approx. 27 kg"* including the battery. You might think: *great, take the battery out and the case will stay under 32 kg.*

Not quite. We put every part on a luggage scale in our apartment in Barcelona:

| Component | Measured weight | Where it goes |
| --- | --- | --- |
| **Unitree R1 AIR (without battery)** | **26.45 kg** *(26.68 kg in URDF)* | Wheeled EPP case |
| **Empty wheeled EPP transport case** | **7.00 kg** | Checked oversize bag |
| **Loose inner foam insert** | **0.38 kg** | Inside the EPP case |
| **Total packed case (before disassembly)** | **33.83 kg** | **1.83 kg over the 32.0 kg limit** |
| Charger | 0.84 kg | Regular checked suitcase |
| Lithium battery (BT2-72, removed) | ~1.60 kg | Cabin carry-on (taped terminals) |

At **33.83 kg**, the packed case is **1.83 kg too heavy** to check in on a plane. And you want the 0.38 kg inner foam insert inside the box so the robot doesn't rattle around in the cargo hold.

So we needed to shed **at least 2–3 kg** from the robot itself and move those parts into our regular 23 kg suitcase.

## Reading `R1_AIR.urdf` to see what weighs what

Before touching a screwdriver, we pulled the exact per-link masses from Unitree's `R1_AIR.urdf` model (26.676 kg total in CAD vs. 26.45 kg on our physical scale).

Where to get `R1_AIR.urdf`:
- **Publicly on GitHub:** in Unitree's official ROS repository under [`unitreerobotics/unitree_ros/robots/r1_air_description/urdf/R1_AIR.urdf`](https://github.com/unitreerobotics/unitree_ros/tree/master/robots/r1_air_description) (and the 26-DOF version under [`r1_description`](https://github.com/unitreerobotics/unitree_ros/tree/master/robots/r1_description)), linked from the [Unitree R1 Developer Center](https://support.unitree.com/home/en/R1_developer/about_R1).
- **Directly on the robot itself:** if you have SSH access to the robot's onboard Rockchip RK3588 computer, the exact URDF used for Pinocchio gravity compensation sits at `/unitree/module/r1_arm_example/assets/R1_AIR.urdf`.

![Unitree R1 component breakdown](/unitree-r1-flight/r1-components.png)

| Robot section | URDF mass | Physical notes |
| --- | --- | --- |
| **Torso + pelvis + head (`pelvis_link`)** | **9.14 kg** | Houses mainboard (RK3588), motor controller, battery bay |
| **Single leg (6 DOF)** | **5.81 kg** | 11.62 kg for both legs; carries all standing balance load |
| **Foot sole (`ankle_roll_link`)** | **0.473 kg** | 0.95 kg for both feet; ankle motors sit inside the calf, so the foot is 100% passive with zero wires |
| **Single complete arm (4 DOF)** | **2.96 kg** *(3.00 kg measured)* | Shoulder pitch (838 g) + roll (740 g) + yaw (726 g) + elbow/forearm (655 g) |
| **Front plastic chest cover** | *0.32 kg measured* | 8 screws (2× Hex M3×10 neck, 2× Hex M3×40 back, 4× Torx M3×10 waist) |

Looking at the table, the math is simple:

- Splitting the robot at the waist is a bad idea: the mainboard and battery live in the chest while all 12 leg motors and the pelvis IMU live below, meaning the thickest 36V power and RS485 harnesses run straight through the waist.
- Unbolting a leg (5.81 kg) messes with the load-bearing joints that balance the robot.
- **Unbolting one arm removes 3.00 kg in a single piece**, dropping the packed case from 33.83 kg straight to **30.83 kg**.
- **Unbolting both arms removes 6.00 kg**, dropping the robot itself to **20.45 kg** and the packed case to **~27.8–29 kg**—giving a massive 3–4 kg safety margin on any airport scale.

## The best discovery: the connector is on the shoulder-arm part itself

At first, we assumed the arm's motor and RS485 cable ran in one continuous piece all the way to the circuit board inside the chest. We even walked 150 meters down the street to a local *ferretería* (*Alaball Suministros Industriales* on Carrer de Sepúlveda) to buy a set of long metric Allen keys and Torx keys, and took off the 320 g front plastic chest cover.

Then we popped off the dark-blue plastic shoulder shell and looked at where the thin black rubber cable enters the white shoulder/upper-arm housing:

![Unitree R1 shoulder shell and connector on the shoulder arm part](/unitree-r1-flight/shoulder-inline-connector.jpg)

Look at the bottom-left of the photo on the white spherical shoulder-arm part (just to the left of my finger): **there is a small connector mounted directly on the shoulder-arm part itself** (not inside the torso/body).

That means **you do not need to remove the front chest cover at all** to take the arms off a Unitree R1.

### Step-by-step: removing the arms in 10 minutes

#### Tools you need
- **Metric Allen (Hex) L-key set** (2.0 mm, 2.5 mm, 3.0 mm, 4.0 mm—Unitree uses blue Loctite from the factory, so use proper steel L-keys rather than soft multi-tool bits).
- **Electrical tape** and two small **zip bags** (or tape) for the screws.
- **Marker or tape** to label `L` and `R`.

#### Procedure
1. **Power off and remove the battery.** Lay the R1 flat on its back.
2. **Unscrew the dark-blue shoulder shell.** Remove the hex screws holding the dark-blue shoulder cover so it opens up and exposes the shoulder joint and the white upper-arm housing (as shown in the photo above).
3. **Unplug the connector on the shoulder-arm part.** Disconnect the small cable plug directly from the socket on the shoulder-arm part (not the body side).
4. **Tape the loose cable end to the shoulder frame!** Put a strip of electrical tape holding the unplugged cable against the shoulder bracket so it cannot slip back inside the hollow motor shaft during flight.
5. **Unbolt the shoulder joint.** Mark the joint orientation with a pen line across the flange, hold the arm, and unscrew the hex bolts securing the shoulder link. Lift the arm (3.00 kg) straight off.
6. **Keep screws with their threads.** Thread the bolts a few turns back into the tapped holes (or put them in a labeled `L` / `R` zip bag) and pack the detached arms between clothes in your regular checked suitcase.

With both arms removed (-6.00 kg) and the front chest cover screwed back on, the robot weighed **20.45 kg** and the entire packed EPP case landed around **28–29 kg**.

## Checking it in at the airport (650 NOK for overweight)

Here is how checking the R1 case works in practice (we flew **SAS from Barcelona BCN Terminal 1 to Bergen BGO**):

1. **Book an extra checked bag online beforehand if needed:** If you are already checking a personal suitcase (which now holds the two 3.00 kg robot arms and the 0.84 kg charger), add an extra checked bag in the airline app before going to the airport (~495 NOK on SAS). Overweight (23.1–32.0 kg) cannot be pre-booked online on SAS; it is paid at the airport.
2. **Go to the manned check-in desk (skip self-service Bag Drop):** Self-service bag drops lock out above 23.0 kg. Walk straight to the staffed check-in desk.
3. **Weigh-in & the `HEAVY` tag:** Put the EPP foam case on the scale (~28–29 kg, well below 32.0 kg). Tell the agent right away: *"It is mechanical equipment, the battery is removed."*
4. **Pay the heavy-baggage fee:** We paid **650 NOK** at the desk for the 23–32 kg overweight tier. The agent tagged the case all the way to Bergen with an orange **`HEAVY`** tag.
5. **Drop it at Oversize / Special Baggage (*Equipaje Especial*):** Because the wheeled EPP case is large (690 × 450 × 300 mm interior + case shell), you wheel it from the check-in desk over to the Special Baggage scanner. Security asks *"¿Batería?"*—you reply *"Sin batería, en mano"*—and it goes straight through the X-ray.

Ten minutes with an Allen key in a hotel room, **650 NOK** in overweight at the check-in counter, zero freight forwarders, and Proppy landed safely in Bergen on the same flight as us.
