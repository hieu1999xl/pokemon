export interface PaginationProps {
  page: number;
  handleChangePage: (page: number) => void;
}

const Pagination = ({ page, handleChangePage }: PaginationProps) => {
  const changePage = (type: string) => {
    let pageNumber = page;
    if (type === 'PREV') {
      pageNumber = pageNumber - 1;
    } else {
      pageNumber = pageNumber + 1;
    }
    handleChangePage(pageNumber);
  };

  return (
    <div className="row">
    <div className="col">
      <button
        disabled={page === 0}
        onClick={() => changePage('PREV')}
        className="waves-effect waves-light btn"
      >
        Previous
      </button>
      <button
        onClick={() => changePage('NEXT')}
        className="waves-effect waves-light btn"
      >
        Next
      </button>
    </div>
    </div>
  );
};

export default Pagination;
