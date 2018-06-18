To start
gulp

App will automatically restart on save of changes.

MONGODB
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

Database Information
Offerings located in 'offeringAPI' database.
Offering collection located in 'offerings' collection.
Import data into db: mongo offeringAPI < offerings.js