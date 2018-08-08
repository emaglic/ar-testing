var http = require('http')

function send404Response(response) {
	response.writeHead(404, {"Context-Type": "text/plain"});
	response.write('Error 404: Page Not Found');
	response.end();
}

//Handle A User Request
//Request is what the user is looking for (requesting)
//Response is what we are sending back to the user.
function onRequest(request, response) {

	if(request.method === 'GET' && request.url === '/') {
		response.write(200, {"Context-Type": "text/html"});
		fs.createReadStream('./index.html').pipe(response);
	} else {
		send404Response(response)
	}

}
	

http.createServer(onRequest).listen(8888);
console.log('Server is now running...')