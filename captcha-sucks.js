/**
* Captcha-Sucks
*
* @module CAPTCHA_SUCKS
*/
var CAPTCHA_SUCKS = CAPTCHA_SUCKS || (function(){

	//	private properties
	var quizes = [
			{	question: 'Which should be burned?',
				answers: ['dog', 'wood', 'knife', 'pretzel'],
				correct: 'wood'},
			{	question: 'What is a taco?',
				answers: ['four', 'pasta', 'universe', 'food'],
				correct: 'food'},
			{	question: 'People live in which?',
				answers: ['holes', 'boats', 'houses', 'coconut', 'lemon', 'catapult'],
				correct: 'houses'}],
		response = 'Try again, Sally.';
	
	//	private methods
	function pickQuiz(){
		if(quizes.length === 0){
			throw {
				name: 'Error',
				message: 'no quizes are available'
			};
		};
		
		var quiz = quizes[Math.floor(Math.random() * quizes.length)];
		quiz.answers = mixElements(quiz.answers);
		
		return quiz;
	};
	
	function mixElements(array){
		return Array.prototype.sort.call(array, function (a, b){
			return (Math.random() < .5) ? -1 : 1;
		});
	};

	function showQuiz(holder){
		//	clear old quiz
		holder.innerHTML = '';
		
		//	add new quiz
		var q = pickQuiz();
		
		//	build quiz elements
		var answerGroup = 'CAPTCHA-SUCKS_' + Math.random();
		
		//	question
		var question = document.createElement('label');
		question.innerHTML = q.question;
		holder.appendChild(question);
		
		//	answers
		for(var i = 0; i < q.answers.length; i += 1){
			holder.appendChild(createAnswerNode(q.answers[i], answerGroup));
		};
		
	};
	
	function createAnswerNode(answer, group){
		var answerNode = document.createElement('div'),
			input = document.createElement('input'),
			label = document.createElement('label'),
			id = answer + Math.random();
		
		//	configure input
		input.setAttribute('type', 'radio');
		input.setAttribute('name', group);
		input.setAttribute('value', answer);
		input.setAttribute('id', id);
		input.style.display = 'inline';
		
		//	configure label
		label.innerHTML = answer;
		label.setAttribute('for', id);
		label.style.display = 'inline';
		
		//	append input and label to answerNode
		answerNode.appendChild(input);
		answerNode.appendChild(label);
		
		return answerNode;
	};
	
	return {
		//	getters/setters
		getQuizes: function(){
			return quizes;
		},
		setQuizes: function(new_quizes){
			//	TODO:	verify new_quizes have all reqired data
			//	TODO:	verify they have a matching correct answer
			quizes = new_quizes;
		},
		
		//	big fat API
		form: function(form_selector){
			
			//	identify form
			var form = document.getElementById(form_selector);
			
			//	add holder for our elements
			var holder = document.createElement('div');
			holder.setAttribute('class', 'captcha-sucks');
			
			//	TODO:	this may not work on older browsers		
			form.insertBefore(holder, form.lastElementChild);
			
			showQuiz(holder);
			
			//	TODO:	watch for submission and check answer
		}	
	};

	
})();

var form;
$(function(){
	CAPTCHA_SUCKS.form('my_form');
	
	form = document.getElementById('my_form');
	
	$('form').submit(function(){
		console.log($(this).serialize());
		return false;
	});
});