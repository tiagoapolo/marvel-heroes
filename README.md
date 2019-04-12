# Marvel Heroes Search

Inside this project lies a web application that queries Marvel's API to search for your favorite hero.

- The project was createad without a specific CSS framework with built-in components, only using Reacts Styling, SCSS and Flexbox

- It uses Axios for HTTP requests and implements duplicate requests cancelation in the `utils.js` file

- Live query is implemented to with the intent to deliver a better user usage

##  To run this application:

First go to /marvel-heroes folder and run
```
cd marvel-heroes/
```
Run
```
npm install
```

If the build folder was not generated, please run:

```
npm run build
```

Then to start the server at 8080 port
```
npm run serve
```

Now open [here](http://localhost:8080/) and type the name of the hero you want to look for.
