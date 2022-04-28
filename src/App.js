import './App.css';
import Header from './Components/Header';
import PageContent from './Components/PageContent';
import PokeDetail from './Components/PokeDetail';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
     <Router>
      <Routes >
        <Route path='/pokemon/:id' element={<PokeDetail />} />
        <Route path='' element={<PageContent />} />
      </Routes >
    </Router>
    </div>
  );
}

export default App;
