import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  MessageCircle,
  HeadphonesIcon,
  ShoppingCart,
  HelpCircle
} from "lucide-react";

const Contact = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak with our support team",
      contact: "+1 (555) 123-4567",
      hours: "Mon-Fri: 9AM-6PM EST"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message",
      contact: "support@bigbyte.com",
      hours: "Response within 24 hours"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with us in real-time",
      contact: "Available on website",
      hours: "Mon-Fri: 9AM-6PM EST"
    },
    {
      icon: MapPin,
      title: "Visit Our Store",
      description: "Come see us in person",
      contact: "123 Tech Street, Digital City, DC 12345",
      hours: "Mon-Sat: 10AM-8PM"
    }
  ];

  const departments = [
    { icon: ShoppingCart, name: "Sales", description: "Product inquiries and purchasing" },
    { icon: HeadphonesIcon, name: "Technical Support", description: "Product setup and troubleshooting" },
    { icon: HelpCircle, name: "General Support", description: "Orders, returns, and account help" },
    { icon: MessageCircle, name: "Feedback", description: "Suggestions and complaints" }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="gradient-hero py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,rgba(255,255,255,0.15),transparent)] pointer-events-none"></div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-white animate-fade-in-up">
              Get in <span className="floating text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">Touch</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed animate-fade-in-up stagger-1">
              Have questions? We'd love to hear from you. Send us a message and we'll 
              respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods.map((method, index) => (
            <Card key={index} className={`text-center hover-glow transition-all duration-500 transform hover:scale-105 animate-bounce-in-scale stagger-${index + 1}`}>
              <CardContent className="p-6">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <method.icon className="text-primary" size={32} />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{method.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">{method.description}</p>
                <p className="font-medium text-foreground mb-2">{method.contact}</p>
                <p className="text-xs text-muted-foreground">{method.hours}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2 animate-slide-in-left">
            <Card className="hover-glow transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" placeholder="Enter your first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" placeholder="Enter your last name" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="Enter your phone number" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="support">Technical Support</SelectItem>
                      <SelectItem value="general">General Support</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input id="subject" placeholder="Enter the subject of your message" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Please provide details about your inquiry..."
                    className="min-h-32"
                  />
                </div>

                <Button size="lg" className="w-full">
                  Send Message
                </Button>

                <p className="text-xs text-muted-foreground">
                  * Required fields. We'll never share your information with third parties.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6 animate-slide-in-right">
            {/* Departments */}
            <Card className="hover-glow transition-all duration-300">
              <CardHeader>
                <CardTitle>Our Departments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {departments.map((dept, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <dept.icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{dept.name}</h4>
                      <p className="text-sm text-muted-foreground">{dept.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card className="hover-glow transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock size={20} />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saturday</span>
                  <span className="font-medium">10:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sunday</span>
                  <span className="font-medium">Closed</span>
                </div>
                <p className="text-xs text-muted-foreground pt-2">
                  All times are in Eastern Standard Time (EST)
                </p>
              </CardContent>
            </Card>

            {/* Quick Contact */}
            <Card className="gradient-primary text-white hover-glow transition-all duration-300 pulse-glow">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-3 animate-fade-in">Need Immediate Help?</h3>
                <p className="text-white/90 text-sm mb-4 animate-fade-in stagger-1">
                  For urgent technical issues or order problems, call us directly.
                </p>
                <Button variant="secondary" size="lg" className="w-full shadow-soft hover:shadow-elegant transition-all duration-300 transform hover:scale-105 animate-bounce-in stagger-2">
                  <Phone className="mr-2" size={20} />
                  Call Now: (555) 123-4567
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-foreground floating">Frequently Asked Questions</h2>
            <p className="text-muted-foreground animate-fade-in-up stagger-1">
              Before reaching out, check if your question is answered in our comprehensive FAQ section.
            </p>
            <Button variant="outline" size="lg" className="shadow-soft hover:shadow-elegant transition-all duration-300 transform hover:scale-105 animate-bounce-in stagger-2">
              Visit FAQ Center
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;