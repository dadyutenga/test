import { useState } from "react";
import { useMessages, useDeleteMessage, useMarkMessageRead } from "@/hooks/use-contact";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, Trash2 } from "lucide-react";
import type { ContactMessage } from "@/types";

export default function MessagesAdmin() {
  const { data: messages, isLoading } = useMessages();
  const deleteMutation = useDeleteMessage();
  const markReadMutation = useMarkMessageRead();

  const [viewMessage, setViewMessage] = useState<ContactMessage | null>(null);

  function openMessage(msg: ContactMessage) {
    setViewMessage(msg);
    if (!msg.is_read) {
      markReadMutation.mutate(msg.id);
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Delete this message?")) return;
    await deleteMutation.mutateAsync(id);
    if (viewMessage?.id === id) setViewMessage(null);
  }

  function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Messages</h1>
        <Badge variant="outline" className="text-sm">
          {messages?.filter((m) => !m.is_read).length || 0} unread
        </Badge>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages?.map((msg) => (
                <TableRow
                  key={msg.id}
                  className={msg.is_read ? "" : "bg-primary/5"}
                >
                  <TableCell>
                    {msg.is_read ? (
                      <Badge variant="outline">Read</Badge>
                    ) : (
                      <Badge>New</Badge>
                    )}
                  </TableCell>
                  <TableCell className="font-semibold">{msg.name}</TableCell>
                  <TableCell>{msg.email}</TableCell>
                  <TableCell className="max-w-[150px] truncate">
                    {msg.subject || "—"}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(msg.created_at)}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openMessage(msg)}
                    >
                      <Eye size={14} />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(msg.id)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {(!messages || messages.length === 0) && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No messages yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!viewMessage} onOpenChange={() => setViewMessage(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Message Details</DialogTitle>
          </DialogHeader>
          {viewMessage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    From
                  </p>
                  <p className="font-semibold">{viewMessage.name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    Email
                  </p>
                  <a
                    href={`mailto:${viewMessage.email}`}
                    className="text-primary hover:underline"
                  >
                    {viewMessage.email}
                  </a>
                </div>
              </div>
              {viewMessage.subject && (
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    Subject
                  </p>
                  <p>{viewMessage.subject}</p>
                </div>
              )}
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  Message
                </p>
                <p className="whitespace-pre-wrap text-sm leading-relaxed bg-muted p-4 rounded-lg">
                  {viewMessage.message}
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                Received: {formatDate(viewMessage.created_at)}
              </p>
              <div className="flex justify-end gap-3 pt-2 border-t">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(viewMessage.id)}
                >
                  Delete
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewMessage(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
