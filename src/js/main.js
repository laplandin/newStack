//window.addEventListener('click', function() {
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

    var htmlready = template(context);
    $('.inside').append(htmlready);

//});
