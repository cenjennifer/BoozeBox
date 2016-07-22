app.config(function($stateProvider){
	$stateProvider.state('quiz', {
        url: '/quiz',
        controller: 'QuizCtrl',
        templateUrl: 'js/quiz/quiz-template.html',
    });
})

app.config(function($stateProvider){
	$stateProvider.state('results', {
        url: '/quiz-results',
        controller: 'QuizResultCtrl',
        templateUrl: 'js/quiz/quiz-result-template.html'
    });
})