'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

const CreatePatientHeaderComponent = () => {
  const router = useRouter();

  return (
    <header className="bg-white shadow-lg py-4">
      <div className="flex items-center justify-between px-4">
        <Image src="/logo.png" alt="Sakinah Idaman Hospital Logo" width={100} height={100} />
        <h1 className="text-2xl font-bold text-black">Pasien Form</h1>
        <button
          className="bg-charcoal-500 hover:bg-charcoal-700 text-white font-bold py-2 px-4 rounded-md"
          onClick={() => router.back()} // Back to previous navigation
        >
          Kembali
        </button>
      </div>
    </header>
  );
};

export default CreatePatientHeaderComponent;
