import React, { useState, useEffect , useRef, Fragment } from "react";
import "./index.css";
import suren from "../../asset/assets/v2images/suren.webp";
import LogoIcon from '../../Assets/v2/logos/verified.svg';
import InstagramIcon from '../../Assets/v2/logos/instagram.svg';
import FaceBookIcon from '../../Assets/v2/logos/facebook.svg';
import DribbleIcon from '../../Assets/v2/logos/dribbble.svg';
import BehanceIcon from '../../Assets/v2/logos/behance.svg';
import LinkedInIcon from '../../Assets/v2/logos/linkedin-in.svg';
import TwitterIcon from '../../Assets/v2/logos/twitter.svg';
import call from "../../asset/assets/v2images/call.webp"
import whatsapp from "../../asset/assets/v2images/wa.webp"
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import rudra from "../../asset/assets/v2images/rudra.webp";
import csc from "../../asset/assets/v2images/csc.webp"
import code from "../../asset/assets/v2images/code.webp"
import anna from "../../asset/assets/v2images/anna.webp"
import hworld from "../../asset/assets/v2images/hworld.webp"
import ryd from "../../asset/assets/v2images/ryd.webp"
import rk from "../../asset/assets/v2images/rk.webp"
import dent from "../../asset/assets/v2images/dent.webp"
import bog from "../../asset/assets/v2images/bog.webp"
import save from "../../asset/assets/v2images/save.webp"
import { Button, Popover, Space } from 'antd'; 
import scan from '../../Assets/v2/logos/scan.png';
import scanner from '../../Assets/v2/logos/scanner.png';
import footerlogo from "../../Assets/v2/logos/footer.png";
import savebtn from "../../Assets/v2/logos/save.png";
import td from "../../Assets/v2/logos/td.webm";
import cover from '../../asset/assets/v2images/cover.webp'
import { Tooltip, Zoom } from "@mui/material";
import Footer from "../Footer/Footer";
import { GetuserProfile ,userid ,USER_NAME, GetuserProductHandler, GetuserServiceHandler, GetuserEventHandler} from '../../APIS/APIs';
import ProfileGIF from "../../Assets/Visitors/Development purpose.gif";
import Profileimg from "../../Assets/Visitors/profile.png";
import { BsShieldFillCheck } from "react-icons/bs";
import { FaDribbble, FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { FiDribbble } from "react-icons/fi";
import { FaBehance } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { IoMdCall } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";
import { IoArrowBack, IoMenu } from "react-icons/io5";
import { Swiper , SwiperSlide} from "swiper/react";
import { AiOutlineGlobal } from "react-icons/ai";
import { Navigation  } from "swiper/modules";
import Rudra from "../../Assets/Visitors/rudra.png";
// import csc from "../../Assets/Visitors/csc.png";
import codingdeaf from "../../Assets/Visitors/codingdeaf.png";
// import anna from "../../Assets/Visitors/anna.png";
import Minilogo from "../../Assets/Visitors/mini_logo.png";
// import rudra from "../../Assets/users/rudra.png";
import rkbakery from "../../Assets/users/rkbakery.png";
import dental from "../../Assets/users/dental.png";
import bo from "../../Assets/users/bo.png";
import SaveContact from '../Profile/SaveContact';
import { RiMenu4Fill } from "react-icons/ri";
import eventLogo from "../../Assets/event_logo.png";
import sp from "../../Assets/Visitors/sp.png";
import sp1 from "../../Assets/Visitors/sp1.png";
import liveevent from "../../Assets/liveevent.png";
import Cookies from "js-cookie";

import "swiper/css";
import "swiper/css/navigation"
import Aside from '../Profile/Aside';
import { Link, useParams , useNavigate } from 'react-router-dom';
import Error404 from '../../Components/PageNotFound/Error404';
// import Footer from '../Footer/Footer';
import user from "../../APIS/CurrentUser";

const webData = [
    {
        image: rudra,
        title: "Rudra Cycles",
        description: "E-commerce website",
        link: "https://rudracyclemart.in/",

    },
    {
        image: csc,
        title: "Coimbatore Social Club",
        description: "Dynamic website",
        link: "https://thecoimbatoresocialclub.com/",

    },
    {
        image: code,
        title: "Code for Deaf",
        description: "Dynamic website",
        link: "https://www.codingfordeaf.org/",

    },
    {
        image: anna,
        title: "Annalakshmi",
        description: "Dynamic site with reservation module",
        link: "https://annalakshmi.in",

    },
    {
        image: hworld,
        title: "The H World",
        description: "E-commerce website",
        link: "https://thehworld.in/",

    },

]

const brandData = [
    {
        image: rk,
        title: "RK Bakery",
        description: "Logo Design and Branding",
        link: "https://www.behance.net/gallery/169409287/RK-BAKERY-LOGO",

    },
    {
        image: dent,
        title: "Archident Oral Care",
        description: "Logo Design and Branding Visual Identity",
        link: "https://www.behance.net/gallery/177924265/ARCIDENT-ORAL-CARE",

    },
    {
        image: bog,
        title: "Bogasri Organics",
        description: "Logo Design , Branding and Package design ",
        link: "https://www.behance.net/gallery/177613529/BOGASRI-ORGANICS-PACKAGE-DESIGNING",

    },
    {
        image: ryd,
        title: "Rudra Cycles",
        description: "Branding and AD design",
        link: "https://www.behance.net/gallery/177617033/RUDRA-CYCLE-MART",

    }

]

const Index = () => {
    const [isAtTop, setIsAtTop] = useState(false);
    const [isAsideOpen, setIsAsideOpen] = useState(false);
    const [userData,setUserData] = useState('');
    const [services,setServices] = useState([]);
    const [products,setProducts] = useState([]);
    const [events,setEvents] = useState([]);
    const componentRef = useRef();
  
    
  
    const handleAside = ()=>{
        
       setIsAsideOpen(!isAsideOpen);
    }

    let navigate = useNavigate();
  
    let { profileUserName } = useParams();
    // console.log("profile name",profileUserName);
    useEffect(()=>{
     getUserProfile();
   },[profileUserName])
   
  
  const getUserProfile = async()=>{
       GetuserProfile(profileUserName).then(response=>{
    //    console.log("response",response);
       if(response.isSuccess){
          setUserData(response.data);
       }
            
       })
  }
  
  const callPhoneNumber = (phoneNumber) => {
     if(phoneNumber)
      window.location.href = `tel:${phoneNumber}`;
  
   };
  
   useEffect(()=>{
     if(profileUserName){
     serviceHandler();
     productHandler();
     getEventHandler();
     }
    },[userData])
  
  const serviceHandler = ()=>{
     GetuserServiceHandler(profileUserName).then(response=>{
        //  console.log("reponse service",response)
         setServices(response.data);
  
     })
    }
    // console.log("user profile data ", userData)
  
    const productHandler = ()=>{
     GetuserProductHandler(profileUserName).then(response=>{
        //  console.log("reponse Product",response)
         setProducts(response.data);
  
     })
    }
  
    const getEventHandler = ()=>{
     GetuserEventHandler(profileUserName).then(response=>{
        //    console.log("reponse event",response)
           setEvents(response.data);
    
       })
      }
  const LinkAdjustmentsHandler = (link)=>{
     if (!link.startsWith('https://')) {
        return 'https://' + link;
      }
      return link;
  }

    const handleSaveClick = (userData) => {

        // Get the contact information
        const contact = {
          name: userData.displayName,
          phone: userData.mobileNo,
          email: userData.email
        };
    
        // Create vCard content
        const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${contact.name}\nTEL;TYPE=work,voice:${contact.phone}\nEMAIL:${contact.email}\nEND:VCARD`;
        
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
    

    const content = (
    <div style={{width: "250px"}}>
        <img src={scanner} style={{width: "100%"}} />
    </div>
    );
    const handleClick = () => {
        // Display instructions for the user
        alert('To save this contact, please follow these steps:\n\n1. Open your device\'s Contacts/People app.\n2. Tap on the option to add a new contact.\n3. Enter the contact information manually.');
    
        // Optionally, you can also provide a preformatted text
        const contactText = `Name: [Name]
    Phone: [Phone]
    Email: [Email]`;
    
        // Copy the preformatted text to the clipboard (if supported)
        if (navigator.clipboard) {
          navigator.clipboard.writeText(contactText).then(() => {
            alert('Contact information copied to clipboard. You can paste it while adding a contact');
          }).catch((error) => {
            console.error('Failed to copy to clipboard:', error);
          });
        }
      };
  const words = ['Branding', 'Web Design & Development', 'Creatives & Strategy', 'Digital Marketing', 'Custom Softwares', 'Mobile App Development'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    let timeout;

    if (typedText.length < words[currentWordIndex].length) {
      timeout = setTimeout(() => {
         setTypedText((prevText) => prevText + words[currentWordIndex][typedText.length]);
      }, 50); // Adjust the timeout value as needed
    } else {
      timeout = setTimeout(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setTypedText('');
      }, 1500); // Adjust the timeout value as needed
    }

    return () => clearTimeout(timeout);
  }, [currentWordIndex, typedText, words]);
    const [videoError, setvideoError] = useState(false);
    const handleVideoError = () => {
        setvideoError(true)
    } 

    const cookie = Cookies.get("mycookie");
    
    return(
        <Fragment>
        {
         userData === null ?
         <Error404/>
        :
       
        <div>
        <div className="fixed z-50" style={{maxWidth: "768px", margin: "0 auto",position:"relative"}}>
        <div style={{maxWidth: "768px", margin: "0 auto",position:"relative"}}>
          <div className={`fixed h-[100vh] top-0 left-0 bottom-0 right-0 opacity-[37%] bg-black ease-in-out  z-40 ${isAsideOpen ? "w-full lg:w-full" : "w-0"}`} onClick={handleAside}></div>
          <div className={`fixed h-[100vh]  top-0 bottom-0 left-0 z-50 lg:z-50 rounded-r-[50px] bg-white transition-all duration-500 w-[300px] ease-in-out ${isAsideOpen ? " ml-0  md:w-[300px]" : "md:w-[0px] md:ml-0 -ml-[300px] "}`}>
           <div className={`${isAsideOpen ? "  md:block " : "  md:hidden"}`}>
           <Aside userData={userData} />
           </div>
          </div>
       </div>
       </div>

        <div style={{maxWidth: "768px", margin: "0 auto",position:"relative"}}>
        {USER_NAME === profileUserName ?<div className='bg-white w-[40px] h-[40px] cursor-pointer rounded-[5px] z-30 absolute top-2 pt-1 shadow-lg shadow-[#0E1E25]  left-2'><RiMenu4Fill className='  text-black m-auto  font-bold text-[30px]' onClick={handleAside} /></div>  : 
          <Fragment>
             {cookie ? 
             <div className='absolute top-5 z-30 left-5'>
             <div onClick={()=>navigate(-1)} className='w-[30px] h-[30px] rounded-full flex items-center justify-center font-extrabold bg-white' style={{boxShadow: "0px 2px 7px 1px #1624494D"}}>
                 <IoArrowBack className='text-[20px] active:text-[18px]'/>
             </div> 
            </div>
            :
            <div className='absolute top-5 z-30 right-5'>
            <div><Link to="/" className=" bg-[#90E072] text-[white] shadow-sm shadow-[#90E072] py-1 px-2 text-[12px] flex items-center justify-center rounded-[2px]">Login</Link></div>
            </div>
            }
          </Fragment>
          
        }

            <div className="top-cont ">  
              <img src={userData?.banner} style={{width: "100%"}}  />
            </div>
            <div>
                {/* <Popover style={{position: "fixed"}} content={content} trigger="click">
                    <div style={{position: "fixed", bottom: "10px", right: "10px", backgroundColor: "#162449", borderRadius: "50px", height: "35px", width: "35px", display: "flex", justifyContent: "center", alignItems: "center", padding: "10px", zIndex: "50"}}>
                        <img src={scan} style={{width: "25px", height: "25px"}} />
                    </div>
                </Popover> */}
                <div className="prof bg-white  ">
                <img className="prof-img" src={userData?.profilePhoto} />
                {/* <div style={{alignSelf: "end", marginTop: "-40px",}} className="save-btn">
                <a href="intent://contacts/create?name=Surendhar%20Doe&phone=9845318077#Intent;scheme=android.intent.action.INSERT;end">

                <img src={save} style={{ width: "23px", padding: "8px"}}/> 
                </a>
                </div> */}
                <div>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}} className="mt-3">
                        <h2 className="MontserratEBold max-w-[80%] flex text-center items-center justify-center text-[125%]">{userData?.displayName}</h2>
                        <img
                        style={{
                            height:23,
                            width:25,
                        }}
                        src={LogoIcon}
                        
                        />
                        
                        <Tooltip TransitionComponent={Zoom} title="Save Contact" placement='right-start'>
                        <img src={savebtn} onClick={()=>{handleSaveClick(userData)}} style={{marginLeft: "3px"}} />
                        </Tooltip>
                    </div>
                    <div>
                        <h4 className="GilroyBoldT" style={{textAlign: "center", padding: "5px 10px", color: "#3E4152", marginTop: "0"}}>{userData?.About?.substring(0, 85)}{userData?.About?.length > 85  ? "..." : null }</h4>
                    </div>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "20px", gap: "20px"}}>
                    {/* {userData?.whatsapp ? <a  href={`https://wa.me/91${userData?.whatsapp}`}
           target="_blank"
           rel="noopener noreferrer"
           ><FaWhatsapp className='text-[21px] text-[#162449]'/> </a> :null} */}
           {userData?.socialMedia?.instagram && userData?.socialMedia?.instagram.trim()  ?<a href={`${LinkAdjustmentsHandler(userData?.socialMedia?.instagram)}`} target='_blank'><img src={InstagramIcon} className='text-[21px] text-[#162449] busernameSocialIcon'/> </a> :null}
           {userData?.socialMedia?.facebook && userData?.socialMedia?.facebook.trim()  ?<a href={`${LinkAdjustmentsHandler(userData?.socialMedia?.facebook)}`} target='_blank'><img src={FaceBookIcon} className='text-[21px] text-[#162449] busernameSocialIcon' /></a>:null}
           {userData?.socialMedia?.linkedin  && userData?.socialMedia?.linkedin.trim()  ?<a href={`${LinkAdjustmentsHandler(userData?.socialMedia?.linkedin)}`} target='_blank'><img src={LinkedInIcon} className='text-[21px] text-[#162449] busernameSocialIcon'/></a>:null}
           {userData?.socialMedia?.website && userData?.socialMedia?.website.trim()  ? <a href={`${LinkAdjustmentsHandler(userData?.socialMedia?.website)}`} target='_blank'><AiOutlineGlobal className='text-[21px] text-[#162449] busernameSocialIcon'/></a>:null }

                        {/* <img onClick={() => window.open("https://www.instagram.com/thedot_tech/", "_blank")} src={InstagramIcon} style={{}} className='busernameSocialIcon' />
                        <img onClick={() => window.open("https://www.facebook.com/profile.php?id=100078201942993", "_blank")} src={FaceBookIcon} style={{}} className='busernameSocialIcon' />
                        <img onClick={() => window.open("https://dribbble.com/surintherraja", "_blank")} src={DribbleIcon} style={{}} className='busernameSocialIcon' />
                        <img onClick={() => window.open("https://www.behance.net/warrenpeaceweb", "_blank")} src={BehanceIcon} style={{}} className='busernameSocialIcon' />
                        <img onClick={() => window.open("https://www.linkedin.com/in/surinther-raja-s-7370b1125/", "_blank")} src={LinkedInIcon} style={{}} className='busernameSocialIcon' />
                        <img onClick={() => window.open("https://thedottech.in", "_blank")} src={TwitterIcon} style={{}} className='busernameSocialIcon' /> */}
                    </div>
                </div>
                </div>
                <div className="" style={{backgroundColor: "#ffffff"}}>
                    <div className="btn-cont bg-white">
                    {userData?.mobileNo ?  <a style={{textDecoration: "none"}} href={`tel://${userData.mobileNo}`}><button className="phone-btn NeuExBlack"><img src={call} style={{width: "13px"}} /><span style={{marginBottom: "0px"}}>Call</span></button></a> : null }
                    {userData?.whatsapp ? <a style={{textDecoration: "none"}}  aria-label="Chat on WhatsApp" href={`https://wa.me/${userData?.whatsapp}`} > <button className="wa-btn NeuExBlack"><img src={whatsapp} style={{width: "15px"}} /><span style={{marginBottom: "0px"}}>WhatsApp</span></button></a> : null }
                    </div>
                    {/* <div className="typing-animation-container" style={{margin: "30px 0"}}>
      <p style={{fontSize: "small"}} className="MontserratR">We are seasoned in</p>
      <p>
        <span className="highlight MontserratEBold">{typedText}</span>
        {<span className="cursor" >|</span>}
      </p>
    </div> */}
                    <div className="min-h-[40vh]">

                        {/* <h2 className="NeuExBlack" style={{textAlign: "center"}}>Works & Portfolios</h2> */}
                        {
                        services?.length > 0  ?
                        <Fragment>
                        <div className="flex items-center ml-5 mt-3 mb-3 text-[21px] gilroyMedium justify-start  text-[#162449]" style={{fontWeight:700}}>SERVICES</div>
                        {/* <h3 className="NeuExBlack" style={{marginLeft: "15px", marginTop: "35px"}}>SERVICE</h3> */}
                        <ScrollMenu >
                            {services.map((webd, index) => (
                                <div className="vt-cardmain " style={{marginBottom:"30px",marginTop:"10px"}} key={index}>
                                <img src={webd.coverimage} className="vt-img rounded-[20px]" style={{height:"100px"}} /> 
                                <div className="flex flex-col gap-2 h-full py-4 my-auto  text-left ">
                                    <h3 style={{color:"#162449"}} className="GilroyBoldT text-[18px]">{ webd?.title?.substring(0,15) }{ webd.title?.length > 15 ? "..." : null }</h3>
                                    <h5 style={{color:"#3E4152"}} className="GilroyMedT  text-[13px]">{ webd?.description?.substring(0,40) }{ webd.description?.length > 40 ? "..." : null }</h5>
                                </div>
                                {/* <button className="disbtn GilroyBoldT" style={{color: "#162449"}} onClick={() => window.open(webd.link, "_blank")}>
                                    Discover
                                </button> */}
                            </div>
                            ))}
                        </ScrollMenu>
                        </Fragment>
                        :
                        null
                        }
                        {
                      products?.length > 0  ? 
                       <Fragment>
                        <div className="flex items-center ml-5 mt-3 mb-3 text-[21px] gilroyMedium justify-start  text-[#162449]" style={{fontWeight:700}}>PRODUCTS</div>
                        {/* <h3 className="NeuExBlack" style={{marginLeft: "15px", marginTop: "35px"}}>PRODUCT</h3> */}
                        <ScrollMenu>
                            {products.map((brand, index) => (
                                <div className="vt-cardmain" key={index} style={{marginBottom:"30px",marginTop:"10px"}}>
                                <img src={brand.coverimage} className="vt-img rounded-[20px]" style={{height:"100px"}} /> 
                                <div className="flex flex-col gap-2 h-full py-4  my-auto text-left ">
                                    <h3 style={{color:"#162449"}} className="GilroyBoldT text-[18px]">{brand?.title?.substring(0,30)}{ brand?.title?.length > 30 ? "..." : null }</h3>
                                    <h6 style={{color:"#3E4152"}} className="GilroyMedT text-[13px]">{brand?.description?.substring(0,60)}{ brand?.description?.length > 60 ? "..." : null }</h6>
                                </div>
                                {/* <button className="disbtn GilroyBoldT" style={{color: "#162449"}} onClick={() => window.open(brand.link, "_blank")}>
                                    Discover
                                </button> */}
                            </div>
                            ))}
                        </ScrollMenu>
                        </Fragment>
                        :
                        null
                       }
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-10">
          <Footer/>             
        </div>
        {/* <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}> */}
            {/* <img src={footerlogo} style={{width: "15%", maxWidth: "50px", padding: "20px 0"}} /> */}
        {/* </div> */}
        </div>
        }
        </Fragment>

    )
}

export default Index