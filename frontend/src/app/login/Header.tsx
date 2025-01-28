import Image from 'next/image';

const LoginHeaderComponent = () => {
  return (
    <header className="bg-white shadow-lg py-4">
      <div className="flex items-center justify-center">
        <Image src="/logo.png" alt="Sakinah Idaman Hospital Logo" width={100} height={100} />
        <h1 className="ml-4 text-2xl font-bold text-black">RSU Sakina Idaman Yogyakarta</h1>
      </div>
    </header>
  );
};

export default LoginHeaderComponent;