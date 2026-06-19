"use client";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// স্টেট ম্যানেজমেন্টের জন্য ইন্টারফেস ডিফাইন করা হয়েছে
export interface FormState {
  success: boolean;
  message?: string;
  fieldErrors?: {
    [key: string]: string[] | undefined;
  };
}

export interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "textarea" | "date" | "url";
  required?: boolean;
  placeholder?: string;
}

export function ContentForm<TRecord>({ 
  action, 
  fields, 
  submitLabel = "Publish" 
}: { 
  action: (prevState: any, formData: FormData) => Promise<FormState>;
  fields: FieldConfig[];
  submitLabel?: string;
  defaultValues?: TRecord;
}) {
  // initial state হিসেবে একটি টাইপড অবজেক্ট দেওয়া হয়েছে
  const [state, formAction, isPending] = useActionState(action, { success: false });

  return (
    <form action={formAction} className="space-y-5 max-w-2xl">
      {/* গ্লোবাল এরর মেসেজ হ্যান্ডলিং */}
      {state && !state.success && state.fieldErrors?._form && (
        <p className="text-sm text-destructive">{state.fieldErrors._form[0]}</p>
      )}

      {fields.map((field) => {
        const fieldError = state && !state.success ? state.fieldErrors?.[field.name]?.[0] : undefined;
        return (
          <div key={field.name} className="space-y-1.5">
            <Label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="text-destructive"> *</span>}
            </Label>
            
            {field.type === "textarea" ? (
              <Textarea id={field.name} name={field.name} placeholder={field.placeholder} />
            ) : (
              <Input id={field.name} name={field.name} type={field.type} placeholder={field.placeholder} />
            )}
            
            {fieldError && <p className="text-sm text-destructive">{fieldError}</p>}
          </div>
        );
      })}
      
      <Button type="submit" disabled={isPending}>
        {isPending ? "Publishing..." : submitLabel}
      </Button>
    </form>
  );
}