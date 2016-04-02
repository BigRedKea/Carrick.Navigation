angular.module('CarrickApp')
       .factory('Badge', ['$q', '$http', function ($q, $http) {

           var baseUrl = 'https://localhost:44300/api/badge/';
           var contactBaseUrl = 'https://localhost:44300/api/Contact/';

           var badgeService = {};
           badgeService.badges = [];
           badgeService.currentBadge = {};

           // Search Badges
           badgeService.search = function (text) {
               var deferred = $q.defer();
               return $http({
                   url: baseUrl + 'search',
                   method: 'GET',
                   params: { 'searchText': text },
                   cache: true
               }).success(function (data) {
                   deferred.resolve(
                       badgeService.badges = data);
               }).error(function (error) {
                   deferred.reject(error);
               })
               return deferred.promise;
           }

           // New Badges
           badgeService.newBadge = function () {
               var deferred = $q.defer();
               return $http.get(baseUrl + "new")
                    .success(function (data) {
                        deferred.resolve(badgeService.badge = data);
                    })
               .error(function (error) {
                   deferred.reject(error);
               })
               return deferred.promise;
           }

           // Save Badge
           badgeService.Save = function (badge, files) {
               var deferred = $q.defer();
               return $http.post(baseUrl + "Save", badge)
                .success(function (data) {
                    deferred.resolve(badgeService.badge = data);
                })

               .error(function (error) {
                   deferred.reject(error);
               });
               return deferred.promise;
           }

           // Badges detail by badge id
           badgeService.badgeDetail = function (id) {
               var deferred = $q.defer();
               return $http.get(baseUrl + "detail/" + id)
                    .success(function (data) {
                        deferred.resolve(
                            badgeService.currentBadge = data);
                    })
               .error(function (error) {
                   deferred.reject(error);
               })
               return deferred.promise;
           }

           // delete Badges
           badgeService.delete = function (id) {
               var deferred = $q.defer();
               return $http.post(baseUrl + "delete/" + id)
                    .success(function (data) {
                        deferred.resolve();
                    })
               .error(function (error) {
                   deferred.reject(error);
               })
               return deferred.promise;
           }
                      
           /*       CUSTOMER CONTACTS
            ***********************************
           badgeService.badgeContacts = function (id) {
               var deferred = $q.defer();
               return $http.get(contactBaseUrl + "ByBadgeId/" + id)
                    .success(function (data) {
                        deferred.resolve(badgeService.conntacts = data);
                    }).error(function (error) {
                        deferred.reject(error);
                    })
               return deferred.promise;
           }*/

           return badgeService;
       }]);