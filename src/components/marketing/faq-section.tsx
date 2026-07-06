import { AnimateInView } from "@/components/marketing/animate-in-view";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is MedicareLab?",
    answer:
      "MedicareLab is a laboratory management portal for pathology labs. It helps you manage patients, test catalogs, billing, and generate professional printable reports from a single secure dashboard.",
  },
  {
    question: "Do I need technical knowledge to set it up?",
    answer:
      "No. Sign up, configure your lab details in profile settings, and start registering patients. The interface is designed for lab staff, not developers.",
  },
  {
    question: "Can I customize report templates?",
    answer:
      "Yes. MedicareLab supports multiple header and footer layouts with your lab branding, digital signature, QR codes, and NABL-ready formatting.",
  },
  {
    question: "Is my data secure?",
    answer:
      "All data is stored in a secure PostgreSQL database with encrypted authentication sessions. Access is protected by email/password sign-in.",
  },
  {
    question: "Can I print reports directly?",
    answer:
      "Absolutely. Preview any patient report and print it with one click. Reports are optimized for A4 paper with professional formatting.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "Yes. The Starter plan is free and includes up to 50 cases per month with basic report templates — perfect for trying MedicareLab before upgrading.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <AnimateInView className="text-center">
          <Badge variant="outline" className="mb-4">
            FAQ
          </Badge>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="text-muted-foreground mt-4 text-base">
            Everything you need to know before getting started.
          </p>
        </AnimateInView>

        <AnimateInView delay={150} className="mt-12">
          <Accordion>
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.question} value={`faq-${i}`}>
                <AccordionTrigger className="text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimateInView>
      </div>
    </section>
  );
}