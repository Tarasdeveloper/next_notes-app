import Login from '@/components/Login';
// import Image from 'next/image';

export default function Home() {
    return (
        <div id="hero">
            <div className="hero-img">
                <img src="hero-img.jpeg" alt="hero-img" />
            </div>
            <div className="hero-login">
                <Login />
            </div>
        </div>
    );
}
