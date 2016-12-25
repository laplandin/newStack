window.onload = function() {
    var dataDiv = $('.inside');

    jQuery.getJSON('index.json', function(data) {
        renderIndex(data);
    });

    $('.global-nav__item--about').on('click', function() {
        dataDiv.empty();

        jQuery.getJSON('features.json', function(data) {
           renderAbout(data);
        });
    });

    function renderIndex(data) {
        var source = $('#index-articles-template').html();
        var template = Handlebars.compile(source);

        Handlebars.registerHelper('col-width', function(index){
           index += 1;
            if ((index == 2) || ((index - 2) % 5  == 0)) {
                return "8";
            } else {
                return "4";
            }
        });

        var htmlReady = template(data);
        $('.inside').append(htmlReady);
    }

    function renderAbout(data) {
        var source = $('#about-template').html();
        var template = Handlebars.compile(source);
        var context = data;

        var htmlReady = template(data);
        $('.inside').append(htmlReady);
    }
};
