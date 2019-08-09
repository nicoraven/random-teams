# Random Teams Generator

> This project was created using `create-react-app`.

The Really Really Random Teams generator was created mainly to facilitate randomly breaking up the class into groups, and also to practice using ReactJS.

## Features
* Names added into the app will be automatically appended into the url for easy sharing. These names will still remain there when their attendance are toggled until they are deleted.
* Randomly sort names into groups based on either group size (eg. pairs) or number of groups (eg. 4 groups).
* Activating No One Left Behind will sort the last group equally into the first few groups when the total number of names in it is lesser than the group size stated.
* List of names are shuffled using a Mersenne Twister implementation because someone felt that Math.random() was not random enough. ¯\\_(ツ)_/¯

*Note: Updating the People list will automatically reshuffle the groupings. Recommended to confirm the attandance and then clicking on the `Shuffle` button as many times as you feel like clicking.*

## If You Want To Play With It

1. Fork and/or clone the repo.
```
$ git clone https://github.com/nicoraven/random-teams.git
```
2. cd into the directory and run `npm install`.

3. Run `npm start` to run it on localhost.

#### To deploy it on your own GitHub Pages

1. Update the value of the homepage property in `package.json`. It should be a string `http://{username}.github.io/{repo-name}`, where {username} is your GitHub username, and {repo-name} is the name of this GitHub repository you forked (and may/may not have changed afterwards).

```
//...
"homepage": "http://nicoraven.github.io/random-teams"
```

2. Generate a production build of your app, and deploy it to GitHub Pages.

```
$ npm run deploy
```

---

### Resources

* [Create React App documention](https://github.com/facebook/create-react-app)
* [GitHub Pages](https://pages.github.com/)
* [Deploying a React App to GitHub Pages](https://github.com/gitname/react-gh-pages)
* [Mersenne Twister pseudorandom number generator
](https://github.com/boo1ean/mersenne-twister) ([Origin source](https://gist.github.com/banksean/300494))