import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

import { IPhotoData } from "../../App";

interface ImageGalleryProps {
  arrayOfPhotos: IPhotoData[];
  openModal: () => void;
  dataForModal: (dataForModal: IPhotoData) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  arrayOfPhotos,
  openModal,
  dataForModal,
}) => {
  return (
    <ul className={css.imageList}>
      {arrayOfPhotos.map((photo) => {
        return (
          <li key={photo.id}>
            <ImageCard
              photoData={photo}
              onOpenModal={openModal}
              dataForModal={dataForModal}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;
