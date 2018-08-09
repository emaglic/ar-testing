import '../css/main.scss'
import {videoPlayer} from './video-player'
import {infoPanel} from './info-panel'
import {globalResize} from './global-resize'
import {jsObjectDetect} from './js-objectdetect'

function init() {
	infoPanel.init();
	videoPlayer.init();
	jsObjectDetect.init();
	globalResize();
	window.requestAnimationFrame(tick)
}

window.onresize = function() {
	globalResize();
}

function tick(evt) {
	jsObjectDetect.tick(jsObjectDetect.tickOpts);

	window.requestAnimationFrame(tick)
}

	
init();
