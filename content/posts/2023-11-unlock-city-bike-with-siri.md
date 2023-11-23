---
title: "Unlock City Bike With Siri"
date: 2023-11-21T23:45:45+01:00
description: "A quick introduction to reverse engineering the Bergen BySykkel app and unlocking bikes with Siri."
tags: ["general"]
categories: ["general"]
author: "Mathias Haugsbø"
showToc: true
---

# Motivation

Winter is coming and gloves are worn, so unlocking the bike with the app is a bit cumbersome as I need to take off my gloves. I want to be able to unlock the bike by pressing my AirPods and say "bysykkel" which then unlocks a bike.

# Reverse engineering process

In order to unlock the bike, I needed to find out how the Bergen BySykkel app communicates with the backend. I used the following process:

1. Install HttpToolkit Http interceptor on you computer
1. Install HttpToolKit SSL certificate on your phone according to https://httptoolkit.com/docs/guides/ios/#manual-setup
1. Open Bergen BySykkel app on phone
1. Observe Http traffic on computer in HttpToolkit
1. Find the request for unlocking bikes.
   - Actually I ended up installing an android emulator on my laptop, installed the app, logged in and spoofed my GPS location in order to enable the "unlock bike" button. Instead of physically moving myself close to the station. Hehe.

## Findings

- The Bergen BySykkel app communicates with an undocumented graphql server at `https://core.urbansharing.com/public/api/v1/graphql`.
- The graphql server is protected by a JWT token in the `Authorization` header.
  - The token is produced during phone number validation. I am unsure how long the token lasts. Brief look into jwt.ms shows the following data contained, so I suspect that it is valid for a very long time:
    ```Json
    {
        "alg": "HS256",
        "typ": "JWT"
    }.{
        "role": "user",
        "id": 999999,
        "iat": 1700517887
    }.[Signature]
    ```
- Unlocking the bike is done through normal REST POST to the same API with token in header as show below in javascript:
<details>
<summary>JS code showing how to unlock bike</summary>

```JS
const headers = new Headers();
headers.append("accept-encoding", "gzip");
headers.append("accept-language", "en");
headers.append("apollographql-client-name", "bikesharing-multicity-android");
headers.append("apollographql-client-version", "7.1.2-bergen");
headers.append("authorization", "Bearer <YOUR-OWN-TOKEN-INTERCEPTED>");
headers.append("content-type", "application/json; charset=utf-8");
headers.append("host", "core.urbansharing.com");
headers.append("locale", "en");
headers.append("systemid", "bergen-city-bike");
headers.append(
  "user-agent",
  "UIP Citybike com.urbansharing.citybike.bergen/7.1.2-bergen-257102 (Google sdk_gphone64_arm64; SDK level 34)"
);
headers.append(
  "x-apollo-operation-id",
  "1e02563a70b8cc8f1bd51a6706b5c3deffc3f1e10837cadd891e97c08772482a"
);
headers.append("x-apollo-operation-name", "NewTrip");

const jsonBody = {
  operationName: "NewTrip",
  variables: {
    systemId: "bergen-city-bike",
    subscriptionId: "1724922",
    dockGroupId: "644", // Id of the station
    vehicleCategory: "bike",
    location: {
      coordinate: { lat: 60.3752383, lng: 5.33839 },
      accuracy: 6.894000053405762,
      altitude: 0,
      generatedAt: "2023-11-20T22:45:00.492Z",
    },
    preferVirtuallyCapable: false,
  },
  extensions: {
    persistedQuery: {
      version: 1,
      sha256Hash:
        "1e02563a70b8cc8f1bd51a6706b5c3deffc3f1e10837cadd891e97c08772482a",
    },
  },
};

var requestOptions = {
  method: "POST",
  headers: headers,
  body: JSON.stringify(jsonBody),
  redirect: "follow",
};

fetch("https://core.urbansharing.com/public/api/v1/graphql", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));
```

- I am able to unlock the bike from anywhere in the world, I do not need to be close as long as the latitude and longitude passed in the request body is close enough to the station.

</details>

# Calling API from Siri

IOS has a nice feature called "Shortcuts" which allows you to create custom actions. The process is a bit cumbersome, but it works. It really helps to build the shortcut on a Mac and then syncronise to your phone. Here is a screenshot of the shortcut I created:

![ios-bysykkel.shortcut-1](/ios-bysykkel.shortcut-1.png)

![ios-bysykkel.shortcut-2](/ios-bysykkel.shortcut-2.png)

## Short video example

https://youtube.com/shorts/o7qmNPRfscQ

# Next Steps

1. Extend the shortcut to automatically find the closest station and unlock the bike instead of hardcoding the station id.
1. Automatically unlock a bike everytime I'm close to a station.
