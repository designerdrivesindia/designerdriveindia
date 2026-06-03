"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import { Input, Textarea, Select, FormField } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";
import type { EntityConfig, AdminField } from "@/lib/admin-entities";
import { saveEntity } from "@/server/actions/content.actions";

type Values = Record<string, unknown>;

function toInputValue(field: AdminField, raw: unknown): string | boolean {
  if (field.type === "boolean") return Boolean(raw);
  if (raw == null) return "";
  if (field.type === "list") return Array.isArray(raw) ? raw.join("\n") : String(raw);
  if (field.type === "json") return JSON.stringify(raw, null, 2);
  return String(raw);
}

export function EntityForm({
  config,
  id,
  initial,
}: {
  config: EntityConfig;
  id: string | null;
  initial: Values | null;
}) {
  const router = useRouter();
  const toast = useUIStore((s) => s.toast);
  const [pending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [state, setState] = useState<Record<string, string | boolean>>(() => {
    const init: Record<string, string | boolean> = {};
    for (const f of config.fields) {
      init[f.key] = toInputValue(f, initial?.[f.key]);
    }
    return init;
  });

  function set(key: string, value: string | boolean) {
    setState((s) => ({ ...s, [key]: value }));
  }

  function buildPayload(): { payload: Values; errors: Record<string, string> } {
    const payload: Values = {};
    const errs: Record<string, string> = {};

    for (const f of config.fields) {
      const v = state[f.key];
      switch (f.type) {
        case "boolean":
          payload[f.key] = Boolean(v);
          break;
        case "number": {
          const s = String(v).trim();
          if (s === "") {
            if (f.required) errs[f.key] = "Required";
          } else if (Number.isNaN(Number(s))) {
            errs[f.key] = "Must be a number";
          } else {
            payload[f.key] = Number(s);
          }
          break;
        }
        case "list": {
          const arr = String(v).split("\n").map((x) => x.trim()).filter(Boolean);
          if (f.required && arr.length === 0) errs[f.key] = "Add at least one";
          payload[f.key] = arr;
          break;
        }
        case "json": {
          const s = String(v).trim();
          if (s === "") {
            if (f.required) errs[f.key] = "Required";
            else payload[f.key] = null;
          } else {
            try {
              payload[f.key] = JSON.parse(s);
            } catch {
              errs[f.key] = "Invalid JSON";
            }
          }
          break;
        }
        default: {
          const s = String(v).trim();
          if (f.required && s === "") errs[f.key] = "Required";
          payload[f.key] = s;
        }
      }
    }
    return { payload, errors: errs };
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { payload, errors: errs } = buildPayload();
    setErrors(errs);
    if (Object.keys(errs).length) {
      toast({ variant: "error", title: "Please fix the highlighted fields" });
      return;
    }
    startTransition(async () => {
      const res = await saveEntity(config.key, id, payload);
      if (!res.ok) {
        toast({ variant: "error", title: "Could not save", description: res.error });
        return;
      }
      toast({ variant: "success", title: `${config.singular} saved` });
      router.push(`/admin/${config.key}`);
      router.refresh();
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-x-6 gap-y-5 rounded-xl border border-line bg-paper p-6 md:grid-cols-2">
        {config.fields.map((f) => (
          <Field
            key={f.key}
            field={f}
            value={state[f.key]}
            error={errors[f.key]}
            onChange={(v) => set(f.key, v)}
          />
        ))}
      </div>

      <div className="flex items-center justify-end gap-3">
        <Button type="button" variant="outline" size="md" onClick={() => router.push(`/admin/${config.key}`)}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" size="md" disabled={pending}>
          {pending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          Save {config.singular}
        </Button>
      </div>
    </form>
  );
}

function Field({
  field,
  value,
  error,
  onChange,
}: {
  field: AdminField;
  value: string | boolean;
  error?: string;
  onChange: (v: string | boolean) => void;
}) {
  const wrap = field.full || field.type === "json" || field.type === "list" || field.type === "textarea";

  if (field.type === "boolean") {
    return (
      <label className={cn("flex items-center gap-3 self-end py-2", wrap && "md:col-span-2")}>
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          className="size-4 rounded border-line-strong text-gold focus:ring-gold"
        />
        <span className="text-sm font-medium text-ink-soft">{field.label}</span>
      </label>
    );
  }

  return (
    <FormField
      label={field.label}
      htmlFor={field.key}
      error={error}
      required={field.required}
      className={cn(wrap && "md:col-span-2")}
    >
      {field.type === "select" ? (
        <Select id={field.key} value={String(value)} invalid={!!error} onChange={(e) => onChange(e.target.value)}>
          <option value="">Select…</option>
          {field.options?.map((o) => <option key={o} value={o}>{o}</option>)}
        </Select>
      ) : field.type === "textarea" || field.type === "list" ? (
        <Textarea
          id={field.key}
          value={String(value)}
          invalid={!!error}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : field.type === "json" ? (
        <Textarea
          id={field.key}
          value={String(value)}
          invalid={!!error}
          spellCheck={false}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-32 font-mono text-xs"
        />
      ) : (
        <Input
          id={field.key}
          type={field.type === "number" ? "number" : "text"}
          step="any"
          value={String(value)}
          invalid={!!error}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {field.help && <p className="text-xs text-ink-muted">{field.help}</p>}
    </FormField>
  );
}
