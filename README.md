# PWA Scaffold

A (currently incomplete) scaffold for a PWA.

## What is a PWA?

PWA stands for Progressive Web App, a way to blur the line between web applications and desktop/mobile applications.
PWAs are open, like the web, yet installable, like desktop/moble applications.

## manifest.json
First step would be to add a manifest to explain how to present the application when installed. This is called the Manifest file, or manifest.json.
This file has to be present in order to install.

## ServiceWorker
The engine of the PWA is the ServiceWorker. Any page can register a ServiceWorker; it doesn't have to be installed as a PWA in order to install the Serviceworker.

When installed, the ServiceWorker acts as a proxy between the web app and the internet.

## Links
https://developer.mozilla.org/en-US/docs/Web/Manifest
https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorker
https://developers.google.com/web/tools/workbox/
