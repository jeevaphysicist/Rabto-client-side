import React, { Fragment } from 'react'
import { FaDownload } from 'react-icons/fa6';
import { IoBookmarkOutline } from 'react-icons/io5';

const SaveContact = ({ name ,notes ,email , phoneNo , website , instagram ,facebook , address }) => {
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
          website: website,
          instagram: instagram,
          facebook: facebook,
          address: address,
          email:email
        };

        // console.log("contact",contact);
        
    
        // Create vCard content
        const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${contact.name}\nTEL;TYPE=work,voice:${contact.phone}\nEMAIL:${contact.email}\nURL:${contact.website}\nADR:${contact.address}\nTITLE:${notes}\nEND:VCARD`;
        
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
    <button onClick={handleSaveClick} className='px-4  text-[16px] active:text-[12px] gilroyBold h-[45px] w-[160px] items-center justify-center font-light  rounded-[50px] text-[#0F2604] bg-[#9EE86F] inline-flex    '>Save Contact &nbsp;<IoBookmarkOutline/></button>
   </Fragment>
  )
}

export default SaveContact