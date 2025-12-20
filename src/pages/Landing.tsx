import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar, Footer } from "@/components/layout/Navbar";
import { INVESTMENT_SCHEMES, PLATFORM_STATS, formatCurrency } from "@/lib/mockData";
import {
  TrendingUp,
  Users,
  Percent,
  ArrowRight,
  Shield,
  Zap,
  BarChart3,
  Clock,
  CheckCircle2,
  ChevronRight,
  User,
  Award,
  Target,
  Briefcase,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Landing() {
  return (
    <div className="min-h-screen bg-background pb-12 pt-8">
      <Navbar />

      {/* Developer Credit Moving Banner - Top */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/30 backdrop-blur-sm border-b border-border/30 py-2 overflow-hidden">
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          className="whitespace-nowrap text-sm text-muted-foreground"
        >
          <span className="inline-block px-8">
            🚀 Demo Developed By <span className="text-primary font-medium">Murshid Alam</span> • 
            Professional Investment Platform Demo • 
            🚀 Demo Developed By <span className="text-primary font-medium">Murshid Alam</span> • 
            Professional Investment Platform Demo
          </span>
        </motion.div>
      </div>

      {/* Developer Credit Moving Banner - Bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/30 backdrop-blur-sm border-t border-border/30 py-2 overflow-hidden">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          className="whitespace-nowrap text-sm text-muted-foreground"
        >
          <span className="inline-block px-8">
            🚀 Demo Developed By <span className="text-primary font-medium">Murshid Alam</span> • 
            Professional Investment Platform Demo • 
            🚀 Demo Developed By <span className="text-primary font-medium">Murshid Alam</span> • 
            Professional Investment Platform Demo
          </span>
        </motion.div>
      </div>


      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
            >
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Professional Investment Management</span>
            </motion.div>

            <h1 className="font-display text-5xl md:text-7xl font-bold mb-4 leading-tight">
              We Trade.{" "}
              <span className="text-gradient-gold">You Earn.</span>
            </h1>

            <div className="mb-6">
              <p className="text-lg text-primary font-medium">By Taha Yasin</p>
              <p className="text-sm text-muted-foreground mt-1">
                Founder & Investment Strategist | 5+ Years in Crypto & Stock Markets
              </p>
            </div>

            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Expert investment management for crypto & stock markets. 
              Let our professionals grow your wealth with strategic trading.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button variant="hero" size="xl" asChild>
                <Link to="/login">
                  Start Investing <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <a href="#schemes">View Schemes</a>
              </Button>
            </div>

            {/* Stats */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
            >
              <motion.div variants={fadeInUp} className="glass rounded-2xl p-6">
                <TrendingUp className="w-8 h-8 text-primary mb-3 mx-auto" />
                <p className="text-3xl font-display font-bold text-foreground mb-1">
                  {PLATFORM_STATS.capitalManaged}
                </p>
                <p className="text-sm text-muted-foreground">Capital Managed</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="glass rounded-2xl p-6">
                <Users className="w-8 h-8 text-accent mb-3 mx-auto" />
                <p className="text-3xl font-display font-bold text-foreground mb-1">
                  {PLATFORM_STATS.activeInvestors}+
                </p>
                <p className="text-sm text-muted-foreground">Active Investors</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="glass rounded-2xl p-6">
                <Percent className="w-8 h-8 text-success mb-3 mx-auto" />
                <p className="text-3xl font-display font-bold text-foreground mb-1">
                  {PLATFORM_STATS.avgMonthlyReturn}
                </p>
                <p className="text-sm text-muted-foreground">Avg Monthly Return*</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2"
          >
            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Investment Schemes Section */}
      <section id="schemes" className="py-24 bg-card/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Investment <span className="text-gradient-gold">Schemes</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose from our carefully designed investment plans tailored for different risk appetites and goals.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {INVESTMENT_SCHEMES.map((scheme, index) => (
              <motion.div
                key={scheme.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card variant="elevated" className="h-full hover:border-primary/50 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          scheme.color === "primary"
                            ? "bg-gradient-gold"
                            : "bg-accent"
                        }`}
                      >
                        <BarChart3 className={`w-6 h-6 ${scheme.color === "primary" ? "text-primary-foreground" : "text-accent-foreground"}`} />
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          scheme.risk === "High"
                            ? "bg-destructive/10 text-destructive"
                            : "bg-warning/10 text-warning"
                        }`}
                      >
                        {scheme.risk} Risk
                      </span>
                    </div>
                    <CardTitle className="text-2xl">{scheme.name}</CardTitle>
                    <CardDescription className="text-base">{scheme.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-secondary/50 rounded-xl p-4">
                        <p className="text-sm text-muted-foreground mb-1">Minimum</p>
                        <p className="font-display text-xl font-bold text-foreground">
                          {formatCurrency(scheme.minInvestment)}
                        </p>
                      </div>
                      <div className="bg-secondary/50 rounded-xl p-4">
                        <p className="text-sm text-muted-foreground mb-1">Target Return*</p>
                        <p className="font-display text-xl font-bold text-success">
                          {scheme.targetReturn}<span className="text-sm text-muted-foreground">/{scheme.returnPeriod}</span>
                        </p>
                      </div>
                    </div>

                    <ul className="space-y-3">
                      {scheme.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="hero" className="w-full" asChild>
                      <Link to="/login">
                        Invest Now <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-xs text-muted-foreground mt-8"
          >
            *Returns are target/expected and not guaranteed. Past performance is not indicative of future results.
          </motion.p>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Why <span className="text-gradient-gold">MoneyMiners</span>?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We bring professional trading expertise to help grow your investments.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Secure & Transparent",
                description: "Full transparency in all transactions and regular portfolio updates.",
              },
              {
                icon: Zap,
                title: "Expert Management",
                description: "Professional traders with years of market experience manage your funds.",
              },
              {
                icon: Clock,
                title: "Regular Payouts",
                description: "Timely profit credits and easy withdrawal process.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-8 text-center hover:border-primary/50 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-gold flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section id="founder" className="py-24 bg-card/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Meet the <span className="text-gradient-gold">Founder</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The visionary behind MoneyMiners and your trusted investment partner.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card variant="elevated" className="overflow-hidden">
              <div className="grid md:grid-cols-3 gap-0">
                {/* Founder Image Placeholder */}
                <div className="bg-gradient-gold flex items-center justify-center p-8 md:p-12">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-primary-foreground/20 flex items-center justify-center border-4 border-primary-foreground/30">
                    <User className="w-16 h-16 md:w-20 md:h-20 text-primary-foreground" />
                  </div>
                </div>

                {/* Founder Details */}
                <div className="md:col-span-2 p-8">
                  <h3 className="font-display text-3xl font-bold mb-2">Taha Yasin</h3>
                  <p className="text-primary font-medium mb-4">Founder & Chief Investment Strategist</p>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    With over 5 years of experience in cryptocurrency and stock market trading, 
                    Taha Yasin founded MoneyMiners with a vision to democratize professional 
                    investment management. His expertise in market analysis and risk management 
                    has helped hundreds of investors achieve their financial goals.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Award className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Experience</p>
                        <p className="font-semibold">5+ Years</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Investors Served</p>
                        <p className="font-semibold">320+</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Target className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Success Rate</p>
                        <p className="font-semibold">94%</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Capital Managed</p>
                        <p className="font-semibold">₹5 Cr+</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {["Crypto Trading", "Stock Markets", "Risk Management", "Portfolio Strategy"].map((skill) => (
                      <span key={skill} className="px-3 py-1 rounded-full text-xs bg-primary/10 text-primary font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Ready to Grow Your <span className="text-gradient-gold">Wealth</span>?
            </h2>
            <p className="text-muted-foreground text-lg mb-10">
              Join hundreds of investors who trust MoneyMiners with their capital. 
              Start your investment journey today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/login">
                  Get Started <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/login">Login to Dashboard</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
