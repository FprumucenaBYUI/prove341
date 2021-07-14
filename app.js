const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');

//ROUTES 
const shopRoutes = require('./routes/shop');

const app = express();
const PORT = process.env.PORT || 5000
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(shopRoutes);
app.get('/500', errorController.get500);
app.use(errorController.get404);
app.use((error, req, res, next) => {
    res.status(500).render('500', {
        pageTitle: 'Error!',
        path: '/500',
    });
});

app.listen(PORT, () => {
    console.info(`Store Server running on Port ${PORT}`);
})