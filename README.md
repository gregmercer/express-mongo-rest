
express-mongo-rest
==================

An example of a REST server using express and mongo. With a client.html file to browse and make REST requests.

##MongoDb Express nodejs and heroku rest server example

### Install packages locally (need to create a directory called node_modules)
`sudo npm install express`
`sudo npm install mongoose`

### View the latestest from registry.npmjs.org
`npm view <package-name> version`

Fix your package.json, `heroku requires to define all packages and versions`! Else you have an exeption!

###Deploy in heroku
`heroku create --app your_app_name`

`heroku addons:add mongolab `

`heroku addons:open mongolab`

`git init`

`git remote add heroku git@heroku.com:<your_app_name>.git`

`git add .`

`git commit -m 'test'`

`git push heroku master`