import { ContentCard } from "./content-card";

interface BaseContentRecord { id: string; slug: string; title: string; description: string; publishedAt: Date; department?: string | null; }

export function ContentListPage({ items, basePath, heading }: any) {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">{heading}</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item: any) => <ContentCard key={item.id} item={item} basePath={basePath} />)}
      </div>
    </div>
  );
}