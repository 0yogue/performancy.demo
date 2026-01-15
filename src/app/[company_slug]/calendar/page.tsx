import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { Calendar, Clock, Users, Video } from "lucide-react";
import type { SessionUser } from "@/types";
import { Button } from "@/components/ui";

export default async function CalendarPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const today_events = [
    {
      id: "1",
      title: "Discovery Call - Tech Corp",
      time: "09:00 - 09:30",
      type: "discovery",
      attendees: 2,
    },
    {
      id: "2",
      title: "Demo de Produto - MegaCorp",
      time: "14:00 - 15:00",
      type: "demo",
      attendees: 4,
    },
    {
      id: "3",
      title: "Follow-up - StartupXYZ",
      time: "16:30 - 17:00",
      type: "follow_up",
      attendees: 1,
    },
  ];

  const week_days = ["Seg", "Ter", "Qua", "Qui", "Sex"];
  const current_day = new Date().getDay();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Agenda</h1>
          <p className="text-muted-foreground">
            Gerencie suas reuniões e compromissos
          </p>
        </div>
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          Nova Reunião
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hoje</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {today_events.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                >
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Video className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{event.title}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {event.attendees}
                      </span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Entrar
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Esta Semana</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-2 text-center">
              {week_days.map((day, idx) => (
                <div
                  key={day}
                  className={`p-2 rounded-lg ${
                    idx + 1 === current_day
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/50"
                  }`}
                >
                  <p className="text-xs font-medium">{day}</p>
                  <p className="text-lg font-bold">{13 + idx}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Reuniões esta semana</span>
                <span className="font-bold">8</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Horas em calls</span>
                <span className="font-bold">6.5h</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
