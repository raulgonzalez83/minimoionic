angular.module('starter.controllers', [])

.constant('ApiEndpoint', {
    url: 'http://localhost:8080/api'
})
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

//   // Form data for the login modal
//   $scope.loginData = {};

//   // Create the login modal that we will use later
//   $ionicModal.fromTemplateUrl('templates/login.html', {
//     scope: $scope
//   }).then(function(modal) {
//     $scope.modal = modal;
//   });

//   // Triggered in the login modal to close it
//   $scope.closeLogin = function() {
//     $scope.modal.hide();
//   };

//   // Open the login modal
//   $scope.login = function() {
//     $scope.modal.show();
//   };

//   // Perform the login action when the user submits the login form
//   $scope.doLogin = function() {
//     console.log('Doing login', $scope.loginData);

//     // Simulate a login delay. Remove this and replace with your login
//     // code if using a login system
//     $timeout(function() {
//       $scope.closeLogin();
//     }, 1000);
//   };
})


.controller('HomeController', function($scope, $http, ApiEndpoint, $ionicPopup) {

 
  $scope.newStudent = {};
  $scope.selected = false;

  // Función para registrar estudiante
  $scope.registrarEstudiante = function() {
    $http.post(ApiEndpoint.url + '/student', $scope.newStudent)
      .success(function(data) {
        $scope.newStudent = {}; 
        console.log('Registrado correctamente');
        $scope.students = data;
    
      })
      .error(function(data) {
        console.log('Error: ' + data);
     
      });
  };

})


.controller('subjectsCtrl', function($scope, $http, ApiEndpoint) {
  $scope.message = "Asignaturas";
  $scope.newSubject = {};
  $scope.subjects = {};

  $http.get(ApiEndpoint.url + '/subject').success(function(data) {
    $scope.subjects = data;
    console.log('Get Data: ' + data);
  })
    .error(function(data) {
      console.log('Error: ' + data);
    });


  $scope.addSubject = function() {
    $http.post(ApiEndpoint.url + '/subject', $scope.newSubject) // Enviamos la nueva asignatura (el nombre)
      .success(function(data) {
        $scope.newSubject = {}; // Borramos los datos del formulario
        $scope.subjects = data;
        console.log("Creado correctamente")
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

  // Función para eliminar asignatura
  $scope.deleteSubject = function(id) {
    $http.delete(ApiEndpoint.url + '/subject/' + id)
      .success(function(data) {
        $scope.newSubject = {};
        $scope.subjects = data;
        $scope.selected = false;
        console.log('Asignatura eliminada correctamente');
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

})

.controller('subjectsDetailCtrl', function($scope, $http, ApiEndpoint, $state, $ionicPopup) {
$scope.message = "Estudiantes matriculados";
  $scope.updatedSubject = {};
  $scope.studentsList = {};
  $scope.subject = {};
  $scope.subjectID = ($state.params.subjectId); //Obtenemos ID de la URI de subjectId
  console.log($scope.subjectID);
  var liststudents = [];

  //Obtenemos detalle estudiante
  $http.get(ApiEndpoint.url + '/subject/' + $scope.subjectID)
    .success(function(data) {
      $scope.subject = data;
      console.log($scope.subject);

      // Función para mostrar el nombre de usuario en vez de su ID
      angular.forEach($scope.subject.students, function(student, key) {
        //console.log("Alumnos inscritos en", $scope.subject.name, ":", student);
          $http.get(ApiEndpoint.url + '/student/' + student)
            .success(function(data) {
              $scope.student = data;
              liststudents.push($scope.student); //Añade nombre estudiante dentro de lista
              $scope.studentsList = liststudents;
              console.log("Nombre de alumnos en", $scope.subject.name, ":", $scope.studentsList);
            })
            .error(function(data) {
              console.log('Error: ' + data);
            });
      });
      // FIN función para mostrar el nombre de usuario en vez de su ID
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  // Función para añadir alumno a asignatura
  $scope.addStudent = function() {
    console.log($scope.subjectID);
    console.log($scope.newStudent);
    $http.post(ApiEndpoint.url + '/subject/' + $scope.subjectID, $scope.updatedSubject)
      .success(function(data) {
        $scope.subject = data;
        $state.reload();
        //location.reload();
        console.log('Añadido correctamente a la asignatura');
        //PopUp
        if ($scope.subject == null){
          
        }
        else
        {
         
        }
      })
      .error(function(data) {
        console.log('Error: ' + data);
       
      });
  };

})


.controller('studentsCtrl', function($scope, $http, ApiEndpoint) {
  $scope.message = "Página estudiantes";
  $scope.students = {};

  // Obtenemos todos los estudiantes
  $http.get(ApiEndpoint.url + '/student').success(function(data) {
    $scope.students = data;
    console.log('Get Data: ' + data);
  })
  .error(function(data) {
    console.log('Error: ' + data);
  });

})

.controller('studentsDetailCtrl', function($scope, $http, ApiEndpoint, $state) {

  $scope.message = "Detalle estudiante";
  $scope.studentID = ($state.params.studentId); //Obtenemos ID de la URI
  console.log($scope.studentID);

  //Obtenemos detalle estudiante
  $http.get(ApiEndpoint.url + '/student/' + $scope.studentID)
    .success(function(data) {
      $scope.student = data;
      console.log($scope.student);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  // Función para eliminar estudiante
  $scope.remove = function(id) {
    $http.delete(ApiEndpoint.url + '/student/' + id)
      .success(function(data) {
        //$scope.newStudent = {};
        //$scope.students = data;
        //$scope.selected = false;
        console.log("Estudiante", id, "eliminado correctamente.", data);
        $state.go('app.students');
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };



});
