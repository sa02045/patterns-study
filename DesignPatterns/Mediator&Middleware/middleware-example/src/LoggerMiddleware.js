import { Middleware } from 'redux'


const LoggerMiddleware = (store) => (next) => (action) =>{
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
}

export default LoggerMiddleware