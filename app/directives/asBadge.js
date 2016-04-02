
var app = angular.module('CarrickApp');

app.directive("asBadge", function () {
    return {
        restrict: 'E',
        replace: 'true',
        templateUrl: 'app/badge/badgeListRow.html'
    }
});