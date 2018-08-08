const exp = module.exports;

const init = function() {

	let infoPanel = document.querySelector('.info-panel') 
	infoPanel.innerHTML = `
		<div class='info-header'></div>
		<div class='info-options'>
			<button class='info-flip-video'>Flip Video</button>
		</div>
		<div class='info-messages'></div>`
	

	let infoBtn = document.querySelector('.info-btn')
	infoBtn.onclick = exp.infoPanel.toggle;

	let infoFlipVideo = document.querySelector('.info-flip-video')
	infoFlipVideo.onclick = function() {
		let video = document.querySelector('.camera-feed')
		video.classList.toggle('flipped')
	}
}

const add = function(message) {
	let infoMessage = document.querySelector('.info-messages')
	infoMessage.innerHTML += `<div class='single-message'>${message}</div>`

	infoMessage.scrollTop = infoMessage.scrollHeight;
}

const toggle = function() {
	let infoBtn = document.querySelector('.info-btn')
	let infoContainer = document.querySelector('.info-panel')
	infoContainer.classList.toggle('visible')
	infoContainer.paddingTop = infoBtn.offsetHeight + 'px';
}

const resize = function() {
	console.log('hooray')
	let infoPanel = document.querySelector('.info-panel')
	let infoHeader = document.querySelector('.info-header')
	let infoOpts = document.querySelector('.info-options')
	let infoMsgs = document.querySelector('.info-messages')

	infoMsgs.style.height = infoPanel.offsetHeight - (infoHeader.offsetHeight + infoOpts.offsetHeight) + 'px';
}

exp.infoPanel = {
	init: init,
	add: add,
	toggle: toggle,
	resize: resize
}