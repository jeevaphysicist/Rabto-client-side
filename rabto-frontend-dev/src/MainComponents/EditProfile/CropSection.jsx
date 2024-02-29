import React, { Fragment, useState , useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { IoMdCheckmark } from 'react-icons/io'
import { IoCloseSharp } from 'react-icons/io5';
// import image from "../../Assets/yuktijewelsbanner.png"
import getCroppedImg from './getCroppedImg';
import { getStorage, ref, uploadBytes ,getDownloadURL , uploadBytesResumable , } from "firebase/storage";
import {app , db} from '../../Config/Firebase';
import { UploadFile } from '../upload';

const CropSection = ({ aspect, imageSetHandler , image ,cancelhandler  }) => {
    const [crop, setCrop] = useState({ x: 1, y: 3 });
    const [zoom, setZoom] = useState(1);
    const [croppedImage, setCroppedImage] = useState(null);
    const [IsCroppingModalOpen,setIsCroppingModalOpen] = useState(false);
    const [croppedAreaPixels,setCroppedAreaPixels]  = useState('');

function base64ToImage(base64Data, mimeType) {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const image = new Image();
    
            image.onload = () => {
                canvas.width = image.width;
                canvas.height = image.height;
                ctx.drawImage(image, 0, 0);
    
                canvas.toBlob(blob => {
                    resolve(blob);
                }, mimeType);
            };
    
            image.onerror = error => {
                reject(error);
            };
    
            image.src = base64Data;
        });
    }

const onCropComplete = async (_, croppedAreaPixels) => {
         setCroppedAreaPixels(croppedAreaPixels)
        const croppedImg = await getCroppedImg(image, croppedAreaPixels);
        console.log('cropped image',croppedImg.file);
        setCroppedImage(croppedImg.file);
         
      };

      const cropImage = async () => {
        // setLoading(true);
        try {
          const { file, url } = await getCroppedImg(
            image,
            croppedAreaPixels
          );
        //   setPhotoURL(url);
        //   setFile(file);
        //   setOpenCrop(false);
        } catch (error) {
        //   setAlert({
        //     isAlert: true,
        //     severity: 'error',
        //     message: error.message,
        //     timeout: 5000,
        //     location: 'modal',
        //   });
          console.log(error);
        }
     
        // setLoading(false);
      };

    
     
    //   console.log("new croped image",croppedImage);
    
      
      const handleOkClick = async () => {
        setIsCroppingModalOpen(false); 
        imageSetHandler(croppedImage)
        // setShowModal2(true); 
      };
    
      const handleCancelClick = () => {
        setIsCroppingModalOpen(false);
        setCroppedImage(image);
        cancelhandler()
      };

  return (
   <Fragment>
        <div className='top-0 left-0 right-0 bottom-0 m-auto max-w-[768px] md:max-w-[400px]   fixed z-50 bg-white'>
            <div className='w-[100%] relative z-10 grid grid-cols-3  bg-[#9EE86F] p-4 font-bold text-[18px]'>
                  <div className='col-span-1'>
                    <div className='flex items-center justify-start'>
                    <IoCloseSharp onClick={handleCancelClick} />
                    </div>
                 </div>
                  <div className='col-span-1'>
                    <div className='flex items-center justify-center'>
                    Edit Photo
                    </div>
                    </div>
                  <div className='col-span-1'>
                    <div className='flex items-center justify-end'>
                    <IoMdCheckmark onClick={handleOkClick} />
                    </div>
                    </div>
            </div>
            <div className=''>
            <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            style={{width:"100%"}}
           
          />
            </div>
            {/* <img src={croppedImage} /> */}
        </div>

    

   </Fragment>
  )
}

export default CropSection