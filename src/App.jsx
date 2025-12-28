import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Profil from './pages/Profil';
import Akademik from './pages/Akademik';
import Fasilitas from './pages/Fasilitas';
import PPDB from './pages/PPDB';
import Berita from './pages/Berita';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profil" element={<Profil />} />
          <Route path="akademik" element={<Akademik />} />
          <Route path="fasilitas" element={<Fasilitas />} />
          <Route path="ppdb" element={<PPDB />} />
          <Route path="berita" element={<Berita />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
