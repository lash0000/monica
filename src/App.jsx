import { useState } from 'react'
import Login from './pages/user/Login'
import SignUp from './pages/user/SignUp'
import Registration from './pages/user/Registration'
import ForgotPassword from './pages/user/ForgotPassword'

function App() {
  const [currentPage, setCurrentPage] = useState('login') // 'login', 'signup', 'registration', or 'forgot-password'

  const navigateToSignup = () => {
    setCurrentPage('signup')
  }

  const navigateToLogin = () => {
    setCurrentPage('login')
  }

  const navigateToRegistration = () => {
    setCurrentPage('registration')
  }

  const navigateToForgotPassword = () => {
    setCurrentPage('forgot-password')
  }

  return (
    <div>
      {currentPage === 'login' ? (
        <Login onNavigateToSignup={navigateToSignup} onNavigateToForgotPassword={navigateToForgotPassword} />
      ) : currentPage === 'signup' ? (
        <SignUp onNavigateToLogin={navigateToLogin} onNavigateToRegistration={navigateToRegistration} />
      ) : currentPage === 'registration' ? (
        <Registration onNavigateToLogin={navigateToLogin} />
      ) : (
        <ForgotPassword onNavigateToLogin={navigateToLogin} />
      )}
    </div>
  )
}

export default App
