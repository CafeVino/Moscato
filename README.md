# Moscato
Project Moscato
Helpful tutorial to help set up the local React instance
http://blog.tamizhvendan.in/blog/2015/11/23/a-beginner-guide-to-setup-react-dot-js-environment-using-babel-6-and-webpack/
To test locally:
1. Install NodeJS on your computer. This allows you to use npm.
2. Pull everything within Moscato to a local folder.
2. Open a terminal/command prompt and change directory (cd) into the Moscato folder.
3. Enter into terminal/command prompt: npm run dev
4. Now whenever you change moscato/src/client/app/index.jsx, npm will use webpack to recompile.
5. Open moscato/src/client/index.html to see your changes

Helpful tutorial to use git/github
http://readwrite.com/2013/09/30/understanding-github-a-journey-for-beginners-part-1
http://stackoverflow.com/questions/8775850/how-to-add-files-and-folder-to-github-repo

Useful for later to convert our React WebApp to mobile
https://auth0.com/blog/2015/12/08/converting-your-web-app-to-mobile/

Good explanation of React
http://blog.andrewray.me/reactjs-for-stupid-people/

Useful for integrating Facebook authentication
https://developers.facebook.com/docs/facebook-login/web

General Information:
Slack: https://caffevinomoscato.slack.com/
Taiga: https://tree.taiga.io/project/kjjl-moscato/
Github: https://github.com/CaffeVino/Moscato

Excellent tutorial for setting up a server and linking it to a database:
https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4

To run the NodeJS server:
1. You need to change directory to \moscato\src\host
2. Run npm server.js in terminal/command
3. You will now be hosting the API on your own computer at localhost:8080/api
Note that we are using a database that is located https://mlab.com/databases/moscato
Note that you will not be able to connect to the database immediately because username/password are hidden in server.js.
Contact me if you need the username password for the database.
Important note that may cost you 2+ hours to figure out! If you are using mongolab to host your free mongodb, you must use mongoose version 4.x.x, due to authentication issues (different default encryption types)
http://stackoverflow.com/questions/34593434/auth-failed-code-18-when-connecting-to-mongolab-database