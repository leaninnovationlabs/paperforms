import { Suspense, lazy } from 'react';
import { Route, Routes, MemoryRouter as Router } from "react-router-dom";
import Layout from './pages/Layout'
import Home from './pages/Home'

// TODO: Code split if app grows too big
// const Home = lazy(() => import('./pages/Home'));

function App() {

    return (
        <Router>
            <Layout>
                <Suspense fallback={<div />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </Suspense>
            </Layout>
        </Router>
    )
}

export default App
