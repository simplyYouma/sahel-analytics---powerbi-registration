/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import LandingPage from '@/components/LandingPage';
import RegistrationForm from '@/components/RegistrationForm';
import SuccessPage from '@/components/SuccessPage';
import CancelPage from '@/components/CancelPage';
import ScrollToTop from '@/components/ScrollToTop';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={
            <div className="container mx-auto px-4 py-8">
              <RegistrationForm />
            </div>
          } />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/cancel" element={<CancelPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
