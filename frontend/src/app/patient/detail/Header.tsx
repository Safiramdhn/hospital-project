import { useRouter } from 'next/router';

const PatientDetailHeaderComponent: React.FC<{ patientName: string }> = ({ patientName }) => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between bg-gray-100 p-4 shadow-md">
      <button onClick={() => router.back()} className="text-blue-500 hover:underline">
        ← Back
      </button>
      <h1 className="text-xl font-semibold">{patientName}'s Details</h1>
    </div>
  );
};

export default PatientDetailHeaderComponent;
