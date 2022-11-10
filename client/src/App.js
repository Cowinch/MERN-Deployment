import './App.css';
import { Routes, Route } from 'react-router-dom'
import Form from './components/Form';
import Display from './components/Display';
import ShowOne from './components/ShowOne';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/pirates" element={<Display />} />
        <Route path="/pirates/new" element={<Form />} />
        <Route path="/pirates/:id" element={<ShowOne/>} />
      </Routes>
    </div>
  );
}

export default App;
