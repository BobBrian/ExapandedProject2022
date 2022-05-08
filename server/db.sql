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





INSERT INTO tableUser (name , surname, age , email, password,  role) VALUES ('Ed', 'Boon', 32 , 'EdBoon123@gmail.com','Boon123','Admin')

-- Confirmed the Cascading Deletes Work 



-- Review Data


INSERT INTO tableReview(userid, restaurantid,name, review, rating) VALUES(2,1,'Sarah','Not Really a Chicken Gall', 2);
INSERT INTO tableReview(userid, restaurantid,name, review, rating) VALUES(2,2,'Sarah','Memes 10/10', 5);
INSERT INTO tableReview(userid, restaurantid,name, review, rating) VALUES(2,3,'Sarah','Pizza Was Hot so thats something',3);

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