import React from 'react'
import Logo from '../imgs/logo.png'
import './Sidebar.css'

import { SidebarData } from '../Data/Data';
import { UilSignOutAlt } from '@iconscout/react-unicons'

const Sidebar = () => {

    const [selected, setSelected] = React.useState(0);




    return (
        <div className="Sidebar">
            {/* logo */}
            <div className="logo">
                <img src={Logo} alt="" />
                <span>
                    ZAZIL
                </span>
            </div>
            {/* menu */}
            <div className="menu">
                {SidebarData.map((item, index) => {
                    return(
                        <div className={selected === index ? 'menuItem active' : 'menuItem' }
                        key={index}
                        onClick={() => setSelected(index)}
                        >
                            <item.icon/>
                            <span>
                                {item.heading}
                            </span>
                        </div>
                    )
                })}

                <div className="menuItem">
                    <UilSignOutAlt/>
                    
                </div>
                
                
            
            </div>
        </div>
    
    );
};

export default Sidebar