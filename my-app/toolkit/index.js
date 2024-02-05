import {combineReducers, configureStore} from '@reduxjs/toolkit'
import toolkitSlice from './toolkitSlice'

//создали корневой reducer
const rootReducer = combineReducers({
    toolkit: toolkitSlice
})

export const store = configureStore({
    reducer: rootReducer
})