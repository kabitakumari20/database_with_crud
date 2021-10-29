var mysql = require('mysql');
var express=require("express")
var app=express();

app.use(express.json());

var connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'kabita@123',
	database:'Navgurukul'
});

connection.connect((err)=>{
	if(err) {
		console.log(err);
	} else {
		console.log('Connected..!');
	}
});

let sql = "CREATE TABLE IF NOT EXISTS information(id int primary key,name varchar(234),address varchar(233))";
connection.query(sql,(err)=>{
    if(err){
        throw err;
    }
    //console.log("table created")
})


app.post("/insertData", (req,res)=>{

    let demo = {
        id: req.body.Id,
        name: req.body.name,
        address: req.body.address    
    };
    
    let sql= "INSERT INTO information SET ?";
    connection.query(sql,demo,(err,result) => {
        if (err){
            console.log(err);
        }; 
        console.log("data inserted.....") 
        res.send("data inseted....")
    
    
        }) ;

})

app.put("/:id",(req,res) => {
  
    let sql = "UPDATE information SET name='"+req.body.name+ " ',address='"+req.body.address+"'WHERE id = "+req.params.id;
    let query=connection.query(sql,(err,result)=>{
        if (err) throw err
        console.log("update successfully")
        res.send("update succesfully")
    })

})

app.get("/getdata",(req,res) => {
    let sql = "SELECT *FROM information"
    let query = connection.query(sql,(err,result)=>{
        if (err) {
            console.log(err)

        }
        res.send(result)
        console.log(result)
    })
})
app.delete("/deleted/:id",(req,res) => {
    let sql="DELETE FROM information  WHERE id ="+req.params.id;
    let query=connection.query(sql,(err,result)=>{
        if (err) throw err;
        console.log("data deleted");
        res.send("data deleted succesfully")

        
    })
})


app.listen(4567,()=>{
    console.log(" server is listening on  port number 4567")
})