import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "~/pages/Login";
import { Cadastro } from "~/pages/Cadastro";

function Public() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default Public;
