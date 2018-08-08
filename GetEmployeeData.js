
var app = angular.module("Demo", ["ngRoute"]);

    //AngularJs Routing
    app.config(
        function ($routeProvider) {
            $routeProvider.when('/', ({ templateUrl: '/EmployeeDetails.html', controller: 'MainController' })).
            when('/Personal', ({ templateUrl: '/EmployeeDetails.html', controller: 'MainController' })).
            when('/Qualification', ({ templateUrl: '/Qualification.html', controller: 'MainController' })).
            when('/Communication', ({ templateUrl: '/Communication.html', controller: 'MainController' }))
    });

    //Factory Implemetation
    app.factory("myFactory", function () {
        var savedData = {}
        function set(data) {
            savedData = data;
        }

        function get() {
            return savedData;
        }

        return {
            set: set,
            get: get
        }
    });

    //Tabs Controller to Perform its action
app.controller("MainController", function ($scope, $http, myFactory) {
    $scope.user = myFactory.get();

    if ($scope.user.id != undefined) {
        $http.get('http://localhost:55765/api/GetQualificationByEmpId/' + $scope.user.id)
            .then(function (response) { $scope.qualifications = response.data; console.log($scope.qualifications) })
            .catch(function () { alert("There was a server side error") });
    }      

        $scope.tab = 1
        $scope.isSelected = function (tab) {
            return $scope.tab == tab;
        }
        $scope.seltab = function (tab) {
            $scope.tab = tab;
        }
    });

    //Controller to Get, Add Update and Delete from API
    app.controller("DemoController", function ($scope, $http, $window, myFactory) {    
        //Tab Selection Process
        $scope.tab = 1
        $scope.isSelected = function (tab) {
            return $scope.tab == tab;
        }
        $scope.seltab = function (tab) {
            $scope.tab = tab;
        }

        $http.get('http://localhost:55765/api/getEmployee')
            .then(function (response) { $scope.users = response.data; })
            .catch(function () { alert("There was a server side error") });

        //Get a record from API by id
        $scope.getuserdata = function (id) {
            return $http.get('http://localhost:55765/api/EmployeesgetbyId/' + id)
                    .then(function (response) { $scope.getuserdatas = response.data;
                        var element = angular.element('#exampleModal');
                        element.modal('show'); })
                    .catch(function () { alert("There was a server side error") });
        }   

        

        //Setting Data in factory
        $scope.details = function (d) {
            myFactory.set(d);
            console.log(myFactory.set(d));
        }

        //Add or Edit a record from API
        $scope.updateUser = function (getuserdatas) {
            var data = {
                id: getuserdatas.id == undefined ? 0000 : getuserdatas.id,
                name: getuserdatas.name,
                department: getuserdatas.department,
                salary: getuserdatas.salary
            };
            if (getuserdatas.name != undefined && getuserdatas.department != undefined && getuserdatas.salary != undefined) {            
                return $http.post('http://localhost:55765/api/employee/updateEmployee', JSON.stringify(data))
                    .then(function (response) { $scope.successmessage = "Successfully Saved"; })
                    .catch(function () { alert("There was a server side error") });
            }
        }

        //Delete a record from API
        $scope.deleteuser = function (id) {
            return $http.delete('http://localhost:55765/api/employee/deleteEmployee?id=' + id)
                .then(function (response) { location.reload(); })
                .catch(function () { alert("There was a server side error")});
        }            
});

    //Directive to display the data in grid
    app.directive("gridView", function () {
        return {
            restrict: 'ACE',
            templateUrl: "/Home/EmployeeTable"
        }
    });

    //Directive to get the popup
    app.directive("popupView", function () {
        return {
            restrict: 'ACE',
            templateUrl: "/Home/PopupView"
        }
    });

    //Directive to get confirm the delete
    app.directive('ngConfirmClick', [
        function () {
            return {
                link: function (scope, element, attr) {
                    var msg = attr.ngConfirmClick || "Are you sure?";
                    var clickAction = attr.confirmedClick;
                    element.bind('click', function (event) {
                        if (window.confirm(msg)) {
                            scope.$eval(clickAction)
                        }
                    });
                }
     };
        }])

function myFunction() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}