import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-8">
        <Dashboard />
      </div>
    </div>
  )
}

export default App