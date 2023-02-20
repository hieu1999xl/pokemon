interface DataLoadingProps {
  children: React.ReactNode;
  isLoading: boolean;
}

const DataLoading = ({ children, isLoading }: DataLoadingProps) => {
  return (
    <>
      {isLoading ? (
        <div className="dataloading-box">
          <img src="../assets/img/pokemon-loading.gif" className="w-40 m-auto" />
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default DataLoading;
