var app = angular.module("CarrickApp")
app.controller('badgeCtrl', ['$scope', '$state', '$stateParams', '$modal', '$log', 'Badge'
    , function ($scope, $state, $stateParams, $modal, $log, Badge) {

    var badgeId = $stateParams.Id;

    $scope.searchText = '';
    $scope.badges = searchBadges();
    $scope.contacts = [];
    $scope.badge = null;
    $scope.currentBadge = null;


    $scope.$watch('searchText', function (newVal, oldVal) {
        if (newVal != oldVal) {
            searchBadges();
        }
    }, true);


    function searchBadges() {
        Badge.search($scope.searchText)
        .then(function (data) {
            $scope.badges = Badge.badges;
        });
    }

    $scope.badgeDetail = function (Id) {
        if (!Id) return;
        Badge.badgeDetail(Id)
        .then(function (data) {
            $scope.currentBadge = Badge.currentBadge;
            $state.go('badge.detail', { 'Id': Id });
        });
    };

    /* Need to call after defining the function
       It will be called on page refresh        */
    $scope.currentBadge = $scope.badgeDetail(badgeId);

    // Delete a badge and hide the row
    $scope.deleteBadge = function ($event, Id) {
        var ans = confirm('Are you sure to delete it?');
        if (ans) {
            Badge.delete(Id)
            .then(function () {
                var element = $event.currentTarget;
                $(element).closest('div[class^="col-lg-12"]').hide();
            })
        }
    };

    // Add Badge
    $scope.addBadge = function () {
        Badge.newBadge()
        .then(function (data) {
            $scope.badge = Badge.badge;
            $scope.open('sm');
        });
    };

    // Edit Badge
    $scope.editBadge = function () {
        $scope.badge = $scope.currentBadge;
        $scope.open('lg');
    };

    // Open model to add edit badge
    $scope.open = function (size) {        
        var modalInstance = $modal.open({
            animation: false
            , backdrop: 'static'
            , templateUrl: 'app/badge/AddEditBadge.html'
            , controller: 'badgeModalCtrl'
            , size: size
            , resolve: {
                badge: function () {
                    return $scope.badge;
                }
            }
        });
        modalInstance.result.then(function (response) {
            $scope.currentBadge = response;
            $state.go('badge.detail', { 'Id': response.Id });            
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };


    
}]);

app.controller('badgeModalCtrl', ['$scope', '$modalInstance', 'Badge', 'badge'
    , function ($scope, $modalInstance, Badge, badge) {

    $scope.badge = badge;
    
    if (badge.Id > 0)
        $scope.headerTitle = 'Edit Badge';
    else
        $scope.headerTitle = 'Add Badge';
    
    $scope.save = function () {
        Badge.Save($scope.badge).then(function (response) {
            $modalInstance.close(response.data);
        })
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

}]);
