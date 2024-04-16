var express = require('express');
var mongoose = require('mongoose');
var app = express();
var PORT = process.env.PORT || 3000;
// Connect to MongoDB
mongoose.connect('mongodb://localhost/harmonyhub', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(function () { return console.log('MongoDB connected'); })
    .catch(function (err) { return console.error(err); });
// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', './views');
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// Routes
app.get('/', function (req, res) {
    res.render('index');
});
// Start the server
app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
