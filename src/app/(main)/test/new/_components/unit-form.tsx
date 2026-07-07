import { CreatTestUnit } from "@/actions/test-unit/create-test-unit";
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
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { tryCatch } from "@/utils/try-catch";
import { UnitFormValuesType, unitFromSchema } from "@/validation/test-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, SaveIcon } from "lucide-react";

import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export function UnitForm() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [pending, startTransition] = useTransition();

  const form = useForm<UnitFormValuesType>({
    resolver: zodResolver(unitFromSchema),
    defaultValues: {
      unit: "",
    },
  });

  // CreatTestUnit;

  function onSubmit(formValues: UnitFormValuesType) {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(CreatTestUnit(formValues));

      if (error) {
        toast.error(
          error.message ?? "An unexpected error occor please try again",
        );
      }

      if (result?.status === "success") {
        toast.success(result.message);
        form.reset();
        setIsOpen(false);
      } else if (result?.status === "error") {
        toast.error(result.message);
      }
    });
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(!isOpen);
      }}
    >
      <DialogTrigger
        render={
          <Button
            className="w-full col-span-12 xl:col-span-2 self-end"
            type="button"
            variant="outline"
          >
            Add Unit
          </Button>
        }
      />
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Test Name Identification Unit</DialogTitle>
          <DialogDescription>
            Lab results use specific metric units. Common examples you might
            include in a dropdown or as a suffix to your input field include
          </DialogDescription>
        </DialogHeader>
        <form id="form-unit">
          <FieldGroup className="mb-4">
            <Controller
              name="unit"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="unit">Unit</FieldLabel>
                  <Input
                    id="unit"
                    placeholder="e.g. g/dL"
                    {...field}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    autoFocus
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
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
                  disabled={pending}
                  onClick={() => {
                    form.reset();
                  }}
                >
                  Cancel
                </Button>
              }
            ></DialogClose>
            <Button
              type="button"
              disabled={pending}
              onClick={form.handleSubmit(onSubmit)}
            >
              {pending ? (
                <>
                  Saving <Loader className="animate-spin" />
                </>
              ) : (
                <>
                  Save Unit
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
