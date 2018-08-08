import '../css/main.scss'
import {videoPlayer} from './video-player'
import {infoPanel} from './info-panel'
import {globalResize} from './global-resize'

function init() {
	infoPanel.init();
	videoPlayer.init();
	globalResize();
}

window.onresize = function() {
	globalResize();
}

init();
