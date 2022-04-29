npm init -y
npm install express
npm install nodemon
npm install pg
npm install cors
npm i dotenv
npm i jsonwebtoken
npm i bcrypt
npx create-react-app client
npx create-react-app myapp
 "start": "nodemon server.js"
npm install express-validator


CREATE Table tableUser(
    userid BIGSERIAL NOT NULL PRIMARY KEY ,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255)NOT NULL,
    role VARCHAR(255)
);

DROP table tableReview;

CREATE Table tableRestaurant(
    restaurantid BIGSERIAL NOT NULL PRIMARY KEY,
    restaurantname VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    pricerange INT NOT NULL check(pricerange >=1 and pricerange <=5)
);

-- NEW tablereview
CREATE Table tableReview(
    reviewid BIGSERIAL NOT NULL PRIMARY KEY,
    userid BIGINT REFERENCES tableUser(userid) ON DELETE CASCADE,
    restaurantid BIGINT REFERENCES tableRestaurant(restaurantid) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(rating >=1 and rating <=5)
);

DROP table tableReview;


CREATE Table testusers(
    usersid BIGSERIAL NOT NULL PRIMARY KEY ,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL
);

CREATE Table testlocation(
    loactionid BIGSERIAL NOT NULL PRIMARY KEY ,
    locationname VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL
);


CREATE Table testreview(
    reviewid BIGSERIAL NOT NULL PRIMARY KEY ,
    usersid BIGINT REFERENCES testusers(usersid) ON DELETE CASCADE,
    loactionid BIGINT REFERENCES testlocation(loactionid) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(rating >=1 and rating <=5)
);

DROP TABLE tableC ;


INSERT INTO tableUser (name , surname, age , email, password,  role) VALUES ('Ed', 'Boon', 32 , 'EdBoon123@gmail.com','Boon123','Admin')

-- Confirmed the Cascading Deletes Work 
INSERT INTO testusers(firstname , lastname)  VALUES('Ace','Burn');
INSERT INTO testusers(firstname , lastname)  VALUES('Spade','Splash');
INSERT INTO testusers(firstname , lastname)  VALUES('Club','Crust');
INSERT INTO testusers(firstname , lastname)  VALUES('Diamond','Gust');

INSERT INTO tableRestaurant(restaurantname, location, pricerange) VALUES('KFC', 'Mexico', 5);
INSERT INTO tableRestaurant(restaurantname, location, pricerange) VALUES('Wendys Max', 'South Africa', 3);
INSERT INTO tableRestaurant(restaurantname, location, pricerange) VALUES('Romans Pizza', 'Italy', 4);
-- test data
INSERT INTO testlocation(locationname , country) VALUES('Effile Tower', 'France');
INSERT INTO testlocation(locationname , country) VALUES('Stock Building', 'New York');
INSERT INTO testlocation(locationname , country) VALUES('Akihabara', 'Japan');

INSERT INTO testreview(usersid, loactionid,name, review, rating) VALUES(4,1,'Diamond','Super Cool', 5);
INSERT INTO testreview(usersid, loactionid,name, review, rating) VALUES(4,2,'Diamond','Tres Bien', 5);
INSERT INTO testreview(usersid, loactionid,name, review, rating) VALUES(4,3,'Diamond','The Big Apple Shines',5);
INSERT INTO testreview(usersid, loactionid,name, review, rating) VALUES(4,4,'Diamond','Super Shiny Robots', 5);

-- DELETE Function

DELETE FROM testusers  WHERE usersid = 1;
DELETE FROM testlocation WHERE loactionid = 3;

INSERT INTO tableC( name, name, age , role) VALUES ('Rob', 'New York');

INSERT INTO tableC (name , email, password, age, role) VALUES ($1, $2, $3 , $4 , customer) 



INSERT INTO privatepost( title, content) VALUES ('Blake', 'Blake Was Here');
INSERT INTO privatepost( title, content) VALUES ('Adam', 'Adam Was Here');
INSERT INTO privatepost( title, content) VALUES ('Rob', 'Rob Was Here');
INSERT INTO tableA( name, location) VALUES ('Rob', 'New York');
INSERT INTO tableA( name, location) VALUES ('Adam', 'Oregon');
INSERT INTO tableA( name, location) VALUES ('Blake', 'Colorado');

//Routing Template
app.post("", async (req,res)=>{
    
})