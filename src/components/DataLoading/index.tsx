interface DataLoadingProps {
  children: React.ReactNode;
  isLoading: boolean;
}

const DataLoading = ({ children, isLoading }: DataLoadingProps) => {
  return (
    <>
      {isLoading ? (
        <div className="dataloading-box">
          <img src="../assets/img/pokemon-loading.gif" />
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default DataLoading;
