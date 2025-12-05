import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useApplicationStore } from "../stores/Application.store";

// Import all possible form templates
import BarangayClearance_Forms from "../layouts/forms/BarangayClearance";

export const FORM_COMPONENTS = {
  "Barangay Clearance": BarangayClearance_Forms,
};

export default function ApplicationDocument() {
  const { id } = useParams();
  const { viewApplication, currentApplication } = useApplicationStore();
  const location = useLocation();

  useEffect(() => {
    if (id) viewApplication(id);
  }, [id]);

  useEffect(() => {
    if (currentApplication) {
      window.history.replaceState(
        {
          ...location.state,
          docTitle: currentApplication.application_service
        },
        ""
      );
    }
  }, [currentApplication]);

  if (!currentApplication) {
    return <div style={{ padding: 20 }}>Loading Document...</div>;
  }

  const service = currentApplication.application_service;
  const FormComponent = FORM_COMPONENTS[service];

  return (
    <div style={styles.pageWrapper}>
      <article style={styles.a4}>
        <main style={styles.content}>
          {!FormComponent && <div>Unknown document service: {service}</div>}
          {FormComponent && (
            <FormComponent application={currentApplication} />
          )}
        </main>

        <footer style={styles.footer}>
          <small>Generated on {new Date().toLocaleString()}</small>
        </footer>
      </article>
    </div>
  );
}

const styles = {
  pageWrapper: {
    minHeight: "100vh",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    background: "#f0f0f0",
  },
  a4: {
    width: "210mm",
    height: "297mm",
    background: "#ffffff",
    boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
    borderRadius: "4px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    padding: "12mm 16mm 6mm",
    borderBottom: "1px solid rgba(0,0,0,0.06)",
  },
  headerTitle: {
    fontSize: "14pt",
    fontWeight: 600,
  },
  content: {
    flex: 1,
    padding: "12mm 16mm",
    boxSizing: "border-box",
    fontFamily:
      "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    fontSize: "11pt",
    color: "#111",
    lineHeight: 1.45,
  },
  footer: {
    padding: "8mm 16mm",
    borderTop: "1px solid rgba(0,0,0,0.04)",
    textAlign: "right",
    fontSize: "9pt",
    color: "#666",
  },
};
