import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import  store from './redux/store/store';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';


ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <Provider store = {store}>
      <Router>
        <App />
      </Router>
      </Provider>
    </React.StrictMode>

);