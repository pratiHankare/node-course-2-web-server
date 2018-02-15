//load express
const express= require('express');
//load hbs module(which is a plugin for handler)
const hbs=require('hbs');
//load fs module here
const fs=require('fs');
//creating varible to store the stroee varible on which heroku is going to inturn going to get connected
var port=process.env.PORT || 9000 ;
//jus a intialisation of the express
var app=express();
/*since the header footer ..etc are reusable codes & had to be included in
that case we has partials in node js using handlebars.this handlebar(hbs) provide
a method called .registerPartials with takes the abulate path.(same in teh case we have fone for getting static public floder)*/
hbs.registerPartials(__dirname+'/views/partials');
/*express middleware :-this basically used to make express work*/
//you can congigure express using the .set->availble
// in the follwing code we are going to tell that express that
//i am going to use view engine -> hbs(plugin for handlebar.js)
app.set('view engine','hbs');
//express has method called  .get-> responsible for handling the http requests and
//it accepts 2 parameters request and respons
//request-> carrys the data like header,method,body,path
//response -> conatains HTTP status code,custmizible data
// app.get('/',(req,res)=>{
//   //res.send('<h1>Hello Express!</h1>');
//   res.send({
//     name:"pratibha",
//     likes:[
//       'photography',
//       'fitness',
//       'learing',
//       'coading'
//     ]
//   });
// });
/*we can add middleware  by registring  i.e app.use() it and passing the arrow function */
/*this middleware is created to log how many requests comes and at logging time stamp*/
app.use((req,res,next)=>{
  var now=new Date().toString();
  var log=`${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n',(err)=>{
    if(err){
      console.log('Unable to append to server.log');
    }
  });
  next();
});

/*challenge to make the maintance middleware
app.use( (req,res,next)=>{
  res.render('maintance.hbs',{
    message1:'The Website is under Mainatance',
    message2:'.The sit is currently being updated. We will be back soon.'
  });
});
*/

//making a folder that made to view by user
app.use(express.static(__dirname+'/public'));

/*writing the hbs helper that will reduce the taks of repating current year*/
/*.registerHelper('obj referance name',function that will reurn a result) => will give the snippet to be used globally*/
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});
/*handlerJS taking arug ex*/
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});
/*challenge */
app.get('/',(req,res)=>{
  //rendering to index with pageTitle,Copyright,meassage
  res.render('home.hbs',{
    pageTitle:'Home',
    message:'Welcome to home Page',
  //  currentYear:new Date().getFullYear()
  });
});

//creating a route
app.get('/about',(req,res)=>{
  //res.send('this is about page');
  /*since the routing hass been created now i have make the page to go to that place to take the template to view */
  /* .render('page.hbs','object which will carry data to this page')*/
  res.render('about.hbs',{
    pageTitle:'About Page',
    message:'Welcome to About Page',
  //  currentYear: new Date().getFullYear()
  });
});

//challenge
app.get('/projects',(req,res)=>{
  res.render('projects.hbs',{
    pageTitle:'Projects Page',
    message:'Welcome to the Portfolio.',
    message1:'Here,all the project list will come soon.'

  });
});


//creating a route
app.get('/bad',(req,res)=>{
  res.send({
    errorMessage:'Unable to fillfull this request.'
  });
});
//in order to run the app we have to make the to bind port to the machine
app.listen(port,()=>{
  console.log(`The server is Up on port ${port}`);
});
