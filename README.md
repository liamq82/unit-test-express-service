To start
gulp

App will automatically restart on save of changes.

<h2>Tests</h2>
To run all tests:
gulp test

<h2>To debug a test:</h2>
Open debugger in visuale code.
Select 'run mocha' in run configurations beside green arrow.
Click run

<h2>MONGODB</h2>
Start MongoDB
sudo service mongod start

Stop MongoDB
sudo service mongod stop

Verify Startup
less /var/log/mongodb/mongod.log
Should see line - [initandlisten] waiting for connections on port 27017

Mongo Shell
Open: mongo
Show DBs: show dbs
Show Collections: show collections
https://docs.mongodb.com/manual/tutorial/install-mongodb-enterprise-on-ubuntu/

<h2>Database Information</h2>
Offerings located in 'offeringAPI' database.
Offering collection located in 'offerings' collection.
Import data into db: mongo offeringAPI < offerings.js