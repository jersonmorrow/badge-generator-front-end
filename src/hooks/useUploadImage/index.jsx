import { storage } from '../../firebase';

function useUploadImage() {
  const uploadImage = (data, setImageUrl) => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(`images/${data.name}`);
    fileRef.put(data).then(() => {
      console.log('uploaded an image');
      storage
        .ref('images')
        .child(data.name)
        .getDownloadURL()
        .then((url) => {
          console.log(url);
          setImageUrl(url);
        });
    });
  };

  return { uploadImage };
}

export default useUploadImage;
