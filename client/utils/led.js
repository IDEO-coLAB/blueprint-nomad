

// const url = 'localhost:8000/'
const colorUrl = 'http://localhost:8000/'

// returns a promise
export const setLed = (node, speed, color) => {
	const config = {
		method: 'POST',
		mode: 'cors',
		body: `${node}${speed}${color};` // make sure to adda semicolon for particle
	}
	return fetch(colorUrl, config)
}
