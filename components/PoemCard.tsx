// === FILE: components/PoemCard.tsx ===
interface PoemCardProps {
  title: string;
  body: string;
  author: string;
}

export default function PoemCard({ title, body, author }: PoemCardProps) {
  return (
    <div className="bg-slate-800 rounded-xl p-4 shadow">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="my-2 text-slate-300 whitespace-pre-line">{body}</p>
      <p className="text-sm text-slate-400">— {author}</p>
    </div>
  );
}
