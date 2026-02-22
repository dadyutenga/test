import { useState, useEffect } from "react";
import { useContactInfo, useUpdateContactInfo } from "@/hooks/use-contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

export default function ContactAdmin() {
  const { data: contactInfo, isLoading } = useContactInfo();
  const updateMutation = useUpdateContactInfo();

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (contactInfo) {
      setPhone(contactInfo.phone);
      setEmail(contactInfo.email);
      setWhatsapp(contactInfo.whatsapp);
      setAddress(contactInfo.address);
    }
  }, [contactInfo]);

  async function handleSave() {
    await updateMutation.mutateAsync({ phone, email, whatsapp, address });
    toast({ title: "Contact info updated" });
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
      <h1 className="font-display text-3xl font-bold text-foreground mb-8">
        Contact Information
      </h1>

      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle className="font-display text-lg">Edit Contact Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Phone Number</Label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+255 620 569 000"
            />
          </div>
          <div className="space-y-2">
            <Label>Email Address</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label>WhatsApp Number</Label>
            <Input
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="+255 620 569 000"
            />
          </div>
          <div className="space-y-2">
            <Label>Address</Label>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Dar es Salaam, Tanzania"
            />
          </div>
          <div className="pt-4">
            <Button onClick={handleSave} disabled={updateMutation.isPending}>
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
