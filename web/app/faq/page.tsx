import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NeedHelp } from "@/components/need-help";
import { CTACard } from "@/components/cta-card";
import { StructuredData, faqPageSchema } from "@/components/structured-data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about StoreConfig setup, local credentials, open-source usage, and App Store Connect workflows.",
  alternates: {
    canonical: "/faq",
  },
};

export default function FAQPage() {
  const allFaqs = [
    {
      category: "General",
      questions: [
        {
          question: "What is StoreConfig?",
          answer:
            "StoreConfig is a powerful CLI tool that automates App Store Connect management. It allows you to manage in-app purchases, subscriptions, pricing, localizations, and metadata using JSON-based configuration files, saving you hours of manual work.",
        },
        {
          question: "How does StoreConfig work?",
          answer:
            "StoreConfig uses JSON configuration files to define your app structure. You can fetch existing configurations from App Store Connect, modify them locally, and then apply changes back to App Store Connect. The tool handles all the complex interactions for you using the App Store Connect API.",
        },
        {
          question: "Do I need to be a developer to use StoreConfig?",
          answer:
            "Yes, StoreConfig is designed for developers and requires basic command-line knowledge. However, the JSON configuration format is straightforward and can be easily modified with any text editor or AI tools.",
        },
      ],
    },
    {
      category: "Free & Open Source",
      questions: [
        {
          question: "How much does StoreConfig cost?",
          answer:
            "StoreConfig is free and open source. There are no StoreConfig subscriptions, trials, payment flows, or hosted account requirements.",
        },
        {
          question: "Where can I find the source code?",
          answer:
            "The public repository is linked from the site header and footer. You can inspect the code, file issues, and adapt the tool for your own workflow.",
        },
        {
          question: "Can I use it for commercial apps?",
          answer:
            "Yes. StoreConfig is intended for real App Store Connect workflows. Check the repository license for the exact legal terms.",
        },
      ],
    },
    {
      category: "Features & Usage",
      questions: [
        {
          question: "What can I manage with StoreConfig?",
          answer:
            "StoreConfig can manage in-app purchases, subscriptions, app pricing, localizations, metadata, availability, and more. You can also duplicate app configurations and perform bulk operations across multiple territories.",
        },
        {
          question: "How many apps can I manage?",
          answer:
            "There is no StoreConfig-imposed app limit. You can manage any apps available to the App Store Connect API credentials you configure locally.",
        },
        {
          question: "Does StoreConfig support all App Store Connect features?",
          answer:
            "StoreConfig supports most App Store Connect features, but some limitations exist due to App Store Connect API restrictions and our own limitations. We don't support creating new apps, app privacy settings, age ratings, or submission workflows. Check our documentation for a complete list of supported features. We plan to add support for more features in the future.",
        },
        {
          question:
            "Can I use StoreConfig with multiple Apple Developer accounts?",
          answer:
            "StoreConfig currently uses one local Apple credential set at a time. You can switch by running the Apple credential setup command again with another App Store Connect API key.",
        },
      ],
    },
    {
      category: "Technical",
      questions: [
        {
          question: "How do I get started with StoreConfig?",
          answer:
            "Install the CLI with npm, configure your local App Store Connect API key with storeconfig apple, fetch your app configuration, edit the JSON, validate it, and apply it from your machine.",
        },
        {
          question: "What Apple credentials do I need?",
          answer:
            "You need an App Store Connect API Team Key (.p8 file), Key ID, and Issuer ID. This is the suggested secure way by Apple for App Store Connect integrations. Check our documentation for more details.",
        },
        {
          question: "Is my data secure?",
          answer:
            "StoreConfig runs locally. Your Apple credentials are stored on your machine and can be revoked in App Store Connect at any time.",
        },
        {
          question: "Does StoreConfig upload my configuration to StoreConfig servers?",
          answer:
            "No. The CLI calls App Store Connect directly from your machine. There is no server-side credential storage.",
        },
        {
          question: "What platforms does StoreConfig support?",
          answer:
            "Currently, StoreConfig supports iOS apps. We plan to add support for additional platforms like macOS, watchOS, and tvOS in the future.",
        },
      ],
    },
    {
      category: "Support",
      questions: [
        {
          question: "How can I get help?",
          answer:
            "You can get help through our documentation and GitHub issues.",
        },
        {
          question: "Can I request new features?",
          answer:
            "Absolutely! We welcome feature requests and feedback. You can submit requests through GitHub issues.",
        },
      ],
    },
  ];

  return (
    <div className="py-24">
      <StructuredData data={faqPageSchema} />
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-4xl md:text-5xl font-bold">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {`Find answers to common questions about StoreConfig. Can't find
              what you're looking for? We're here to help.`}
            </p>
          </div>

          <div className="space-y-12">
            {allFaqs.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2
                  id={category.category.toLowerCase().split(" ")[0]}
                  className="text-2xl font-bold mb-6"
                >
                  {category.category}
                </h2>
                <div className="space-y-4">
                  {category.questions.map((faq, faqIndex) => (
                    <Card key={faqIndex}>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          {faq.question}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <NeedHelp hideSections={{ faq: true }} />
          <CTACard />
        </div>
      </div>
    </div>
  );
}
