var set_locale_to = function(locale) {
    if (locale) {
        $.i18n().locale = locale;
    }
    $('body').i18n();
};

jQuery(function($) {
    $.i18n().load({
        'en': '/login/view/i18n/en.json',
        'es': '/login/view/i18n/es.json'
    }).done(function() {
        set_locale_to(url('?locale'));
    });
});
