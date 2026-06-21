"use client";

import {
  Clock,
  Zap,
  FileCode,
  CheckCircle2,
  XCircle,
  TrendingDown,
  TrendingUp,
  Download,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";

export function Infographic() {
  return (
    <>
      <section
        id="infographic"
        className="py-8 md:py-12 relative z-10 min-h-screen flex items-center"
      >
        <div className="container mx-auto px-4 relative w-full">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              From Hours to Minutes
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how StoreConfig transforms your App Store Connect workflow
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-8">
              <Card className="border-destructive/20 bg-gradient-to-br from-destructive/5 to-destructive/10 p-5 md:p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-destructive/20 text-destructive px-3 py-1 text-xs md:text-sm font-medium border-b border-l border-destructive/30">
                  Before
                </div>
                <div className="space-y-4 mt-5">
                  <div className="flex items-center justify-center gap-2 md:gap-3">
                    <XCircle className="h-6 w-6 md:h-8 md:w-8 text-destructive flex-shrink-0" />
                    <h3 className="text-xl md:text-2xl font-bold">
                      Manual Process
                    </h3>
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">2+ Hours</p>
                        <p className="text-sm text-muted-foreground">
                          Per app configuration
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <XCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">No Automation</p>
                        <p className="text-sm text-muted-foreground">
                          Manually set all the details
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <XCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">No Version Control</p>
                        <p className="text-sm text-muted-foreground">
                          Hard to track changes
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <XCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Repetitive Work</p>
                        <p className="text-sm text-muted-foreground">
                          Same tasks for each app
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5 p-5 md:p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary/20 text-primary px-3 py-1 text-xs md:text-sm font-medium border-b border-l border-primary/30">
                  After
                </div>
                <div className="space-y-4 mt-5">
                  <div className="flex items-center justify-center gap-2 md:gap-3">
                    <Zap className="h-6 w-6 md:h-8 md:w-8 text-primary flex-shrink-0" />
                    <h3 className="text-xl md:text-2xl font-bold">
                      With StoreConfig
                    </h3>
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Minutes</p>
                        <p className="text-sm text-muted-foreground">
                          Automated configuration
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Automated</p>
                        <p className="text-sm text-muted-foreground">
                          Sync JSON config, use AI
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Version Controlled</p>
                        <p className="text-sm text-muted-foreground">
                          Track every change in Git
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Reusable Configs</p>
                        <p className="text-sm text-muted-foreground">
                          Copy and adapt easily
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-primary/10 bg-gradient-to-br from-primary/5 to-primary/10 p-4 md:p-5 text-center">
                <TrendingDown className="h-8 w-8 md:h-10 md:w-10 text-primary mx-auto mb-3" />
                <div className="text-5xl font-bold mb-1">95%</div>
                <p className="text-muted-foreground text-xs md:text-sm">
                  Time Reduction
                </p>
              </Card>

              <Card className="border-primary/10 bg-gradient-to-br from-primary/5 to-primary/10 p-4 md:p-5 text-center">
                <Sparkles className="h-8 w-8 md:h-10 md:w-10 text-primary mx-auto mb-3" />
                <div className="text-5xl font-bold mb-1">100%</div>
                <p className="text-muted-foreground text-xs md:text-sm">
                  AI-Ready
                </p>
              </Card>

              <Card className="border-primary/10 bg-gradient-to-br from-primary/5 to-primary/10 p-4 md:p-5 text-center">
                <TrendingUp className="h-8 w-8 md:h-10 md:w-10 text-primary mx-auto mb-3" />
                <div className="text-5xl font-bold mb-1">∞</div>
                <p className="text-muted-foreground text-xs md:text-sm">
                  Reusability
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section
        id="workflow"
        className="py-8 md:py-12 relative z-10 min-h-screen flex items-center"
      >
        <div className="container mx-auto px-4 relative w-full">
          <div className="text-center space-y-2 mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">
              Simple 3-Step Workflow
            </h2>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
              <Card className="border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg p-5 md:p-6 lg:p-8 text-center group relative">
                <div className="absolute top-2 left-2 md:top-3 md:left-3 h-7 w-7 md:h-9 md:w-9 lg:h-10 lg:w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm md:text-base lg:text-lg font-bold">
                  1
                </div>
                <div className="h-14 w-14 md:h-16 md:w-16 lg:h-20 lg:w-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-4 md:mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Download className="h-7 w-7 md:h-8 md:w-8 lg:h-10 lg:w-10 text-primary" />
                </div>
                <h4 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-2 md:mb-3">
                  Fetch
                </h4>
                <p className="text-muted-foreground text-sm md:text-base">
                  Retrieve your current App Store Connect configuration as JSON
                </p>
              </Card>

              <Card className="border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg p-5 md:p-6 lg:p-8 text-center group relative">
                <div className="absolute top-2 left-2 md:top-3 md:left-3 h-7 w-7 md:h-9 md:w-9 lg:h-10 lg:w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm md:text-base lg:text-lg font-bold">
                  2
                </div>
                <div className="h-14 w-14 md:h-16 md:w-16 lg:h-20 lg:w-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-4 md:mb-5 group-hover:scale-110 transition-transform duration-300">
                  <FileCode className="h-7 w-7 md:h-8 md:w-8 lg:h-10 lg:w-10 text-primary" />
                </div>
                <h4 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-2 md:mb-3">
                  Configure
                </h4>
                <p className="text-muted-foreground text-sm md:text-base">
                  Edit JSON file, use AI assistance, or copy from existing apps
                </p>
              </Card>

              <Card className="border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg p-5 md:p-6 lg:p-8 text-center group relative">
                <div className="absolute top-2 left-2 md:top-3 md:left-3 h-7 w-7 md:h-9 md:w-9 lg:h-10 lg:w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm md:text-base lg:text-lg font-bold">
                  3
                </div>
                <div className="h-14 w-14 md:h-16 md:w-16 lg:h-20 lg:w-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-4 md:mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-7 w-7 md:h-8 md:w-8 lg:h-10 lg:w-10 text-primary" />
                </div>
                <h4 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-2 md:mb-3">
                  Apply
                </h4>
                <p className="text-muted-foreground text-sm md:text-base">
                  Sync changes to App Store Connect automatically
                </p>
              </Card>
            </div>

            <div className="hidden md:grid grid-cols-[1fr_auto_1fr_auto_1fr] gap-5 md:gap-6 mt-6 mb-6 items-center">
              <div className="h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-primary/30"></div>
              <div className="flex items-center justify-center">
                <ArrowRight className="h-6 w-6 text-primary/50" />
              </div>
              <div className="h-0.5 bg-gradient-to-r from-primary/30 via-primary/30 to-primary/30"></div>
              <div className="flex items-center justify-center">
                <ArrowRight className="h-6 w-6 text-primary/50" />
              </div>
              <div className="h-0.5 bg-gradient-to-r from-primary/30 via-primary/30 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
