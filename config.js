const mysql= require('mysql');
const con= mysql.createConnection({
    host:"localhost",
    user: "root",
    password:"Matrix@2023",
    database: "mydb"
});
con.connect((err)=>{
    if (err){
        console.warn("error")
    }
    else{
        console.warn("Connection Established");
    }
});

// con.query("select * from Students", (err, data)=>{
//     if(err){
//         console.warn("Error Fetching Data");
//     }
//     else{
//         console.log("Fetched Data: ", data);
//     }
// });

module.exports=con;