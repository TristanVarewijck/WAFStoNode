## Project WAFS :gear:

_Shields that represent my project - They change over time._ (https://shields.io/)

![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square) ![Activity](https://img.shields.io/github/last-commit/TristanVarewijck/TechDefined) ![Isseus](https://img.shields.io/github/issues/TristanVarewijck/TechDefined) ![Language](https://img.shields.io/github/languages/top/TristanVarewijck/TechDefined) ![Count](https://img.shields.io/github/languages/count/TristanVarewijck/TechDefined?color=#a55eea) ![NPM](https://img.shields.io/npm/v/npm) ![MIT-License](https://img.shields.io/apm/l/vim-mode)

### TechDefined Concept Design :pencil2:

![TechDefined-concept-design](https://github.com/TristanVarewijck/TechDefined/blob/main/assets/images/concept-display.png)

### Live Demo :clapper:

See the latest updated demo here:
[Link to DEMO](https://tristanvarewijck.github.io/TechDefined/)

:rotating_light: **WARNING** :rotating_light: <br>
API does not work in the live-demo to see the full experience of this app, make sure to clone it locally and run in on your localhost.

To get acces on the full API make sure to see their [pricing scheme](https://newsapi.org/pricing).

---

### Description :label:

For the project WAFS I'm going to make a "single page" tech-news app.
On the app you can see the most relevant articles in the tech world, in addition, you have suggested search results and you can search for articles on a specific topic.

---

### Table of Contents :arrow_right_hook:

- [Features](##features)
- [API](##API)
- [Checklist](##Checklist)
- [Meta](##Meta)
- [License](#license)

---

## Features :chains:

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

---

## API :green_circle:

<img src="https://github.com/TristanVarewijck/TechDefined/blob/main/assets/images/newApi-LOGO.jpeg" alt="newsapi-logo" width="200px"/>

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

## Checklist :white_check_mark:

In addition to the features that are now available, there are also additional features and tweaks that can make the app better. Do you have ideas let them know in a Pull Request

- [ ] Detail pages
- [ ] Locomotive scroll testing
- [ ] Filter buttons
- [ ] js refactoring
- [ ] keep-scroll position

---

## Meta

Tristan Varewijck - tristan.varewijck@gmail.com - https://github.com/TristanVarewijck/TechDefined

![Ask Me Anything !](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)

---

## License

Usage is provided under the [MIT License](https://github.com/git/git-scm.com/blob/master/MIT-LICENSE.txt) MIT. See [LICENSE](https://github.com/TristanVarewijck/TechDefined/blob/master/LICENSE) for the full details. | |

<!-- replace the code in the /docs folder with your own, so you can showcase your work with GitHub Pages 🌍 -->

<!-- Add a nice poster image here at the end of the week, showing off your shiny frontend 📸  // -->

<!-- Maybe a table of contents here? 📚  // -->

<!-- How about a section that describes how to install this project? 🤓 -->

<!-- What external data source is featured in your project and what are its properties 🌠  // -->

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ // -->
