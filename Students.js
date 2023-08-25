const express= require("express");
const server= express.Router();
const con= require("./config"); 



server.get("/",(req, res)=>{
    con.query("select * from Students", (err, data)=>{
        if(err)
        {
            console.warn("Error");
        }
        else{
            res.send(data);
        }
    })
});
// Insert Data
server.post("/add", (req, res)=>{
    
    const student= [req.body.name, req.body.batch, req.body.marks, req.body.grade];
    con.query("insert into Students (name, batch, marks, grade) values(?,?,?,?)", student,(err,data,fields)=>{
        if(err){
            console.warn("Error", err);
        }
        else{
            res.send(data);
            console.log(fields);
        }
    })
});
// Delete Data
server.delete("/delete/:s_id",(req,res)=>{
    const s_id= req.params.s_id;
    con.query("delete from Students where s_id = ?", s_id,(err, data, fields)=>{
        if(err) throw err;
        res.send(data);
    })
})
//Update Data
server.put("/update/:name",(req,res)=>{
    const name= [req.params.name];
    const updateData= [req.body.name, req.body.batch, req.body.marks, req.body.grade, req.params.name] ;
    con.query("update Students set name = ?, batch = ?, marks= ?, grade= ? where name = ?", updateData, (err, data, fields)=>{
        if(err){
            console.error("Error",err);
        }
        else if (data!= null){

            con.query("select s_id from Students where name = ? ", name, (err,sno,fields)=>{
                if(err) throw err;
                else if(data.effectiveRows!= null){
                    res.send("Data Updated");
                }
                else if(data.affectedRows==0) {
                    {
                        const newRow=[req.body.name, req.body.batch, req.body.marks, req.body.grade]
                        con.query("insert into Students (name, batch, marks, grade) values(?,?,?,?)",newRow, (err,data,fields)=>{
                        if(err) throw err;
                         else{
                        res.send ("Data added in a New Row");
                }
            })
                    }
                }
            });
        }
        else if(data.affectedRows==0){
            
        }
    });
})
//Add column

server.put("/add-column/:name",(req,res)=>{
    const columnName= req.params.name;
    con.query(`alter table Students add column ${columnName} varchar (10) not null`, (err, results)=>{
        if(err) throw err;
        else{
            con.query(`select ${columnName} from Students`, (error, result)=>{
                if(error) throw error;
                else{
                    res.send(result);
                }
            })
        }
    })
});

//delete comumn

server.delete("/delete-column/:name",(req,res)=>{
    const columnName= req.params.name;
    con.query(`alter table Students drop ${columnName} `,(err,results)=>{
        if(err) throw err;
        res.send(`${columnName} deleted`);
    }); 
});

//insert course id
server.post("/course-id",(req,res)=>{
    const tableName= req.body.tableName;
    const colname= req.body.colname;
    const course= req.body.course;
    const s_id= req.body.s_id;
    
    con.query(`
    UPDATE Students
    SET ${colname} = (SELECT c_id FROM \`${tableName}\` WHERE c_name = '${course}')
    WHERE \`s_id\` = ${s_id}`,(err, results)=>{
        if(err) throw err;
        else{
            con.query(`select * from Students where s_id= ${s_id}`, (error, result)=>{
                if(err) throw err
                res.send(result); 
            })
        }
    });
})

// Update Data
server.put("/update-column/:name", (req, res)=>{
    const Name=req.params.name;
    const colName= req.body.colName;
    const newData= req.body.newData;
    con.query(`UPDATE Students SET \`${colName}\` = '${newData}' WHERE name = '${Name}'`, (err, results)=>{
        if(err)throw err;
        else{
            con.query("select * from Students where name = ?",[Name], (err, data)=>{
                if(err) throw err;
                res.send(data);
            });
        }
    })
});

module.exports= server;