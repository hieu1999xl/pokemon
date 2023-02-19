import { useRoutes } from 'react-router';
import { initRoutes } from './app-routers';
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
// import './styles/main.scss';
// import './App.css';

function App() {
  return useRoutes(initRoutes());
}

export default App;
