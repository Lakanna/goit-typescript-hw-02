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

// {
//             "id": "9mqPKzuyR0M",
//             "slug": "selective-focus-photography-of-several-common-poppy-flowers-9mqPKzuyR0M",
//             "alternative_slugs": {
//                 "en": "selective-focus-photography-of-several-common-poppy-flowers-9mqPKzuyR0M",
//                 "es": "fotografia-de-enfoque-selectivo-de-varias-flores-de-amapola-comunes-9mqPKzuyR0M",
//                 "ja": "いくつかの一般的なケシの花のセレクティブフォーカス写真-9mqPKzuyR0M",
//                 "fr": "photographie-selective-de-plusieurs-fleurs-de-pavot-communes-9mqPKzuyR0M",
//                 "it": "fotografia-a-fuoco-selettiva-di-diversi-fiori-di-papavero-comuni-9mqPKzuyR0M",
//                 "ko": "몇-가지-일반적인-양귀비-꽃의-선택적-초점-사진-9mqPKzuyR0M",
//                 "de": "selektive-fokusfotografie-mehrerer-gewohnlicher-mohnblumen-9mqPKzuyR0M",
//                 "pt": "fotografia-com-foco-seletivo-de-varias-flores-comuns-de-papoula-9mqPKzuyR0M"
//             },
//             "created_at": "2018-11-02T17:27:33Z",
//             "updated_at": "2024-10-05T18:11:54Z",
//             "promoted_at": null,
//             "width": 3872,
//             "height": 2592,
//             "color": "#738c73",
//             "blur_hash": "LJDmEU%LX4V[,rxZs-NH02xZwMOW",
//             "description": null,
//             "alt_description": "selective focus photography of several common poppy flowers",
//             "breadcrumbs": [
//                 {
//                     "slug": "images",
//                     "title": "1,000,000+ Free Images",
//                     "index": 0,
//                     "type": "landing_page"
//                 },
//                 {
//                     "slug": "nature",
//                     "title": "Nature Images",
//                     "index": 1,
//                     "type": "landing_page"
//                 }
//             ],
//             "urls": {
//                 "raw": "https://images.unsplash.com/photo-1541179570498-0cd1211607ab?ixid=M3w2NDI5NjF8MHwxfHNlYXJjaHwxN3x8cG9wcHl8ZW58MHx8fHwxNzI4MjE2Nzk0fDA\u0026ixlib=rb-4.0.3",
//                 "full": "https://images.unsplash.com/photo-1541179570498-0cd1211607ab?crop=entropy\u0026cs=srgb\u0026fm=jpg\u0026ixid=M3w2NDI5NjF8MHwxfHNlYXJjaHwxN3x8cG9wcHl8ZW58MHx8fHwxNzI4MjE2Nzk0fDA\u0026ixlib=rb-4.0.3\u0026q=85",
//                 "regular": "https://images.unsplash.com/photo-1541179570498-0cd1211607ab?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=M3w2NDI5NjF8MHwxfHNlYXJjaHwxN3x8cG9wcHl8ZW58MHx8fHwxNzI4MjE2Nzk0fDA\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=1080",
//                 "small": "https://images.unsplash.com/photo-1541179570498-0cd1211607ab?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=M3w2NDI5NjF8MHwxfHNlYXJjaHwxN3x8cG9wcHl8ZW58MHx8fHwxNzI4MjE2Nzk0fDA\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=400",
//                 "thumb": "https://images.unsplash.com/photo-1541179570498-0cd1211607ab?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=M3w2NDI5NjF8MHwxfHNlYXJjaHwxN3x8cG9wcHl8ZW58MHx8fHwxNzI4MjE2Nzk0fDA\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=200",
//                 "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1541179570498-0cd1211607ab"
//             },
//             "links": {
//                 "self": "https://api.unsplash.com/photos/selective-focus-photography-of-several-common-poppy-flowers-9mqPKzuyR0M",
//                 "html": "https://unsplash.com/photos/selective-focus-photography-of-several-common-poppy-flowers-9mqPKzuyR0M",
//                 "download": "https://unsplash.com/photos/9mqPKzuyR0M/download?ixid=M3w2NDI5NjF8MHwxfHNlYXJjaHwxN3x8cG9wcHl8ZW58MHx8fHwxNzI4MjE2Nzk0fDA",
//                 "download_location": "https://api.unsplash.com/photos/9mqPKzuyR0M/download?ixid=M3w2NDI5NjF8MHwxfHNlYXJjaHwxN3x8cG9wcHl8ZW58MHx8fHwxNzI4MjE2Nzk0fDA"
//             },
//             "likes": 84,
//             "liked_by_user": false,
//             "current_user_collections": [],
//             "sponsorship": null,
//             "topic_submissions": {},
//             "asset_type": "photo",
//             "user": {
//                 "id": "S7NNb6GM8Jg",
//                 "updated_at": "2024-07-31T15:22:19Z",
//                 "username": "lauradesign",
//                 "name": "Laura Beutner",
//                 "first_name": "Laura",
//                 "last_name": "Beutner",
//                 "twitter_username": null,
//                 "portfolio_url": "https://laurabeutner.myportfolio.com",
//                 "bio": "Passionate ice cream queen, graphic designer and hand lettering artist with a slight obsession for pretty pictures.\r\nSay hi on Instagram @laura.design ! Lovely day peeps :)",
//                 "location": "Stuttgart GER",
//                 "links": {
//                     "self": "https://api.unsplash.com/users/lauradesign",
//                     "html": "https://unsplash.com/@lauradesign",
//                     "photos": "https://api.unsplash.com/users/lauradesign/photos",
//                     "likes": "https://api.unsplash.com/users/lauradesign/likes",
//                     "portfolio": "https://api.unsplash.com/users/lauradesign/portfolio",
//                     "following": "https://api.unsplash.com/users/lauradesign/following",
//                     "followers": "https://api.unsplash.com/users/lauradesign/followers"
//                 },
//                 "profile_image": {
//                     "small": "https://images.unsplash.com/profile-1540206772078-a9bffc80696a?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=32\u0026h=32",
//                     "medium": "https://images.unsplash.com/profile-1540206772078-a9bffc80696a?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=64\u0026h=64",
//                     "large": "https://images.unsplash.com/profile-1540206772078-a9bffc80696a?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=128\u0026h=128"
//                 },
//                 "instagram_username": "laura.design",
//                 "total_collections": 21,
//                 "total_likes": 7,
//                 "total_photos": 20,
//                 "total_promoted_photos": 0,
//                 "total_illustrations": 0,
//                 "total_promoted_illustrations": 0,
//                 "accepted_tos": true,
//                 "for_hire": false,
//                 "social": {
//                     "instagram_username": "laura.design",
//                     "portfolio_url": "https://laurabeutner.myportfolio.com",
//                     "twitter_username": null,
//                     "paypal_email": null
//                 }
//             }
//         },
