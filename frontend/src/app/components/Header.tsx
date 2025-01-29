import { useRouter } from 'next/navigation';
import Image from 'next/image';

const MainHeader: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('Authorization'); // If using localStorage

    // Redirect to login page
    router.push('/login');
  };

  return (
    <header className="bg-white py-2.5 border-b-2 border-gray-300">
      <div className="flex items-center justify-between">
        <div className="flex justify-center pl-2">
          <Image src="/logo.png" alt="Sakinah Idaman Hospital Logo" width={100} height={100} />
          <h1 className="ml-4 text-md font-bold text-black">RSU Sakina Idaman Yogyakarta</h1>
        </div>
        <div className="pr-2">
          <button 
            onClick={handleLogout} 
            className="bg-charcoal-700 text-white hover:bg-charcoal-400 px-3 py-1.5 rounded-md text-xs font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
