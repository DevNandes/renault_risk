import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "~/routes";
import { ToastContainer } from "react-toastify";
import { getTema } from "~/services/storage";
import "react-toastify/dist/ReactToastify.css";
import "styles/main.css";

function App() {
  useEffect(() => {
    // Verifica o tema ao carregar a página e adiciona/remove a classe 'dark' do body
    const tema = getTema();
    if (tema === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, []);

  return (
    <div className="App">
      <ToastContainer
        autoClose={2000}
        limit={1}
        closeOnClick
        pauseOnHover
        theme="dark"
        position="bottom-center"
      />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
