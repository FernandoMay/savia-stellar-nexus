import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Shield, TrendingUp, Users, DollarSign, FileCheck } from "lucide-react";

interface HeroProps {
  onNavigate: (section: string) => void;
}

export const Hero = ({ onNavigate }: HeroProps) => {
  const stats = [
    { label: "Fondos Recaudados", value: "$2.5M MXN", icon: DollarSign },
    { label: "Pacientes Apoyados", value: "1,247", icon: Users },
    { label: "Campañas Verificadas", value: "89%", icon: FileCheck },
    { label: "Tasa de Éxito", value: "94%", icon: TrendingUp },
  ];

  const features = [
    {
      icon: Shield,
      title: "KYC Mexicano",
      description: "Verificación con CURP y documentos oficiales"
    },
    {
      icon: Heart,
      title: "Transparencia Médica",
      description: "Documentación médica verificada por profesionales"
    },
    {
      icon: TrendingUp,
      title: "Conversión a Pesos",
      description: "Pagos directos en MXN a través de EtherFuse"
    }
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-6 px-4 py-2">
            Crowdfunding Médico en México 🇲🇽
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Ayuda Médica
            <span className="text-gradient-primary block">Transparente y Segura</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Plataforma de crowdfunding médico con verificación KYC mexicana, 
            documentación médica certificada y pagos directos en pesos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="medical-glow animate-pulse-glow"
              onClick={() => onNavigate('campaigns')}
            >
              <Heart className="w-5 h-5 mr-2" />
              Ver Campañas
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => onNavigate('kyc')}
            >
              <Shield className="w-5 h-5 mr-2" />
              Verificar Identidad
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="medical-card">
                  <CardContent className="p-6 text-center">
                    <Icon className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-secondary-light/20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            ¿Por qué elegir Savia?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="medical-card text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <Card className="medical-card max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-4">
                Únete a la Revolución de la Ayuda Médica
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Forma parte de una comunidad que transforma vidas a través de la tecnología blockchain 
                y la transparencia en el financiamiento médico.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  onClick={() => onNavigate('campaigns')}
                >
                  Crear Campaña
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => onNavigate('donate')}
                >
                  Hacer Donación
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};