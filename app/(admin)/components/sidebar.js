"use client";

import Image from 'next/image';
import Link from 'next/link';
import logoSidebarImage from '@/app/img/logosidebar.svg'
import { IconChevronDown } from '@tabler/icons-react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { IconCalendarWeek } from '@tabler/icons-react';
import { IconListCheck } from '@tabler/icons-react';
import { IconEdit } from '@tabler/icons-react';
import { IconUser } from '@tabler/icons-react';


export default function SideBarDashboard() {
     return (
          <div className='main-wrapper'>
               <div className='sidebar'>
                    <div className='sidebar-logo'>
                         <Link href="/" className='logo-hr'>
                              <Image src={logoSidebarImage} alt="Logo" width={100} height={100} className='logo-sidebar' />
                         </Link>
                    </div>
                    <div className='sidebar-inner'>
                         <div className='sidebar-inner-menu'>
                              <Sidebar className='sidebar-menu'>
                                   <Menu iconShape="square" className='sidebar-menu' icons={<IconChevronDown size={20} />}>
                                        
                                   <SubMenu label="Employees" icon={<IconUser size={50} />} className='menu-item'>
                                             <Link href="/Employees"><MenuItem> Employee List </MenuItem></Link>
                                             <Link href="/add-employee"><MenuItem>Add Employee </MenuItem></Link>
                                             <Link href="/designation"><MenuItem>Designation </MenuItem></Link>
                                             <Link href="/policies"><MenuItem>Policies </MenuItem></Link>

                                        </SubMenu>
                                        <SubMenu label="Training" icon={<IconEdit size={50} />} className='menu-item'>
                                            <Link href="#"><MenuItem> Trainees List </MenuItem></Link>
                                             <MenuItem> Line charts </MenuItem>
                                        </SubMenu>
                                        <SubMenu label="Attendance" icon={<IconListCheck size={50} />} className='menu-item'>
                                             <MenuItem> Pie charts </MenuItem>
                                             <MenuItem> Line charts </MenuItem>
                                        </SubMenu>
                                        <MenuItem icon={<IconCalendarWeek size={20} />} className='menu-item'> Holidays </MenuItem>
                                        
                                   </Menu>
                              </Sidebar>
                         </div>
                    </div>
               </div>
          </div>
     );
}


