var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));
var mysql      = require('mysql');
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'PFM'
});
var i=1000;//for t_no


db.connect();

app.get("/",(req,res)=>{
    res.render("home");
});

//===============
// account routes
//===============
app.get("/account",(req,res)=>{
    db.query('SELECT * FROM ACCOUNTS',(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            res.render("account",{data:result})
        }
    });
});
app.post("/account",(req,res)=>{
    
    var avalues= '"'+req.body.ac_code+'"' + ',"'+req.body.ac_no+'"'+ ',"'+req.body.bank_name+'"'+ ',"'+req.body.account_type+'"'+ ','+req.body.bal;
    db.query('INSERT INTO Accounts VALUES('+avalues+')',(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            console.log("Account is added.");
        }
    });
    var tvalues= ++i + ',"'+req.body.ac_code+'"' + ','+false+ ','+null+','+null+','+req.body.bal+ ',CURDATE()' + ',"Bal of ac when added to DB"';
    db.query('INSERT INTO Transactions VALUES('+tvalues+')',(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            console.log('Account opening transaction is added.');
            res.redirect("/account");
        }
    });
});
app.get("/account/new",(req,res)=>{
    res.render("newAccount")
});
app.get("/account/modify/:ac",(req,res)=>{
    db.query('SELECT * FROM ACCOUNTS WHERE ac_code='+'"'+req.params.ac+'"',(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            res.render("modifyAccount",{data:result[0]})
        }
    });
});
app.post("/account/modify",(req,res)=>{
    
    db.query('UPDATE ACCOUNTS SET  ac_code='+'"'+req.body.ac_code+'",'+'ac_no='+'"'+req.body.ac_no+'",'+'bank_name='+'"'+req.body.bank_name+'",'+'account_type ='+'"'+req.body.account_type+'"' +' WHERE ac_code='+'"'+req.body.old_ac_code+'"',(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            console.log("Account is modified.");
            res.redirect("/account");
        }
    });
});
app.get("/accountfocus/:code",(req,res)=>{
    db.query('SELECT * FROM Transactions WHERE ac_code='+'"'+req.params.code+'"',(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            res.render("accountfocus",{data:result,code:req.params.code})
        }
    });
});


//=================
// Creditors routes
//=================
app.get("/creditor",(req,res)=>{
    db.query('SELECT * FROM Creditors',(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            res.render("creditor",{data:result})
        }
    });
});
app.post("/creditor",(req,res)=>{
    var values='"'+req.body.code+'"'+',"'+req.body.name+'",'+0 + ',"'+req.body.description+'"';
    db.query('INSERT INTO Creditors VALUES('+values+')',(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            console.log(values);
            res.redirect("/creditor")
        }
    });
});
app.get("/creditor/new",(req,res)=>{
    res.render("newCreditor")
});
app.get("/creditor/modify/:code",(req,res)=>{
    db.query('SELECT * FROM Creditors WHERE c_code='+'"'+req.params.code+'"',(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            res.render("modifyCreditor",{data:result[0]})
        }
    });
});
app.post("/creditor/modify",(req,res)=>{
    
    db.query('UPDATE Creditors SET c_code='+'"'+req.body.code+'",'+'c_name='+'"'+req.body.name+'",'+'c_description='+'"'+req.body.description+'"' +' WHERE c_code='+'"'+req.body.old_code+'"',(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            console.log("Creditors is modified.");
            res.redirect("/creditor");
        }
    });
});
app.get("/creditorfocus/:code",(req,res)=>{
    db.query('SELECT * FROM Transactions WHERE c_code='+'"'+req.params.code+'"',(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            res.render("creditorfocus",{data:result,code:req.params.code})
        }
    });
});


//==============
// Debtor route
//==============
// Debtors routes
app.get("/debtor",(req,res)=>{
    db.query('SELECT * FROM Debtors',(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            res.render("debtor",{data:result})
        }
    });
});
app.post("/debtor",(req,res)=>{
    var values='"'+req.body.code+'"'+',"'+req.body.name+'"' + ','+0+',"'+req.body.description+'"';
    db.query('INSERT INTO Debtors VALUES('+values+')',(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            console.log(values);
            res.redirect("/debtor")
        }
    });
});
app.get("/debtor/new",(req,res)=>{
    res.render("newDebtor")
});
app.get("/debtor/modify/:code",(req,res)=>{
    db.query('SELECT * FROM Debtors WHERE d_code='+'"'+req.params.code+'"',(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            res.render("modifyDebtor",{data:result[0]})
        }
    });
});
app.post("/debtor/modify",(req,res)=>{
    
    db.query('UPDATE Debtors SET d_code='+'"'+req.body.code+'",'+'d_name='+'"'+req.body.name+'",'+'d_description='+'"'+req.body.description+'"' +' WHERE d_code='+'"'+req.body.old_code+'"',(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            console.log("Debtors is modified.");
            res.redirect("/debtor");
        }
    });
});
app.get("/debtorfocus/:code",(req,res)=>{
    db.query('SELECT * FROM Transactions WHERE d_code='+'"'+req.params.code+'"',(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            res.render("debtorfocus",{data:result,code:req.params.code})
        }
    });
});








app.get("/income",(req,res)=>{
    db.query('SELECT * FROM Income',(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            res.render("income",{data:result})
        }
    });
});



//===================
// transaction routes
//===================
app.get("/transaction",(req,res)=>{
    db.query('SELECT * FROM Transactions',(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            res.render("transaction",{data:result})
        }
    });
});
app.post("/transaction",(req,res)=>{
    console.log(req.body);
    console.log(req.body.d_code);
    var values;
    if (req.body.is_creditor=='true') {
        db.query('UPDATE ACCOUNTS SET bal = bal-'+req.body.t_amount+' WHERE ac_code='+'"'+req.body.ac_code+'"',(err,result)=>{if(err)console.log(err);});
        values= ++i + ',"'+req.body.ac_code+'"' + ','+true+ ',"'+req.body.c_code+'",'+null+','+req.body.t_amount+ ',"'+ req.body.t_date+ '","'+req.body.t_description+'"';
    } else {
        db.query('UPDATE ACCOUNTS SET bal = bal+'+req.body.t_amount+' WHERE ac_code='+'"'+req.body.ac_code+'"',(err,result)=>{if(err)console.log(err);});
        values= ++i + ',"'+req.body.ac_code+'"' + ','+false+','+null+ ',"'+req.body.d_code+'",'+req.body.t_amount+ ',"'+ req.body.t_date+ '","'+req.body.t_description+'"';
    }
    db.query('INSERT INTO Transactions VALUES('+values+')',(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            console.log(values);
            res.redirect("/transaction")
        }
    });
});
app.get("/transaction/cnew",(req,res)=>{
    db.query('SELECT ac_code FROM ACCOUNTS',(err,ac)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            db.query('SELECT * FROM Debtors',(err,result)=>{
                if(err)
                {
                    console.log(err);
                }
                else{
                    res.render("newTransactionc",{ac:ac,code:result})
                }
            });
        }
    });
});
app.get("/transaction/dnew",(req,res)=>{
    db.query('SELECT ac_code FROM ACCOUNTS',(err,ac)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            db.query('SELECT * FROM Creditors',(err,result)=>{
                if(err)
                {
                    console.log(err);
                }
                else{
                    res.render("newTransactiond",{ac:ac,code:result})
                }
            });
        }
    });
});
app.get("/transaction/modify/:t_no",(req,res)=>{
    db.query('SELECT * FROM Transactions',(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            res.render("newTransaction",{data:result})
        }
    });
});

app.get("/transaction/modify",(req,res)=>{
    db.query('SELECT ac_code FROM ACCOUNTS',(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            res.render("newTransaction",{data:result})
        }
    });
});

app.get("/insurance",(req,res)=>{
    db.query('SELECT * FROM Insurance',(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            res.render("insurance",{data:result})
        }
    });
});
app.get("/share",(req,res)=>{
    db.query('SELECT * FROM Share_Details',(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            res.render("share",{data:result})
        }
    });
});
app.get("/mutualfunds",(req,res)=>{
    db.query('SELECT * FROM Mutual_Funds',(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            res.render("mutualfunds",{data:result})
        }
    });
});











app.listen(3000,()=>{
    db.query('SELECT *  FROM Transactions',(err,result)=>{
        i=result.length;
    });
        
    console.log("Server is started on port 3000");
});