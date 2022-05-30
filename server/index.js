// This is the Main Server for my Own Stuff.

const express = require("express");
const cors = require("cors");
const pool = require("./db"); 
const bcrypt = require("bcrypt");
const {check , validationResult} = require ("express-validator")
const jwtGenerator = require("./utils/jwtGenerator");
const authorize = require("./middleware/authorize");
const app = express();



//Middleware
//We make this new Addition to Cors
app.use(cors());
app.use(express.json());


//ROUTES

// Register User (POST)
app.post("/restaurant/register",[check("email", "Please Provide a Valid Email").isEmail()
,check("password","Provide a Password with a Minimum of 6 Characters").isLength({ min: 6})] ,async (req,res)=>{

    try {

        const{name, surname, age , email, password} = req.body

        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array()
            })
        }

        //Validation Check to Ensure that A User Already Exists
        const presentuser = await pool.query("SELECT * FROM tableuser WHERE email = $1", [email]);

        if (presentuser.rows.length !== 0) {
            return res.status(401).json("User already exist!");
        }
   
        const hashedpassword = await bcrypt.hash(password, 10)
   
        // To do auto Increments with INSERT SET THE VALUE TO NULL and Leave it OUT
        let newUser = await pool.query("INSERT INTO tableuser(name , surname, age , email, password,  role) VALUES ($1, $2, $3 , $4, $5,'Editor') RETURNING *", [name, surname, age, email, hashedpassword ]);
           
        console.log(email, password)
         
        const jwtToken = jwtGenerator(newUser.rows[0].user_id);

        return res.json({ jwtToken });

        
    } catch (err) {

        console.error(err.message)
    }

})
// Login User (POST)
app.post("/restaurant/login", async (req,res)=>{

    try {
        const  { email, password } = req.body
    
        const user = await pool.query("SELECT * FROM tableuser WHERE email = $1", [email]);

        if (user.rows.length === 0) {
            return res.status(422).json({
                errors: [
                    {
                        msg: "Invalid Email",
                    }
                ]
            })
        }


        const validPassword = await bcrypt.compare(
            password,
            user.rows[0].password
        );
    
        if (!validPassword) {
            return res.status(404).json({
                errors: [
                    {
                        msg: "Invalid Password" 
                    }
                ]
            })
        }

        console.log(email, password)
        // JWT Token Production 
        const jwtToken = jwtGenerator(user.rows[0].user_id);
        return res.json({ jwtToken });
        
    } catch (err) {

        console.error(err.message)
        
    }

})

// Verify JWT (GET)
app.get("/restaurant/verify", authorize, async (req,res)=>{

    try {

        res.json(true)
        
    } catch (err) {

        console.error(err.message);
        res.status(500).send("Server error");
        
    }

})


//GET UserName
app.get("/res/dashboard/name", authorize, async (req,res)=>{

    try {
      const public = await pool.query("SELECT name FROM  tableuser WHERE user_id = $1",[req.user.id]);
     
      res.json(public.rows[0]);
      
        
    } catch (err) {
        console.error(err.message)
    }

})

//GET UserRole
app.get("/res/dashboard/role", authorize, async (req,res)=>{

    try {
      const public = await pool.query("SELECT role FROM  tableuser WHERE user_id = $1",[req.user.id]);
     
      res.json(public.rows[0]);
      
        
    } catch (err) {
        console.error(err.message)
    }

})

//GET All Restaurants
app.get("/restaurant/get/all", async (req,res)=>{

    //This is to display all the Resturants in a Table

    try {
        const allres = await pool.query("SELECT * FROM tableRestaurant");
        res.json(allres.rows);
        
    } catch (err) {
        console.error(err.message)
        
    }

})

//Get all Users
app.get("/admin/get/all", async (req,res)=>{
    try {

        const allUsers = await pool.query("SELECT * FROM tableUser WHERE role ='Customer' AND role ='Editor'");
        res.json(allUsers.rows);
        
    } catch (err) {
        console.error(err.message)
        
    }
})

//Add Resturant
app.post("/restaurant/add", async (req,res)=>{
    try {

        const {restaurantname,location,pricerange } = req.body;

        const addres = await pool.query("INSERT INTO tableRestaurant (restaurantname, location, pricerange ) VALUES ($1, $2, $3) RETURNING * ",
        [restaurantname , location, pricerange]);
        res.json(addres.rows[0]);
        
    } catch (err) {
        console.error(err.message)
        
    }
})

//Update a Restaurant
app.put("/restaurant/update/:id", async (req,res)=>{
    try {

        const {id} = req.params;

        const {restaurantname,location,pricerange } = req.body;
        const UpdatetableA = await pool.query("UPDATE tableRestaurant SET restaurantname = $1, location = $2, pricerange = $3 WHERE restaurant_id = $4",
        [restaurantname,location,pricerange,id]);
        
        res.json("The List was Updated");
        
    } catch (err) {
        console.error(err.message)
        
    }
})

//Delete a Restaurant
app.delete("/restaurant/delete/:id", async (req,res)=>{
    try {
        
        const {id} = req.params;
        const deleteRestaurant = await pool.query("DELETE FROM tableRestaurant WHERE restaurant_id = $1",[id]);
        res.json("Restaurant was deleted");
        
    } catch (err) {
        console.error(err.message)
        
    }
})

//Delete a User
app.delete("/user/delete/:id", async (req,res)=>{
    try {
        
        const {id} = req.params;
        const deleteRestaurant = await pool.query("DELETE FROM tableuser WHERE user_id = $1",[id]);
        res.json("Restaurant was deleted");
        
    } catch (err) {
        console.error(err.message)
        
    }
})

//GET A Specific Resturant's Details
app.get("/restaurant/get/:id", async (req,res) => {

    //RIGHT Join
    try {

        const {id} = req.params
        const getRestaurant = await pool.query("SELECT restaurantname from tableRestaurant WHERE restaurant_id = $1",[id]);
        res.json(getRestaurant.rows[0]);
    } catch (err) {
        console.error(err.message)
    }

})

//GET All The Reviews Related to a Specific Restaurant
app.get("/restaurant/get/reviews/:id", async (req,res) => {

    //RIGHT Join
    try {

        const {id} = req.params
        const allspecificreview = await pool.query("select * from tableRestaurant a left join  tablereview b on a.restaurant_id = b.restaurant_id WHERE a.restaurant_id = $1;",[id]);
        res.json(allspecificreview.rows);
    } catch (err) {
        console.error(err.message)
    }

})

//Get All the Reviews for a Specific Resturant by a Specific Customer
// SELECT  * FROM  tablereview i 	LEFT JOIN tableRestaurant r	ON r.restaurant_id = i.restaurant_id	LEFT JOIN tableuser u	ON u.user_id = i.user_id  WHERE i.user_id = $1;

app.get("/restaurant/get/reviews/:id/specific", authorize,async (req,res) => {

    //RIGHT Join
    try {

        const {id} = req.params
        const specificreview = await pool.query("SELECT * FROM  tablereview i LEFT JOIN tableRestaurant r	ON r.restaurant_id = i.restaurant_id LEFT JOIN tableuser u ON u.user_id = i.user_id WHERE i.user_id = $1 AND i.restaurant_id = $2;",[req.user.id, id]);
        res.json(specificreview.rows);
    } catch (err) {
        console.error(err.message)
    }

})


//Add a Review to a Specific Restaurant
app.post("/restaurant/:id/review/add", authorize, async(req,res)=>{
    try {

        const {name, review , rating } = req.body;
        const {id} = req.params;

        const newtableB = await pool.query("INSERT INTO tablereview (user_id, restaurant_id ,name, review , rating) values ($1, $2, $3, $4, $5) RETURNING * ",
        [req.user.id, id, name, review , rating]);
  
        res.json(newtableB.rows[0]);

        
    } catch (err) {

        console.error(err.message)
        
    }
})

//Add Editor
app.post("/admin/addeditor",[check("email", "Please Provide a Valid Email").isEmail()
,check("password","Provide a Password with a Minimum of 6 Characters").isLength({ min: 6})] ,async (req,res)=>{

    try {

        const{name, surname, age , email, password} = req.body

        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array()
            })
        }

        //Validation Check to Ensure that A User Already Exists
        const presentuser = await pool.query("SELECT * FROM tableuser WHERE email = $1", [email]);

        if (presentuser.rows.length !== 0) {
            return res.status(401).json("User already exist!");
        }
   
        const hashedpassword = await bcrypt.hash(password, 10)
   
        // To do auto Increments with INSERT SET THE VALUE TO NULL and Leave it OUT
        let newUser = await pool.query("INSERT INTO tableuser(name , surname, age , email, password,  role) VALUES ($1, $2, $3 , $4, $5,'Editor') RETURNING *", [name, surname, age, email, hashedpassword ]);
           
        console.log(email, password)
         
        const jwtToken = jwtGenerator(newUser.rows[0].user_id);

        return res.json({ jwtToken });

        
    } catch (err) {

        console.error(err.message)
    }

})

app.post("/admin/add",[check("email", "Please Provide a Valid Email").isEmail()
,check("password","Provide a Password with a Minimum of 6 Characters").isLength({ min: 6})] ,async (req,res)=>{

    try {

        const{name, surname, age , email, password} = req.body

        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array()
            })
        }

        //Validation Check to Ensure that A User Already Exists
        const presentuser = await pool.query("SELECT * FROM tableuser WHERE email = $1", [email]);

        if (presentuser.rows.length !== 0) {
            return res.status(401).json("User already exist!");
        }
   
        const hashedpassword = await bcrypt.hash(password, 10)
   
        // To do auto Increments with INSERT SET THE VALUE TO NULL and Leave it OUT
        let newUser = await pool.query("INSERT INTO tableuser(name , surname, age , email, password,  role) VALUES ($1, $2, $3 , $4, $5,'Admin') RETURNING *", [name, surname, age, email, hashedpassword ]);
           
        console.log(email, password)
         
        const jwtToken = jwtGenerator(newUser.rows[0].user_id);

        return res.json({ jwtToken });

        
    } catch (err) {

        console.error(err.message)
    }

})

app.listen(5000, () =>{

    console.log(" Port 5000 Is Open for Use");
});