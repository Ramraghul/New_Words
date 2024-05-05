import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from "./components/navbar/Nav";
import Card from "./components/card/Card";
import List from './components/list/List';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Card />} />
        <Route path='/list' element={<List />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
