import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './context/ThemeContext'
import Home from './pages/Home'
import Admin from './pages/Admin'

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#14141e',
              color: '#e8e8f0',
              border: '1px solid rgba(124,106,247,0.3)',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '13px',
            },
            success: { iconTheme: { primary: '#7c6af7', secondary: '#fff' } },
          }}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
