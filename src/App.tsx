import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchPage from './pages/search/SearchPage';
import DetailPage from './pages/detail/DetailPage';

function App() {
  return (
    <BrowserRouter basename='/anime-search-app/'>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/anime/:id" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

