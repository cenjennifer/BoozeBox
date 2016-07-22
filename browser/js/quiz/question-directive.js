app.directive('quizQuestion', function(QuizFactory, $state){
	return {
        restrict: 'E',
        templateUrl: 'js/quiz/question-template.html',
        scope: {
            question: '='
        },
        link: function (scope) {

            scope.answerQuestion = function (answer) {

                if (scope.answered) {
                    return;
                }
                scope.answered = true;
                QuizFactory.switchQuestion()
                QuizFactory.score += answer.points
                scope.score = QuizFactory.getScore

                if(QuizFactory.activeQuestion > 3){
                    // QuizFactory.reset()
                    $state.go('results')
                }
            };

        }

    };

})