var app = angular.module('customers', []);

//var CustomerSearchController = function($scope) { $scope.search = function(searchTerm) {
//    $scope.searchedFor = searchTerm;
//  }
//}


//app.controller("CustomerSearchController",
//[ "$scope", CustomerSearchController ] );

app.controller("CustomerSearchController", [ '$scope', '$http',
function($scope, $http) {
  var page = 0;
  $scope.search = function(searchTerm) {
    if (searchTerm.length < 1) {
      return;
    }
    $http.get("/customers.json",
      { "params": { "keywords": searchTerm, "page": page } }
    ).success(
      function(data,status,headers,config) {
        $scope.customers = data;
    }).error(
      function(data,status,headers,config) {
        alert("There was a problem: " + status);
      });
  }

  $scope.previousPage = function() {
    if (page > 0) {
      page = page - 1;
      $scope.search($scope.keywords);
    } 
  }

  $scope.nextPage = function() {
    page = page + 1;
    $scope.search($scope.keywords);
  }
} ]);



