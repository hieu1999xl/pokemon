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
    <div className="flex mt-20 justify-end mx-20">
      <button
        disabled={page === 0}
        onClick={() => changePage('PREV')}
        className="relative inline-flex items-center rounded-md text-white bg-rose-600 px-4 py-2 text-sm font-medium disabled:opacity-75 enabled:hover:text-gray-700 enabled:hover:bg-white"
      >
        Previous
      </button>
      <button
        onClick={() => changePage('NEXT')}
        className="relative ml-3 inline-flex items-center rounded-md text-white bg-rose-600 px-4 py-2 text-sm font-medium  hover:text-gray-700 hover:bg-white"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
