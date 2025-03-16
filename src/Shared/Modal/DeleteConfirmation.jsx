/* eslint-disable react/prop-types */
import ModalImg from "../../assets/Group 48102290.png";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function DeleteConfirmation({
  item,
  show,
  handleClose,
  handleCloseAndDelete,
}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <i
        className="fa-regular fa-circle-xmark close-icon text-danger"
        onClick={handleClose}
      ></i>

      <Modal.Body className="text-center">
        <img className="w-50 my-5" src={ModalImg} />
        <h5>Delete This {item} ?</h5>
        <p>
          are you sure you want to delete this item ? if you are sure just click
          on delete it
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={handleCloseAndDelete}>
          Delete this {item}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
