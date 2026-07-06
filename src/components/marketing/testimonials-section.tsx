import { AnimateInView } from "@/components/marketing/animate-in-view";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "MedicareLab cut our report turnaround time in half. The print templates look professional and patients love the QR verification.",
    author: "Dr. Sanjay Mehta",
    role: "Referring Physician, Aurangabad",
  },
  {
    quote:
      "Patient registration and billing in one screen saved our front desk hours every day. The interface is clean and easy to train on.",
    author: "Priya Kulkarni",
    role: "Lab Administrator",
  },
  {
    quote:
      "Reference ranges and test catalog management are exactly what we needed. No more scattered spreadsheets across the lab.",
    author: "Amit Deshmukh",
    role: "Pathology Technician",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimateInView className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">
            Testimonials
          </Badge>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Trusted by lab professionals
          </h2>
          <p className="text-muted-foreground mt-4 text-base">
            Hear from teams who run their daily operations on MedicareLab.
          </p>
        </AnimateInView>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((item, i) => (
            <AnimateInView key={item.author} delay={i * 120}>
              <Card className="h-full transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
                <CardContent className="flex h-full flex-col pt-6">
                  <Quote className="text-primary/40 mb-4 size-8" />
                  <p className="flex-1 text-sm leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="mt-6 border-t border-border/60 pt-4">
                    <p className="text-sm font-semibold">{item.author}</p>
                    <p className="text-muted-foreground text-xs">{item.role}</p>
                  </div>
                </CardContent>
              </Card>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  );
}