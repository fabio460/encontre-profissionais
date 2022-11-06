import { configureStore } from '@reduxjs/toolkit'
import BtnUpdateReducer from './BtnUpdateReducer'
import FunctionsRedcer from './FunctionsReducers'
import InputsObjectsReducer from './InputsObjectsReducer'
import ValidationFormReducer from './ValidationFormReducer'
import UserLoggedReducer from './userLoggedReducer'
import inputSearchReducer from './inputSearchReducer'
import MensagensRecebidasReducer from './MensagensRecebidasReducer'
import AppBarVisibleReducer from './AppBarVisibleReducer'

export default configureStore({
  reducer: {
    FunctionsRedcer,
    BtnUpdateReducer,
    ValidationFormReducer,
    InputsObjectsReducer,
    UserLoggedReducer,
    inputSearchReducer,
    MensagensRecebidasReducer,
    AppBarVisibleReducer
  },
})