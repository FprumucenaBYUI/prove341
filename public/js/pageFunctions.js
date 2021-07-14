var range = document.getElementById('range');
noUiSlider.create(range, {
    range: {
        'min': 0,
        'max': 2000
    },
    step: 5,
    start: [100, 1000],
    margin: 300,
    connect: true,
    direction: 'ltr',
    orientation: 'horizontal',
    behaviour: 'tap-drag',
    tooltips: true,
    format: {
        to: function(value) {
            return '$' + value;
        },
        from: function(value) {
            return value.replace('', '');
        }
    }
});


function injectSvgSprite(path) {

    var ajax = new XMLHttpRequest();
    ajax.open("GET", path, true);
    ajax.send();
    ajax.onload = function(e) {
        var div = document.createElement("div");
        div.className = 'd-none';
        div.innerHTML = ajax.responseText;
        document.body.insertBefore(div, document.body.childNodes[0]);
    }
}