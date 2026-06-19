import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContentDetailPage({ item, extraFields }: any) {
  return (
    <article className="container mx-auto px-4 py-10 max-w-3xl">
      <h1 className="text-3xl font-bold mb-2">{item.title}</h1>
      {item.department && <p className="text-muted-foreground mb-4">{item.department}</p>}
      {extraFields?.map((f: any) => <p key={f.label} className="text-sm">{f.label}: {f.value}</p>)}
      <div className="prose mt-6 mb-8">{item.description}</div>
      {item.pdfUrl && <Button asChild><a href={item.pdfUrl}>Download PDF</a></Button>}
    </article>
  );
}