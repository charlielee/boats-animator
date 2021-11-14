import "./ModalHeader.css";

interface ModalHeaderProps {
  title: string;
}

const ModalHeader = ({ title }: ModalHeaderProps): JSX.Element => {
  return <h2 className="modal-header">{title}</h2>;
};

export default ModalHeader;
