import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/portfolio/HomePage';
import { ProjectsPage } from './pages/portfolio/ProjectsPage';
import { ExperiencePage } from './pages/portfolio/ExperiencePage';
import { AcademicsPage } from './pages/portfolio/AcademicsPage';
import { CertificationsPage } from './pages/portfolio/CertificationsPage';
import { SkillsPage } from './pages/portfolio/SkillsPage';
import { AdminPage } from './pages/admin/AdminPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="md:ml-64">
              <Header onMenuClick={() => setSidebarOpen(true)} />

              <main className="container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/experience" element={<ExperiencePage />} />
                  <Route path="/academics" element={<AcademicsPage />} />
                  <Route path="/certifications" element={<CertificationsPage />} />
                  <Route path="/skills" element={<SkillsPage />} />
                  <Route path="/admin" element={<AdminPage />} />
                </Routes>
              </main>

              <Footer />
            </div>
          </div>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
