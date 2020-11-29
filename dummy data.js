var mysql      = require('mysql');
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'PFM'
});

db.query("INSERT INTO ACCOUNTS VALUES('ICICI', 1237769658, 'ICICI Bank', 'Savings Account', '1999-02-14', 50000)",(err,result)=>{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("Sccesful\n");
    }
});
db.query("INSERT INTO Transactions VALUES(1, 'ICICI', 'Opening Bal ICICI', 50000, '1999-02-14', 'Balance when added to Database')",(err,result)=>{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("Sccesful\n");
    }
});

db.query("INSERT INTO ACCOUNTS VALUES('BOB', 1156689534, 'Bank of Baroda', 'Checking Account', '2001-02-14' , 21415.06)",(err,result)=>{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("Sccesful\n");
    }
});
db.query("INSERT INTO Transactions VALUES(2, 'BOB', 'Opening Bal BOB', 50000, '2001-02-14', 'Balance when added to Database')",(err,result)=>{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("Sccesful\n");
    }
});

db.query("INSERT INTO ACCOUNTS VALUES('Kotak saving', 1260000010, 'Kotak Mahindra', 'Money Market Account', '2000-04-17' , 15000)",(err,result)=>{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("Sccesful\n");
    }
});
db.query("INSERT INTO Transactions VALUES(3, 'Kotak saving', 'Opening Bal Kotak saving', 50000, '2001-02-14', 'Balance when added to Database')",(err,result)=>{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("Sccesful\n");
    }
});




// db.query("INSERT INTO Income VALUES(1, 'Salary and Wages', 3000000, '2018-01-01', 'ICICI')",(err,result)=>{
//     if(err)
//     {
//         console.log(err);
//     }
//     else{
//         console.log("Sccesful\n");
//     }
// });

// db.query("INSERT INTO Income VALUES(2, 'Affiliate Marketing', 100000, '2018-03-03', 'ICICI')",(err,result)=>{
//     if(err)
//     {
//         console.log(err);
//     }
//     else{
//         console.log("Sccesful\n");
//     }
// });

// db.query("INSERT INTO Income VALUES(3, 'Rent', 10000, '2018-03-10', 'BOB')",(err,result)=>{
//     if(err)
//     {
//         console.log(err);
//     }
//     else{
//         console.log("Sccesful\n");
//     }
// });





// db.query("INSERT INTO Expense VALUES(1, 'Potato Chips', 20, 1, '2018-03-08', 0)",(err,result)=>{
//     if(err)
//     {
//         console.log(err);
//     }
//     else{
//         console.log("Sccesful\n");
//     }
// });

// db.query("INSERT INTO Expense VALUES(2, 'Chips', 20, 2, '2018-03-10', 1)",(err,result)=>{
//     if(err)
//     {
//         console.log(err);
//     }
//     else{
//         console.log("Sccesful\n");
//     }
// });




db.query("INSERT INTO Transactions VALUES(10, 'BOB', 'ATM', 10000, '2019-03-10', null)",(err,result)=>{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("Sccesful\n");
    }
});

db.query("INSERT INTO Transactions VALUES(20, 'ICICI', 'Charge', 3000, '2020-04-10', null)",(err,result)=>{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("Sccesful\n");
    }
});
