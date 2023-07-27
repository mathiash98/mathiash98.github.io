---
title: "Trailmap Generator"
date: 2023-07-27T14:43:40+02:00
description: "Generate your own trail map for any location in the world!"
tags: ["general", "maps"]
categories: ["general", "maps"]
author: "Mathias Haugsbø"
showToc: false
---

You might have seen [my other blog post](/posts/hjemmelaget-turkart/) about the homemade trailmap I created in Mapbox Studio with data from OpenStreetMap. I have now finally created a static website that will generate and export these maps for any location in the world!

The website is available at https://mathiash98.github.io/trail-map-generator and the source code is available on [GitHub](https://github.com/mathiash98/trail-map-generator).

The general implementation details:

1. In Mapbox studio I created a plain style with close to zero data and labels, since I would like to render these myself with custom styling not accessible from Mapbox on low zoom levels.
1. The user input the name of a relation that exists in OpenStreetMap. For example `Eidfjord` or `Vestland`.
1. Then the site iterates through a list of predefined layers with their corresponding Overpass turbo queries. For example all peaks are downloaded with `nwr[natural=peak]`.
1. Each layer is then downloaded from Overpass Turbo and converted to GeoJSON using osmtogeojson.
1. Then each layer is added to the MapboxGL map as a source and layer with a specified style.
1. Success!

To enable export of data I installed the great package `@watergis/mapbox-gl-export` which enables exporting map to SVG, PNG, JPG in quite good resolution.

I am quite happy with the results, and I hope you will find it useful as well. If you have any questions or suggestions please post and issue on [GitHub](https://github.com/mathiash98/trail-map-generator).
