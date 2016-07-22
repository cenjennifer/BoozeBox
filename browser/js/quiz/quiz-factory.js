app.factory('QuizFactory', function($http){
	let QuizFactory = {}

	QuizFactory.activeQuestion = -1;

	QuizFactory.getActiveQuestion = function(){
		return QuizFactory.activeQuestion
	}

	QuizFactory.switchQuestion = function(){
		return QuizFactory.activeQuestion++
	}

	QuizFactory.getScore = function(){
		return QuizFactory.score;
	}

	// QuizFactory.reset = function(){
	// 	QuizFactory.activeQuestion = -1;
	// 	QuizFactory.score = 0;
	// }

	let output = response => response.data

	QuizFactory.getLifestyleBoxes = function(){
		let score = QuizFactory.getScore()
		if(score < 14){
			return $http.get('/api/boxes/lifestyle/1')
			.then(output)
		} else if(score < 20 && score >= 14){
			return $http.get('/api/boxes/lifestyle/2')
			.then(output)
		} else if(score < 26 && score >= 20){
			return $http.get('/api/boxes/lifestyle/3')
			.then(output)
		} else {
			return $http.get('/api/boxes/lifestyle/4')
			.then(output)
		}
	}

	QuizFactory.score = 0;

	QuizFactory.quiz = {

		questions: [{
			title: 'Why are you drinking?',
			answers: [
			{
				text: `It's 10AM, why not?!`,
				points: 2,
				image: 'http://blog.doctoroz.com/wp-content/uploads/2014/12/480289557-638x406.jpg'
			},
			{
				text: `I've been working too hard.`,
				points: 4,
				image: 'http://demo-savingfamilymoney.mommy-blog-designs.com/wp-content/uploads/2014/07/tiredblogger.jpg'
			},
			{
				text: `It's time to unwind.`,
				points: 6,
				image: 'http://www.beaches.com/assets/img/vacation/couples-drinks.jpg'
			},
			{
				text: `Because I want to turn up!`,
				points: 8,
				image: 'http://www.vegas24seven.com/wp-content/uploads/2013/10/LAVO-Brunch_Atmosphere.jpg'
			},

			]
		}, {
			title: 'Where are you hanging out?',
			answers: [
			{
				text: `At the newest trendy restaurant.`,
				points: 2,
				image: 'http://interiorzine.com/wp-content/uploads/2015/04/bar-post-modernistic-creation-caa.jpg'
			},
			{
				text: `In an old-school lounge.`,
				points: 4,
				image: 'http://cdn.justluxe.com/articles/images/news/hemingways_1229628.jpg'
			},
			{
				text: `On a beach somewhere...`,
				points: 6,
				image: 'http://www.planetware.com/photos-large/CAY/caribbean-best-beaches-seven-mile-beach.jpg'
			},
			{
				text: `At the hottest club.`,
				points: 8,
				image: 'http://img1.10bestmedia.com/Images/Photos/284863/Create-Nightclub-3_54_990x660.jpg'
			},

			]
		}, {
			title: 'What are you eating?',
			answers: [
			{
				text: `Asian fusion tacos.`,
				points: 2,
				image: 'https://delishbusiness.files.wordpress.com/2013/09/asian-tacos.jpg'
			},
			{
				text: `A kobe beef steak.`,
				points: 4,
				image: 'http://grandwesternsteaks.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/f/m/fm_1.jpg'
			},
			{
				text: `I'm on a cleanse.`,
				points: 6,
				image: 'http://www.youthfriends.org/wp-content/uploads/2014/06/juices-1024x682.jpg'
			},
			{
				text: `Macarons!`,
				points: 8,
				image: 'https://media.timeout.com/images/103034715/617/347/image.jpg'
			},

			]
		}, {
			title: 'Pick an alcohol accessory!',
			answers: [
			{
				text: `Caramelized bacon.`,
				points: 2,
				image: 'http://farm4.staticflickr.com/3211/3119604232_1be4318f5a.jpg'
			},
			{
				text: `Whiskey stones.`,
				points: 4,
				image: 'http://www.gentsupplyco.com/images/photos/2015__700_WhiskeyStones2a-700.jpg'
			},
			{
				text: `A sprig of mint.`,
				points: 6,
				image: 'https://media2.popsugar-assets.com/files/2014/05/15/988/n/1922195/e041c6ee241db25f_Cucumber-Mint-Gin-Cocktail.xxxlarge_2x.jpg'
			},
			{
				text: `A cocktail umbrella!`,
				points: 8,
				image: 'http://il2.picdn.net/shutterstock/videos/1174816/thumb/1.jpg'
			}

			]
		},{
			title: 'stop'
		}]
	}

	return QuizFactory
})