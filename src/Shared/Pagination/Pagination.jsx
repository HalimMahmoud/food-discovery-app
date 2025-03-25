/* eslint-disable react/prop-types */
export default function Pagination({
  arrayOfPages,
  currentPage,
  changeCurrentPage,
}) {
  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <a
              className="page-link"
              aria-label="Previous"
              onClick={() =>
                changeCurrentPage((prev) => (prev === 1 ? prev : prev - 1))
              }
            >
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </a>
          </li>
          {arrayOfPages?.map((pageNumber) => (
            <li
              className={`page-item ${
                pageNumber === currentPage ? "active" : ""
              }`}
              key={pageNumber}
            >
              <a
                className="page-link"
                onClick={() => changeCurrentPage(pageNumber)}
              >
                {pageNumber}
              </a>
            </li>
          ))}

          <li
            className={`page-item ${
              currentPage === arrayOfPages.length ? "disabled" : ""
            }`}
          >
            <a
              className="page-link"
              aria-label="Next"
              onClick={() =>
                changeCurrentPage((prev) =>
                  prev === arrayOfPages.length ? prev : prev + 1
                )
              }
            >
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
