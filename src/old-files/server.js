var http = require('http')
var fs = require('fs');

//404 Response
function send404(response) {
	response.writeHead(404, {"Content-Type": 'text/plain'});
	response.write("Error 404: Page Not Found");
	response.end();
}

//Handle User Request. Send Response
function onRequest(request, response) {
	var page;
	if(request.method === 'GET') {
		switch(request.url) {
			case "/":
			page = './index.html';
			break;

			default:
			page = '404';
			break;
		}

		if(page !== '404') {
			response.writeHead(200, {"Content-Type": 'text/html'})
			fs.createReadStream(page).pipe(response);
		} else {
			send404(response);
		}
	}
}

http.createServer(onRequest).listen(8888);
console.log('Server is now running...')