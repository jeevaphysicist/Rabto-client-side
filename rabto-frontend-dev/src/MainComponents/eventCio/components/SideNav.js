import React from 'react';
import logo from "../../../Assets/logonew.png"


function SideNav() {
    return(
        <div className='snavmain'>
            <div className='snavcomplogo'>
                <img src={logo} className='enavlogo' /> 
            </div>
            <div className='snavcompmenu'>
                    <div className='h-14 flex  items-center text-[30px]' style={{backgroundColor: "#9EE86F", borderTopRightRadius: "20px", borderBottomRightRadius: "20px", marginRight: "20px"}}><span className='pl-8'>HOME</span></div>
                    <div className='h-14 flex  items-center text-[30px] text-[30px]' > <span className='pl-8'>ARRIVAL</span></div>
                    <div className='h-14 flex  items-center text-[30px]' > <span className='pl-8'>MEAL DATA</span></div>
                    <div className='h-14 flex  items-center text-[30px]' > <span className='pl-8'>EVENT GOODIES</span></div>
                    <div className='h-14 flex  items-center text-[30px]' > <span className='pl-8'>LIVE HALL COUNT</span></div>
                    <div className='h-14 flex  items-center text-[30px]' > <span className='pl-8'>STALL GOODIES</span></div>
            </div>
            <div className='snavcomplog'>
                <h1 className='text-[30px]'>logout</h1>
            </div>
        </div>
    )
}


export default SideNav