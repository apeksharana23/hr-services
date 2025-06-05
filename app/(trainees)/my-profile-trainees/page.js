import ProfileForm from "./components/profile";
import { cookies } from 'next/headers';
import Link from 'next/link';

export default async function MyProfile() {
    const cookieStore = await cookies();
    const trainee_token = cookieStore.get('trainee_token')?.value;
    return (
        <div className='page-wrapper bg-colorr'>
            <div className="container">
                <div className="employee">
                    <div className='employee-inner'>
                        <div className="page-top">
                            <h1 className="page-title">My Profile</h1>
                            <nav className="breadcrumb-nav" aria-label="breadcrumb">
                                <ol className="breadcrumb mb-0">
                                    <li className="breadcrumb-item">
                                        <Link href="/" className='home1'>Home</Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        <Link href="/my-profile-trainee" className='home1'>Profile</Link>
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <ProfileForm trainee_token={trainee_token} />
        </div>);
}