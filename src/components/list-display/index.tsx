interface ListDisplayProps {
  items: string[];
  title: string;
  ordered?: boolean;
}

export default function ListDisplay({ items, title, ordered = false }: ListDisplayProps) {
  if (!items.length) {
    return null;
  }

  const ListTag = ordered ? 'ol' : 'ul';

  return (
    <div className="w-full max-w-md">
      <h3 className="my-4 text-lg font-bold text-gray-800">{title}</h3>
      <ListTag className={`list-inside ${ordered ? 'list-decimal' : 'list-disc'} text-gray-600`}>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ListTag>
    </div>
  );
}
