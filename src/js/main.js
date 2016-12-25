window.onload = function() {

    jQuery.getJSON('index.json', function(data) {
        renderItems(data);
    });

    function renderItems(data) {
        var source = $('#article-item-template').html();
        var template = Handlebars.compile(source);
        var context = data;

        Handlebars.registerHelper('col-width', function(index){
           index += 1;
            if ((index == 2) || ((index - 2) % 5  == 0)) {
                return "8";
            } else {
                return "4";
            }
        });

        var htmlready = template(context);
        $('.inside').append(htmlready);
    }
};
