exports.get404 = (req, res, next) => {
    // console.log("USER loged: " + req.session.isLoggedIn);

    res.status(404).render('404', {
        pageTitle: 'Page Not Found',
        path: req.url,
        // isLoggedIn: req.session.isLoggedIn
    });
};

exports.get500 = (req, res, next) => {
    res.status(500).render('500', {
        pageTitle: 'Error!',
        path: '/500',
        // isLoggedIn: req.session.isLoggedIn
    });
};