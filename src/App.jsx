import { useState } from 'react'
import RegistrationForm from './RegistrationForm.jsx'
import RegistrationBill from './RegistrationBill.jsx'

function App() {
  const [page, setPage] = useState('form')
  const [registrationId, setRegistrationId] = useState(null)
  const [formData, setFormData] = useState(null)

  if (page === 'bill') return (
    <RegistrationBill
      registrationId={registrationId}
      formData={formData}
      onBack={() => { setPage('form'); setRegistrationId(null); setFormData(null) }}
    />
  )

  return (
    <RegistrationForm
      onPdfView={(data) => { setFormData(data); setPage('bill') }}
      onSubmitted={(id) => { setRegistrationId(id); setPage('bill') }}
    />
  )
}

export default App
