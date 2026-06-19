import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ContentCard({ item, basePath }: { item: any; basePath: string }) {
  return (
    <Link href={`${basePath}/${item.slug}`}>
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">{item.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-3 text-sm text-muted-foreground">{item.description}</p>
          <p className="mt-4 text-xs text-muted-foreground">
            {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString("en-IN") : ""}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}