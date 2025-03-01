// eslint-disable-next-line react/prop-types
export default function Header({ title, description }) {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          <div className="caption bg-info">
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="img-container bg-danger">Image</div>
        </div>
      </div>
    </div>
  );
}
