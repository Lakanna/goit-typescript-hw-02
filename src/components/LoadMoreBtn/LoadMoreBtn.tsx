import css from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  changePage: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ changePage }) => {
  return (
    <button className={css.btnLoadMore} onClick={changePage}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
