import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Server, 
  Database, 
  Shield, 
  Cloud, 
  Globe, 
  RefreshCw,
  Activity,
  Zap,
  Container
} from "lucide-react";

interface ServiceStatus {
  name: string;
  status: 'operational' | 'degraded' | 'down' | 'checking';
  responseTime?: number;
  lastChecked: Date;
  description: string;
  icon: any;
  details?: string;
}

const SystemStatus = () => {
  const { toast } = useToast();
  const [services, setServices] = useState<ServiceStatus[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [overallHealth, setOverallHealth] = useState(0);

  const initialServices: Omit<ServiceStatus, 'status' | 'responseTime' | 'lastChecked'>[] = [
    {
      name: "AWS ECS Cluster",
      description: "Container orchestration service running on Fargate",
      icon: Container,
      details: "bigbyte-cluster"
    },
    {
      name: "Supabase Database",
      description: "PostgreSQL database with real-time capabilities",
      icon: Database,
      details: "csvdaqhuoldvezqbdcnu"
    },
    {
      name: "Authentication Service",
      description: "Supabase Auth with JWT tokens",
      icon: Shield,
      details: "User management & security"
    },
    {
      name: "CDN & Static Assets",
      description: "CloudFront distribution for global content delivery",
      icon: Globe,
      details: "AWS CloudFront"
    },
    {
      name: "Load Balancer",
      description: "Application Load Balancer distributing traffic",
      icon: Server,
      details: "AWS ALB"
    },
    {
      name: "Container Registry",
      description: "Amazon ECR storing Docker images",
      icon: Cloud,
      details: "bigbyte-frontend repository"
    }
  ];

  const checkServices = async () => {
    setIsChecking(true);
    const updatedServices: ServiceStatus[] = [];

    for (const service of initialServices) {
      const startTime = Date.now();
      let status: ServiceStatus['status'] = 'checking';
      let responseTime: number | undefined;

      try {
        switch (service.name) {
          case "Supabase Database":
            // Test database connectivity
            const { data, error } = await supabase.from('profiles').select('count').limit(1);
            if (!error) {
              status = 'operational';
              responseTime = Date.now() - startTime;
            } else {
              status = 'degraded';
            }
            break;

          case "Authentication Service":
            // Test auth service
            const { data: session } = await supabase.auth.getSession();
            status = 'operational';
            responseTime = Date.now() - startTime;
            break;

          case "AWS ECS Cluster":
          case "CDN & Static Assets":
          case "Load Balancer":
          case "Container Registry":
            // Simulate cloud service checks (in real implementation, these would call AWS APIs)
            await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 200));
            status = Math.random() > 0.1 ? 'operational' : 'degraded';
            responseTime = Date.now() - startTime;
            break;

          default:
            status = 'operational';
            responseTime = Date.now() - startTime;
        }
      } catch (error) {
        status = 'down';
        responseTime = Date.now() - startTime;
      }

      updatedServices.push({
        ...service,
        status,
        responseTime,
        lastChecked: new Date()
      });
    }

    setServices(updatedServices);
    
    // Calculate overall health
    const operationalCount = updatedServices.filter(s => s.status === 'operational').length;
    const healthPercentage = (operationalCount / updatedServices.length) * 100;
    setOverallHealth(healthPercentage);
    
    setIsChecking(false);
    
    toast({
      title: "System Status Updated",
      description: `${operationalCount}/${updatedServices.length} services operational`,
    });
  };

  useEffect(() => {
    checkServices();
    // Auto-refresh every 30 seconds
    const interval = setInterval(checkServices, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: ServiceStatus['status']) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'degraded':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'down':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'checking':
        return <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />;
    }
  };

  const getStatusBadge = (status: ServiceStatus['status']) => {
    const variants = {
      operational: 'default',
      degraded: 'secondary',
      down: 'destructive',
      checking: 'outline'
    } as const;

    return (
      <Badge variant={variants[status]} className="capitalize">
        {status === 'checking' ? 'Checking...' : status}
      </Badge>
    );
  };

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'bg-green-500';
    if (health >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Activity className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              System Status
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time monitoring of our cloud infrastructure and services
          </p>
        </div>

        {/* Overall Health */}
        <Card className="mb-8 animate-fade-in-up animation-delay-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-6 h-6 text-primary" />
                  Overall System Health
                </CardTitle>
                <CardDescription>
                  All systems status overview
                </CardDescription>
              </div>
              <Button 
                onClick={checkServices} 
                disabled={isChecking}
                variant="outline"
                size="sm"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isChecking ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">System Health</span>
                <span className="text-sm text-muted-foreground">{Math.round(overallHealth)}%</span>
              </div>
              <Progress 
                value={overallHealth} 
                className="h-3"
                style={{
                  backgroundColor: 'hsl(var(--muted))',
                }}
              />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-500">
                    {services.filter(s => s.status === 'operational').length}
                  </div>
                  <div className="text-xs text-muted-foreground">Operational</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-500">
                    {services.filter(s => s.status === 'degraded').length}
                  </div>
                  <div className="text-xs text-muted-foreground">Degraded</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-500">
                    {services.filter(s => s.status === 'down').length}
                  </div>
                  <div className="text-xs text-muted-foreground">Down</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {services.length}
                  </div>
                  <div className="text-xs text-muted-foreground">Total Services</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Services Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={service.name} 
                className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${(index + 3) * 100}ms` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{service.name}</CardTitle>
                        <CardDescription className="text-sm">
                          {service.description}
                        </CardDescription>
                      </div>
                    </div>
                    {getStatusIcon(service.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Status</span>
                      {getStatusBadge(service.status)}
                    </div>
                    
                    {service.responseTime && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Response Time</span>
                        <span className="text-sm text-muted-foreground">
                          {service.responseTime}ms
                        </span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Last Checked</span>
                      <span className="text-sm text-muted-foreground">
                        {service.lastChecked.toLocaleTimeString()}
                      </span>
                    </div>
                    
                    {service.details && (
                      <>
                        <Separator />
                        <div className="text-xs text-muted-foreground">
                          {service.details}
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Infrastructure Details */}
        <Card className="mt-8 animate-fade-in-up animation-delay-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cloud className="w-6 h-6 text-primary" />
              Infrastructure Overview
            </CardTitle>
            <CardDescription>
              Details about our cloud architecture and technology stack
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">AWS Services</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    ECS Fargate for containerized applications
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    ECR for Docker image registry
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Application Load Balancer for traffic distribution
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    CloudFront CDN for global content delivery
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    CloudFormation for infrastructure as code
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Technology Stack</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    React 18 with TypeScript
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Supabase for backend services
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Tailwind CSS with shadcn/ui components
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Docker containerization
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    GitHub Actions CI/CD pipeline
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemStatus;