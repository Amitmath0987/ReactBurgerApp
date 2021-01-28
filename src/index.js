import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import {createStore,compose,applyMiddleware,combineReducers} from 'redux';
import burgerReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import fetchedOrderReducer from './store/reducers/fetchOrder';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers(
  {
    burgerReducer: burgerReducer,
    orderReducer: orderReducer,
    fetchedOrderReducer: fetchedOrderReducer,
    authReducer: authReducer
  }
)
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose ;
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));
ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
