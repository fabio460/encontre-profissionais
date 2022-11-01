import { configureStore } from '@reduxjs/toolkit'
import BtnUpdateReducer from './BtnUpdateReducer'
import FunctionsRedcer from './FunctionsReducers'
import InputsObjectsReducer from './InputsObjectsReducer'
import ValidationFormReducer from './ValidationFormReducer'
import UserLoggedReducer from './userLoggedReducer'

export default configureStore({
  reducer: {
    FunctionsRedcer,
    BtnUpdateReducer,
    ValidationFormReducer,
    InputsObjectsReducer,
    UserLoggedReducer
  },
})