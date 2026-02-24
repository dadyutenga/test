import { useState } from "react";
import {
  useTestimonials,
  useCreateTestimonial,
  useUpdateTestimonial,
  useDeleteTestimonial,
} from "@/hooks/use-testimonials";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
import { Plus, Pencil, Trash2 } from "lucide-react";
import ImageUpload from "./components/ImageUpload";
import type { Testimonial } from "@/types";

interface TestimonialForm {
  name: string;
  role: string;
  text: string;
  image: string;
}

const emptyForm: TestimonialForm = {
  name: "",
  role: "",
  text: "",
  image: "",
};

export default function TestimonialsAdmin() {
  const { data: testimonials, isLoading } = useTestimonials();
  const createMutation = useCreateTestimonial();
  const updateMutation = useUpdateTestimonial();
  const deleteMutation = useDeleteTestimonial();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<TestimonialForm>(emptyForm);

  function openCreate() {
    setForm(emptyForm);
    setEditingId(null);
    setDialogOpen(true);
  }

  function openEdit(testimonial: Testimonial) {
    setForm({
      name: testimonial.name,
      role: testimonial.role,
      text: testimonial.text,
      image: testimonial.image,
    });
    setEditingId(testimonial.id);
    setDialogOpen(true);
  }

  async function handleSave() {
    const payload = {
      name: form.name,
      role: form.role,
      text: form.text,
      image: form.image,
    };

    if (editingId) {
      await updateMutation.mutateAsync({ id: editingId, data: payload });
    } else {
      await createMutation.mutateAsync(payload);
    }
    setDialogOpen(false);
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Delete this testimonial?")) return;
    await deleteMutation.mutateAsync(id);
  }

  function updateField<K extends keyof TestimonialForm>(key: K, value: TestimonialForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const isSaving = createMutation.isPending || updateMutation.isPending;

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
        <h1 className="font-display text-3xl font-bold text-foreground">Testimonials</h1>
        <Button onClick={openCreate} className="gap-2">
          <Plus size={16} /> Add Testimonial
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Text</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials?.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>
                    {t.image ? (
                      <img
                        src={t.image}
                        alt=""
                        className="w-12 h-12 object-cover rounded-full"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-lg font-bold text-muted-foreground">
                        {t.name.charAt(0)}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-semibold">{t.name}</TableCell>
                  <TableCell>{t.role}</TableCell>
                  <TableCell className="max-w-[300px] truncate">{t.text}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEdit(t)}
                    >
                      <Pencil size={14} />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(t.id)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {(!testimonials || testimonials.length === 0) && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No testimonials yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              {editingId ? "Edit Testimonial" : "New Testimonial"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="Client name"
                />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Input
                  value={form.role}
                  onChange={(e) => updateField("role", e.target.value)}
                  placeholder="e.g. Property Developer"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Testimonial Text</Label>
              <Textarea
                value={form.text}
                onChange={(e) => updateField("text", e.target.value)}
                placeholder="What did the client say?"
                rows={4}
              />
            </div>

            <ImageUpload
              value={form.image}
              onChange={(url) => updateField("image", url)}
              label="Client Photo (optional)"
            />

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={!form.name || !form.role || !form.text || isSaving}
              >
                {isSaving ? "Saving..." : editingId ? "Update" : "Create"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
