express-mongo-rest
==================

An example of a REST server using express and mongodb. With a client.html file to browse and make REST requests.

##Steps for running the server on Heroku

### Install packages locally (need to create a directory called node_modules)
`sudo npm install express`

`sudo npm install mongoose`

### Get versions for each module
`npm view express version`

`npm view mongoose version`

Fix your package.json to list the versions you'll be using, `From what I understand... heroku requires to define all packages and versions`

###Deploy in heroku
`heroku create --app your_app_name`

`heroku addons:add mongolab --app your_app_name`

`heroku addons:open mongolab`

`git init`

`git remote add heroku git@heroku.com:<your_app_name>.git`

`git add .`

`git commit -m 'test'`

`git push heroku master`
