import { useState } from "react";
import { apiUpload } from "@/core/api/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageIcon } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label = "Image" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const result = await apiUpload(file);
      onChange(result.url);
    } catch {
      console.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {value ? (
        <div className="relative w-full h-40 rounded-lg overflow-hidden border border-border">
          <img src={value} alt="" className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="w-full h-40 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
          <ImageIcon size={32} className="text-muted-foreground" />
        </div>
      )}
      <Input
        type="file"
        accept="image/*"
        onChange={handleChange}
        disabled={uploading}
        className="cursor-pointer"
      />
      {uploading && <p className="text-xs text-muted-foreground">Uploading...</p>}
    </div>
  );
}
