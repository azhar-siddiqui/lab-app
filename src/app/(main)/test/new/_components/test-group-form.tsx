"use client";

import { TestCategoryType } from "@/actions/test-category/get-test-category";
import { CreateTestGroup } from "@/actions/test-group/create-test-group";
import { TestGroupByIdType } from "@/actions/test-group/get-test-group-by-id";
import { UpdateTestGroup } from "@/actions/test-group/update-test-group";
import { UnitType } from "@/actions/test-unit/get-test-unit";
import { RichTextEditor } from "@/components/rich-text-editor/editor";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { tryCatch } from "@/utils/try-catch";
import {
  testGroupFormSchema,
  TestGroupFormValuesType,
} from "@/validation/test-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, ChevronsUpDownIcon, Loader, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { Fragment, useState, useTransition } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { UnitForm } from "./unit-form";

interface TestGroupFormProps {
  mode?: "create" | "edit";
  testGroup?: TestGroupByIdType;
  testCategories: TestCategoryType[];
  testUnit: UnitType[];
}

export function TestGroupForm({
  mode,
  testGroup,
  testCategories,
  testUnit,
}: Readonly<TestGroupFormProps>) {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const [isPending, startTransition] = useTransition();

  const form = useForm<TestGroupFormValuesType>({
    resolver: zodResolver(testGroupFormSchema),
    defaultValues: {
      testGroupName: testGroup?.name ?? "",
      shortName: testGroup?.shortName ?? "",
      category: testGroup?.testCategoryId ?? "",
      price: testGroup?.price.toString() || "",
      isOptionalTestGroupNameOnReport:
        testGroup?.isTestGroupNameVissibleOnReport ?? false,
      interpretation: testGroup?.interpretation ?? "",
      testRows:
        mode === "edit" && testGroup?.tests.length
          ? testGroup.tests.map((test) => ({
              id: test.id,
              testName: test.name,
              fullName: test.fullName ?? "",
              unit: test.testUnitId,
              normalMale: test.normalValueMale,
              normalFemale: test.normalValueFemale,
              optional: test.isOptionalTest,
            }))
          : [
              {
                testName: "",
                fullName: "",
                unit: "",
                normalMale: "",
                normalFemale: "",
                optional: false,
              },
            ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "testRows",
  });

  const watchedTestRows = form.watch("testRows");

  function handleOptionalChange(index: number, checked: boolean) {
    form.setValue(`testRows.${index}.optional`, checked);

    if (checked) {
      form.setValue(`testRows.${index}.testName`, "");
      form.setValue(`testRows.${index}.unit`, "");
      form.setValue(`testRows.${index}.normalMale`, "");
      form.setValue(`testRows.${index}.normalFemale`, "");
      setOpenIndex((current) => (current === index ? null : current));
    }
  }

  function onSubmit(value: TestGroupFormValuesType) {
    startTransition(async () => {
      if (mode === "edit") {
        const response = await UpdateTestGroup(testGroup!.id, value);
        if (response.status === "error") {
          toast.error(response.message);
          return;
        }
        toast.success(response.message);
      } else {
        const { data: result, error } = await tryCatch(CreateTestGroup(value));

        if (error) {
          toast.error("An unexpected error occor please try again");
        }

        if (result?.status === "success") {
          toast.success(result.message);
          form.reset();
        } else if (result?.status === "error") {
          toast.error(result.message);
        }
      }
      router.push("/test");
    });
  }

  return (
    <form
      id="form-rhf-demo"
      onSubmit={form.handleSubmit(onSubmit)}
      className="mt-4"
    >
      <FieldGroup className="gap-4">
        <div className="grid gap-4 grid-cols-12">
          <Controller
            name="testGroupName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="col-span-12 xl:col-span-4"
              >
                <FieldLabel htmlFor="testGroupName">Test Group Name</FieldLabel>
                <Input
                  id="testGroupName"
                  placeholder="e.g. Complete Blood Count"
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
          <Controller
            name="shortName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="col-span-12 xl:col-span-4"
              >
                <FieldLabel htmlFor="shortName">Short Name</FieldLabel>
                <Input
                  id="shortName"
                  placeholder="e.g. CBC"
                  {...field}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="category"
            control={form.control}
            render={({ field, fieldState }) => {
              // Find the selected category based on the reference ID (field.value)
              const selectedCategory = testCategories?.find(
                (item) => item.id === field.value,
              );

              return (
                <Field
                  data-invalid={fieldState.invalid}
                  className="col-span-12 xl:col-span-4"
                >
                  <FieldLabel htmlFor="form-category">Category</FieldLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger
                      render={
                        <Button
                          id="form-category"
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          aria-invalid={fieldState.invalid}
                          className="bg-background hover:bg-background w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
                        >
                          {selectedCategory ? (
                            <span className="flex min-w-0 items-center gap-2">
                              <span className="truncate">
                                {selectedCategory.name}
                              </span>
                            </span>
                          ) : (
                            <span className="text-muted-foreground">
                              Select category
                            </span>
                          )}
                          <ChevronsUpDownIcon
                            className="text-muted-foreground/80 shrink-0"
                            aria-hidden="true"
                          />
                        </Button>
                      }
                    />
                    <PopoverContent
                      className="border-input w-full min-w-(--radix-popper-anchor-width) p-0"
                      align="start"
                    >
                      <Command>
                        <CommandInput placeholder="Search Category..." />
                        <CommandList>
                          <CommandEmpty>No item found.</CommandEmpty>
                          {testCategories.map((item) => (
                            <Fragment key={item.id}>
                              <CommandGroup>
                                <CommandItem
                                  key={item.id}
                                  value={item.id} // Use ID as the value
                                  onSelect={(currentValue: string) => {
                                    field.onChange(currentValue); // Set the ID in the form field
                                    setOpen(false);
                                  }}
                                  className="pl-6 rounded-none"
                                >
                                  {item.name}
                                  {field.value === item.id && (
                                    <CheckIcon size={16} className="ml-auto" />
                                  )}
                                </CommandItem>
                              </CommandGroup>
                            </Fragment>
                          ))}
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              );
            }}
          />
          <Controller
            name="price"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="col-span-12 xl:col-span-4"
              >
                <FieldLabel htmlFor="form-price">Price</FieldLabel>
                <Input
                  {...field}
                  id="form-price"
                  aria-invalid={fieldState.invalid}
                  placeholder="e.g. 500"
                  autoComplete="off"
                  type="number"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="isOptionalTestGroupNameOnReport"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                orientation="horizontal"
                className="col-span-12 xl:col-span-4 self-end border px-2 py-1.75 rounded-lg has-data-[state=checked]:bg-input/30 has-data-[state=checked]:text-foreground  has-data-[state=checked]:z-10"
              >
                <Checkbox
                  id="form-isOptionalTestGroupNameOnReport"
                  name={field.name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <FieldLabel htmlFor="form-isOptionalTestGroupNameOnReport">
                  Display test group in the report
                </FieldLabel>
              </Field>
            )}
          />
          <UnitForm />
          <Button
            className="w-full col-span-12 xl:col-span-2 self-end "
            type="button"
            variant="outline"
            onClick={() =>
              append({
                testName: "",
                fullName: "",
                unit: "",
                normalMale: "",
                normalFemale: "",
                optional: false,
              })
            }
          >
            Add Test Row
          </Button>

          {fields.map((field, index) => {
            const isOptionalRow = Boolean(watchedTestRows?.[index]?.optional);

            return (
            <div
              key={field.id}
              className="col-span-12 gap-4 border border-inpuut p-4 rounded-lg flex items-center"
            >
              {/* Index */}
              <div className="flex justify-center items-center border border-input rounded-lg px-3 h-8 bg-input/30 self-start mt-6 lg:self-end">
                {index + 1}
              </div>
              <div className="grid flex-1 grid-cols-12 gap-4">
                <Controller
                  name={`testRows.${index}.testName`}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="col-span-12 md:col-span-6 lg:col-span-3"
                    >
                      <FieldLabel htmlFor={`testRows.${index}.testName`}>
                        Short Name
                      </FieldLabel>
                      <Input
                        id={`testRows.${index}.testName`}
                        placeholder="e.g. HGB"
                        {...field}
                        disabled={isOptionalRow}
                        aria-invalid={fieldState.invalid}
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name={`testRows.${index}.fullName`}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="col-span-12 md:col-span-6 lg:col-span-5"
                    >
                      <FieldLabel htmlFor={`testRows.${index}.fullName`}>
                        Full Name
                        {isOptionalRow ? (
                          <span className="text-destructive"> *</span>
                        ) : null}
                      </FieldLabel>
                      <Input
                        id={`testRows.${index}.fullName`}
                        placeholder="e.g. Hemoglobin"
                        {...field}
                        aria-invalid={fieldState.invalid}
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name={`testRows.${index}.unit`}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <UnitCombobox
                      field={field}
                      fieldState={fieldState}
                      index={index}
                      units={testUnit}
                      openIndex={openIndex}
                      setOpenIndex={setOpenIndex}
                      disabled={isOptionalRow}
                    />
                  )}
                />

                <Controller
                  name={`testRows.${index}.normalMale`}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="col-span-12 md:col-span-6 lg:col-span-3"
                    >
                      <FieldLabel htmlFor={`testRows.${index}.normalMale`}>
                        Normal Value (Male)
                      </FieldLabel>
                      <Input
                        id={`testRows.${index}.normalMale`}
                        placeholder="e.g. 13 - 17"
                        {...field}
                        disabled={isOptionalRow}
                        aria-invalid={fieldState.invalid}
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name={`testRows.${index}.normalFemale`}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="col-span-12 md:col-span-6 lg:col-span-3"
                    >
                      <FieldLabel htmlFor={`testRows.${index}.normalFemale`}>
                        Normal Value (Female)
                      </FieldLabel>
                      <Input
                        id={`testRows.${index}.normalFemale`}
                        placeholder="e.g. 12 - 15"
                        {...field}
                        disabled={isOptionalRow}
                        aria-invalid={fieldState.invalid}
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name={`testRows.${index}.optional`}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      orientation="horizontal"
                      className="col-span-12 h-8 self-end rounded-lg border px-2 has-data-[state=checked]:z-10 has-data-[state=checked]:bg-input/30 has-data-[state=checked]:text-foreground md:col-span-6 lg:col-span-2"
                    >
                      <Checkbox
                        id={`testRows.${index}.optional`}
                        name={field.name}
                        checked={field.value}
                        onCheckedChange={(checked) =>
                          handleOptionalChange(index, checked === true)
                        }
                      />
                      <FieldLabel htmlFor={`testRows.${index}.optional`}>
                        Optional
                      </FieldLabel>
                    </Field>
                  )}
                />

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => remove(index)}
                  className="col-span-12 self-end md:col-span-6 lg:col-span-1"
                >
                  Remove
                </Button>
              </div>
            </div>
          );
          })}

          <Controller
            name="interpretation"
            control={form.control}
            render={({ field }) => (
              <Field className="col-span-12">
                <FieldLabel htmlFor="interpretation">Interpretation</FieldLabel>
                <RichTextEditor field={field} />
              </Field>
            )}
          />
        </div>
      </FieldGroup>
      <Button
        type="submit"
        className="w-full sm:w-fit mt-8"
        disabled={isPending}
      >
        {isPending ? (
          <>
            Saving
            <Loader className="animate-spin" />
          </>
        ) : (
          <>
            {mode === "edit" ? "Update Test Group" : "Create Test Group"}
            <Save className="size-4" />
          </>
        )}
      </Button>
    </form>
  );
}

function UnitOptions({
  units,
  value,
  onSelect,
}: Readonly<{
  units: { id: string; name: string }[];
  value?: string;
  onSelect: (val: string) => void;
}>) {
  return (
    <CommandGroup heading="Units">
      {units.map((unit) => (
        <CommandItem
          key={unit.id}
          value={unit.name}
          keywords={[unit.name]}
          onSelect={() => onSelect(unit.id)}
        >
          {unit.name}
          {value === unit.id && <CheckIcon size={16} className="ml-auto" />}
        </CommandItem>
      ))}
    </CommandGroup>
  );
}

function UnitCombobox({
  field,
  fieldState,
  index,
  units,
  openIndex,
  setOpenIndex,
  disabled = false,
}: any) {
  const selectedUnit = units.find(
    (item: { id: string; name: string }) => item.id === field.value,
  );

  const handleUnitSelect =
    (onChange: (val: string) => void) => (value: string) => {
      onChange(value);
      setOpenIndex(null);
    };

  return (
    <Field
      data-invalid={fieldState.invalid}
      className="col-span-12 md:col-span-6 lg:col-span-2"
    >
      <FieldLabel htmlFor={`testRows.${index}.unit`}>Unit</FieldLabel>
      <Popover
        open={!disabled && openIndex === index}
        onOpenChange={(isOpen) => {
          if (!disabled) {
            setOpenIndex(isOpen ? index : null);
          }
        }}
      >
        <PopoverTrigger
          render={
            <Button
              id={`testRows.${index}.unit`}
              variant="outline"
              role="combobox"
              type="button"
              disabled={disabled}
              aria-expanded={openIndex === index}
              aria-invalid={fieldState.invalid}
              className={cn(
                "justify-between font-normal",
                fieldState.invalid && "border-destructive text-destructive",
              )}
            >
              {selectedUnit ? (
                <span className="truncate">{selectedUnit.name}</span>
              ) : (
                <span className="text-muted-foreground">Select unit</span>
              )}

              <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          }
        />

        <PopoverContent
          className="border-input w-full min-w-(--radix-popper-anchor-width) p-0"
          align="start"
        >
          <Command>
            <CommandInput placeholder="Search Unit..." />
            <CommandList>
              <CommandEmpty>No unit found.</CommandEmpty>

              <UnitOptions
                units={units}
                value={field.value}
                onSelect={handleUnitSelect(field.onChange)}
              />
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
}
