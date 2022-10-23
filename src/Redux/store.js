import { configureStore } from '@reduxjs/toolkit'
import BtnUpdateReducer from './BtnUpdateReducer'
import FunctionsRedcer from './FunctionsReducers'


export default configureStore({
  reducer: {
    FunctionsRedcer,
    BtnUpdateReducer
  },
})