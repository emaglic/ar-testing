import '../css/main.scss'
import {videoPlayer} from './video-player'
import {infoPanel} from './info-panel'
import {globalResize} from './global-resize'
import {jsObjectDetect} from './js-objectdetect'

window.customSettings = {
	useAR: true
}

function init() {
	infoPanel.init();
	videoPlayer.init();
	
	if(window.customSettings.useAR) {
		jsObjectDetect.init();
	}
	globalResize();
	window.requestAnimationFrame(tick)
}

window.onresize = function() {
	globalResize();
}

function tick(evt) {

	if(window.customSettings.useAR) {
		jsObjectDetect.tick(jsObjectDetect.tickOpts);
	}

	window.requestAnimationFrame(tick)
}

	
init();
