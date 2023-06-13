import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import PageContent from './components/PageContent';

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <>
          <Header />
        </>
        <>
          <PageContent />
        </>
      </div>
    </div>
  );
}

export default App;
