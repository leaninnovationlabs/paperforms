import { ThemeProvider } from "./theme.provider"

const Providers = ({ children }) => {
    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            {children}
        </ThemeProvider>
    )
}

export default Providers;