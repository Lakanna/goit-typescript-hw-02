import css from "./ImageCard.module.css";

import { IPhotoData } from "../../App";

interface ImageCardProps {
  photoData: IPhotoData;
  onOpenModal: () => void;
  dataForModal: (dataForModal: IPhotoData) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({
  photoData,
  onOpenModal,
  dataForModal,
}) => {
  const openModal = (photoData: IPhotoData) => {
    dataForModal(photoData);
    onOpenModal();
  };

  return (
    <div className={css.imageItem}>
      <img
        src={photoData.urls.small}
        alt={
          photoData.alt_description !== null
            ? photoData.alt_description
            : "There is no description"
        }
        onClick={() => openModal(photoData)}
      />
    </div>
  );
};

export default ImageCard;
