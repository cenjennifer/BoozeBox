app.directive('reviews', function(ReviewFactory, Session){
	return {
		restrict: 'E',
		templateUrl: 'js/reviews/reviews-template.html',
		scope: {
			box: '='
		},
		link: function(scope, elem, attr){

			scope.ratings = [1,2,3,4,5]

			scope.user = Session.user

			scope.getReviews = function(id){
				return ReviewFactory.getReviews(scope.box.id)
			}

			scope.addReview = function(review){
				return ReviewFactory.addReview(review, scope.box.id, Session.user.id)
			}
			scope.removeReview = function(review){
				return ReviewFactory.removeReview(review, scope.box.id, Session.user.id)
			}
		}
	}
})