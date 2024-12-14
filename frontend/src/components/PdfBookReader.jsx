import React from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

const PdfBookReader = ({ pdfUrl }) => {
  const defaultLayout = defaultLayoutPlugin();

  return (
    <div style={{ height: "80vh", display: "flex", justifyContent: "center" }}>
    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
      <Viewer fileUrl={pdfUrl} plugins={[defaultLayout]} />
    </Worker>
  </div>
  );
};

export default PdfBookReader;
