import { useState } from 'react'
import RegistrationForm from './RegistrationForm.jsx'
import RegistrationBill from './RegistrationBill.jsx'

function App() {
  const [page, setPage] = useState('form')

  if (page === 'bill') return <RegistrationBill onBack={() => setPage('form')} />

  return <RegistrationForm onPdfView={() => setPage('bill')} />
}

export default App
