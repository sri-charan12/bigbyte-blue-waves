import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Award, 
  Globe, 
  Shield,
  Zap,
  Heart,
  Star,
  CheckCircle
} from "lucide-react";

const About = () => {
  const stats = [
    { number: "10K+", label: "Happy Customers", icon: Users },
    { number: "50+", label: "Products", icon: Award },
    { number: "25+", label: "Countries", icon: Globe },
    { number: "99.9%", label: "Uptime", icon: Shield }
  ];

  const values = [
    {
      icon: Zap,
      title: "Innovation",
      description: "We're constantly seeking the latest technology to bring you cutting-edge products."
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "Your satisfaction is our priority. We provide excellent support and service."
    },
    {
      icon: Star,
      title: "Quality",
      description: "Every product we sell meets our high standards for performance and reliability."
    },
    {
      icon: CheckCircle,
      title: "Trust",
      description: "We've built our reputation on transparency, honesty, and delivering on our promises."
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "/placeholder.svg",
      description: "Tech entrepreneur with 15+ years in the electronics industry."
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "/placeholder.svg",
      description: "Former Silicon Valley engineer passionate about emerging technologies."
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Customer Experience",
      image: "/placeholder.svg",
      description: "Customer service expert dedicated to creating amazing shopping experiences."
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="gradient-hero py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15),transparent)] pointer-events-none"></div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <Badge className="mb-4 animate-bounce-in glass-effect border-white/30 text-white">About BigByte</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-white animate-fade-in-up">
              Connecting People with <span className="floating text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">Technology</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed animate-fade-in-up stagger-1">
              Since 2020, BigByte has been at the forefront of bringing cutting-edge technology 
              to consumers worldwide. We believe technology should enhance lives, not complicate them.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className={`text-center hover-glow transition-all duration-500 transform hover:scale-105 animate-bounce-in-scale stagger-${index + 1}`}>
              <CardContent className="p-6">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 hover:bg-primary/20 animate-rotate-in">
                  <stat.icon className="text-primary" size={32} />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2 floating">{stat.number}</div>
                <p className="text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-fade-in">
          <div className="space-y-6 animate-slide-in-left">
            <h2 className="text-3xl font-bold text-foreground">Our Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                BigByte was founded in 2020 with a simple mission: to make cutting-edge technology 
                accessible to everyone. What started as a small online store has grown into a trusted 
                platform serving customers across 25+ countries.
              </p>
              <p>
                We believe that technology should empower people, not overwhelm them. That's why we 
                carefully curate our product selection, ensuring every item meets our high standards 
                for quality, innovation, and value.
              </p>
              <p>
                Our team of tech enthusiasts works tirelessly to source the latest gadgets, provide 
                detailed product information, and offer exceptional customer support. We're not just 
                selling products – we're building relationships.
              </p>
            </div>
            <Button size="lg">
              Shop Our Products
            </Button>
          </div>
          <div className="relative animate-slide-in-right">
            <div className="bg-primary/20 rounded-2xl p-8 backdrop-blur-sm">
              <img 
                src="/placeholder.svg" 
                alt="BigByte Story" 
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-foreground">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These core principles guide everything we do at BigByte
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className={`text-center border-none bg-background hover-glow transition-all duration-500 transform hover:scale-105 animate-fade-in-up stagger-${index + 1}`}>
                <CardContent className="p-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="text-primary" size={32} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold text-foreground">Meet Our Team</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The passionate people behind BigByte who make it all possible
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <Card key={index} className={`text-center hover-glow transition-all duration-500 transform hover:scale-105 animate-bounce-in stagger-${index + 1}`}>
              <CardContent className="p-6">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-muted">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {member.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="gradient-primary py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent)] pointer-events-none"></div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-white floating">Our Mission</h2>
            <p className="text-white/90 text-lg leading-relaxed animate-fade-in-up stagger-1">
              To democratize access to cutting-edge technology by providing carefully curated, 
              high-quality products with exceptional customer service. We believe everyone should 
              have the opportunity to experience the transformative power of technology.
            </p>
            <Button variant="secondary" size="lg" className="shadow-soft hover:shadow-elegant transition-all duration-300 transform hover:scale-105 animate-bounce-in stagger-2">
              Join Our Journey
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;