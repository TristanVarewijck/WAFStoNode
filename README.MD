# Project PWA :gear:

## TechDefined Concept Design :pencil2:

![TechDefined-concept-design](https://github.com/TristanVarewijck/TechDefined/blob/main/assets/images/concept-display.png)

## Live Demo :clapper:

See the latest updated demo here:
[Link to DEMO](https://pwa-news-node.herokuapp.com/)

---

## Description :label:

For the project PWA we had to convert our WAFS project into a progressive web app. I had to do this with the use of: node.js, express.js, service-worker and pre-caching.

---

## Table of Contents :arrow_right_hook:

- [Features](#features)
- [Activiy](#activitydiagram)
- [Cache](#cache)
- [API](#api)
- [Usage](#Usage)
- [Meta](#meta)
- [License](#license)

---

## Features

:chains: Features for this app are mainly still under construction.

1. **Search** <br>
   Search for the Topics you are interested from over the whole World.
2. **Endless scroll** <br>
   Scroll trough endless articles related to your topic or scroll to the headlines of this current day!
3. **Sharing** <br>
   Share articles on Twitter.
4. **Text to Speech** <br>
   With the Text to Speech Feature you can have it read to you instead of reading it yourself.
5. **Suggested Topics** <br>
   With the filter-buttons your can search on topics that are suggested by the App.
6. **Read more** <br>
   Clicking on the banner of the article will bring your to the detail page where can read more about it.

---

## Activity Diagram

Here you see the most common flow in the app and how the service worker finds his place init.

**Default Diagram** <br>
<img src="https://github.com/TristanVarewijck/WAFStoNode/blob/main/public/assets/images/Default-flow-no-internet.png" alt="default-flow" width="600px"/>

## Service Worker

In this project there is a service worker wich controls the cache use in this particular project is only used for displaying a offline page when there is no internet connection below you can see how this works in a diagram. In further project the strategy will be different when there are more static pages.

**Service worker diagram** <br>
<img src="https://github.com/TristanVarewijck/WAFStoNode/blob/main/public/assets/images/Service-worker.png" alt="service-worker-flow"/>

Hierboven zie je dat wanneer het internet niet beschikbaar is de service worker geen request doet naar de server. De service worker gaat eerst kijken wat er in de cache staat. Op het moment dat de service worker niks terug kan krijgen van de server dat laat hij de offline.html pagina zien.

## Caching

Om een offline experience mee te geven aan de app heb ik ervoor gezorgd dat wanneer er geen internet meer is statische pagina's kunnen worden opgeslagen op dit moment laat de app een "offline" pagina zien.
<br>

**Hier zie je de app in een online en een offline modus** <br>
<img src="https://github.com/TristanVarewijck/WAFStoNode/blob/main/public/assets/images/home.png" alt="home" width="300px"/><img src="https://github.com/TristanVarewijck/WAFStoNode/blob/main/public/assets/images/offline.png" alt="offline" width="300px"/>

### Cache, service-worker and Manifest

In de cache zijn alle nodige elementen opgeslagen om de offline pagina op de juiste manieren te renderen. <br>

<img src="https://github.com/TristanVarewijck/WAFStoNode/blob/main/public/assets/images/cach-items.png" alt="cach"/>

Hieronder zie je dat de response van deze elementen goed is. <br>

<img src="https://github.com/TristanVarewijck/WAFStoNode/blob/main/public/assets/images/SW-connect.png" alt="newsapi-logo"/>

Er is een connectie gemaakt met de service-worker (installed) <br>
<img src="https://github.com/TristanVarewijck/WAFStoNode/blob/main/public/assets/images/registered.png" alt="install"/>

Om dit een PWA te maken ben je verplicht om aan de browser een Manifest bestand mee te geven: <br>

<img src="https://github.com/TristanVarewijck/WAFStoNode/blob/main/public/assets/images/manifest.png" alt="manifest"/>

## Server side

Op de server render ik mijn pagina's die door met router de juiste html file renderen. De items die ik per pagina inlaad hebben invloed op de performance hieronder zie je de huidige performance en een aantal dingen die ik al gedaan heb om de performance te verbeteren.

### Performance

Nu: <br>
<img src="https://github.com/TristanVarewijck/TechDefined/blob/main/assets/images/newApi-LOGO.jpeg" alt="newsapi-logo" width="450px"/>

De volgende dingen heb ik al gedaan om de performance te verbeteren.

- "Defer" op minder belangrijke scripts en css bestanden.
- "pre-connect" externe css of fonts van te voren te laten inladen.
- "lazy-loading" images na de viewport view laten inladen.
- "Minify" html en css bestanden geminified.

Ook zijn er nog een aantal dingen die ik nog beter zou kunnen maken zoals:

- img files omzetten naar webp bestanden.
- viewport elementen gelijk laten inladen

## Client side

Op de client heb ik een homepagina waarin je artikelen kan vinden gebaseerd op je zoekterm en wanneer je op een artikel klikt dat komt je bij een detail pagina waar je het artikel ook echt kan gaan lezen.

<img src="https://github.com/TristanVarewijck/WAFStoNode/blob/main/public/assets/images/home.png" alt="home" width="200px"/><img src="https://github.com/TristanVarewijck/WAFStoNode/blob/main/public/assets/images/offline.png" alt="offline" height="500px"/>

## API

<img src="https://github.com/TristanVarewijck/TechDefined/blob/main/assets/images/newApi-LOGO.jpeg" alt="newsapi-logo" height="500px"/>

For this project i am using the NewsAPI from - [NewsAPI](https://newsapi.org/) <br>
To search on the app im using the endpoints below with the following params:

This one is so i can search articles for specific topics:
[https://newsapi.org/v2/everything](https://newsapi.org/v2/everything)

|  Key  |    q    |   sortBy    | language | pageSize |  apiKey  |
| :---: | :-----: | :---------: | :------: | :------: | :------: |
| value | {input} | publishedAt |    en    |   100    | {apiKey} |

this one is so i can see the latest headlines in a specific category:
[https://newsapi.org/v2/headlines](https://newsapi.org/v2/headlines)

|  Key  | country |  category  | pageSize |  apiKey  |
| :---: | :-----: | :--------: | :------: | :------: |
| value |   us    | technology |   100    | {apiKey} |

:rotating_light: : As explained earlier the API is not usable outside your localhost, for this project i used the **FREE version** of this API.

---

## Usage

For using this app yourself you need to follow the following steps:

### 1. Clone Repo locally

```
git clone https://github.com/TristanVarewijck/TechDefined.git
```

### 2. Connect your API key

If you want to connect with the API you have to fill in your own personal {apiKey} wich you can get here: <br>
[Get NewsAPI apiKey](https://newsapi.org/).

```
https://newsapi.org/v2/everything?q=${input.value}&sortBy=publishedAt&language=en&pageSize=100&apiKey=${apiKey}
https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=100&apiKey=${apiKey}
```

### 3. Install dependencies

Install to need dependencies for using this project.

```
npm i
```

### 4. Run on Localhost

Because i am using the free version of this API your need to run it on your localhost to test it. If you want to move further with this app make sure to check out the [pricing scheme](https://newsapi.org/pricing) of NewsAPI.

For easily running this project on your localhost you can use the command:

```
npm start
```

### Thats it! :smile:

---

## Meta

Tristan Varewijck <br>
:email: [Tristan.varewijck@gmail.com](Tristan.varewijck@gmail.com) ||
:large_blue_diamond: [https://www.linkedin.com/in/tristanvarewijck-1999/](https://www.linkedin.com/in/tristanvarewijck-1999/)

![Ask Me Anything !](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)

---

## License

Usage is provided under the [MIT License](https://github.com/git/git-scm.com/blob/master/MIT-LICENSE.txt) MIT. See [LICENSE](https://github.com/TristanVarewijck/WAFStoNode/blob/master/LICENSE) for the full details.

<!-- Here are some hints for your project! -->

<!-- Start out with a title and a description -->

<!-- Add a nice image here at the end of the week, showing off your shiny frontend 📸 -->

<!-- Add a link to your live demo in Github Pages 🌐-->

<!-- replace the code in the /docs folder with your own, so you can showcase your work with GitHub Pages 🌍 -->

<!-- Maybe a table of contents here? 📚 -->

<!-- ☝️ replace this description with a description of your own work -->

<!-- How about a section that describes how to install this project? 🤓 -->

<!-- ...but how does one use this project? What are its features 🤔 -->

<!-- ...you should implement an explanation of client- server rendering choices 🍽 -->

<!-- ...and an activity diagram including the Service Worker 📈 -->

<!-- This would be a good place for a list of enhancements to optimize the critical render path implemented your app  -->

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->

<!-- We all stand on the shoulders of giants, please link all the sources you used in to create this project. -->

<!-- How about a license here? When in doubt use GNU GPL v3. 📜  -->

1. Buttons click
2. set post to get request
3. styling
4. photos
5. text to voice function
