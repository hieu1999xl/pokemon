interface DataLoadingProps {
  children: React.ReactNode;
  isLoading: boolean;
}

const DataLoading = ({ children, isLoading }: DataLoadingProps) => {
  return (
    <>
      {isLoading ? (
        <div className="flex items-center">
          <img src="../assets/img/loading.gif" className="w-40 m-auto" />
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default DataLoading;
