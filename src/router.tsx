import { Navigate, Route, Routes } from 'react-router-dom';

import MissionManagementPage from '@/pages/MissionManagmentPage';
import MissionsPage from '@/pages/MissionsPage';

const AppRouter: React.FC = () => (
  <Routes>
    <Route path='/missions/:id' element={<MissionManagementPage />} />
    <Route path='/missions' element={<MissionsPage />} />
    <Route path='*' element={<Navigate to='/missions' replace />} />
  </Routes>
);

export default AppRouter;
