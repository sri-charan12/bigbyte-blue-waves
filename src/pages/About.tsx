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
      <section className="bg-gradient-to-br from-primary/10 to-accent/20 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <Badge className="mb-4">About BigByte</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
              Connecting People with <span className="text-primary">Technology</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
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
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="text-primary" size={32} />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.number}</div>
                <p className="text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
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
          <div className="relative">
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
              <Card key={index} className="text-center border-none bg-background">
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
            <Card key={index} className="text-center">
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
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-primary-foreground">Our Mission</h2>
            <p className="text-primary-foreground/90 text-lg leading-relaxed">
              To democratize access to cutting-edge technology by providing carefully curated, 
              high-quality products with exceptional customer service. We believe everyone should 
              have the opportunity to experience the transformative power of technology.
            </p>
            <Button variant="secondary" size="lg">
              Join Our Journey
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;