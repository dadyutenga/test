import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderKanban, Wrench, MessageSquare } from "lucide-react";
import { useProjects } from "@/hooks/use-projects";
import { useServices } from "@/hooks/use-services";
import { useMessages } from "@/hooks/use-contact";

export default function Dashboard() {
  const { data: projects } = useProjects();
  const { data: services } = useServices();
  const { data: messages } = useMessages();

  const unreadCount = messages?.filter((m) => !m.is_read).length || 0;

  const stats = [
    { label: "Total Projects", value: projects?.length || 0, icon: FolderKanban },
    { label: "Total Services", value: services?.length || 0, icon: Wrench },
    { label: "Unread Messages", value: unreadCount, icon: MessageSquare },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-foreground mb-8">Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-body text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon size={20} className="text-primary" />
            </CardHeader>
            <CardContent>
              <span className="font-display text-3xl font-bold">{stat.value}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
