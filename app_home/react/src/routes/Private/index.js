import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Sidebar } from "~/components/Sidebar";

function Private() {
  return (
    <>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </>
  );
}

export default Private;
