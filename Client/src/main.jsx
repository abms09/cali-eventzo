import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from './store/store'
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
    </BrowserRouter>
  </Provider>
);
