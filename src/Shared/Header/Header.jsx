import HeaderImg from "../../assets/Group 48102127.svg";

// eslint-disable-next-line react/prop-types
export default function Header({ title, tag, description }) {
  return (
    <div className="container-fluid header">
      <div className="row bg-header h-100">
        <div className="col-md-8 h-100">
          <div className="caption d-flex align-items-center h-100">
            <div className="m-5">
              <div className="d-inline">
                <h1 className="d-inline">{title}</h1>
                <h5 className="d-inline m-3">{tag}</h5>
              </div>

              <p className="w-50">{description}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 h-100">
          <img className="headerImg" src={HeaderImg} alt="" />
        </div>
      </div>
    </div>
  );
}
