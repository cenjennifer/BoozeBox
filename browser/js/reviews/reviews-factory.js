app.factory('ReviewFactory', function($http, Session){
	let ReviewFactory = {}

	let output = response => response.data;

	ReviewFactory.getReviews = function(id){
		return $http.get(`/api/boxes/${id}/reviews`)
		.then(output)
	}

	ReviewFactory.addReview = function(review, boxId, userId){
		return $http.post(`/api/boxes/${boxId}/reviews/`, {
			rating: review.rating,
			review: review.text,
			userId: userId
		})
		.then(output)
	}

	ReviewFactory.removeReview = function(review, boxId, userId){
		let reviewId = review.id;
		if(review.userId === userId){
			return $http.delete(`/api/boxes/${boxId}/reviews/${reviewId}`)
			.then(output)
		}
	}


	return ReviewFactory;
})