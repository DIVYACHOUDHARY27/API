const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user-routes');
const adminRoutes = require('./routes/admin-routes');
const HttpError = require('./utils/http-error');

// Configuration statements
const port = 3001;
app.use(bodyParser.json());


// Routing
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/admin', adminRoutes);


// Error Handling
app.use((req,res,next) => {
  const error = new HttpError('Page not found',404);
  throw error;
});

app.use((error, req, res, next) => {
  res.status(error.code);
  res.json({message: error.message || 'Unknown error occured' , code: error.code });
});
mongoose.Promise = Promise;
mongoose.connect('mongodb+srv://Divya:RX2K2NfWq*8RC$b@mernstackcluster.rxooo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {
      useUnifiedTopology: true,
      useNewUrlParser: true,
  }).then(()=>{
    app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`)
      });
  }
  ).catch(err =>{
      console.log(err);
      process.exit();
  });