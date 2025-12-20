import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar, Footer } from "@/components/layout/Navbar";
import { Shield, ArrowLeft } from "lucide-react";

export default function Privacy() {
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
              <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center">
                <Shield className="w-7 h-7 text-accent-foreground" />
              </div>
              <h1 className="font-display text-4xl font-bold">Privacy Policy</h1>
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground text-lg mb-8">
                Last updated: December 2024
              </p>

              <div className="space-y-8 text-muted-foreground">
                <section>
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">1. Demo Application</h2>
                  <p>
                    This is a demonstration application. No personal data is collected, stored, or processed.
                    All user interactions are simulated and no real information is transmitted.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">2. Data Collection</h2>
                  <p>
                    This demo application does not collect any personal information. The login credentials
                    provided are for demonstration purposes only and are not stored anywhere.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">3. Cookies</h2>
                  <p>
                    This demo may use browser session storage for maintaining the demo login state.
                    No tracking cookies or analytics are used.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">4. Third-Party Services</h2>
                  <p>
                    This demo application does not integrate with any third-party services that collect
                    user data.
                  </p>
                </section>

                <section>
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">5. Contact</h2>
                  <p>
                    For any questions regarding privacy in this demo application, please contact the
                    development team.
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
