import ModalImg from "../../assets/Group 48102290.png";

export default function NoData() {
  return (
    <div className="text-center">
      <img className="img-fluid my-5" src={ModalImg} />
      <h5>No Data !</h5>
      <p>
        are you sure you want to delete this item ? if you are sure just click
        on delete it
      </p>
    </div>
  );
}
