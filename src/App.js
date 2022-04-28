import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import PageContent from './Components/PageContent';

function App() {
  return (
    <div>
      <Header/>
      <main className='page'>
          <h1 className='page-title'>Pokedex</h1>
          <span></span>
      </main>
      <PageContent />
    </div>
  );
}

export default App;
