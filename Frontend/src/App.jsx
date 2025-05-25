import { Navigate, Route, Routes} from 'react-router-dom'; 
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { useState } from 'react';
import RefrshHandler from './RefrshHandler';
import Dashboard from './pages/Dashboard';
import ContentLibrary from './components/ContentLibrary';
import MapComponent from './components/MapComponent';
import FindYourPassion from '../src/pages/FindYourPassionTool';
import ResourceHub from '../src/pages/ResourceHub';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }

  return (
    <div className="App">
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/home' element={<PrivateRoute element={<Home />} />} />
        <Route path="/content-library" element={<ContentLibrary />} />
        <Route path="/interactive-map" element={<MapComponent />} />
        <Route path="/find-your-passion" element={<FindYourPassion />} />
        <Route path="/action-hub" element={<ResourceHub />} />
      </Routes>
    </div>
  );
}

export default App;
