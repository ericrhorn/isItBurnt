const express = require('express');
const cors = require('cors')    
const app = express();

const cookieParser = require('cookie-parser');

require('./config/mongoose.config')

require('dotenv').config();

app.use(cookieParser());

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(express.json());                           
app.use(express.urlencoded({ extended: true })); 

require('./routes/project.routes')(app);
require('./routes/user.routes')(app);
app.listen(8000, () => {
    console.log("Listening at Port 8000")
})