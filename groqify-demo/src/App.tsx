import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ModuleList from './pages/ModuleList';
import ModuleTemplate from './pages/ModuleTemplate';

const App = () => {
    return (
        <div className="mt-4">
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="/:module" element={<ModuleList />} />
                <Route path="/:module/:lesson" element={<ModuleTemplate />} />
            </Routes>
        </div>
    );
};

export default App;
