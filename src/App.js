import AppRoutes from './routers/AppRoutes';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css'

function App() {
  return (
    <div className="app">
       <AppRoutes />
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
