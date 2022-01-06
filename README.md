# Mapily
2021 CS322 (Music Programming 2) Project

See trending songs from around the world - with a slick and intuitive UI. Play the songs in an in-browser, integrated player, add your new favourite songs to your Spotify account and more!
Powered by Spotify API and Mapbox GL JS.
# Notes and thoughts and prayers
## Course of action when contributing:
1. To add content, create a branch. This way you make a PR, and with Github workflows we are automatically checking if everything works OK. Even in small projects like this I think pushing to main is a bad idea. After I got 
	```"There isn’t anything to compare. main and first_edits are entirely different commit histories."``` errors, I have a strong opinion about this.
2. Please don't make my fuck ups and create branch like this:
	```git checkout -b [branch_name] origin/main ```
This way you don't need to pull (get newest changes from remote (Github)), and you are automatically switched to the branch (to see all branches: ```git branch -l```)
3. One branch - one feature - one commit. After you're done adding stuff, and the PR is merged to main, remove the branch please.
4. To update changes in your branch after ```git add```; ```git commit --amend --no-edit```. This amends the current Commit instead of creating a 2nd one, and makes no edits to the commit message. To push: ```git push --force```. This forces Github to accept those changes to an already existing commit. 
## Issues & Spikes
### Re-rendering of the map
* The issue is present when a change is made to the source code (specifically, related to the Map component, ie. rerendering the Dashboard component would also rerender the Map again) while the App is running on the server.
* Outside development, this is not an issue - when the App has completed Development, changes will not be made anymore. If they will, the server will go down for the time of an update.
### Optimising the map with vector tileset
* The issue stems from the fact that geojson-based maps are slower than vector ones. However, upon trial and error as well as searching for documentation, I have stumbled upon this page: [Create a hover effect](https://docs.mapbox.com/mapbox-gl-js/example/hover-styles/). The documentation clearly shows using a geojson dataset as source, even though everywhere else mapbox recommends using vectors when possible.
* Specifically, layers and events are not working with a vector source. Data on the layers is taken from the geojson, and even with double-source render (which defeats the purpose in the first place). Unforutnately, I am not aware of any way to see _under the hood_ of a tileset. 
* It appears that unfortunately, the website will not be as quick as we have hoped for.
* I am leaving commented addSource with the vector as an artifact.
# How to run
## Prerequisites:
1. A Spotify account
## Running:
1. Clone the repistory with ```git clone https://github.com/PitiRR/Mapily.git```
2. Update and download npm with ```npm update``` or ```npm install```
3. Run the app with ```npm start```

# Links
* [Jira](https://mapily.atlassian.net/jira/software/projects/MAP/boards/1)
* [Mapily Dashboard](https://developer.spotify.com/dashboard/applications/7651abd2e0c44203a2a55eb1d83ba4b5)
  * To gain access, please contact pitirr on Github with Full Name and Spotify Account (e-mail address)