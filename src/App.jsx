import { Container } from 'react-bootstrap';
import NavigationBar from './components/NavigationBar.jsx';
import WebsiteFooter from './components/WebsiteFooter.jsx';
import { BrowserRouter, Routes, Route } from 'react-router';
import { ThemeProvider } from './context/ThemeContext.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Testing from './pages/Testing.jsx';
export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="d-flex flex-column min-vh-100">
          <NavigationBar/>
          <main>
            <Routes>
              <Route path='/' element={<Testing/>}/>
            </Routes>
          </main>
          <WebsiteFooter/>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}