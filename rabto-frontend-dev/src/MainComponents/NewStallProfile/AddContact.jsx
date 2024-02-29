import React, { Fragment } from 'react'
import { FaDownload } from 'react-icons/fa6';
import { IoBookmarkOutline } from 'react-icons/io5';

const AddContact = ({ name   , phoneNo , website  }) => {
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
          email:""
        };

        // console.log("contact",contact);
        
    
        // Create vCard content
        const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${contact.name}\nTEL;TYPE=work,voice:${contact.phone}\nEMAIL:${contact.email}\nURL:${contact.website}\nEND:VCARD`;
        
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
             <div onClick={ handleSaveClick } className='h-[45px] w-[112px] justify-center gilroyBold flex  text-[14px] active:text-[12px] rounded-[20px]  items-center bg-[#22421D] text-[#8ED364]'>Add Contact</div>

   </Fragment>
  )
}

export default AddContact