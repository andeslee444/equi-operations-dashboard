import { Header } from './components/layout/Header'
import { Dashboard } from './pages/Dashboard'

function App() {
  return (
    <div className="min-h-screen bg-equi-dark">
      <Header />
      <main className="p-6">
        <Dashboard />
      </main>
    </div>
  )
}

export default App