app.controller('QuizCtrl', function($scope, QuizFactory){

	$scope.score = 0;
	$scope.quiz = QuizFactory.quiz
  $scope.activeQuestion = QuizFactory.getActiveQuestion
  $scope.quizStart = false;
  $scope.switchQuestion = QuizFactory.switchQuestion

})

app.controller('QuizResultCtrl', function($scope, QuizFactory){
  $scope.score = QuizFactory.getScore()
  $scope.lifestyle = function(score){
    if(score < 14){
      return 'Bold'
    } else if(score < 20 && score >= 14){
      return 'Classic'
    } else if(score < 26 && score >= 20){
      return 'Fresh'
    } else {
      return 'Sweet'
    }
  }


  QuizFactory.getLifestyleBoxes()
  .then(function(result){
    var randomBox = Math.floor(Math.random() * 5)
    $scope.box = result[randomBox];
  })

})