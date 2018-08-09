const exp = module.exports;
import {infoPanel} from './info-panel'

const init = function() {
	let video = document.querySelector('.camera-feed')
	video.classList.add('flipped')

	let localMediaStream = null

	let front = false;

	navigator.mediaDevices.getUserMedia({video: { facingMode: (front ? 'user' : 'environment') }, audio: false}).then(function (stream) {
		video.src = window.URL.createObjectURL(stream)
		let message = `<p>Camera Feed Loaded Successfully...</p>`
		infoPanel.add(message)
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