
var app = angular.module("CarrickApp");
app.controller("badgeContactCtrl", ['$scope', '$state', '$stateParams', '$modal', '$log', 'Badge', function ($scope, $state, $stateParams, $modal, $log, Badge) {

    var badgeId = $stateParams.Id;

    $scope.badgeContacts = function (Id) {
        return Badge.badgeContacts(Id)
        .then(function (data) {
            $scope.contacts = Badge.conntacts;
        });
    };

    $scope.badgeContacts(Id);
}]);