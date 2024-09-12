import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function AlertWidget() {
  const notifications = [
    { id: 1, message: "New message from John", time: "2 minutes ago" },
    { id: 2, message: "You have a new follower", time: "1 hour ago" },
    { id: 3, message: "Your order has been shipped", time: "3 hours ago" },
    { id: 4, message: "Payment received", time: "5 hours ago" },
    { id: 5, message: "New comment on your post", time: "1 day ago" },
    { id: 6, message: "Reminder: Team meeting", time: "1 day ago" },
    { id: 7, message: "Your subscription is expiring soon", time: "2 days ago" },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <Button variant="ghost" size="sm">
            Mark all as read
          </Button>
        </div>
        <ScrollArea className="h-[300px] overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="mb-4 last:mb-0 p-3 hover:bg-accent rounded-lg transition-colors"
            >
              <p className="text-sm font-medium">{notification.message}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {notification.time}
              </p>
            </div>
          ))}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
