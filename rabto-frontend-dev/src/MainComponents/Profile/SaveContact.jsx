import React, { Fragment } from 'react'
import { FaDownload } from 'react-icons/fa6';
import { IoBookmarkOutline } from 'react-icons/io5';

const SaveContact = ({ name   , phoneNo  }) => {
    const handleSaveClick = () => {

        // Get the contact information
        // const contact = {
        //   name: name,
        //   phone: phoneNo,
        //   email:""
        // };
        const contact = {
          name: name,
          phone: phoneNo,
         
        };

        // console.log("contact",contact);
        
    
        // Create vCard content
        const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${contact.name}\nTEL;TYPE=work,voice:${contact.phone}\nEND:VCARD`;
        
        // Create Blob object
        const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    
        // Create URL for the Blob
        const url = URL.createObjectURL(blob);
    
        // Create a link element
        const link = document.createElement('a');
    
        // Set attributes for the link
        link.download = `${contact.name}.vcf`;
        link.href = url;
    
        // Simulate a click on the link to trigger the download
        link.click();
      };

   

  return (
   <Fragment>
    <button onClick={handleSaveClick} className='inline-flex  items-center text-[#0F2604] justify-center border-[2px] h-[48px] bg-[#9EE86F] font-bold px-2 w-[170px] py-2 rounded-[50px] text-[14px] active:text-[12px] gap-1 '>Save Contact &nbsp;<IoBookmarkOutline/></button>
   </Fragment>
  )
}

export default SaveContact