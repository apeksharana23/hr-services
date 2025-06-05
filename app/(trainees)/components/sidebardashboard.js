"use client";

import Image from 'next/image';
import Link from 'next/link';
import logoSidebarImage from '@/app/img/logosidebar.svg'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { IconChevronDown } from '@tabler/icons-react';
import { IconCalendarWeek } from '@tabler/icons-react';
import { IconListCheck } from '@tabler/icons-react';
import { IconEdit } from '@tabler/icons-react';
import { IconUser } from '@tabler/icons-react';
import { IconDashboard } from '@tabler/icons-react';


export default function SideBar() {
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

                                        <MenuItem icon={<IconDashboard size={20} />} className='menu-item' component={<Link href="/dashboard-trainees"></Link>}> Dashboard </MenuItem>

                                        <MenuItem icon={<IconCalendarWeek size={20} />} className='menu-item' component={<Link href="/my-courses"></Link>}> My Courses </MenuItem>

                                   </Menu>
                              </Sidebar>
                         </div>
                    </div>
               </div>
          </div>
     );
}