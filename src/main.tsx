import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router'
import AppRoutes from './routes/AppRoutes.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import Layout from './routes/layout.tsx'

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <BrowserRouter>
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  </AuthProvider>
)
