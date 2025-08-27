import { HopeProvider, NotificationsProvider } from "@hope-ui/solid"
import { Error, FullScreenLoading } from "~/components"
import { ErrorBoundary, Suspense } from "solid-js"
import { globalStyles, theme } from "./theme"
import App from "./App"

const Index = () => {
  globalStyles()
  return (
    <HopeProvider config={theme}>
      <ErrorBoundary
        fallback={(err) => {
          console.error("error", err)
          return <Error msg={`System error: ${err}`} h="100vh" />
        }}
      >
        <NotificationsProvider duration={3000}>
          <Suspense fallback={<FullScreenLoading />}>
            <App />
          </Suspense>
        </NotificationsProvider>
      </ErrorBoundary>
    </HopeProvider>
  )
}

export { Index }
