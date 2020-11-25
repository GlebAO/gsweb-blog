import React, { MouseEvent, useRef } from "react";
import ReactDOM from "react-dom";

interface ModalInterface {
  onClose: () => void;
  title: string;
  content: JSX.Element;
}

interface IEvent {
    target: Element
}

const Modal: React.FC<ModalInterface> = ({ onClose, content, title }) => {

 const backdropRef = useRef<HTMLDivElement | null>(null);
 const closeButtonRef =  useRef<HTMLButtonElement | null>(null);

 const isClickOnBackdrop = (target:EventTarget) => backdropRef && backdropRef.current && backdropRef.current === target;
 const isClickOnCloseBtn = (target:EventTarget) => closeButtonRef && closeButtonRef.current && closeButtonRef.current === target;

  function handleClose(e:MouseEvent) {
    if( !isClickOnBackdrop(e.target) && !isClickOnCloseBtn(e.target) ) {
        return
    }
    onClose();
  }

  return ReactDOM.createPortal(
    <>
      <div
        className="modal"
        tabIndex={-1}
        ref={backdropRef}
        style={{ display: "block" }}
        onClick={handleClose}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                ref={closeButtonRef}
              ></button>
            </div>
            <div className="modal-body">{content}</div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" ></div>
    </>,
    document.querySelector("#modal")!
  );
};

export default Modal;
