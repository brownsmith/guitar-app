// GuitarApp - Paul Brownsmith 2013

// GuitarApp namespace
GuitarApp = {};

// GuitarApp.objects namespace
GuitarApp.objects = {};

/**
 * Base object that controls which objects are called on which pages
 */
GuitarApp.base = new (function(){
	
	// global variable: body element
	docBody = document.body;
	
	// global variable: body id
	pageId = docBody.id;
	
	// global variable: theme id
	themeId = localStorage.theme;
	
	// global variable for scale speed
	speedVal = localStorage.speed;
	
	/**
	 * run on page load.
	 */
	this.init = function (){
	
		// if first time visitor and no theme selected, used gibson as default and set speed to medium.
		if (themeId == undefined) {
			// run a splash screen?
			localStorage.theme = 'gibson';
			docBody.className = 'gibson';
			localStorage.speed = 'medium';
			window.location.reload(true);
		}
		
		// show body elem id and theme id for development purposes
		console.log('page: ' + pageId);
		console.log('theme: ' + themeId);
		console.log('speed: ' + speedVal);
		
		// Switch statement to determine what objects/functions to run.
		switch (pageId){				
			case 'beginner':
				// run ChordLibrary object
				GuitarApp.objects.chordLibrary = new GuitarApp.chordLibrary(pageId);
				// run selectChord select box
				GuitarApp.objects.selectChord = new GuitarApp.selectChord();
				break;
			case 'intermediate':
				// run ChordLibrary object
				GuitarApp.objects.chordLibrary = new GuitarApp.chordLibrary(pageId);
				// run selectChord select box
				GuitarApp.objects.selectChord = new GuitarApp.selectChord();
				break;
			case 'beginner-scale':
				// run playButton object - controls the scaleLibrary
				GuitarApp.objects.playButton = new GuitarApp.playButton();
				break;
			case 'intermediate-scale':
				// run playButton object - controls the scaleLibrary
				GuitarApp.objects.playButton = new GuitarApp.playButton();
				break;
			case 'settings':
				// run themeSwitcher
				GuitarApp.objects.themeSwitcher = new GuitarApp.themeSwitcher();
				GuitarApp.objects.speedButton = new GuitarApp.speedButton();
				GuitarApp.objects.fullScreen = new GuitarApp.fullScreen();
				break;
		}
		
	}
	
	/** setBodyClass function - called here and from the themeSwitcher object
	 *	value = localStorage.theme
	 */
	this.setBodyClass = function(bodyClass) {
		
		switch (bodyClass) {
			case 'develop':
				docBody.className = 'develop';
				break;
			case 'gibson':
				docBody.className = 'gibson';
				break;
			case 'rick325':
				docBody.className = 'rick325';
				break;
			case 'supernova':
				docBody.className = 'supernova';
				break;
		}
		
	}
	
	// set body class based upon theme id
	this.setBodyClass(themeId);
	
});

/** playButton
 *	used on the scale pages, executes scaleLibrary object
 */
GuitarApp.playButton = function() {

	playButton = document.getElementById('playPause');

	// listen for click event
	playButton.addEventListener('click', function() {
	
		// calls scaleLibrary object
		GuitarApp.objects.scaleLibrary = GuitarApp.scaleLibrary(pageId);
		
		// changes the button status to playing
		this.innerHTML = '<i class=\"icon-music icon-white\"></i>Playing ' + speedVal + '...';
		
	}, false);
	
}

GuitarApp.chordLibrary = function(pageId){
	
	if (pageId == 'beginner') {
		
		// array of chord shapes for beginner library
		chordBank = [
			[['','','','1','2',''],['','','3','','',''],['','4','','','',''],['','','','','',''],['','','','','','']], // [0] C aug
			[['','','','','1',''],['','','2','','',''],['','3','','','',''],['','','','','',''],['','','','','','']], // [1] C major
			[['','','','','',''],['','','','','','1'],['','','','2','3',''],['','','','','',''],['','','','','','']], // [2] D aug
			[['','','','','',''],['','','','1','','2'],['','','','','3',''],['','','','','',''],['','','','','','']], // [3] D major
			[['','','','1','',''],['','2','','','',''],['','','','','',''],['','','','','',''],['','','','','','']], // [4] E7
			[['','','','1','',''],['','2','3','','',''],['','','','','',''],['','','','','',''],['','','','','','']], // [5] E major
			[['1','1','1','1','1','1'],['','','','','',''],['','3','','','',''],['','','','','',''],['','','','','','']], // [6] F m7
			[['1','1','1','1','1','1'],['','','','2','',''],['','4','3','','',''],['','','','','',''],['','','','','','']], // [7] F major
			[['','','','','',''],['','1','','','',''],['2','','','','','3'],['','','','','',''],['','','','','','']], // [8] G major
			[['','','','','','1'],['','2','','','',''],['3','','','','',''],['','','','','',''],['','','','','','']], // [9] G7
			[['','','','','1',''],['','','2','3','',''],['','','','','',''],['','','','','',''],['','','','','','']], // [10] A minor
			[['','','','','',''],['','','2','','3',''],['','','','','',''],['','','','','',''],['','','','','','']], // [11] A7
			[['','','','','',''],['','1','1','1','1','1'],['','','','','2',''],['','','3','4','',''],['','','','','','']], // [12] B minor
			[['','','','','',''],['','1','1','1','1','1'],['','','','','',''],['','','3','4','',''],['','','','','','']] // [13] B sus2
		]
	}
	else if (pageId == 'intermediate') {
	
		// array of chord shapes for intermediate library
		chordBank = [
			[['','','','','1',''],['','','','','',''],['','3','','','','4'],['','','','','',''],['','','','','','']], // [0] C sus2
			[['','','','','',''],['','','1','','',''],['','2','','3','3',''],['','','','','',''],['','','','','','4']], // [1] C 13 
			[['','','','','',''],['','','1','1','1','1'],['','','','','',''],['','','','','',''],['','4','','','','']], // [2] D maj9
 			[['','','','','',''],['','','','1','1','1'],['','','','','2',''],['','','','','',''],['','3','4','','','']], // [3] D add4
			[['','','','','',''],['','','1','1','1','1'],['','','','','',''],['','','','3','',''],['','','','','4','']], // [4] E 5add9
			[['','','','','',''],['','','1','2','','3'],['','','','','',''],['','','','','',''],['','','','','','']], // [5] E sus2sus4
			[['','','','1','1','1'],['','','','','2',''],['','','3','','',''],['','','','','',''],['','','','','','']], // [6] F m#5
 			[['1','1','1','1','1',''],['','','','2','',''],['','','3','','','4'],['','','','','',''],['','','','','','']], // [7] F add2add4
			[['','1','','','',''],['','','','','',''],['2','','3','','4',''],['','','','','',''],['','','','','','']], // [8] G maj6/7
			[['','1','','','','2'],['','','','','',''],['4','','','','',''],['','','','','',''],['','','','','','']], // [9] G 7#9
			[['','','','','',''],['','','1','1','1',''],['','','','','','2'],['','','','3','',''],['','','','','','']], // [10] A 9
			[['','','','','1',''],['','','2','','',''],['','','','','',''],['','','','4','',''],['','','','','','']], // [11] A madd9
			[['','','','','',''],['','1','','','',''],['','','','','',''],['','','3','4','',''],['','','','','','']], // [12] B 5
			[['','','','','',''],['','1','1','1','1',''],['','','','2','',''],['','','3','','','4'],['','','','','','']], // [13] B maj13
		]
		
	}

}

GuitarApp.scaleLibrary = function(pageId) {

	// fetch the speed setting from local storage and create variable for interval speed
	if (speedVal == 'slow') {
		var scaleSpeed = 1000;
	}
	if (speedVal == 'medium') {
		var scaleSpeed = 750;
	}
	if (speedVal == 'fast') {
		var scaleSpeed = 300;
	}
	
	if (pageId == 'beginner-scale') {

		scale = [
			[['1','','','','',''],['','','','','',''],['','','','','',''],['','','','','',''],['','','','','','']],
			[['','','','','',''],['','','','','',''],['','','','','',''],['4','','','','',''],['','','','','','']],
			[['','1','','','',''],['','','','','',''],['','','','','',''],['','','','','',''],['','','','','','']],
			[['','','','','',''],['','','','','',''],['','3','','','',''],['','','','','',''],['','','','','','']],
			[['','','1','','',''],['','','','','',''],['','','','','',''],['','','','','',''],['','','','','','']],
			[['','','','','',''],['','','','','',''],['','','3','','',''],['','','','','',''],['','','','','','']],
			[['','','','1','',''],['','','','','',''],['','','','','',''],['','','','','',''],['','','','','','']],
			[['','','','','',''],['','','','','',''],['','','','3','',''],['','','','','',''],['','','','','','']],
			[['','','','','1',''],['','','','','',''],['','','','','',''],['','','','','',''],['','','','','','']],
			[['','','','','',''],['','','','','',''],['','','','','',''],['','','','','4',''],['','','','','','']],
			[['','','','','','1'],['','','','','',''],['','','','','',''],['','','','','',''],['','','','','','']],
			[['','','','','',''],['','','','','',''],['','','','','',''],['','','','','','4'],['','','','','','']]
		]
		
	}
	
	if (pageId == 'intermediate-scale') {
		// G Major Scale
		scale = [
			[['','','','','',''],['','','','','',''],['2','','','','',''],['','','','','',''],['','','','','','']],
			[['','','','','',''],['','','','','',''],['','','','','',''],['','','','','',''],['4','','','','','']],
			[['','','','','',''],['','1','','','',''],['','','','','',''],['','','','','',''],['','','','','','']],
			[['','','','','',''],['','','','','',''],['','2','','','',''],['','','','','',''],['','','','','','']],
			[['','','','','',''],['','','','','',''],['','','','','',''],['','','','','',''],['','4','','','','']],
			[['','','','','',''],['','','1','','',''],['','','','','',''],['','','','','',''],['','','','','','']],
			[['','','','','',''],['','','','','',''],['','','','','',''],['','','3','','',''],['','','','','','']],
			[['','','','','',''],['','','','','',''],['','','','','',''],['','','','','',''],['','','4','','','']],
			[['','','','','',''],['','','','1','',''],['','','','','',''],['','','','','',''],['','','','','','']],
			[['','','','','',''],['','','','','',''],['','','','','',''],['','','','3','',''],['','','','','','']],
			[['','','','','',''],['','','','','',''],['','','','','',''],['','','','','',''],['','','','4','','']],
			[['','','','','',''],['','','','','',''],['','','','','2',''],['','','','','',''],['','','','','','']],
			[['','','','','',''],['','','','','',''],['','','','','',''],['','','','','',''],['','','','','4','']],
			[['','','','','',''],['','','','','','1'],['','','','','',''],['','','','','',''],['','','','','','']],
			[['','','','','',''],['','','','','',''],['','','','','','2'],['','','','','',''],['','','','','','']],
			[['','','','','',''],['','','','','',''],['','','','','',''],['','','','','',''],['','','','','','4']]
		]
		
	}
	
	// set count to -1, so it starts at scale[0]
	this.count = -1;
	
	// a bit of this and that for context
	var _this = this;
	
	// loop through the scale array and draw finger positions
	this.interval = setInterval(function(){
	
		// find out how long the scale array is
		var scaleLength = scale.length;
		
		// increment the interval by 1
		_this.count++;

		// if the scale array length is < the count number
		if(_this.count < scale.length) {
			
			// send the scale array to the drawFret function
			GuitarApp.drawFret(scale[_this.count]);

		}
		
		if(_this.count === scaleLength) {
		
			// when finished, clear the interval
			clearInterval(_this.interval);
			
			// change button text back to Play
			playButton.innerHTML = '<i class=\"icon-play icon-white\"></i>Play';
			
		}
	
	// set interval for slow, medium or fast
	}, scaleSpeed);

}

GuitarApp.selectChord = function() {
	
	// local selectChord variable for the select form item
	var selectOption = document.getElementById('selectChord');

	// listen for change event on chord select drop down
	selectOption.addEventListener('change', function() {
		
		var optionVal = selectOption.value;
	
		for (var i=0;i<selectOption.length;i++) {
		
			// draw chord shape for selected chord
			if (optionVal == [i]) {
			
				// send chordBank to the drawFret function
				GuitarApp.drawFret(chordBank[i]);
				
			}
			
		}
	
	}, false);

}

// Draws the guitar fret for chords and scales
GuitarApp.drawFret = function(chordBank) {

	// create local variables for ChordLibrary
	var contentDiv = document.getElementById('fretBoard');
	
	// render table for chord shapes
	var fretTable = "<table>";

	// loop through rows - 'i'
	for(var i=0; i<chordBank.length; i++) {
	
		fretTable += "<tr>";
		
			// loop through columns - 'j'
			for(var j=0; j<chordBank[i].length; j++){

				if (chordBank[i][j] !== '') {
				
					// if array position contains a value, insert into td and span
					fretTable += "<td><span>" + chordBank[i][j] + "</span></td>";
					
				} else {
				
					// otherwise leave blank
					fretTable += "<td></td>";
					
				}
			
			}
			
			fretTable += "</tr>";
		}
		
		fretTable += "</table>";

	// append table to contentDiv
	contentDiv.innerHTML = fretTable;

}

GuitarApp.themeSwitcher = function() {

	// theme switcher
	// get inputs by tag name
	var themeSwitcher = document.getElementById('themeSwitcher');
	var inputs = themeSwitcher.getElementsByTagName('input');
	
	// loop through inputs
	for (var i=0;i<inputs.length;i++) {
	
		// make sure the correct radio button is selected based upon current theme id
		if (inputs[i].value == localStorage.theme) {
			
			// make input checked
			inputs[i].checked = true;
			
		}
		
		// listen for click event and update local storage with new theme id
		inputs[i].addEventListener('click', function() {
			
			// set local storage with value of selected radio button
			localStorage.setItem('theme', this.value);
			
			// set new body class using value of selected radio button
			GuitarApp.base.setBodyClass(this.value);
			
		}, false);
		
	}
		
}

GuitarApp.speedButton = function() {

	// variables for button list and buttons
	var speedButtons = document.getElementById('playSpeed');
	var speedButton = speedButtons.getElementsByTagName('label');
	var speedInput = speedButtons.getElementsByTagName('input');
	
	// variables for buttons
	var slowBtn = document.getElementById('slow-label');
	var mediumBtn = document.getElementById('medium-label');
	var fastBtn = document.getElementById('fast-label');

	// on entering page, set correct button to active based on stored speed value
	if (speedVal == 'slow') {
		slowBtn.className += " active";
	} if (speedVal == 'medium') {
		mediumBtn.className += " active";
	} if (speedVal == 'fast') {
		fastBtn.className += " active";
	}
	
	// loop through the speed buttons
	for (var i=0;i<speedInput.length;i++) {
		
		// add click event
		speedInput[i].addEventListener('click', function() {
			
			// get value of clicked radio button
			speedVal = this.value;
			
			// set speed in localStorage to value of selected radio button
			localStorage.setItem('speed', speedVal);
			
			if (speedVal == 'slow') {
				// set clicked label to 'active' and remove active from others
				slowBtn.className += " active";
				mediumBtn.className="medium-label btn btn-large";
				fastBtn.className="fast-label btn btn-large";
			} if (speedVal == 'medium') {
				// set clicked label to 'active' and remove active from others
				mediumBtn.className += " active";
				slowBtn.className="slow-label btn btn-large";
				fastBtn.className="fast-label btn btn-large";
			} if (speedVal == 'fast') {
				// set clicked label to 'active' and remove active from others
				fastBtn.className += " active";
				slowBtn.className="slow-label btn btn-large";
				mediumBtn.className="medium-label btn btn-large";
			}
			
			
		}, false);
		
	}
	
}

/* Full screen */
GuitarApp.fullScreen = function() {
	
	var fullScreenOn = document.getElementById('fullScreenOn');
	
	fullScreenOn.addEventListener('click', function() {
	
		var isInFullScreen = (document.fullScreenElement && document.fullScreenElement !==     null) || (document.mozFullScreen || document.webkitIsFullScreen);
	
		if (!isInFullScreen) {

			// track if app is in full screen mode
			docBody.setAttribute('data-fullscreen', 'true');
		
			if (docBody.requestFullscreen) {
				docBody.requestFullscreen();
			}
			else if (docBody.mozRequestFullScreen) {
				docBody.mozRequestFullScreen();
				//alert("Mozilla entering fullscreen!");
			}
			else if (docBody.webkitRequestFullScreen) {
				docBody.webkitRequestFullScreen();
				//alert("Webkit entering fullscreen!");
			}
		}
	
	}, false);

}

window.onload = function(){

	// execute new GuitarApp object
	guitarApp = new GuitarApp.base.init();
	
}