import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import getPhotos from "./helpers";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import "./App.css";

interface DataType {
  total: number;
  total_pages: number;
  results: IPhotoData[];
}

export interface IPhotoData {
  id: string;
  description: string | null;
  alt_description: string | null;
  urls: {
    regular: string;
    small: string;
  };
  likes: number;
}
const initialDataForModal = {
  id: "",
  description: "",
  alt_description: "",
  urls: {
    regular: "",
    small: "",
  },
  likes: 0,
};

function App() {
  const [photos, setPhotos] = useState<IPhotoData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [imgForSearch, setImgForSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [dataForModal, setDataForModal] =
    useState<IPhotoData>(initialDataForModal);

  useEffect(() => {
    if (imgForSearch === "") {
      return;
    }

    const fetchSearchigValue = async (imgForSearch: string, page: number) => {
      try {
        setLoading(true);
        setError(false);

        const respons = await getPhotos<DataType>(imgForSearch, page);
        if (respons.total_pages === 0) {
          toast.error(
            "There is not photos matched your search. Try input another one, please"
          );
        }

        setTotalPages(respons.total_pages);
        setPhotos((prev) => [...prev, ...respons.results]);
      } catch (error) {
        toast.error("Something is wrong... Try reload this page, please");
        console.log(error, "in catch");
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchigValue(imgForSearch, page);
  }, [imgForSearch, page]);

  const searchImg = (img: string) => setImgForSearch(img);

  const dataModal = (dataForModal: IPhotoData) => setDataForModal(dataForModal);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const handleSubmit = async (imgForSearch: string) => {
    searchImg(imgForSearch);
    setPhotos([]);
  };

  const loadMore = async () => {
    setPage(page + 1);
  };

  return (
    <>
      <h1>Search photos</h1>
      <SearchBar onSubmit={handleSubmit} />
      {error && <ErrorMessage />}
      {photos.length > 0 && (
        <ImageGallery
          arrayOfPhotos={photos}
          openModal={openModal}
          dataForModal={dataModal}
        />
      )}
      {page < totalPages && <LoadMoreBtn changePage={loadMore} />}
      {loading && <Loader />}
      <Toaster />
      {modalIsOpen && (
        <ImageModal
          dataForModal={dataForModal}
          onCloseModal={closeModal}
          modalIsOpen={modalIsOpen}
        />
      )}
    </>
  );
}

export default App;
