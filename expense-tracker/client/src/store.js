import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  userLoginReducer,
  userRegisterReducer,
} from './reducers/userReducers';
import {
  transactionListReducer,
  transactionAddReducer,
  transactionUpdateReducer,
  transactionDeleteReducer,
} from './reducers/transactionReducers';
import {
  categoryListReducer,
  categoryAddReducer,
  categoryUpdateReducer,
  categoryDeleteReducer,
} from './reducers/categoryReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  transactionList: transactionListReducer,
  transactionAdd: transactionAddReducer,
  transactionUpdate: transactionUpdateReducer,
  transactionDelete: transactionDeleteReducer,
  categoryList: categoryListReducer,
  categoryAdd: categoryAddReducer,
  categoryUpdate: categoryUpdateReducer,
  categoryDelete: categoryDeleteReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
