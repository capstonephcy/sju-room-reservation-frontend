import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;