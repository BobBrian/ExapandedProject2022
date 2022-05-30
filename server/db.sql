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

DELETE FROM tableuser WHERE user_id = 3;

--New Tableusers
CREATE Table tableuser(
    user_id BIGSERIAL NOT NULL PRIMARY KEY ,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255)NOT NULL,
    role VARCHAR(255)
);




CREATE Table tableRestaurant(
    restaurant_id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurantname VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    pricerange INT NOT NULL check(pricerange >=1 and pricerange <=5)
);

-- NEW tablereview
CREATE Table tablereview(
    review_id BIGSERIAL NOT NULL PRIMARY KEY,
    user_id BIGINT REFERENCES tableUser(user_id) ON DELETE CASCADE,
    restaurant_id BIGINT REFERENCES tableRestaurant(restaurant_id) ON DELETE CASCADE,
    name VARCHAR(255),
    review TEXT NOT NULL,
    rating INT NOT NULL check(rating >=1 and rating <=5)
);

--Issues with Table Reviews
--Reviews show up when using SQL or Postgress but not when using the Actual Code
--Make Values not Null
--Change the Add Review Table

function jwtGenerator(userid){
    const payload = {
        user:{
            id:userid
        }
    }

    return jwt.sign(payload, "MEGARANGER123", { expiresIn: "15m" })
}

DROP table tablereview;

alter table tableReview alter column rating drop not null;

---
select * from tableRestaurant a left join  tableReview b on a.restaurantid = b.restaurantid WHERE a.restaurantid = 1;

SELECT restaurantname from tableRestaurant WHERE restaurantid = $1;


INSERT INTO tableUser (name , surname, age , email, password,  role) VALUES ('Ed', 'Boon', 32 , 'EdBoon123@gmail.com','Boon123','Admin')

-- Confirmed the Cascading Deletes Work 

-- DROP table tableUser;
-- DROP table tableRestaurant;
-- DROP table tableReview;

-- Review Data


INSERT INTO tableReview(userid, restaurantid,name, review, rating) VALUES(2,1,'Sarah','Not Really a Chicken Gall', 2);
INSERT INTO tableReview(userid, restaurantid,name, review, rating) VALUES(2,2,'Sarah','Memes 10/10', 5);
INSERT INTO tableReview(userid, restaurantid,name, review, rating) VALUES(2,3,'Sarah','Pizza Was Hot so thats something',3);

-- DELETE Function

DELETE FROM testusers  WHERE usersid = 1;
DELETE FROM testlocation WHERE loactionid = 3;

INSERT INTO tableC( name, name, age , role) VALUES ('Rob', 'New York');

INSERT INTO tableC (name , email, password, age, role) VALUES ($1, $2, $3 , $4 , customer) 

INSERT INTO tableuser(name , surname, age , email, password,  role) VALUES ('Ed', 'Boon', 32 , 'EdBoon123@gmail.com', 'Boon123','Admin');



INSERT INTO privatepost( title, content) VALUES ('Blake', 'Blake Was Here');
INSERT INTO privatepost( title, content) VALUES ('Adam', 'Adam Was Here');
INSERT INTO privatepost( title, content) VALUES ('Rob', 'Rob Was Here');
INSERT INTO tableA( name, location) VALUES ('Rob', 'New York');
INSERT INTO tableA( name, location) VALUES ('Adam', 'Oregon');
INSERT INTO tableA( name, location) VALUES ('Blake', 'Colorado');

//Routing Template
app.post("", async (req,res)=>{
    
})







return (
    <div>
      {selectedRestaurant && (
        <>
          <h1 className="text-center display-1">
            {selectedRestaurant.restaurant.name}
          </h1>
          <div className="mt-3">
            <Reviews reviews={selectedRestaurant.reviews} />
          </div>
          <AddReview />
        </>
      )}
    </div>
);

tableuser u
tableRestaurant r
tablereview i


SELECT * FROM  tablereview i LEFT JOIN tableRestaurant r	ON r.restaurant_id = i.restaurant_id LEFT JOIN tableuser u ON u.user_id = i.user_id WHERE i.user_id = $1 AND i.restaurant_id = $2;





