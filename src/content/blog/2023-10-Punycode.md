---
title: "Punycode"
description: "What the heck is punycode?"
pubDate: 2023-11-08T10:20:03+02:00
tags: ["general", "monthly-recap"]
author: "Mathias Haugsbø"
showToc: false
draft: true
---

# Problem

Added a DNS entry called `mjøllnir.no` and assigned correct IP address. But when I typed `dig mjøllnir.no` in the terminal I got the following output:

```sh
➜  ~ dig mjøllnir.no

; <<>> DiG 9.10.6 <<>> mjøllnir.no
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NXDOMAIN, id: 47929
;; flags: qr rd ra ad; QUERY: 1, ANSWER: 0, AUTHORITY: 1, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 1232
; OPT=15: 00 17 5b 32 30 30 31 3a 38 63 30 3a 38 32 30 30 3a 31 3a 3a 32 5d 3a 35 33 20 72 63 6f 64 65 3d 53 45 52 56 46 41 49 4c 20 66 6f 72 20 6d 6a 5c 31 39 35 5c 31 38 34 6c 6c 6e 69 72 2e 6e 6f 20 41 ("..[2001:8c0:8200:1::2]:53 rcode=SERVFAIL for mj\195\184llnir.no A")
;; QUESTION SECTION:
;mj\195\184llnir.no.		IN	A

;; AUTHORITY SECTION:
no.			7200	IN	SOA	charm.norid.no. hostmaster.norid.no. 2023110940 7200 1800 2419200 7200

;; Query time: 47 msec
;; SERVER: 1.1.1.1#53(1.1.1.1)
;; WHEN: Thu Nov 09 13:02:03 CET 2023
;; MSG SIZE  rcvd: 169
```

- Which does not point anywhere???
- Notice `mj\195\184llnir.no` which does not look like `mjøllnir.no`

Site for converting text to punycode: https://www.punycoder.com/

## Debugging

Searched for `nginx reverse proxy æ ø å special characters` in bing.
The chatGPT suggested using Punycode, so I took a look and it worked.
