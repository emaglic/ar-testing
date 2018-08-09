const exp = module.exports;
import {infoPanel} from './info-panel'
import {jsObjectDetect} from './js-objectdetect'

exp.globalResize = function() {
	let video = document.querySelector('.camera-feed')

	video.style.width = window.innerWidth + 'px'
	video.style.height = window.innerHeight + 'px'

	let arContainer = document.querySelector('.ar-container')
	arContainer.style.width = window.innerWidth + 'px';
	arContainer.style.height = window.innerHeight + 'px';

	let message = `<p>
		Resize Called<br>
		<strong>window:</strong> {width: ${window.innerWidth}px ,height: ${window.innerHeight}px}
	</p>`

	infoPanel.add(message)

	infoPanel.resize();
	jsObjectDetect.resize();
}