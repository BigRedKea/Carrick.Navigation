
var app = angular.module('CarrickApp');

app.directive("asCustomer", function () {
    return {
        restrict: 'E',
        replace: 'true',
        templateUrl: 'app/customer/userListRow.html'
    }
});