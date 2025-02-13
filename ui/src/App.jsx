import { Suspense, lazy } from 'react';
import { Route, Routes, MemoryRouter as Router } from "react-router-dom";
import Layout from './pages/Layout'

const Home = lazy(() => import('./pages/Home'));

function App() {

    return (
        <Layout>
            <Router>
                <Suspense fallback={<div />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </Suspense>
            </Router>
        </Layout>
    )
}

export default App
