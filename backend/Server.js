const express = require("express");
const cors = require("cors");
const {open} = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path")

const app = express();
app.use(express.json())
app.use(cors());

/*app.use(cors({
    origin:["https://eric-robotics-assignment.vercel.app/"],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}));*/

const dbpath = path.join(__dirname, "db.js") 
let db = null;

const ConnectToDb = async () =>{
    try{
        db = await open({
            filename :dbpath,
            driver: sqlite3.Database
        })
        console.log(`Database Connected Successfully`)
    }
    catch(error){
        console.log(`Failed to Connect to Database`)
    }
}

ConnectToDb()

//API

app.get("/create-table",async(req,res)=>{
    const crateTable = `CREATE TABLE IF NOT EXISTS Robots(
        id integer AUTO INCREMENT,
        Name VARCHAR(20),
        BatteryLevel VARCHAR(20),
        Status VARCHAR(20),
        RecentActivity VARCHAR(100)

    ) `
    const dbResponse = await db.run(crateTable)
    res.send(`Table Created`)
})

app.post("/create", async(req,res)=>{
    const Qry = `Insert INTO Robots(Name,BatteryLevel,Status,RecentActivity) values("Chitti","82%","Active","Created App"),
    ("Vasi","67%","Active","Created MicroChip"),
    ("Sana","0%","Inactive","Created Document")`
    const dbResponse = await db.run(Qry)
    res.send(`Data Inserted Successfully id : ${dbResponse.lastID}`)
})

app.get('/',async (req,res)=>{
    const Qry = `Select * from Robots`
    const dbResponse = await db.all(Qry)
    return res.json(dbResponse)
})


app.listen(process.env.PORT || 3001,()=>{
    console.log(`Server running at http://localhost:3001`)
})