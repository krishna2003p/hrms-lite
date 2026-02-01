import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success", // success | error | info
  });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });

    setTimeout(() => {
      setToast((t) => ({ ...t, show: false }));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastModal toast={toast} />
    </ToastContext.Provider>
  );
};

const ToastModal = ({ toast }) => {
  if (!toast.show) return null;

  const bg =
    toast.type === "success"
      ? "bg-success"
      : toast.type === "error"
      ? "bg-danger"
      : "bg-info";

  return (
    <div
      className="position-fixed top-0 end-0 p-3"
      style={{ zIndex: 1055 }}
    >
      <div className={`toast show text-white ${bg}`}>
        <div className="toast-body">
          {toast.message}
        </div>
      </div>
    </div>
  );
};
