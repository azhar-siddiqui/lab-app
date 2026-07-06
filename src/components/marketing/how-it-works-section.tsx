import { AnimateInView } from "@/components/marketing/animate-in-view";
import { Badge } from "@/components/ui/badge";
import { UserPlus, TestTube2, ClipboardCheck, Printer } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: UserPlus,
    title: "Register the patient",
    description:
      "Capture demographics, referring doctor, and selected test groups with billing details in one form.",
  },
  {
    step: "02",
    icon: TestTube2,
    title: "Assign & run tests",
    description:
      "Pick from your test catalog with pre-configured reference ranges and units for accurate result entry.",
  },
  {
    step: "03",
    icon: ClipboardCheck,
    title: "Enter results",
    description:
      "Fill in test values with automatic reference range comparison and status indicators.",
  },
  {
    step: "04",
    icon: Printer,
    title: "Print & deliver",
    description:
      "Preview and print branded reports with QR codes, signatures, and your lab's header/footer templates.",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="border-y border-border/60 bg-muted/20 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimateInView className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">
            How it works
          </Badge>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            From sample to report in four steps
          </h2>
          <p className="text-muted-foreground mt-4 text-base leading-relaxed">
            A streamlined workflow designed for busy pathology labs — no
            complicated setup required.
          </p>
        </AnimateInView>

        <div className="relative mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-primary/20 absolute top-12 right-[12%] left-[12%] hidden h-px lg:block" />

          {steps.map((item, i) => (
            <AnimateInView key={item.step} delay={i * 100}>
              <div className="group relative flex flex-col items-center text-center">
                <div className="bg-background ring-primary/20 relative z-10 mb-5 flex size-16 items-center justify-center rounded-2xl shadow-sm ring-1 transition-transform duration-300 group-hover:scale-105">
                  <item.icon className="text-primary size-7" />
                  <span className="bg-primary text-primary-foreground absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full text-[10px] font-bold">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-heading text-base font-semibold">
                  {item.title}
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  );
}