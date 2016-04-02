var app = angular.module('CarrickApp', [
    'ui.router'
    , 'ui.bootstrap'
    , 'ngAnimate'
    , 'LocalStorageModule'
    , 'ui.calendar'
    //'angularFileUpload'
]);

app.config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {

    // default route
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/'
            , templateUrl: 'app/home/home.html'
            , controller: 'homeCtrl'
        })

        .state('login', {
            url: '/login'
            ,controller: "loginController"
            ,templateUrl: "app/authentication/login.html"
        })

        .state('signup', {
            url: '/signup'
            ,controller: "signupController"
            ,templateUrl: "app/authentication/signup.html"
        })
        
        .state('about', {
            url: '/about'
            , templateUrl: 'app/about/about.html'
            , controller: 'aboutCtrl'
        })
        .state('contact', {
            url: '/contact'
            , templateUrl: 'app/contact/contact.html'
            , controller: 'contactCtrl'
        })

        .state('scoutingevents', {
            url: '/scoutingevents'
            , templateUrl: "app/scoutingevent/views/scoutingevents.html"
            , controller: "scoutingEventController"
        })
        
        .state('badge', {
            url: '/badge'
            , templateUrl: 'app/badge/badge.html'
            , controller: 'badgeCtrl'
        })
        
        .state('badge.detail', {
            url: '^/badge/detail/{Id:[0-9]{1,5}}'
            , templateUrl: 'app/badge/badgedetail.html'
            , controller: 'badgeCtrl'
        })
        .state('badge.detail.contact', {
            url: '^/badge/detail/contact/{badgeId:[0-9]{1,5}}'
            , templateUrl: 'app/badge/contact.html'
            , controller: 'badgeContactCtrl'
        })
}]);


var serviceBase = 'https://localhost:44300/';

app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: 'ngAuthApp',
    CarrickAPI: 'https://localhost:44300/'
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});

app.run(['authService', function (authService) {
    authService.fillAuthData();
}]);

app.directive('loading', ['$http', function ($http) {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs) {
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };
            scope.$watch(scope.isLoading, function (v) {
                if (!v) {
                    elm.hide();
                } else {
                    elm.show();
                }
            });
        }
    };

}]);

app.directive('fileUpload', function () {
    return {
        scope: true,        //create a new scope
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                var files = event.target.files;
                //iterate files since 'multiple' may be specified on the element
                for (var i = 0; i < files.length; i++) {
                    //emit event upward
                    scope.$emit("fileSelected", {file: files[i]});
                }
            });
        }
    };
});

