const https = require('https')

const ITEMS_PER_PAGE = 9 // Limit of 10 items per page.

const renderIndex = (req, res, json) => {
    let searchedValue = req.body.searchValue || req.query.searchValue || '' // Handle for GET, POST or neither
    let page = +req.query.page || 1 // Grab our page number, 1 if undefined

    const indexStart = (page - 1) * ITEMS_PER_PAGE // Item index to start on...
    const indexEnd = page * ITEMS_PER_PAGE

    const filteredData = global.jsonResponse.filter(x =>
        x.name.toLowerCase().includes(searchedValue.toLowerCase())
    )

    // let totalProducts = filteredData.length * 1;
    // console.log(ITEMS_PER_PAGE * page);
    // console.log("SEARCHED VALUE = [" + searchedValue + "]");
    console.log("CURRENT PAGE = [" + page + "]");
    console.log("LAST PAGE = [" + Math.ceil(filteredData.length / ITEMS_PER_PAGE) + "]");
    let nextP = page + 1;
    console.log("NEXT PAGE = [" + nextP + "]");


    res.render('shop/product-list', {
        data: filteredData.slice(indexStart, indexEnd), // For JSON/Array and not Mongoose, .slice() works best.
        path: '/',
        title: 'Week 9 Prove Assignment',
        // searchedValue: searchedValue,
        page: page, //current page
        numPages: Math.ceil(filteredData.length / ITEMS_PER_PAGE), //lastPage
        previousPage: page - 1,
        nextPage: page + 1,
        hasPreviousPage: page > 1,
        hasNextPage: ITEMS_PER_PAGE * page < filteredData.length
    });
}

exports.processJson = (req, res, next) => {
    // read json
    var url = 'https://byui-cse.github.io/cse341-course/lesson03/items.json'

    https
        .get(url, function(response) {
            var body = ''

            response.on('data', function(chunk) {
                body += chunk
            })

            response.on('end', function() {
                global.jsonResponse = JSON.parse(body)
                renderIndex(req, res, global.jsonResponse)
            })
        })
        .on('error', function(e) {
            console.log('Got an error: ', e)
        })
}

exports.getIndex = (req, res, next) => {
    renderIndex(req, res, global.jsonResponse) // Render page.
}