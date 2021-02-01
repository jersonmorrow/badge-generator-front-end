import { useContext } from 'react';
import { storage } from '../../firebase';
import UserContext from '../../context/userContext';

function useUploadImage() {
  const { userData } = useContext(UserContext);
  let userId = userData.user.id;

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
