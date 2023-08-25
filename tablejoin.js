const con= require("./config");
const express= require("express");
const server=express.Router();


server.use((req,res,next)=>{
    console.log(req.method, req.ip, req.path);
    next();
});

server.get("/", (req,res)=>{
    con.query(`select st.s_id,st.name,st.batch,st.marks,st.grade,st.dept_id, dept.dept_name, cr.c_name, sub.subject
    count(cr.c_name) as student_count from Students st
    inner join courses cr on st.course = cr.c_id
    inner join department dept on st.dept_id = dept.dept_id
    inner join subjects sub on st.speciality = sub.t_id
    GROUP BY
    st.s_id,st.name,st.batch,st.marks,st.grade,st.dept_id,dept.dept_name,cr.c_name,sub.subject`,(err,data)=>{
        if(err) throw err;
        const length= Object.keys(data).length;
        res.send(length.toString());
    })
})

server.get("/student-data/:name",(req,res)=>{
    const Name= req.params.name;
    con.query(`select st.s_id,st.name,st.batch,st.marks,st.grade,st.dept_id, dept.dept_name, cr.c_name, sub.subject
    from Students st
    inner join courses cr on st.course = cr.c_id
    inner join department dept on st.dept_id = dept.dept_id
    inner join subjects sub on st.speciality = sub.t_id
    where st.name= \'${Name}\'
    GROUP BY
    st.s_id,st.name,st.batch,st.marks,st.grade,st.dept_id,dept.dept_name,cr.c_name,sub.subject`,(err,data)=>{
        if(err) throw err;
        res.send(data);
    })
});

// Count students by department
server.get('/count-by-dept/:dept',(req,res)=>{
    const deptName= req.params.dept;
    con.query(`select st.s_id,st.name,st.batch,st.marks,st.grade,st.dept_id, dept.dept_name, cr.c_name, sub.subject
    from Students st
    inner join courses cr on st.course = cr.c_id
    inner join department dept on st.dept_id = dept.dept_id
    inner join subjects sub on st.speciality = sub.t_id
    where dept.dept_name= \'${deptName}\'
    GROUP BY
    st.s_id,st.name,st.batch,st.marks,st.grade,st.dept_id,dept.dept_name,cr.c_name,sub.subject`,(err,data)=>{
        if (err) throw err;
        else{
            const length= Object.keys(data).length;
            res.send(`the number of students ${length.toString()}`);
        }
    })
});

//student data by department name

server.get('/data-by-dept/:dept',(req,res)=>{
    const deptName= req.params.dept;
    con.query(`select st.s_id,st.name,st.batch,st.marks,st.grade,st.dept_id, dept.dept_name, cr.c_name, sub.subject
    from Students st
    inner join courses cr on st.course = cr.c_id
    inner join department dept on st.dept_id = dept.dept_id
    inner join subjects sub on st.speciality = sub.t_id
    where dept.dept_name= \'${deptName}\'
    GROUP BY
    st.s_id,st.name,st.batch,st.marks,st.grade,st.dept_id,dept.dept_name,cr.c_name,sub.subject`,(err,data)=>{
        if (err) throw err;
        else{
            res.send(data);
        }
    })
});

//students by course
server.get('/count-by-course/:course',(req,res)=>{
    const courseName= req.params.course;
    con.query(`select st.s_id,st.name,st.batch,st.marks,st.grade,st.dept_id, dept.dept_name, cr.c_name, sub.subject
    from Students st
    inner join courses cr on st.course = cr.c_id
    inner join department dept on st.dept_id = dept.dept_id
    inner join subjects sub on st.speciality = sub.t_id
    where cr.c_name= \'${courseName}\'
    GROUP BY
    st.s_id,st.name,st.batch,st.marks,st.grade,st.dept_id,dept.dept_name,cr.c_name,sub.subject`,(err,data)=>{
        if (err) throw err;
        else{
            
            res.send(data);
        }
    })
});

//students by subject
server.get('/count-by-sub/:sub',(req,res)=>{
    const subName= req.params.sub;
    con.query(`select st.s_id,st.name,st.batch,st.marks,st.grade,st.dept_id, dept.dept_name, cr.c_name, sub.subject
    from Students st
    inner join courses cr on st.course = cr.c_id
    inner join department dept on st.dept_id = dept.dept_id
    inner join subjects sub on st.speciality = sub.t_id
    where sub.subject = \'${subName}\'
    GROUP BY
    st.s_id,st.name,st.batch,st.marks,st.grade,st.dept_id,dept.dept_name,cr.c_name,sub.subject`,(err,data)=>{
        if (err) throw err;
        else{
            const length= Object.keys(data).length;
            res.send(`the number of students ${length.toString()}`);
        }
    })
});


module.exports= server;