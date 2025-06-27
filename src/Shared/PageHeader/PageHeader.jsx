import PageHeaderFigure from "../../assets/PageHeaderFigure.svg";
import PageHeaderBackground from "../../assets/PageHeaderBackground.svg";

// eslint-disable-next-line react/prop-types
export default function PageHeader({ title, tag, description }) {
  return (
    <div className="header h-100">
      <header
        style={{
          backgroundImage: `url("${PageHeaderBackground}")`,
        }}
        className="bg-header h-100 d-flex flex-column flex-md-row justify-content-between align-items-center p-3"
      >
        <div className="text-white px-4">
          <h1 className="d-inline">{title}</h1>
          <h5 className="d-inline m-3">{tag}</h5>

          <p className="w-75">{description}</p>
        </div>

        <div>
          <img
            src={PageHeaderFigure}
            alt="Logo"
            className="img-fluid"
            // style="max-height: 50px;"
          />
        </div>
      </header>
    </div>
  );
}
