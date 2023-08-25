const con= require("./config");
const express= require("express");

const server= express.Router();


server.use((req,res,next)=>{
    console.log(req.method, req.ip, req.path);
    next();
});


server.get("/",(req,res)=>{
    let tableName= "department";
    con.query("show tables like ? ", tableName, (err, results)=>{
        if(err) throw err;
        console.log("results= ",results);
        if(results.length>0){
            res.send("Table already exist");
        }
        else{
            con.query("create table department (d_no int(3) primary key auto_increment, dept_name varchar(20), dept_id varchar(10))", 
            (err,data)=>{
                if(err) 
                console.warn("Error : ",err);
                res.send("Table created");
        });
        }
    })    
});
server.post("/dept-data",(req, res)=>{
    const deptData= [req.body.dept_name, req.body.dept_id];
    con.query("insert into department (dept_name, dept_id) values(?, ?)", deptData,(err, results, fields)=>{
        if(err) throw err;
        else{
            con.query("select * from department ", (err, data)=>{
                if(err) throw err;
                res.send(data);
            })
        }
    })
});

// Update Data
server.put("/update-id/:name", (req, res)=>{
    const Name=req.params.name;
    const name= [req.body.dept_id, Name];
    con.query("update department set dept_id= ? where dept_name= ?",name, (err, results)=>{
        if(err)throw err;
        else{
            con.query("select * from department", (err, data)=>{
                if(err) throw err;
                res.send(data);
            });
        }
    })
});

server.put("/update-name/:id", (req, res)=>{
    const Id=req.params.id;
    const name= [req.body.dept_name, Id];
    con.query("update department set dept_name= ? where dept_id= ?",name , (err, results)=>{
        if(err)throw err;
        else{
            con.query("select * from department", (err, data)=>{
                if(err) throw err;
                res.send(data);
            });
        }
    })
});

// Delete Data by id
server.delete("/deleteby-id/:id", (req,res)=>{
    const Id= req.params.id;
    con.query("delete from department where dept_id = ?", Id,(err, results,fields)=>{
        if(err) throw err;
        else{
            con.query("select * from department", (err,result)=>{
                res.send(results);
            })
        }
    })
})

// delete row by name
server.delete("/deleteby-name/:name", (req,res)=>{
    const name= req.params.name;
    con.query("delete from department where dept_name = ?", name,(err, results,fields)=>{
        if(err) throw err;
        else{
            con.query("select * from department", (err,result)=>{
                res.send(results);
            })
        }
    })
});

// add department id
server.post("/dept-id",(req,res)=>{
    const id= [req.body.dept_id, req.body.s_id];
    
    con.query("update Students set dept_id = ? where s_id=?",id, (err, results)=>{
        if(err) throw err;
        else{
            con.query("select * from Students", (err,result)=>{
                res.send(result);
            })
        }
    })
})

// update department id by using name
server.put("/dept-idname/:name",(req,res)=>{
    const name=req.params.name;
    const dept_name= req.body.dept_name;
    const detail=[dept_name,name];
    con.query(`update Students set dept_id= (select dept_id from department where (dept_name=?)) where (name=?)`, 
    detail, (err, results)=>{
        if(err) throw err;
        else{
            con.query("select * from Students where (name = ?)", [name], (err,result)=>{
                if(err) throw err;
                res.send(result);
            })
        }
    })
});

module.exports= server;

// server.listen(port,()=>{
//     console.log(`Server started at ${port}`);
// })