module.exports = jsonAjax;

function jsonAjax(url, data, callback, fallback){

	if (typeof(data) === 'function'){
		callback = data;
		data = undefined;
	}

	const request = new XMLHttpRequest();

	request.open(data ? 'POST' : 'GET', url, true);

	if (data) request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

	request.onload = () => {
		const response = tryParse(request.responseText);

		if (request.status >= 200 && request.status < 400) return callback(null, response);

		callback({ response, status: request.status });
	};

	request.onerror = fallback || console.error.bind(console);

	request.send(JSON.stringify(data));

}

function tryParse(resp){
	// return response, parse it in case it's encoded json
	try { return JSON.parse(resp); }
	catch(err) { return resp; }
}