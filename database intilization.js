var mysql      = require('mysql');
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'PFM'
});


// DATABASE CREATION
db.query('CREATE DATABASE IF NOT EXISTS PFM',(err,result)=>{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("Database PFM Created.\n");
    }
});

// TABLE ACCOUNTS
db.query('CREATE TABLE ACCOUNTS(ac_code varchar(15), ac_no int, bank_name varchar(20), account_type varchar(20), opening_date date, bal float8, primary key(ac_code))',(err,result)=>{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("Table ACCOUNTS Created.\n");
    }
});


// TABLE Transactions
db.query('CREATE TABLE Transactions(t_no integer, ac_code varchar(15), t_type varchar(40), t_amount float8, t_date date, t_description varchar(100), primary key(t_no), foreign key(ac_code) references ACCOUNTS(ac_code))',(err,result)=>{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("Table Transactions Created.\n");
    }
});


// TABLE Income
db.query('CREATE TABLE Income(i_no int NOT NULL, i_description varchar(100), i_value float8, i_date date NOT NULL,ac_code varchar(15), primary key(i_no), foreign key(ac_code)references ACCOUNTS(ac_code))',(err,result)=>{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("Table Income Created.\n");
    }
});
