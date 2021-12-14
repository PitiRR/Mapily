# Mapily
2021 CS322 (Music Programming 2) Project
# Notes and thoughts and prayers
## Ideal course of action when implementing changes:
1. To add content, create a branch. This way you make a PR, and with Github workflows we are automatically checking if everything works OK. Even in small projects like this I think pushing to main is a bad idea. After I got 
	```"There isn’t anything to compare. main and first_edits are entirely different commit histories."``` errors, I have a strong opinion about this.
2. Please don't make my fuck ups and create branch like this:
	```git checkout -b [branch_name] origin/main ```
This way you don't need to pull (get newest changes from remote (Github)), and you are automatically switched to the branch (to see all branches: ```git branch -l```)
3. One branch - one feature - one commit. After you're done adding stuff, and the PR is merged to main, remove the branch please.
4. To update changes in your branch after ```git add```; ```git commit --amend --no-edit```. This amends the current Commit instead of creating a 2nd one, and makes no edits to the commit message. To push: ```git push --force```. This forces Github to accept those changes to an already existing commit. 
# How to run
## Prerequisites:
1. A Spotify account
## Running:
1. Clone the repistory with ```git clone https://github.com/PitiRR/Mapily.git```
2. Update and download npm with ```npm update```
3. Run the app with ```npm start```

# Links
* [Jira](https://mapily.atlassian.net/jira/software/projects/MAP/boards/1)
