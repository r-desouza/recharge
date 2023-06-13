import React, { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const useToast = () => {
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState<{ title: string; body: string }>({
    title: "",
    body: "",
  });

  const toast = () => {
    return (
      <ToastContainer className="p-3 position-fixed" position="bottom-end">
        <Toast
          bg={"dark"}
          onClose={() => setShow(false)}
          show={show}
          delay={4000}
          autohide
        >
          <Toast.Header closeButton={false}>
            <strong className="me-auto text-black">{info.title}</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{info.body}</Toast.Body>
        </Toast>
      </ToastContainer>
    );
  };

  const showToast = (title: string, body: string) => {
    setInfo({ title, body });
    setShow(true);
  };

  return { showToast, toast };
};

export default useToast;
