import Image from "next/image";
import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Clock,
  Server,
  Database,
  Cloud,
  Globe,
  Shield,
  Zap,
  Activity,
  TrendingUp,
  Calendar,
  ArrowRight
} from "lucide-react";

export const metadata: Metadata = {
  title: "System Status | CyberWizDev",
  description: "Real-time status of CyberWizDev services, infrastructure, and performance metrics. Monitor uptime and service availability.",
  keywords: ["system status", "uptime", "service status", "infrastructure", "monitoring"]
};

const services = [
  {
    name: "Web Applications",
    status: "operational",
    uptime: "99.98%",
    responseTime: "142ms",
    icon: Globe,
    description: "All web applications and client websites"
  },
  {
    name: "API Services",
    status: "operational",
    uptime: "99.95%",
    responseTime: "89ms",
    icon: Server,
    description: "RESTful and GraphQL API endpoints"
  },
  {
    name: "Database Systems",
    status: "operational",
    uptime: "99.99%",
    responseTime: "12ms",
    icon: Database,
    description: "Primary and backup database systems"
  },
  {
    name: "CDN & Assets",
    status: "maintenance",
    uptime: "99.92%",
    responseTime: "45ms",
    icon: Cloud,
    description: "Content delivery network and static assets"
  },
  {
    name: "Authentication",
    status: "operational",
    uptime: "99.97%",
    responseTime: "67ms",
    icon: Shield,
    description: "User authentication and authorization services"
  },
  {
    name: "Background Jobs",
    status: "operational",
    uptime: "99.94%",
    responseTime: "234ms",
    icon: Zap,
    description: "Email, notifications, and scheduled tasks"
  }
];

const incidents = [
  {
    title: "Scheduled CDN Maintenance",
    status: "ongoing",
    severity: "low",
    startTime: "2024-01-15 14:00 UTC",
    description: "Routine maintenance to improve CDN performance. Minimal impact expected.",
    updates: [
      {
        time: "2024-01-15 14:15 UTC",
        message: "Maintenance is proceeding as planned. All services remain operational."
      },
      {
        time: "2024-01-15 14:00 UTC",
        message: "Scheduled maintenance has begun. Expected completion in 2 hours."
      }
    ]
  },
  {
    title: "Database Performance Issue",
    status: "resolved",
    severity: "medium",
    startTime: "2024-01-12 09:30 UTC",
    endTime: "2024-01-12 10:45 UTC",
    description: "Temporary database slowdown affecting response times.",
    updates: [
      {
        time: "2024-01-12 10:45 UTC",
        message: "Issue fully resolved. Database performance has returned to normal levels."
      },
      {
        time: "2024-01-12 10:15 UTC",
        message: "Database optimization in progress. Performance improving."
      },
      {
        time: "2024-01-12 09:30 UTC",
        message: "Investigating reports of slow database queries."
      }
    ]
  }
];

const metrics = [
  { label: "Overall Uptime", value: "99.96%", change: "+0.02%", trend: "up" },
  { label: "Avg Response Time", value: "98ms", change: "-12ms", trend: "up" },
  { label: "Active Incidents", value: "1", change: "-2", trend: "up" },
  { label: "Resolution Time", value: "47min", change: "-15min", trend: "up" }
];

function getStatusColor(status: string) {
  switch (status) {
    case 'operational': return 'text-green-600 bg-green-100';
    case 'maintenance': return 'text-yellow-600 bg-yellow-100';
    case 'degraded': return 'text-orange-600 bg-orange-100';
    case 'outage': return 'text-red-600 bg-red-100';
    default: return 'text-muted-foreground bg-muted';
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'operational': return CheckCircle;
    case 'maintenance': return AlertTriangle;
    case 'degraded': return AlertTriangle;
    case 'outage': return XCircle;
    default: return Clock;
  }
}

function getSeverityColor(severity: string) {
  switch (severity) {
    case 'low': return 'bg-primary';
    case 'medium': return 'bg-orange-500';
    case 'high': return 'bg-red-500';
    default: return 'bg-secondary';
  }
}

export default function StatusPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80"
            alt="Server racks and network cables representing system status"
            fill
            className="object-cover scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/95"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 pt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-surface/70 backdrop-blur-sm border border-border mb-8">
            <Activity className="h-5 w-5 text-primary mr-2" />
            <span className="text-foreground font-medium">Real-time Monitoring</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            System
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Status
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            Stay informed about the availability and performance of all CyberWizDev services.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#services-status" className="group inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:shadow-[0_14px_34px_var(--glow)] transition-all duration-300 hover:scale-105">
              View Service Status
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#past-incidents" className="inline-flex items-center px-8 py-4 bg-surface/70 backdrop-blur-sm text-foreground rounded-full font-semibold border border-border hover:bg-accent transition-all duration-300">
              <Calendar className="mr-2 h-5 w-5" />
              Past Incidents
            </a>
          </div>
        </div>
      </section>

      {/* Overall Status & Metrics */}
      <section className="relative -mt-20 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <Card className="border-0 shadow-xl overflow-hidden bg-surface/90 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Overall System Health</h2>
                <Badge className="text-lg px-4 py-2 bg-green-500 text-white">All Systems Operational</Badge>
              </div>
              <div className="grid md:grid-cols-4 gap-6">
                {metrics.map((metric) => (
                  <div key={metric.label} className="text-center p-4 bg-muted rounded-lg shadow-sm">
                    <div className="text-sm text-muted-foreground mb-1">{metric.label}</div>
                    <div className="text-3xl font-bold text-foreground mb-2">{metric.value}</div>
                    <div className={`flex items-center justify-center text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.trend === 'up' ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingUp className="h-4 w-4 mr-1 rotate-180" />}
                      {metric.change}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Services Status */}
      <section id="services-status" className="py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Service Components</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Detailed status of individual services and their performance metrics.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = getStatusIcon(service.status);
              return (
                <Card key={service.name} className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <service.icon className="h-6 w-6 text-primary mr-3" />
                        <h3 className="text-xl font-bold text-foreground">{service.name}</h3>
                      </div>
                      <Badge className={`${getStatusColor(service.status)} text-sm`}>
                        <Icon className="h-4 w-4 mr-1" />
                        {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center text-foreground">
                        <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                        Uptime: <span className="font-medium ml-1">{service.uptime}</span>
                      </div>
                      <div className="flex items-center text-foreground">
                        <Zap className="h-4 w-4 mr-2 text-secondary" />
                        Response: <span className="font-medium ml-1">{service.responseTime}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Past Incidents */}
      <section id="past-incidents" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Past Incidents & History</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A transparent log of all past incidents, resolutions, and scheduled maintenance.
            </p>
          </div>

          <div className="space-y-8">
            {incidents.map((incident) => (
              <Card key={incident.title} className="border-0 shadow-lg bg-surface">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-foreground">{incident.title}</h3>
                    <div className="flex items-center gap-2">
                      <Badge className={`${getStatusColor(incident.status)} text-sm`}>
                        {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                      </Badge>
                      <span className={`px-3 py-1 rounded-full text-white text-xs font-medium ${getSeverityColor(incident.severity)}`}>
                        {incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)}
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{incident.description}</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    <Clock className="h-4 w-4 inline-block mr-1" />
                    Start Time: {incident.startTime}
                    {incident.endTime && ` | End Time: ${incident.endTime}`}
                  </p>
                  
                  <div className="space-y-3 border-l-2 border-border pl-4">
                    {incident.updates.map((update, index) => (
                      <div key={index}>
                        <p className="text-sm font-medium text-foreground">{update.time}</p>
                        <p className="text-sm text-muted-foreground">{update.message}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-surface"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Need More Information?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            If you have any questions or require further assistance regarding our service status, please contact our support team.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="/support" 
              className="group inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:shadow-[0_14px_34px_var(--glow)] transition-all duration-300 hover:scale-105 text-lg"
            >
              Contact Support
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
             
            <a 
              href="/docs" 
              className="inline-flex items-center px-8 py-4 bg-surface/70 backdrop-blur-sm text-foreground rounded-full font-semibold border border-border hover:bg-accent transition-all duration-300 text-lg"
            >
              View Documentation
            </a>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
      </section>
    </div>
  );
}