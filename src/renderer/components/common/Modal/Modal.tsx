import classNames from "classnames";
import { useSelector } from "react-redux";
import Launcher from "../../../pages/Launcher/Launcher";
import { RootState } from "../../../redux/store";
import "./Modal.css";
import ModalName from "./ModalName";

const Modal = (): JSX.Element => {
  const { currentModal } = useSelector((state: RootState) => state.app);

  const getModalContent = (modalName?: ModalName) => {
    switch (modalName) {
      case ModalName.STARTUP:
        return <Launcher />;
      default:
        return <></>;
    }
  };

  return (
    <div
      className={classNames("modal", {
        "modal--show": currentModal !== undefined,
      })}
    >
      <div className="modal__content">{getModalContent(currentModal)}</div>
    </div>
  );
};

export default Modal;
