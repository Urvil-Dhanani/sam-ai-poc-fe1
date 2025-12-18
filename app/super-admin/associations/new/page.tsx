"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Building2,
  User,
  Mail,
  ArrowRight,
  ArrowLeft,
  Globe,
  Phone,
  MapPin,
  Shield,
  Sparkles,
} from "lucide-react";
import { Bot } from "lucide-react"; // Import the Bot component
import { API_CALL, API_URL } from "@/components/apis/ApiRoutes";
import { ErrorAlert } from "@/components/Alerts/Alert";

export const websiteRegex =
  /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/i;

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function CreateAssociationPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [associationInfo, setAssociationInfo] = useState({
    name: "",
    description: "",
    industry: "",
    size: "",
    website: "",
    phone: "",
    address: "",
    errors: { name: false, website: false },
  });
  
  const [adminInfo, setAdminInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    errors: {
      firstName: false,
      lastName: false,
      email: false,
      emailValid: false,
    },
  });
  const [features, setFeatures] = useState({
    aiChat: true,
    emailNotifications: true,
  });

  const SetAssociations = (value: string, peram: string) => {
    setAssociationInfo((prev) => ({
      ...prev,
      [peram]: value,
      errors: { ...prev.errors, [peram]: false },
    }));
  };

  const SetAdmin = (value: string, peram: string) => {
    setAdminInfo((prev) => ({
      ...prev,
      [peram]: value,
      errors: { ...prev.errors, [peram]: false },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const response = await API_CALL(
        "post",
        API_URL.SUPER_ADMIN.ASSOCIATIONS,
        {
          name: associationInfo.name,
          description: associationInfo.description,
          industry: associationInfo.industry,
          expected_members: associationInfo.size,
          website: associationInfo.website,
          phone: associationInfo.phone,
          address: associationInfo.address,
          admin_first_name: adminInfo.firstName,
          admin_email: adminInfo.email,
          admin_last_name: adminInfo.lastName,
          admin_phone: adminInfo.phone,
          ai_chat: features.aiChat,
          email_notification: features.emailNotifications,
        },
        true
      );
      
      if (response?.status === 1) {
        router.push("/super-admin");
      }
    } catch (error: any) {
      ErrorAlert(
        error?.message || "Failed to create association. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const ManageStep1 = () => {
    let hasError = false;
    const updatedErrors: { name: boolean; website: boolean } = {
      name: false,
      website: false,
    };
    if (!associationInfo.name.trim()) {
      hasError = true;
      updatedErrors.name = true;
    }
    if (
      associationInfo.website &&
      !websiteRegex.test(associationInfo.website)
    ) {
      hasError = true;
      updatedErrors.website = true;
      // ErrorAlert("Please enter a valid website URL.");
    }
    setAssociationInfo((prev) => ({
      ...prev,
      errors: updatedErrors,
    }));
    if (!hasError) {
      setStep(2);
    }
  };

  const formatPhone = (value: any) => {
    const digits = value.replace(/\D/g, "");

    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}${digits.slice(3)}`;
    return `${digits.slice(0, 3)}${digits.slice(3, 6)}${digits.slice(6, 12)}`;
  };

  const ManageStep2 = () => {
    let hasError = false;
    const updatedErrors: {
      firstName: boolean;
      lastName: boolean;
      email: boolean;
      emailValid: boolean;
    } = { firstName: false, lastName: false, email: false, emailValid: false };
    if (!adminInfo.firstName.trim()) {
      hasError = true;
      updatedErrors.firstName = true;
    }
    if (!adminInfo.lastName.trim()) {
      hasError = true;
      updatedErrors.lastName = true;
    }
    if (!adminInfo.email.trim()) {
      hasError = true;
      updatedErrors.email = true;
    }
    if (adminInfo.email && !emailRegex.test(adminInfo.email)) {
      hasError = true;
      updatedErrors.emailValid = true;
    }
    setAdminInfo((prev) => ({
      ...prev,
      errors: updatedErrors,
    }));
    if (!hasError) {
      setStep(3);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with back button */}
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="mb-4 -ml-2"
          >
            <ArrowLeft className="size-4 mr-2" />
            Back to Associations
          </Button>
          <div className="flex items-center gap-4">
            <div className="size-14 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/20">
              <Building2 className="size-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Create New Association</h1>
              <p className="text-muted-foreground mt-1">
                Set up a new association and assign an admin user to manage it.
              </p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors"
              style={{
                backgroundColor: step >= 1 ? "#3b82f6" : "#e5e7eb",
                color: step >= 1 ? "#ffffff" : "#6b7280",
              }}
            >
              <span className="size-6 rounded-full bg-primary-foreground/20 flex items-center justify-center text-xs">
                1
              </span>
              Association Info
            </div>
            <div className="h-px w-8 bg-border" />
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors"
              style={{
                backgroundColor: step >= 2 ? "#3b82f6" : "#e5e7eb",
                color: step >= 2 ? "#ffffff" : "#6b7280",
              }}
            >
              <span className="size-6 rounded-full bg-primary-foreground/20 flex items-center justify-center text-xs">
                2
              </span>
              Admin Setup
            </div>
            <div className="h-px w-8 bg-border" />
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors"
              style={{
                backgroundColor: step >= 3 ? "#3b82f6" : "#e5e7eb",
                color: step >= 3 ? "#ffffff" : "#6b7280",
              }}
            >
              <span className="size-6 rounded-full bg-primary-foreground/20 flex items-center justify-center text-xs">
                3
              </span>
              Features
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-6">
              <Card className="bg-card border-border overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-primary via-primary/60 to-transparent" />
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Building2 className="size-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">
                        Association Details
                      </CardTitle>
                      <CardDescription>
                        Basic information about the association
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Association Name{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="e.g., Healthcare Professionals Association"
                      className="bg-input border-border h-11"
                      maxLength={255}
                      value={associationInfo?.name}
                      onChange={(e) => SetAssociations(e.target.value, "name")}
                      required
                    />
                    {associationInfo?.errors?.name && (
                      <p className="text-sm text-destructive">
                        This field is Required.
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="description"
                      className="text-sm font-medium"
                    >
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Brief description of the association's mission and purpose..."
                      className="bg-input border-border min-h-28 resize-none"
                      maxLength={750}
                      onChange={(e) =>
                        SetAssociations(e.target.value, "description")
                      }
                      value={associationInfo?.description}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="industry" className="text-sm font-medium">
                        Industry
                      </Label>
                      <Select
                        value={associationInfo?.industry}
                        onValueChange={(value) =>
                          SetAssociations(value, "industry")
                        }
                      >
                        <SelectTrigger className="bg-input border-border h-11 w-full">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="manufacturing">
                            Manufacturing
                          </SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="size" className="text-sm font-medium">
                        Expected Members
                      </Label>
                      <Select
                        value={associationInfo?.size}
                        onValueChange={(value) =>
                          SetAssociations(value, "size")
                        }
                      >
                        <SelectTrigger className="bg-input border-border h-11 w-full">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">1 - 100</SelectItem>
                          <SelectItem value="medium">100 - 500</SelectItem>
                          <SelectItem value="large">500 - 1,000</SelectItem>
                          <SelectItem value="enterprise">1,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-accent via-accent/60 to-transparent" />
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="size-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Globe className="size-6 text-accent" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">
                        Contact Information
                      </CardTitle>
                      <CardDescription>
                        How members and visitors can reach the association
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="website"
                        className="text-sm font-medium flex items-center gap-2"
                      >
                        <Globe className="size-4 text-muted-foreground" />
                        Website
                      </Label>
                      <Input
                        id="website"
                        type="url"
                        placeholder="https://example.com"
                        className="bg-input border-border h-11"
                        value={associationInfo?.website}
                        maxLength={255}
                        onChange={(e) =>
                          SetAssociations(e.target.value, "website")
                        }
                      />
                      {associationInfo?.errors?.website && (
                        <p className="text-sm text-destructive">
                          Please enter a valid website URL.
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="text-sm font-medium flex items-center gap-2"
                      >
                        <Phone className="size-4 text-muted-foreground" />
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        className="bg-input border-border h-11"
                        maxLength={13}
                        value={associationInfo?.phone}
                        onChange={(e) => {
                          const digits = e.target.value.replace(/\D/g, "");
                          SetAssociations(formatPhone(digits), "phone");
                        }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="address"
                      className="text-sm font-medium flex items-center gap-2"
                    >
                      <MapPin className="size-4 text-muted-foreground" />
                      Address
                    </Label>
                    <Input
                      id="address"
                      placeholder="123 Main Street, City, State, ZIP"
                      className="bg-input border-border h-11"
                      value={associationInfo?.address}
                      maxLength={300}
                      onChange={(e) =>
                        SetAssociations(e.target.value, "address")
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={() => {
                    ManageStep1();
                  }}
                  className="px-8"
                >
                  Continue
                  <ArrowRight className="size-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <Card className="bg-card border-border overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-chart-3 via-chart-3/60 to-transparent" />
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="size-12 rounded-xl bg-chart-3/10 flex items-center justify-center">
                      <User className="size-6 text-chart-3" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">
                        Association Admin
                      </CardTitle>
                      <CardDescription>
                        Assign an admin user to manage this association
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="adminFirstName"
                        className="text-sm font-medium"
                      >
                        First Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="adminFirstName"
                        placeholder="John"
                        className="bg-input border-border h-11"
                        value={adminInfo?.firstName}
                        onChange={(e) => SetAdmin(e.target.value, "firstName")}
                        required
                      />
                      {adminInfo?.errors?.firstName && (
                        <p className="text-sm text-destructive">
                          This field is Required.
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="adminLastName"
                        className="text-sm font-medium"
                      >
                        Last Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="adminLastName"
                        placeholder="Doe"
                        className="bg-input border-border h-11"
                        value={adminInfo?.lastName}
                        onChange={(e) => SetAdmin(e.target.value, "lastName")}
                        required
                      />
                      {adminInfo?.errors?.lastName && (
                        <p className="text-sm text-destructive">
                          This field is Required.
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="adminEmail"
                        className="text-sm font-medium"
                      >
                        Email Address{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="adminEmail"
                        type="email"
                        placeholder="admin@example.com"
                        className="bg-input border-border h-11"
                        value={adminInfo?.email}
                        onChange={(e) => SetAdmin(e.target.value, "email")}
                        required
                      />
                      {adminInfo?.errors?.email && (
                        <p className="text-sm text-destructive">
                          This field is Required.
                        </p>
                      )}
                      {adminInfo?.errors?.emailValid && (
                        <p className="text-sm text-destructive">
                          Please provide proper email.
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="adminPhone"
                        className="text-sm font-medium"
                      >
                        Phone Number
                      </Label>
                      <Input
                        id="adminPhone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        className="bg-input border-border h-11"
                        value={adminInfo?.phone}
                        onChange={(e) => {
                          const digits = e.target.value.replace(/\D/g, "");
                          SetAdmin(formatPhone(digits), "phone");
                        }}
                      />
                    </div>
                  </div>
                  {/* <div className="space-y-2">
                    <Label htmlFor="adminTitle" className="text-sm font-medium">
                      Job Title
                    </Label>
                    <Input
                      id="adminTitle"
                      placeholder="e.g., Benefits Manager, HR Director"
                      className="bg-input border-border h-11"
                    />
                  </div> */}
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                >
                  <ArrowLeft className="size-4 mr-2" />
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={() => ManageStep2()}
                  className="px-8"
                >
                  Continue
                  <ArrowRight className="size-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <Card className="bg-card border-border overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-chart-4 via-chart-4/60 to-transparent" />
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="size-12 rounded-xl bg-chart-4/10 flex items-center justify-center">
                      <Sparkles className="size-6 text-chart-4" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">
                        Features & Settings
                      </CardTitle>
                      <CardDescription>
                        Configure the features available for this association
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Bot className="size-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">SAM AI Chat</p>
                        <p className="text-sm text-muted-foreground">
                          AI-powered member support chatbot
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={features?.aiChat}
                      onCheckedChange={(checked) =>
                        setFeatures((prev) => ({
                          ...prev,
                          aiChat: checked,
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Mail className="size-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Automated member email outreach
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={features?.emailNotifications}
                      onCheckedChange={(checked) =>
                        setFeatures((prev) => ({
                          ...prev,
                          emailNotifications: checked,
                        }))
                      }
                    />
                  </div>

                  {/* <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
                        <Shield className="size-5 text-chart-3" />
                      </div>
                      <div>
                        <p className="font-medium">Member Portal</p>
                        <p className="text-sm text-muted-foreground">
                          Self-service portal for members
                        </p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div> */}
                </CardContent>
              </Card>

              {/* Summary Card */}
              <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="size-5 text-primary" />
                    Ready to Create
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Once created, the association admin will receive an email
                    invitation to set up their account and begin configuring
                    their organization's benefit and member data.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <div className="px-2 py-1 rounded bg-primary/10 text-primary">
                      AI Chat Enabled
                    </div>
                    <div className="px-2 py-1 rounded bg-accent/10 text-accent">
                      Email Notifications
                    </div>
                    <div className="px-2 py-1 rounded bg-chart-3/10 text-chart-3">
                      Member Portal
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(2)}
                >
                  <ArrowLeft className="size-4 mr-2" />
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 bg-gradient-to-r from-primary to-primary/80"
                >
                  {isSubmitting
                    ? "Creating Association..."
                    : "Create Association"}
                  <ArrowRight className="size-4 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
