interface PoemCardProps {
  title: string;
  body: string;
  author: string;
  category: string;
}

export default function PoemCard({
  title,
  body,
  author,
  category,
}: PoemCardProps) {
  return (
    <div className="bg-slate-800 rounded-xl p-4 shadow">
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold">{title}</h2>
        <span className="text-xs text-teal-500 bg-teal-900/30 px-2 py-1 rounded-full">
          {category}
        </span>
      </div>
      <p className="my-2 text-slate-300 whitespace-pre-line">{body}</p>
      <p className="text-sm text-slate-400">— {author}</p>
    </div>
  );
}
