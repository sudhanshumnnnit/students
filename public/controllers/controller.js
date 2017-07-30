/**
*  Module
*
* Description
*/
angular.module('myApp', [])
.controller('myCtrl', ['$scope','$http', function($scope,$http){
	var refresh=function(){
		$http.get('/contactList').then(function(response){
		console.log(response);
		$scope.contactList=response.data;
	});
	};


	

	$scope.addContact=function(contact){
		console.log('$scope.contact',$scope.contact);
		$http.post('/contactList',$scope.contact).then(function(response){
		console.log(response.data);
		$scope.contact={};
		refresh();
		// $scope.contactList=response.data;
	});
	}

	$scope.remove=function(id){
		console.log('id',id);
		$http.delete('/contactList/'+id).then(function(response){
			console.log('response.data',response);
			refresh();
		});
	};

	$scope.edit=function(id){
		console.log('id',id);
		$http.get('/contactList/'+id).then(function(response){
			$scope.contact=response.data;
			console.log('response.data',$scope.contact);
			//refresh();
		});
	};

	$scope.update=function(){
		console.log('id',$scope.contact_id);
		$http.put('/contactList/'+$scope.contact._id,$scope.contact).then(function(response){
			$scope.contact={};
			//console.log('response.data',$scope.contact);
			refresh();
		});
	};
	
	
	refresh();
}]);