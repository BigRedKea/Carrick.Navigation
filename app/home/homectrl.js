

angular.module("CarrickApp")
       .controller("homeCtrl", ['$scope', function ($scope) {
           $scope.pageTitle = 'Home';
           $scope.message = 'This is the message from controller to view on page';
       }]);
