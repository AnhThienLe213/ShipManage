
import '../styles/App.scss';

import Hotel from './Hotel.js';
import Tour from './Tour.js';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from './Navigation.js';
import Home from './Home.js';
import Login from './Login.js';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Login />


          {/* <MyComponent /> */}
          {/* <ListTodo /> */}


        </header>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
