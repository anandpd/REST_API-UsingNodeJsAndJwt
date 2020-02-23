const express = require('express'),
 app = express(),
  port = "3000",
  mongoose = require('mongoose'),
  verify = require('./verifyToken'),
  welcomeRoute =  require('./routes/welcome')
  app.use(express.json())
// Connect to DB
mongoose.connect('mongodb://localhost:27017/NodeJsAuth',{ useUnifiedTopology: true,useNewUrlParser: true }, ()=> 
    console.log('connected to DB !'))

// Import Routes 
const authRoute = require('./routes/auth')
app.use('/api/welcome',welcomeRoute)
app.use('/api/user',authRoute)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Api AuthDemo listening on port ${port} !`))