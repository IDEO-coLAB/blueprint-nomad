import R from 'ramda'

// Used by React components, abstracted here so components don't 
// need to know how scenes are represented

// for connection with given id, return id of input node connection
export let connectionInputId = R.curry((sceneObjects, connectionId) => {
  const obj = findById(connectionId, sceneObjects)
  return obj._input.state.id
})

export let connectionOutputId = R.curry((sceneObjects, connectionId) => {
  const obj = findById(connectionId, sceneObjects)
  return obj._output[1].state.id
})

let findById = (id, objects) => { 
	return R.find(obj => {
		return R.equals(obj.state.id, id)
	}, objects)
}

