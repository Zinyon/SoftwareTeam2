// express 호출해서 app에 할당
// 각 module 호출
const express = require('express')
const app = express();
const port = 3000;
var fs = require('fs');
var path = require('path');
var qs = require('querystring');
var bodyParser = require('body-parser');
var compression = require('compression');
var studentRouter = require('./controllers/schedule_recommendation.js');
var infoManageRouter = require('./controllers/user_info_management.js');
var loginRouter = require('./controllers/session.js');
var ejsLocals = require('ejs-locals');
var {sequelize} = require('./models/index');


app.set('view engine', 'ejs');
app.set('views', './boundaries');
app.engine('ejs',ejsLocals);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// student create, read, update, delete 등 모든 router
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/student',studentRouter);
app.use(infoManageRouter);
app.use(loginRouter);


// main page
app.get('/', function(req, res) {
  res.render('login');
});


// sequelize module로 DB 연결 
sequelize.sync()
  .then(() => {
    console.log('Connection has been established successfully .');
  })
  .catch(err =>{
    console.log('Unable to Connect to the database:',err);
  });


app.listen(port, () => console.log(`app listening on port ${port}!`))
