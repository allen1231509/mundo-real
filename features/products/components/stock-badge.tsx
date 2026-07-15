import { Badge } from "@/components/ui/badge";

export function StockBadge({ stock }: { stock: number }) {
  if (stock <= 0) return <Badge variant="destructive">Agotado</Badge>;
  if (stock <= 5) return <Badge variant="outline">Últimas unidades</Badge>;
  return <Badge variant="secondary">En stock</Badge>;
}
