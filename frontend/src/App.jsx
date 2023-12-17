import { ErrorBoundary } from "react-error-boundary";
import { FallbackPage } from "./components/UI/FallbackPage";
import TotalRoutes from "./routes";

function App() {
  return (
    <div className="App">
      <>
        <ErrorBoundary FallbackComponent={FallbackPage}>
          <TotalRoutes />
        </ErrorBoundary>
      </>
    </div>
  );
}

export default App;
