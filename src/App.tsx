import { Route, Routes } from 'react-router'
import NavBar from './components/NavBar'
import Calculator from './pages/Calculator'
import Admin from './pages/Admin'

export default function App() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="mx-auto max-w-3xl px-6 py-10 sm:py-16">
        <Routes>
          <Route path="/" element={<Calculator />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </div>
  )
}
