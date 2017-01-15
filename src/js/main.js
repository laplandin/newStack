window.onload = function() {
    var dataDiv = $('.inside');

    jQuery.getJSON('index.json', function(data) {
        renderIndex(data);
    });

    //Function for route through nav-panel
    $('.global-nav__items-list').on('click', function(event) {
        event.preventDefault();
        dataDiv.empty(); //Очищаем область вывода

        var target = $(event.target); //Опрелеяем на чём был сделан клик
        //if (target.tagName != 'a') return; // подтверждаем, что клик по ссылке

        //changeActive(target); //Вызываем функцию по перемещению класса активной ссылки

        $(this).find('.active').removeClass('active');
        target.addClass('active');

        var classList = target.attr('class').split(/\s+/);
        var renderTitle;
        $.each(classList, function(index, item) {
            var findStr = /global-nav__item--/;
            if (findStr.test(item)) {
                renderTitle = item.slice(18);
            }
        });

        //Html router)
        switch(renderTitle) {
            case 'main': location.reload();
                break;
            case 'features': jQuery.getJSON('features.json', function(data) {
                renderFeatures(data);
            });
                break;
            case 'contacts': window.open('kb-ug.ru/contacts', '_self');
                break;
            case 'about': break;
        };

    });

// Function for render index content's items
    function renderIndex(data) {
        var source = $('#index-articles-template').html();
        var template = Handlebars.compile(source);
        //Helpers for set wide-width class for very 5 item, starts from two
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
//Function fro render about content
    function renderFeatures(data) {
        var source = $('#about-template').html();
        var template = Handlebars.compile(source);
        var context = data;

        var htmlReady = template(data);
        $('.inside').append(htmlReady);
    }
};
