import AppRoutes from './routers/AppRoutes';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
function App() {
  return (
    <div className="App">
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
