import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Sidebar } from "~/components/Sidebar";
import { CadastroRisco } from "~/pages/CadastroRisco";
import { Relatorio } from "~/pages/RelatorioPrincipal";

function Private() {
  return (
    <>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/cadastros/risco" element={<CadastroRisco />} />
        <Route path="/relatorios" element={<Relatorio />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </>
  );
}

export default Private;
