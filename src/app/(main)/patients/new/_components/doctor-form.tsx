"use client";

import { CreateDoctor } from "@/actions/doctors/create-doctors";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { tryCatch } from "@/utils/try-catch";
import {
  doctorFormSchema,
  DoctorFormValuesTypes,
} from "@/validation/doctorform";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Plus, SaveIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export function DoctorForm() {
  const [open, setOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<DoctorFormValuesTypes>({
    resolver: zodResolver(doctorFormSchema),
    defaultValues: {
      name: "",
      email: "",
      commission: "",
      phone: "",
      degree: "",
    },
  });

  function onSubmit(formValues: DoctorFormValuesTypes) {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(CreateDoctor(formValues));

      if (error) {
        toast.error(
          error.message ?? "An unexpected error occor please try again",
        );
      }

      if (result?.status === "success") {
        toast.success(result.message);
        form.reset();
        setOpen(false);
      } else if (result?.status === "error") {
        toast.error(result.message);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="outline"
            className="w-full col-span-12 xl:col-span-2 h-9 self-end"
          >
            <Plus className="size-4" />
            Add Doctor
          </Button>
        }
      />
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Add New Doctor</DialogTitle>
          <DialogDescription>
            Enter the doctor's details including name, specialization, and
            contact information. This information will be used for patient
            records and report generation.
          </DialogDescription>
        </DialogHeader>
        <form id="form-commission">
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Doctor Name</FieldLabel>
                  <Input
                    id="name"
                    placeholder={fieldState.error?.message ?? "Priya Sharma"}
                    {...field}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    autoFocus
                  />
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    placeholder={
                      fieldState.error?.message ?? "priyasharama@email.com"
                    }
                    {...field}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                </Field>
              )}
            />
            <Controller
              name="commission"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="commission">Commision in (%)</FieldLabel>
                  <Input
                    id="commission"
                    placeholder={
                      fieldState.error?.message ?? "Enter Commission (0-100)"
                    }
                    {...field}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                </Field>
              )}
            />
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="phone">Phone</FieldLabel>
                  <PhoneInput
                    id="phone"
                    placeholder={
                      fieldState.error?.message ?? "Enter Phone Number"
                    }
                    {...field}
                    defaultCountry="IN"
                    autoComplete="off"
                    aria-invalid={fieldState.invalid}
                  />
                </Field>
              )}
            />
            <Controller
              name="degree"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="degree">Enter Degree</FieldLabel>
                  <Input
                    id="degree"
                    placeholder={fieldState.error?.message ?? "MBBS, MS, Etc."}
                    {...field}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                </Field>
              )}
            />
          </FieldGroup>
          <DialogFooter>
            <DialogClose
              render={
                <Button
                  variant="outline"
                  type="button"
                  disabled={isPending}
                  onClick={() => {
                    form.reset();
                  }}
                >
                  Cancel
                </Button>
              }
            />
            <Button
              type="button"
              disabled={isPending}
              onClick={form.handleSubmit(onSubmit)}
            >
              {isPending ? (
                <>
                  Saving... <Loader className="animate-spin" />
                </>
              ) : (
                <>
                  Save
                  <SaveIcon />
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
