import {infoPanel} from './info-panel'

const exp = module.exports;

const objDetectOpts = {
	detector: null,
	smoother: null,
	arObjArray: [
		`./images/sunglasses_0.png`,
		`./images/sunglasses_1.png`,
		`./images/sunglasses_2.png`,
		`./images/sunglasses_3.png`,
		`./images/sunglasses_4.png`,
		`./images/sunglasses_5.png`,
		`./images/sunglasses_6.png`,
		`./images/sunglasses_7.png`,
		`./images/ironMan.png`,
	],
	currARObj: 0
}

const tick = function(opts) {

	if(opts) {

		let smoother = opts.smoother;

		if(!smoother) {
			objDetectOpts.smoother = new Smoother([0.9999999, 0.9999999, 0.999, 0.999], [0, 0, 0, 0]);
			smoother = objDetectOpts.smoother;
		}
		let detector = opts.detector;
		let arObj = document.querySelector('.arObj')
		let video = document.querySelector('.camera-feed')
	
		if(video.paused) video.play();

		if (video.readyState === video.HAVE_ENOUGH_DATA && video.offsetWidth > 0) {

			// Prepare the detector once the video dimensions are known:
	      	if (!detector) {
	      		var width = ~~(60 * video.offsetWidth / video.offsetHeight);
				var height  =60;
	      		objDetectOpts.detector = new objectdetect.detector(width, height, 1.1, objectdetect.frontalface);
	      		infoPanel.add(`<p>objectdetect.detector created</p>`)
	      		var detector = objDetectOpts.detector;
	      	}
	  		
	  		// Perform the actual detection:
			var coords = detector.detect(video, 1);
			if (coords[0]) {
				var coord = coords[0];
				coord = smoother.smooth(coord);
				
				// Rescale coordinates from detector to video coordinate space:
				coord[0] *= video.offsetWidth / detector.canvas.width;
				coord[1] *= video.offsetHeight / detector.canvas.height;
				coord[2] *= video.offsetWidth / detector.canvas.width;
				coord[3] *= video.offsetHeight / detector.canvas.height;
				
				// Display arObj overlay: 
				arObj.style.left    = ~~(coord[0] + coord[2] * 1.0/8 + video.offsetLeft) + 'px';
				arObj.style.top     = ~~(coord[1] + coord[3] * 0.8/8 + video.offsetTop) + 'px';
				arObj.style.width   = ~~(coord[2] * 6/8) + 'px';
				arObj.style.height  = ~~(coord[3] * 6/8) + 'px';
				
				arObj.style.opacity = 1;
				
			} else {
				var opacity = arObj.style.opacity - 0.2;
				arObj.style.opacity = opacity > 0 ? opacity : 0;
			}

		}
	} // End - if opts
}

const changeARObj = function() {
	objDetectOpts.currARObj += 1
	if(objDetectOpts.currARObj > objDetectOpts.arObjArray.length -1) {
		objDetectOpts.currARObj = 0;
	}
	let arObj = document.querySelector('.arObj')
	if(arObj) {
		arObj.src = objDetectOpts.arObjArray[objDetectOpts.currARObj]
	}
}

const init = function() {

	infoPanel.add(`<p>Initializing Augmented Reality...</p>`)

	let video = document.querySelector('.camera-feed')
	
	let arContainer = document.querySelector('.ar-container')
	arContainer.style.width = window.innerWidth + 'px';
	arContainer.style.height = window.innerHeight + 'px';
	let arObj = document.createElement('img');
	arObj.classList.add('arObj');
	arObj.src = `./images/sunglasses_0.png`
	arContainer.appendChild(arObj)

	// Create Info-Panel Button To Swap AR Object
	let infoOptions = document.querySelector('.info-options')
	if(infoOptions) {
		let changeButton = document.createElement('button')
		changeButton.innerHTML = 'Change AR Obj';
		changeButton.onclick = function() {
			changeARObj();
		};
		infoOptions.appendChild(changeButton)
	}
}

const resize = function() {
	objDetectOpts.detector = null;
}


exp.jsObjectDetect = {
	init: init,
	tick: tick,
	objDetectOpts: objDetectOpts,
	resize: resize
}