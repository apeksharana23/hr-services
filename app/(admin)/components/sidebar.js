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
import { IconDashboard } from '@tabler/icons-react';


export default function SideBarDashboard() {
     return (
          <div className='main-wrapper'>
               <div className='sidebar'>
                    <div className='sidebar-logo'>
                         <Link href="/" className='logo-hr'>
                              <Image
                                   src={logoSidebarImage}
                                   alt="Logo"
                                   width={100}
                                   height={100}
                                   className='logo-sidebar'
                              />
                         </Link>
                    </div>
                    <div className='sidebar-inner'>
                         <div className='sidebar-inner-menu'>
                              <Sidebar className='sidebar-menu'>
                                   <Menu iconShape="square" className='sidebar-menu' icons={<IconChevronDown size={20} />}>

                                        <MenuItem icon={<IconDashboard size={20} />} className='menu-item' component={<Link href="/dashboard"></Link>}> Dashboard </MenuItem>


                                        <SubMenu label="Employees" icon={<IconUser size={50} />} className='menu-item'>
                                             <MenuItem component={<Link href="/Employees"></Link>}>Employee Details</MenuItem>
                                             <MenuItem component={<Link href="/add-employee"></Link>}>Add Employee </MenuItem>
                                             <MenuItem component={<Link href="/designation"></Link>}>Designation </MenuItem>
                                             <MenuItem component={<Link href="/policies"></Link>}>Policies </MenuItem>

                                        </SubMenu>
                                        <SubMenu label="Training" icon={<IconEdit size={50} />} className='menu-item'>
                                             <MenuItem component={<Link href="/training-list"></Link>}> Training List </MenuItem>
                                             <MenuItem component={<Link href="/traines"></Link>}> Traines </MenuItem>
                                             <MenuItem component={<Link href="/training-type"></Link>}> Training Type</MenuItem>

                                        </SubMenu>
                                        <SubMenu label="Attendance" icon={<IconListCheck size={50} />} className='menu-item'>
                                             <MenuItem> Employees Attendance </MenuItem>
                                             <MenuItem>  </MenuItem>
                                        </SubMenu>
                                        <MenuItem icon={<IconCalendarWeek size={20} />} className='menu-item' component={<Link href="/holidays"></Link>}> Holidays </MenuItem>

                                   </Menu>
                              </Sidebar>
                         </div>
                    </div>
               </div>
          </div>
     );
}


