import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App, {PATHS} from './App.jsx'
import Providers from './lib/providers'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Error from './pages/Error'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        // errorElement: <Error/>,
        children: PATHS
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Providers>
            <RouterProvider router={router}/>
        </Providers>
    </StrictMode>,
)
