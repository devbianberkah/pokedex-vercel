import './App.css';
import PageContent from './Components/PageContent';
import PokeDetail from './Components/PokeDetail';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Offline,Online} from "react-detect-offline"

function App() {
  return (
    <div className='App'>
      <Offline>
        <div>anda offline</div>
      </Offline>
      <Online>
      <Router>
        <Routes >
          <Route path='/pokemon/:id' element={<PokeDetail />} />
          <Route path='' element={<PageContent />} />
        </Routes >
      </Router>
      </Online>
    </div>
  );
}

export default App;
