window.onload = function() {

    function renderItems() {
        var source = $('#article-item-template').html();
        var template = Handlebars.compile(source);
        var context = { articles:[
            {
                title: 'Системы видеонаблюдения',
                description: 'Что-то про системы видеонаблюдения',
                src: 'img/img1'},
            {
                title: 'Охранно-пожарная сигнализация',
                description: 'Что-то про охранно-пожарную сигнализацию',
                src: 'img/img1'},
            {
                title: 'Системы управления доступом',
                description: 'Что-то про Системы управления доступом',
                src: 'img/img1'},
            {
                title: 'Автомониторинг',
                description: 'Что-то про системы видеонаблюдения',
                src: 'img/img1'},
            {
                title: 'Умный дом',
                description: 'Что-то про системы видеонаблюдения',
                src: 'img/img1'},
            {
                title: 'Серверное и сетевое оборудование',
                description: 'Что-то про сетевое оборудование',
                src: 'img/img1'},
            {
                title: 'Автоматизация технологических процессов',
                description: 'Что-то про автоматизацию',
                src: 'img/img1'}]
        };

        Handlebars.registerHelper("ifWide", function(index, obj) {
            index = index +1;

            if ((index == 2) || ((index - 2) % 5  == 0)) {
                if (!(obj.length % 2 == 0)&& index == (obj.length)) {
                    return "content__card--wide content__card--last-line";
                }
                return "content__card--wide";
            } else {
                if (!(obj.length % 2 == 0) && index == (obj.length)) {
                    return "content__card--small content__card--last-line";
                }
                return "content__card--small";
            }
        });

        var htmlready = template(context);
        $('.inside').append(htmlready);
    }



    renderItems();
};
