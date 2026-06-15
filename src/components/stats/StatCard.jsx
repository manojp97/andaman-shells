import { Card, CardContent } from "@/components/ui/card";

export function StatCard({ title, value, Icon, iconColor }) {
  return (
    <Card className="border rounded-xl shadow h-28">
      <CardContent className="flex items-center justify-between ">

        {/* TEXT */}
        <div className="pt-4">
          <p className="text-sm font-semibold text-muted-foreground">
            {title}
          </p>
          <h2 className="text-2xl font-bold">{value}</h2>
        </div>

        {/* ICON */}
        <Icon className={`h-7 w-7 mb-10 ${iconColor}`} />
      </CardContent>
    </Card>
  );
}