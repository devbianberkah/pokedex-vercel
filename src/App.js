import './App.css';
import PageContent from './Components/PageContent';
import PokeDetail from './Components/PokeDetail';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    // <div className="root">
    //   <Header/>
    //   <main className='page'>
    //       <h1 className='page-title'>Pokedex</h1>
    //       <span></span>
    //   </main>
    //   <PageContent />
    // </div>
     <Router>
      <Routes >
        <Route path='/pokemon/:id' element={<PokeDetail />} />
        <Route path='' element={<PageContent />} />
      </Routes >
    </Router>
  );
}

export default App;
