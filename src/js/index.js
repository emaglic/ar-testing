import '../css/main.scss'
import {videoPlayer} from './video-player'
import {infoPanel} from './info-panel'
import {globalResize} from './global-resize'
import {jsObjectDetect} from './js-objectdetect'

window.customSettings = {
	useAR: true,
	arType: 'jsObjectDetect'
}

function init() {
	infoPanel.init();
	videoPlayer.init();
	
	if(window.customSettings.useAR) {
		if(window.customSettings.arType === 'jsObjectDetect') {
			jsObjectDetect.init();
		}
	}
	globalResize();

	if(window.customSettings.useAR) {
		window.requestAnimationFrame(tick)
	}
}

window.onresize = function() {
	globalResize();
}

function tick(evt) {

	if(window.customSettings.arType === 'jsObjectDetect') {
		jsObjectDetect.tick(jsObjectDetect.objDetectOpts);
	}

	window.requestAnimationFrame(tick)
}

	
init();
