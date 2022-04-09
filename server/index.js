// This is the Main Server for my Own Stuff.

const express = require("express");
const cors = require("cors");
const pool = require("./db"); 
const bcrypt = require("bcrypt");
const {check , validationResult} = require ("express-validator")
const jwt = require('jsonwebtoken') 
const jwtAuth = require("./checkAuth")
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
        const presentuser = await pool.query("SELECT * FROM tableUser WHERE email = $1", [email]);

        if (presentuser.rows.length !== 0) {
               return res.status(401).json("User already exist!");
        }
   
        const hashedpassword = await bcrypt.hash(password, 10)
   
        // To do auto Increments with INSERT SET THE VALUE TO NULL and Leave it OUT
        let users = await pool.query("INSERT INTO tableUser (name , surname, age , email, password,  role) VALUES ($1, $2, $3 , $4, $5,'Customer') RETURNING *", [name, surname, age, email, hashedpassword ]);
           
        console.log(email, password)
        // JWT Token Production 
        const token  = jwtGenerator(users.rows[0].userid)
   
        // res.json(users.rows[0]);
        res.json({token})

        
    } catch (err) {

        console.error(err.message)
    }

})
// Login User (POST)
app.post("/restaurant/login", async (req,res)=>{

    try {
        const {password, email} = req.body
    
        const user = await pool.query("SELECT * FROM tableUser WHERE email = $1", [email]);

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
        const token  = jwt.sign({email},"MEGARANGER123")

        // res.json(users.rows[0]);
        res.json({token})
        
    } catch (err) {

        console.error(err.message)
        
    }

})

// Get Username (GET)
app.get("/restaurant/getusername",jwtAuth, async (req,res)=>{

    try {

        const getuser = await pool.query("SELECT name FROM  tableUser WHERE email = $1",[req.user]);
        res.json(getuser.rows[0]);

    } catch (err) {
        console.error(err.message)
    }
    

})
// Get Role (GET)
app.get("/restaurant/getrole",jwtAuth, async (req,res)=>{

    try {

        const getrole = await pool.query("SELECT role FROM  tableUser WHERE email = $1",[req.user]);
        res.json(getrole.rows[0]);

    } catch (err) {
        console.error(err.message)
    }
    

})
// Verify JWT (GET)
app.get("/restaurant/verify", jwtAuth, async (req,res)=>{

    try {

        res.json(true)
        
    } catch (err) {

        console.error(err.message);
        res.status(500).send("Server error");
        
    }

})


// Add a Restaurant (POST)
app.post("/restaurant/add", async (req,res)=>{
    try {

        const {restaurantname,location,pricerange } = req.body;

        const addres = await pool.query("INSERT INTO tableRestaurant (restaurantname, location, pricerange ) VALUES($1, $2, $3) RETURNING * ",
        [restaurantname , location, pricerange]);
        res.json(addres.rows[0]);
        
    } catch (err) {
        console.error(err.message)
        
    }
})
// Update Restaurant Details (PUT)
app.put("/restaurant/update/:id", async (req,res)=>{
    try {

        const {restaurantid} = req.params;

        const {restaurantname,location,pricerange } = req.body;
        const UpdatetableA = await pool.query("UPDATE tableRestaurant SET restaurantname = $1, location = $2, pricerange = $3 WHERE restaurantid = $4",
        [restaurantname,location,pricerange,restaurantid]);
        
        res.json("The List was Updated");
        
    } catch (err) {
        console.error(err.message)
        
    }
})


// ======================================================================================================================================================================
// ======================================================================================================================================================================

// Get All Restaurants  (GET)
app.get("/restaurant/get/all", async (req,res)=>{

    //This is to display all the Resturants in a Table

    try {
        const allres = await pool.query("SELECT * FROM tableRestaurant");
        res.json(allres.rows);
        
    } catch (err) {
        console.error(err.message)
        
    }

})

//GET ALL Reviews 
app.get("/reviews/get/all", async (req, res) => {
    try {
        
        const tableB = await pool.query("SELECT * FROM tableReview ");
        res.json(tableB.rows[0]);
        
    } catch (err) {
        console.error(err.message)
    }
})

// Get A Specific Restaurant (GET)
app.get("/restaurant/review/get/:id", async (req,res)=>{

    try {

        const {restaurantid} = req.params;
        const allresspec = await pool.query("SELECT * FROM tableRestaurant AS u LEFT JOIN tableReview AS t ON u.restaurantid = t.IdB WHERE u.restaurantid  = $1",[restaurantid]);
        res.json(allresspec.rows);
        
    } catch (err) {
        console.error(err.message)
        
    }
    
})

//Get All Reviews for a Specific Restuarnat
app.get("/review/get/restaurant/:id", async (req,res) => {

    //RIGHT Join
    try {

        const {id} = req.params
        const allrevspec = await pool.query("SELECT t.name, t.review, t.rating , u.restaurantname FROM tableReview AS t Right JOIN tableRestaurant AS u ON t.restaurantid = u.restaurantid WHERE t.restaurantid = $1",[id]);
        res.json(allrevspec.rows);
    } catch (err) {
        console.error(err.message)
    }

})

//Get All Reviews for a Specific Customer
app.get("/review/get/customer/:id", jwtAuth, async (req, res) => {
   
    try {
        
        const user = await pool.query(
            "SELECT u.name, u.surname, t.name, t.review , t.rating FROM tableUser AS u LEFT JOIN tableReview AS t ON u.userid = t.userid WHERE u.userid= $1",
            [req.user.id]
        );
      
         res.json(user.rows);

    } catch (error) {
        
    }
    
})
//ADD Reviews Based on Restuarant by a Specific Customer
app.post("/restaurant/:id/review/add", jwtAuth, async (req,res) => {
    try {
        const {name, review , rating } = req.body;
        const {id} = req.params;
  
        const newtableB = await pool.query("INSERT INTO tableB (IdA, IdB, name, review , rating) values ($1, $2, $3, $4) RETURNING * ",
        [id, req.user.id, name, review , rating]);
  
        res.json(newtableB.rows[0]);
  
    } catch (err) {
        
        console.error(err.message)
     
    }
})

//Delete Restaurant and all its Reviews
app.delete("/restaurant/delete/:id",async (req, res)=>{
    try {

        //Delete a Restaurant and All Reviews Related to it
        
    } catch (err) {

        console.error(err.message)

    }
})

//DELETE Reviews
app.delete("/review/delete/:id",async (req, res)=>{
    try {

        //Delete a Restaurant and All Reviews Related to it
        const {id} = req.params;
        const deletereview = await pool.query("DELETE FROM tableReview WHERE reviewid = $1 ",[id]);
        res.json("Editor was deleted");
        
    } catch (err) {

        console.error(err.message)

    }
})

// ======================================================================================================================================================================
// ======================================================================================================================================================================


// Get All Customers & Editors(GET)
app.get("/admin/get/all", async (req,res)=>{
    try {

        const allUsers = await pool.query("SELECT * FROM tableUser WHERE role ='Customer' AND role='Editor'");
        res.json(allUsers.rows);
        
    } catch (err) {
        console.error(err.message)
        
    }
})
// Add Editor(POST)
app.post("/admin/addeditor",[check("email", "Please Provide a Valid Email").isEmail()
,check("password","Provide a Password with a Minimum of 6 Characters").isLength({ min: 6})] , jwtAuth, async (req,res)=>{
    try {

        const{name, surname, age , email, password} = req.body

        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array()
            })
        }

        //Validation Check to Ensure that A User Already Exists
        const presentuser = await pool.query("SELECT * FROM tableUser WHERE email = $1", [email]);

        if (presentuser.rows.length !== 0) {
               return res.status(401).json("User already exist!");
        }
   
        let hashedpassword = await bcrypt.hash(password, 10)
   
        // To do auto Increments with INSERT SET THE VALUE TO NULL and Leave it OUT
        const users = await pool.query("INSERT INTO tableUser (name , surname, age , email, password,  role) VALUES ($1, $2, $3 , $4, $5,'Editor') RETURNING *", [name, surname, age, email, hashedpassword ]);
           
        res.json(users.rows[0]);
        

        
    } catch (err) {
        console.error(err.message)
        
    }
})

// Delete Editor(DELETE)
app.delete("/admin/delete/:id", async (req,res)=>{
    try {
        
        const {userid} = req.params;
        const deleteEditor = await pool.query("DELETE FROM tableUser WHERE userid = $1 and role='Editor'  ",[userid]);
        res.json("Editor was deleted");
        
    } catch (err) {
        console.error(err.message)
        
    }
})

// Delete Customer(DELETE)
app.delete("/admin/delete/:id", async (req,res)=>{
    try {
        
        const {userid} = req.params;
        const deleteCutomer = await pool.query("DELETE FROM tableUser WHERE userid = $1 and role='Customer'  ",[userid]);
        res.json("Customer was deleted");
        
    } catch (err) {
        console.error(err.message)
        
    }
})


//JWT GENERATOR
function jwtGenerator(userid){
    const payload = {
        user:{
            id:userid
        }
    }

    return jwt.sign(payload, "MEGARANGER123", { expiresIn: "5h" })
}

app.listen(5000, () =>{

    console.log("server is up and listening to port 5000");
});