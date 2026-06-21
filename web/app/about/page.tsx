import { NeedHelp } from "@/components/need-help";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CTACard } from "@/components/cta-card";
import { StructuredData, aboutPageSchema } from "@/components/structured-data";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about StoreConfig, the free open-source CLI for local App Store Connect automation.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="py-24">
      <StructuredData data={aboutPageSchema} />
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-4xl md:text-5xl font-bold">
              About StoreConfig
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {`We're on a mission to make App Store Connect management effortless
              for developers worldwide.`}
            </p>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Our Story</h2>
            <Card>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-md">
                  StoreConfig was born out of frustration. As iOS developers
                  ourselves, we spent countless hours manually managing App
                  Store Connect configurations, updating prices across
                  territories, and duplicating app settings for new releases. We
                  knew there had to be a better way.
                </p>

                <p className="text-muted-foreground text-md">
                  After months of research and development, we created
                  StoreConfig - a CLI tool that transforms hours of manual work
                  into minutes of automated configuration. It is now a free,
                  open-source, local-first project so developers can inspect it,
                  run it themselves, and keep control of their own credentials
                  and workflows.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Developer-First</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-md">
                    {`Everything we build is designed with developers in mind. We
                    understand your workflow because we're developers too.`}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Simplicity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-md">
                    Complex problems deserve simple solutions. We believe in
                    powerful tools that are easy to understand and use.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Reliability</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-md">
                    Your app configurations are critical to your business. We
                    build tools you can trust with your most important work.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Transparency</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-md">
                    No hidden fees, no hosted account requirement, no vendor
                    lock-in. The project is open source because App Store
                    Connect automation should be inspectable and portable.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">The Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden">
                      <Image
                        src="/person1.jpg"
                        alt="Semih Cihan"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Semih Cihan</h3>
                      <p className="text-muted-foreground mb-2">
                        Developer
                      </p>
                      <Link
                        href="https://semihcihan.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-md font-medium hover:text-primary transition-colors"
                      >
                        @semihcihan
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden">
                      <Image
                        src="/person2.jpg"
                        alt="Selcuk Cihan"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Selçuk Cihan</h3>
                      <p className="text-muted-foreground mb-2">
                        Developer, ex-Amazon
                      </p>
                      <Link
                        href="https://selcukcihan.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-md font-medium hover:text-primary transition-colors"
                      >
                        @scihan
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <NeedHelp />
          <CTACard />
        </div>
      </div>
    </div>
  );
}
