export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen bg-slate-900">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-teal-500"></div>
    </div>
  );
}
