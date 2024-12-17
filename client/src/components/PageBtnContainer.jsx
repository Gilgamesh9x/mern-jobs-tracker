import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useLocation, useNavigate } from "react-router-dom";
import { useJobsContext } from "../pages/AllJobs";

export default function PageBtnContainer() {
  const { data } = useJobsContext();
  const { totalPages, currentPage } = data;

  const navigate = useNavigate();

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const { search, pathname } = useLocation();

  function handlePageChange(pageNumber) {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  }

  function addPageButton({ pageNumber, activeClass }) {
    return (
      <button
        onClick={() => handlePageChange(pageNumber)}
        key={pageNumber}
        className={`btn page-btn ${activeClass && "active"}`}
      >
        {pageNumber}
      </button>
    );
  }

  // when we call this function that returns an array of jsx elements, react automatically renderes those elements in the array
  function renderPageButtons() {
    const pageButtons = [];
    // page 1
    pageButtons.push(
      addPageButton({ pageNumber: 1, activeClass: currentPage === 1 })
    );
    // current page
    if (currentPage !== 1 && currentPage !== totalPages) {
      pageButtons.push(
        addPageButton({ pageNumber: currentPage, activeClass: true })
      );
    }
    // last page
    pageButtons.push(
      addPageButton({
        pageNumber: totalPages,
        activeClass: currentPage === totalPages,
      })
    );
    return pageButtons;
  }

  return (
    <Wrapper>
      <button
        className="btn prev-btn"
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) {
            prevPage = totalPages;
          }
          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">{renderPageButtons()}</div>

      <button
        className="btn next-btn"
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > totalPages) {
            nextPage = 1;
          }
          handlePageChange(nextPage);
        }}
      >
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
}
