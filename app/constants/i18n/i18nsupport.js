var i18n = angular.module('app.moya')

//Confuring the locale file identirier.
i18n.config(function ($translateProvider) {
    $translateProvider.useStaticFilesLoader({
        prefix: 'app/resources/locale.',// path to translations files
        suffix: '.json'// suffix, currently- extension of the translations
    });
 	$translateProvider.useMissingTranslationHandlerLog();
    $translateProvider.preferredLanguage('en_US');// is applied on first load
 });
