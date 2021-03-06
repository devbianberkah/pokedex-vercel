import './App.css';
import PageContent from './Components/PageContent';
import PokeDetail from './Components/PokeDetail';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function App() {
  const addDataIntoCache = (cacheName, url, response) => {
    // Converting our response into Actual Response form
    const data = new Response(JSON.stringify(response));
  
    if ('caches' in window) {
      // Opening given cache and putting our data into it
      caches.open(cacheName).then((cache) => {
        cache.put(url, data);
        // alert('Data Added into cache!')
      });
    }
  };

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
