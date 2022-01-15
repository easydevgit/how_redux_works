//state
const data = {
    user: {
        name: "Ivan",
        age: 30,
        city: "Tver",
    },
    password: {
        passwordAttempts: 5,
    },
}

//action
const decrementPasswordAttempts = {
    type: "DECREMENT_PASSWORD_ATTEMPTS",
}

const incrementPasswordAttempts = {
    type: "INCREMENT_PASSWORD_ATTEMPTS",
}

const changeUsersCity = {
    payload: {
        city: "NY",
    },
    type: "CHANGE_USERS_CITY",
}

//reducer
function password(state = data.password, action) {
    switch (action.type) {
        case "DECREMENT_PASSWORD_ATTEMPTS":
            return {
                ...state,
                passwordAttempts: state.passwordAttempts + 1,
            }

        case "INCREMENT_PASSWORD_ATTEMPTS":
            return {
                ...state,
                passwordAttempts: state.passwordAttempts - 1,
            }

        default:
            return state
    }
}

function user(state = data.user, action) {
    switch (action.type) {
        case "CHANGE_USERS_CITY":
            return {
                ...state,
                city: action.payload.city,
            }

        default:
            return state
    }
}

const appData = (state = {}, action) => {
    return {
        user: user(state.user, action),
        password: password(state.password, action),
    }
}

const createStore = (reducer) => {
    let state
    let listeners = []

    const getState = () => state

    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach((listener) => listener())
    }

    const subscribe = (listener) => {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter((item) => item !== listener)
        }
    }

    dispatch({})

    return {
        getState,
        dispatch,
        subscribe,
    }
}

const checkStateChanges = () => {
    console.log("state was changed")
}

const store = createStore(appData)
store.subscribe(checkStateChanges)
store.dispatch(changeUsersCity)
console.log(store.getState())

console.log(appData(data, decrementPasswordAttempts))
console.log(appData(data, incrementPasswordAttempts))
