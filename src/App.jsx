import { useState } from 'react'
import RegistrationForm from './RegistrationForm.jsx'
import RegistrationBill from './RegistrationBill.jsx'

function App() {
  const [page, setPage] = useState('form')
  const [registrationId, setRegistrationId] = useState(null)

  if (page === 'bill') return (
    <RegistrationBill
      registrationId={registrationId}
      onBack={() => { setPage('form'); setRegistrationId(null) }}
    />
  )

  return (
    <RegistrationForm
      onPdfView={() => setPage('bill')}
      onSubmitted={(id) => { setRegistrationId(id); setPage('bill') }}
    />
  )
}

export default App
