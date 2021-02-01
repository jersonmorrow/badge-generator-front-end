import { storage } from '../../firebase';

function useUploadImage() {
  let storageUser = localStorage.getItem('user');
  let user = JSON.parse(storageUser);
  let userId = user.id;

  const uploadImage = (data, setImageUrl) => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(`images/${userId}/${data.name}`);
    fileRef.put(data).then(() => {
      console.log('uploaded an image');
      storage
        .ref(`images/${userId}/`)
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
