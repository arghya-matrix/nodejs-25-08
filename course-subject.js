const con= require("./config");
const express= require("express");
const server=express();


server.use((req,res,next)=>{
    console.log(req.method, req.ip, req.path);
    next();
});



server.get("/table/:name", (req,res)=>{
    const tableName= req.params.name;
    const tableId= req.body.tableId;
    const courseId=req.body.courseId;
    const subjectId= req.body.subjectId;
    con.query(`create table ${tableName} (${tableId} int(5), 
     ${courseId} varchar(10), ${subjectId} varchar(10))`, (err, results)=>{
        if(err) throw err;
        res.send("Table created");
    })
});

// insert data
server.post("/insert",(req,res)=>{
    const id= req.body.id;
    const courseId= req.body.courseId;
    const subjectId=req.body.subjectId;
    con.query(`insert into course_subject (id, courseId, subjectId) values('${id}', '${courseId}', '${subjectId}')`, (err,results)=>{
        if(err) throw err;
        else{
            con.query(`select * from course_subject`, (err, data)=>{
                if(err) throw err;
                res.send(data); 
            })
        }
    })
}); 
// update
server.post("/update-course-id", (req,res)=>{
    const courseId= req.body.courseId;
    const id= req.body.id;
    con.query(`update course_subject set courseId= \'${courseId}\' where id= ${id}`,
    (err, results)=>{
        if(err) throw err;
        else{
            con.query("select * from course_subject where id= ?", [id], (error, data)=>{
                if(error) throw error;
                res.send(data);
            })
        }
    })
});

server.delete("/delete/:id", (req,res)=>{
    con.query(`delete from course_subject where id = ?`,[req.params.id],(err,results)=>{
        if(err) throw err;
        else{
            con.query(`select * from course_subject`,(error, data)=>{
                if(error) throw error;
                res.send(data);
            })
        }
    })
})
module.exports= server;

// server.listen(port, ()=>{
//     console.log("Server started at port ", port)
// }); 