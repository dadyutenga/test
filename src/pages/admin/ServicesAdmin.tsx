import { useState } from "react";
import {
  useServices,
  useCreateService,
  useUpdateService,
  useDeleteService,
} from "@/hooks/use-services";
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
import { Plus, Pencil, Trash2, X } from "lucide-react";
import ImageUpload from "./components/ImageUpload";
import type { Service } from "@/types";

interface CategoryInput {
  name: string;
  description: string;
  image: string;
}

interface ServiceForm {
  title: string;
  description: string;
  image: string;
  categories: CategoryInput[];
}

const emptyForm: ServiceForm = {
  title: "",
  description: "",
  image: "",
  categories: [],
};

export default function ServicesAdmin() {
  const { data: services, isLoading } = useServices();
  const createMutation = useCreateService();
  const updateMutation = useUpdateService();
  const deleteMutation = useDeleteService();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<ServiceForm>(emptyForm);

  function openCreate() {
    setForm(emptyForm);
    setEditingId(null);
    setDialogOpen(true);
  }

  function openEdit(service: Service) {
    setForm({
      title: service.title,
      description: service.description,
      image: service.image,
      categories: service.categories.map((c) => ({
        name: c.name,
        description: c.description,
        image: c.image,
      })),
    });
    setEditingId(service.id);
    setDialogOpen(true);
  }

  async function handleSave() {
    const payload = {
      title: form.title,
      description: form.description,
      image: form.image,
      categories: form.categories,
    };

    if (editingId) {
      await updateMutation.mutateAsync({ id: editingId, data: payload });
    } else {
      await createMutation.mutateAsync(payload);
    }
    setDialogOpen(false);
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Delete this service?")) return;
    await deleteMutation.mutateAsync(id);
  }

  function updateField<K extends keyof ServiceForm>(key: K, value: ServiceForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function addCategory() {
    setForm((prev) => ({
      ...prev,
      categories: [...prev.categories, { name: "", description: "", image: "" }],
    }));
  }

  function updateCategory(index: number, field: keyof CategoryInput, value: string) {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.map((c, i) =>
        i === index ? { ...c, [field]: value } : c
      ),
    }));
  }

  function removeCategory(index: number) {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.filter((_, i) => i !== index),
    }));
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
        <h1 className="font-display text-3xl font-bold text-foreground">Services</h1>
        <Button onClick={openCreate} className="gap-2">
          <Plus size={16} /> Add Service
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Categories</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services?.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>
                    {service.image ? (
                      <img
                        src={service.image}
                        alt=""
                        className="w-16 h-12 object-cover rounded"
                      />
                    ) : (
                      <div className="w-16 h-12 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
                        No img
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-semibold">{service.title}</TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {service.description}
                  </TableCell>
                  <TableCell>{service.categories.length} categories</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEdit(service)}
                    >
                      <Pencil size={14} />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(service.id)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {(!services || services.length === 0) && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No services yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              {editingId ? "Edit Service" : "New Service"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="Service title"
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="Service description"
                rows={3}
              />
            </div>

            <ImageUpload
              value={form.image}
              onChange={(url) => updateField("image", url)}
            />

            <div>
              <div className="flex items-center justify-between mb-3">
                <Label className="text-base font-semibold">Categories</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addCategory}
                  className="gap-1"
                >
                  <Plus size={14} /> Add Category
                </Button>
              </div>
              <div className="space-y-4">
                {form.categories.map((cat, i) => (
                  <div key={i} className="border rounded-lg p-4 relative">
                    <button
                      type="button"
                      onClick={() => removeCategory(i)}
                      className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                    >
                      <X size={16} />
                    </button>
                    <div className="space-y-3 pr-6">
                      <Input
                        placeholder="Category name"
                        value={cat.name}
                        onChange={(e) => updateCategory(i, "name", e.target.value)}
                      />
                      <Textarea
                        placeholder="Category description"
                        value={cat.description}
                        onChange={(e) =>
                          updateCategory(i, "description", e.target.value)
                        }
                        rows={2}
                      />
                      <div className="space-y-1">
                        <Label className="text-xs">Image URL (or upload above)</Label>
                        <Input
                          placeholder="https://... or /media/..."
                          value={cat.image}
                          onChange={(e) => updateCategory(i, "image", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {form.categories.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No categories yet. Click "Add Category" to begin.
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={!form.title || !form.description || isSaving}
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
