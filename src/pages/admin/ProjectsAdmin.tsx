import { useState } from "react";
import { useProjects, useCreateProject, useUpdateProject, useDeleteProject } from "@/hooks/use-projects";
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
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import ImageUpload from "./components/ImageUpload";
import type { Project } from "@/types";

interface StepInput {
  step_title: string;
  description: string;
}

interface ProjectForm {
  title: string;
  category: string;
  image: string;
  featured: boolean;
  steps: StepInput[];
}

const emptyForm: ProjectForm = {
  title: "",
  category: "",
  image: "",
  featured: false,
  steps: [],
};

export default function ProjectsAdmin() {
  const { data: projects, isLoading } = useProjects();
  const createMutation = useCreateProject();
  const updateMutation = useUpdateProject();
  const deleteMutation = useDeleteProject();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<ProjectForm>(emptyForm);

  function openCreate() {
    setForm(emptyForm);
    setEditingId(null);
    setDialogOpen(true);
  }

  function openEdit(project: Project) {
    setForm({
      title: project.title,
      category: project.category,
      image: project.image,
      featured: !!project.featured,
      steps: project.steps.map((s) => ({
        step_title: s.step_title,
        description: s.description,
      })),
    });
    setEditingId(project.id);
    setDialogOpen(true);
  }

  async function handleSave() {
    const payload = {
      title: form.title,
      category: form.category,
      image: form.image,
      featured: form.featured ? 1 : 0,
      steps: form.steps,
    };

    if (editingId) {
      await updateMutation.mutateAsync({ id: editingId, data: payload });
    } else {
      await createMutation.mutateAsync(payload);
    }
    setDialogOpen(false);
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Delete this project?")) return;
    await deleteMutation.mutateAsync(id);
  }

  function updateField<K extends keyof ProjectForm>(key: K, value: ProjectForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function addStep() {
    setForm((prev) => ({
      ...prev,
      steps: [...prev.steps, { step_title: "", description: "" }],
    }));
  }

  function updateStep(index: number, field: keyof StepInput, value: string) {
    setForm((prev) => ({
      ...prev,
      steps: prev.steps.map((s, i) => (i === index ? { ...s, [field]: value } : s)),
    }));
  }

  function removeStep(index: number) {
    setForm((prev) => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index),
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
        <h1 className="font-display text-3xl font-bold text-foreground">Projects</h1>
        <Button onClick={openCreate} className="gap-2">
          <Plus size={16} /> Add Project
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Steps</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects?.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    {project.image ? (
                      <img
                        src={project.image}
                        alt=""
                        className="w-16 h-12 object-cover rounded"
                      />
                    ) : (
                      <div className="w-16 h-12 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
                        No img
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-semibold">{project.title}</TableCell>
                  <TableCell>{project.category}</TableCell>
                  <TableCell>
                    {project.featured ? (
                      <Badge>Featured</Badge>
                    ) : (
                      <Badge variant="outline">No</Badge>
                    )}
                  </TableCell>
                  <TableCell>{project.steps.length} steps</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEdit(project)}
                    >
                      <Pencil size={14} />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(project.id)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {(!projects || projects.length === 0) && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No projects yet
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
              {editingId ? "Edit Project" : "New Project"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={form.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  placeholder="Project title"
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Input
                  value={form.category}
                  onChange={(e) => updateField("category", e.target.value)}
                  placeholder="e.g. Residential"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Switch
                checked={form.featured}
                onCheckedChange={(v) => updateField("featured", v)}
              />
              <Label>Featured Project</Label>
            </div>

            <ImageUpload
              value={form.image}
              onChange={(url) => updateField("image", url)}
            />

            <div>
              <div className="flex items-center justify-between mb-3">
                <Label className="text-base font-semibold">Process Steps</Label>
                <Button variant="outline" size="sm" onClick={addStep} className="gap-1">
                  <Plus size={14} /> Add Step
                </Button>
              </div>
              <div className="space-y-3">
                {form.steps.map((step, i) => (
                  <div key={i} className="border rounded-lg p-4 relative">
                    <button
                      type="button"
                      onClick={() => removeStep(i)}
                      className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                    >
                      <X size={16} />
                    </button>
                    <div className="space-y-2 pr-6">
                      <Input
                        placeholder="Step title"
                        value={step.step_title}
                        onChange={(e) => updateStep(i, "step_title", e.target.value)}
                      />
                      <Textarea
                        placeholder="Step description"
                        value={step.description}
                        onChange={(e) => updateStep(i, "description", e.target.value)}
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
                {form.steps.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No steps yet. Click "Add Step" to begin.
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
                disabled={!form.title || !form.category || isSaving}
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
