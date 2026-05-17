"use client";

import { DoctorType } from "@/actions/doctors/get-doctors";
import { CreatePatient } from "@/actions/patient/create-patient";
import { GetPatientByIdType } from "@/actions/patient/get-patient-by-id";
import { UpdatePatient } from "@/actions/patient/update-patient";
import { TestGroupType } from "@/actions/test-group/get-test-group";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Age, Designation, Gender } from "@/generated/prisma/enums";
import { getGenderIcon } from "@/lib/getGender";
import {
  patientFormSchema,
  PatientFormValuesType,
} from "@/validation/patientform";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronsUpDownIcon,
  Loader,
  Save,
  SearchIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { DoctorForm } from "./doctor-form";

interface PatientRegistrationFormProps {
  doctors: DoctorType[];
  testGroups: TestGroupType[];
  patient?: GetPatientByIdType;
  mode?: "create" | "edit";
}
export function PatientRegistrationForm({
  doctors,
  testGroups,
  patient,
  mode = "create",
}: Readonly<PatientRegistrationFormProps>) {
  console.log("patient==>", patient);
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<PatientFormValuesType>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      date: patient?.date ? new Date(patient.date) : new Date(),
      reference: patient?.reports?.[0]?.doctorId ?? "",
      designation: patient?.designation ?? Designation.Mr,
      patientName: patient?.name ?? "",
      phone: patient?.contactNumber ?? "",
      gender: patient?.gender ?? Gender.Male,
      age: patient?.age ?? "",
      ageType: patient?.ageType ?? Age.Year,
      email: patient?.email ?? "",
      address: patient?.address ?? "",
      testGroupId:
        patient?.reports?.[0]?.testGroups?.map((group) => ({
          id: group.testGroupId,
        })) ?? [],
      totalRs: Number(patient?.totalRs) || 0,
      discount: Number(patient?.discount) || 0,
      amountReceived: Number(patient?.ammountRecived) || 0,
      balance: Number(patient?.balance) || 0,
      remarks: patient?.remarks ?? "",
    },
  });

  const selectedTests = form.watch("testGroupId");
  const discount = Number(form.watch("discount")) || 0;
  const amountReceived = Number(form.watch("amountReceived")) || 0;

  const totalAmount = testGroups
    .filter((group) =>
      selectedTests.some((selected) => selected.id === group.id),
    )
    .reduce((sum, group) => sum + Number(group.price), 0);

  const discountAmount = (totalAmount * discount) / 100;
  const finalAmount = totalAmount - discountAmount;
  const balanceAmount = finalAmount - amountReceived;

  function onSubmit(formData: PatientFormValuesType) {
    startTransition(async () => {
      const response =
        mode === "edit"
          ? await UpdatePatient(patient!.id, formData)
          : await CreatePatient(formData);

      if (response.status === "error") {
        toast.error(
          response.message ?? "An unexpected error occor please try again",
        );
      }

      if (response.status === "success") {
        toast.success(response.message);
        form.reset();
        router.push(`/patient-report/${response.data?.reportId}`);
        setOpen(false);
      } else if (response?.status === "error") {
        toast.error(response.message);
      }
    });

    console.log(formData);
  }

  useEffect(() => {
    form.setValue("totalRs", finalAmount);

    form.setValue("balance", Math.max(0, balanceAmount));
  }, [finalAmount, balanceAmount, form]);

  return (
    <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-4">
        <div className="grid gap-4 grid-cols-12">
          <div className="w-full max-w-2xl col-span-12 xl:col-span-9">
            <h1 className="leading-none font-semibold text-2xl tracking-tight">
              Patient Registration Form
            </h1>
            <p className="text-muted-foreground text-sm mt-2">
              Register the patient by entering basic personal and contact
              information to ensure accurate identification and smooth handling
              of appointments, records, and medical services.
            </p>
          </div>
          <Controller
            name="date"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="w-full col-span-12 xl:col-span-3"
              >
                <FieldLabel htmlFor="form-date">Date</FieldLabel>
                <Popover>
                  <PopoverTrigger
                    render={
                      <Button
                        variant="outline"
                        id="form-date"
                        className="w-full justify-between font-normal"
                      >
                        {field.value.toDateString()}
                        <ChevronDownIcon />
                      </Button>
                    }
                  />
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </Field>
            )}
          />
          <Controller
            name="reference"
            control={form.control}
            render={({ field, fieldState }) => {
              // Find the selected doctor based on the reference ID (field.value)
              const selectedDoctor = doctors.find(
                (item) => item.id === field.value,
              );

              return (
                <Field
                  data-invalid={fieldState.invalid}
                  className="col-span-12 xl:col-span-4"
                >
                  <FieldLabel htmlFor="form-reference">Reference</FieldLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger
                      render={
                        <Button
                          id="form-reference"
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          aria-invalid={fieldState.invalid}
                          className="bg-background hover:bg-background w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
                        >
                          {selectedDoctor ? (
                            <span className="flex min-w-0 items-center gap-2">
                              <span className="truncate">
                                Dr. {selectedDoctor.name}
                              </span>
                            </span>
                          ) : (
                            <span className="text-muted-foreground">
                              Select Doctor
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
                        <CommandInput placeholder="Search Doctor..." />
                        <CommandList>
                          <CommandEmpty>No item found.</CommandEmpty>
                          {doctors.map((item) => (
                            <Fragment key={item.id}>
                              <CommandGroup heading={item.specialization}>
                                <CommandItem
                                  key={item.id}
                                  value={item.id} // Use ID as the value
                                  onSelect={(currentValue) => {
                                    field.onChange(currentValue); // Set the ID in the form field
                                    setOpen(false);
                                  }}
                                  className="pl-6 rounded-none"
                                >
                                  Dr. {item.name}
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
                </Field>
              );
            }}
          />
          <DoctorForm />
          <Controller
            name="designation"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="col-span-12 xl:col-span-2"
              >
                <FieldLabel htmlFor="designation">Designation</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Designation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Object.values(Designation).map((value) => (
                        <SelectItem key={value} value={value}>
                          {value}.
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            )}
          />
          <Controller
            name="patientName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="col-span-12 xl:col-span-4"
              >
                <FieldLabel htmlFor="patientName">Patient Name</FieldLabel>
                <Input
                  id="patientName"
                  placeholder={
                    fieldState.error?.message ?? "Enter Patient Name"
                  }
                  {...field}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  autoFocus
                />
              </Field>
            )}
          />
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="col-span-12 xl:col-span-4"
              >
                <FieldLabel htmlFor="form-phone">Phone Number</FieldLabel>
                <PhoneInput
                  id="form-phone"
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
            name="gender"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="col-span-12 xl:col-span-4"
              >
                <FieldLabel htmlFor="form-gender">Gender</FieldLabel>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex gap-4"
                >
                  {Object.values(Gender).map((gender) => (
                    <FieldLabel
                      htmlFor={gender}
                      key={gender}
                      className="*:data-[slot=field]:py-2 has-data-[state=checked]:bg-primary/65 has-data-[state=checked]:text-primary-foreground  has-data-[state=checked]:z-10"
                    >
                      <Field
                        orientation="horizontal"
                        className="cursor-pointer"
                      >
                        <FieldContent>
                          <FieldTitle>{getGenderIcon(gender)}</FieldTitle>
                        </FieldContent>
                        <RadioGroupItem
                          value={gender}
                          id={gender}
                          className="text-primary bg-accent data-[state=checked]:bg-primary-foreground! data-[state=checked]:border-primary-foreground data-[state=checked]:[&_svg]:fill-primary after:absolute after:inset-0 p-0"
                        />
                      </Field>
                    </FieldLabel>
                  ))}
                </RadioGroup>
              </Field>
            )}
          />
          <Controller
            name="age"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="col-span-12 xl:col-span-2"
              >
                <FieldLabel htmlFor="form-age">Age</FieldLabel>
                <Input
                  {...field}
                  id="form-age"
                  aria-invalid={fieldState.invalid}
                  placeholder={fieldState.error?.message ?? "Enter Age"}
                  autoComplete="off"
                  type="number"
                />
              </Field>
            )}
          />
          <Controller
            name="ageType"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="col-span-12 xl:col-span-2"
              >
                <FieldLabel htmlFor="form-ageType">Age Type</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Age Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Object.values(Age).map((value) => (
                        <SelectItem key={value} value={value}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="col-span-12">
                <FieldLabel htmlFor="form-email">Email</FieldLabel>
                <Input
                  type="email"
                  id="form-email"
                  placeholder={fieldState.error?.message ?? "Enter Email"}
                  {...field}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
              </Field>
            )}
          />
          <Controller
            name="address"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="col-span-12">
                <FieldLabel htmlFor="form-address">Address</FieldLabel>
                <Textarea
                  id="form-address"
                  placeholder={
                    fieldState.error?.message ?? "Enter Patient Address"
                  }
                  className="h-26 resize-none"
                  {...field}
                />
              </Field>
            )}
          />
          <div className="grid grid-cols-12 col-span-12 gap-4">
            <Card className="col-span-12 lg:col-span-6">
              <CardHeader>
                <CardTitle>Test List</CardTitle>
                <CardDescription className="mt-2">
                  <InputGroup>
                    <InputGroupInput placeholder="Search..." />
                    <InputGroupAddon>
                      <SearchIcon />
                    </InputGroupAddon>
                  </InputGroup>
                </CardDescription>
              </CardHeader>
              <CardContent className="h-full max-h-96 overflow-y-auto">
                <Controller
                  name="testGroupId"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      {fieldState.error && (
                        <p className="text-sm text-destructive">
                          {fieldState.error.message}
                        </p>
                      )}

                      <div className="space-y-4">
                        {testGroups.map((testGroupItem, i) => {
                          const checked = isSelected(
                            field.value,
                            testGroupItem.id,
                          );

                          return (
                            <div
                              key={testGroupItem.id}
                              className={i === 0 ? "mt-0" : "mt-4"}
                            >
                              <TestGroupSelector
                                item={testGroupItem}
                                checked={checked}
                                onChange={(checked) =>
                                  handleTestSelection(
                                    checked,
                                    field.value,
                                    field.onChange,
                                    testGroupItem.id,
                                  )
                                }
                              />
                            </div>
                          );
                        })}
                      </div>
                    </Field>
                  )}
                />
              </CardContent>
            </Card>

            <div className="col-span-12 lg:col-span-6">
              <Card>
                <CardHeader>
                  <CardTitle>Test Billing</CardTitle>
                  <CardDescription className="mt-2">
                    Payment Detail
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-full max-h-96 overflow-y-auto space-y-4 gap-4">
                  <FieldGroup className="grid grid-cols-12">
                    <Controller
                      name="totalRs"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field
                          data-invalid={fieldState.invalid}
                          className="col-span-6"
                        >
                          <FieldLabel htmlFor="form-totalRs">
                            Total Rs.
                          </FieldLabel>
                          <Input
                            {...field}
                            id="form-totalRs"
                            aria-invalid={fieldState.invalid}
                            placeholder={
                              fieldState.error?.message ?? "Total Rs."
                            }
                            value={field.value}
                            readOnly
                          />
                        </Field>
                      )}
                    />
                    <Controller
                      name="discount"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field
                          data-invalid={fieldState.invalid}
                          className="col-span-6"
                        >
                          <FieldLabel htmlFor="form-discount">
                            Discount %
                          </FieldLabel>
                          <Input
                            id="form-discount"
                            placeholder={
                              fieldState.error?.message ?? "Discount"
                            }
                            {...field}
                            aria-invalid={fieldState.invalid}
                            type="number"
                            value={field.value}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </Field>
                      )}
                    />
                    <Controller
                      name="amountReceived"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field
                          data-invalid={fieldState.invalid}
                          className="col-span-6"
                        >
                          <FieldLabel htmlFor="form-amountReceived">
                            Ammount Recived
                          </FieldLabel>
                          <Input
                            id="form-amountReceived"
                            placeholder={
                              fieldState.error?.message ?? "Ammount recived"
                            }
                            {...field}
                            aria-invalid={fieldState.invalid}
                            type="number"
                            value={field.value}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </Field>
                      )}
                    />
                    <Controller
                      name="balance"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field
                          data-invalid={fieldState.invalid}
                          className="col-span-6"
                        >
                          <FieldLabel htmlFor="form-balance">
                            Balance
                          </FieldLabel>
                          <Input
                            id="form-balance"
                            placeholder={fieldState.error?.message ?? "Balance"}
                            {...field}
                            aria-invalid={fieldState.invalid}
                            value={field.value}
                            readOnly
                          />
                        </Field>
                      )}
                    />
                    <Controller
                      name="remarks"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field
                          data-invalid={fieldState.invalid}
                          className="col-span-12 mb-2"
                        >
                          <FieldLabel htmlFor="form-form-remarks">
                            Remarks
                          </FieldLabel>
                          <InputGroup>
                            <InputGroupTextarea
                              {...field}
                              id="form-form-remarks"
                              placeholder="Type your remarks here..."
                              rows={6}
                              className="min-h-24 resize-none"
                              aria-invalid={fieldState.invalid}
                            />
                            <InputGroupAddon align="block-end">
                              <InputGroupText className="tabular-nums">
                                {field.value.length}/100 characters
                              </InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </Field>
                      )}
                    />
                  </FieldGroup>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </FieldGroup>
      <Button
        type="submit"
        className="w-full sm:w-fit mt-8"
        disabled={isPending || !selectedTests.length}
      >
        {isPending ? (
          <>
            Saving..
            <Loader className="animate-spin" />
          </>
        ) : (
          <>
            {mode === "edit" ? "Update Patient" : "Save & Next"}
            <Save />
          </>
        )}
      </Button>
    </form>
  );
}

type TestGroupSelectorProps = {
  item: TestGroupType;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

function TestGroupSelector({
  item,
  checked,
  onChange,
}: Readonly<TestGroupSelectorProps>) {
  return (
    <FieldLabel>
      <Field
        orientation="horizontal"
        className="has-data-[state=checked]:bg-primary/50 has-data-[state=checked]:rounded-md has-data-[state=checked]:text-primary-foreground cursor-pointer"
      >
        <Checkbox
          checked={checked}
          onCheckedChange={(checked) => onChange(!!checked)}
        />

        <FieldContent>
          <FieldTitle className="capitalize">{item.name}</FieldTitle>

          <FieldDescription>{item.testCategory.name}</FieldDescription>
        </FieldContent>
      </Field>
    </FieldLabel>
  );
}

function isSelected(fieldValue: { id: string }[], id: string) {
  return fieldValue.some((item) => item.id === id);
}

function handleTestSelection(
  checked: boolean,
  fieldValue: { id: string }[],
  fieldOnChange: (value: { id: string }[]) => void,
  id: string,
) {
  if (checked) {
    fieldOnChange([...fieldValue, { id }]);
    return;
  }

  fieldOnChange(fieldValue.filter((item) => item.id !== id));
}
