const exp = module.exports;
import {infoPanel} from './info-panel'

const init = function() {
	let video = document.querySelector('.camera-feed')
	video.classList.add('flipped')

	let localMediaStream = null

	let front = false;

	navigator.mediaDevices.getUserMedia({video: { facingMode: (front ? 'user' : 'environment') }, audio: false}).then(function (stream) {
		try {
			video.srcObject = stream;
			infoPanel.add(`<p>Using (modern) MediaStream + video.srcObject Method</p>`)
		} catch(error) {
			video.src = window.URL.createObjectURL(stream)
			infoPanel.add(`<p>Using (depreciated) video.src = window.URL.createObjectURL(stream) Method</p>`)
		}
		infoPanel.add(`<p>MediaStream (Camera Feed) Started Successfully</p>`)
	}).catch(handleError)



}

function handleError(evt) {
	let video = document.querySelector('.camera-feed')
	video.parentNode.removeChild(video)

	let info = document.querySelector('.info')

	let message = `
	<p>
	  <strong>ERROR</strong>
	  <br>
	  ${evt.name}
	  <br>
	  ${evt.message}
	</p>
	`
	infoPanel.add(message)
	infoPanel.toggle(true);

	let container = document.querySelector('.container');
	container.style.backgroundImage = `url('images/camera-error.gif')`
	container.classList.add('error')
}

exp.videoPlayer = {
	init: init,
}