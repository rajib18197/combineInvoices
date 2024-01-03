import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

const ModalContext = createContext();

export default function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const open = setOpenName;
  const close = () => setOpenName("");

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ opens, children }) {
  const { openName, open, close } = useContext(ModalContext);

  function handleClick() {
    console.log(1);
    openName === opens || openName !== "" ? close() : open(opens);
  }

  //   return cloneElement(children, { onClick: handleClick });
  return children(handleClick);
}

function Window({ windowName, height, children }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useRef();

  useEffect(
    function () {
      function handleClose(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          close();
        }
      }
      window.addEventListener("click", handleClose, true);

      return () => {
        window.removeEventListener("click", handleClose, true);
      };
    },
    [close]
  );

  if (openName !== windowName) return null;

  const calcHeight = height ? height : "95%";

  return createPortal(
    <div className="fixed inset-0 w-full h-full z-20">
      <div
        ref={ref}
        // className={`fixed top-0 right-0 h-[${calcHeight}] w-[80%] px-8 py-10 bg-gray-50 z-30 shadow-2xl overflow-y-scroll scrollbar ${
        //   openName !== ""
        //     ? "translate-x-0 transition-all duration-1000"
        //     : "translate-x-[200%]"
        // }`}
        className={`fixed top-0 right-0 h-[100%] w-[80%] px-8 py-10 bg-gray-50 z-30 shadow-2xl overflow-y-scroll scrollbar`}
      >
        <button
          onClick={close}
          className="absolute top-0 left-0 mx-8 text-2xl hover:text-indigo-800"
        >
          &times;
        </button>
        <div>{children({ onCloseModal: close })}</div>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;
