import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

import {IPhotoData } from "../../App"

export default function ImageGallery({
  arrayOfPhotos,
  openModal,
  dataForModal,
}) {
  return (
    <ul className={css.imageList}>
      {arrayOfPhotos.map(
        (photo:IPhotoData) => {
          return (
            <li key={photo.id}>
              <ImageCard
                photoData={photo}
                onOpenModal={openModal}
                dataForModal={dataForModal}
              />
            </li>
          );
        }
      )}
    </ul>
  );
}
