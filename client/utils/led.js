

// const url = 'localhost:8000/'
const url = 'http://localhost:8000/'

export const setLed = (node, speed, color) => {
	const config = { method: 'GET', mode: 'cors' }
	fetch(url, config)
	.then(function(response) {
		debugger
	})
}

