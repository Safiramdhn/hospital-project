import { useRouter } from 'next/navigation';

const PatientDetailHeaderComponent: React.FC = () => {
  const router = useRouter();

  return (
    <div className=" bg-white p-4 shadow-md">
      <button onClick={() => router.back()} className="text-davysGray-500 hover:underline">
        ← Back
      </button>
    </div>
  );
};

export default PatientDetailHeaderComponent;
