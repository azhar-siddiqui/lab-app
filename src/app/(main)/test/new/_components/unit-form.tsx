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
import { UnitFormValuesType, unitFromSchema } from "@/validation/test-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, SaveIcon } from "lucide-react";

import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";

export function UnitForm() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<UnitFormValuesType>({
    resolver: zodResolver(unitFromSchema),
    defaultValues: {
      unit: "",
    },
  });

  function onSubmit(formValues: UnitFormValuesType) {
    console.log(formValues);
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
                    placeholder={fieldState.error?.message ?? "Enter unit"}
                    {...field}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    autoFocus
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
            ></DialogClose>
            <Button
              type="button"
              disabled={isPending}
              onClick={form.handleSubmit(onSubmit)}
            >
              {isPending ? (
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
