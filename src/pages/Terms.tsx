import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar, Footer } from "@/components/layout/Navbar";
import { FileText, ArrowLeft } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-gold flex items-center justify-center">
                <FileText className="w-7 h-7 text-primary-foreground" />
              </div>
              <h1 className="font-display text-4xl font-bold">Terms of Service</h1>
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground text-lg mb-8">
                Last updated: December 2024
              </p>

              <div className="space-y-8 text-muted-foreground">
                <section>
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">1. Demo Application Notice</h2>
                  <p>
                    This is a demonstration application. No real money, investments, or financial transactions are involved.
                    All data displayed is fictional and for demonstration purposes only.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">2. No Financial Advice</h2>
                  <p>
                    Nothing in this demo application constitutes financial, investment, legal, or tax advice.
                    The returns and statistics shown are hypothetical and do not represent actual performance.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">3. Investment Risks</h2>
                  <p>
                    Investments in securities market are subject to market risks. Past performance is not indicative
                    of future results. The returns mentioned are target/expected returns and not guaranteed.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">4. Use of Service</h2>
                  <p>
                    By using this demo application, you acknowledge that this is a prototype for demonstration
                    purposes and should not be used for any actual financial decisions.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">5. Contact</h2>
                  <p>
                    For any questions regarding this demo application, please contact the development team.
                  </p>
                </section>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
