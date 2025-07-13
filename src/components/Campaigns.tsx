import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Heart, Clock, MapPin, Shield, FileCheck, AlertTriangle, TreePine } from "lucide-react";
import { useState } from "react";

interface Campaign {
  id: string;
  title: string;
  description: string;
  beneficiary: string;
  condition: string;
  location: string;
  goalPesos: number;
  raisedPesos: number;
  daysLeft: number;
  verified: boolean;
  kycVerified: boolean;
  medicalDocsVerified: boolean;
  trustScore: number;
  category: string;
  image: string;
  lastUpdate: string;
}

export const Campaigns = () => {
  const [filter, setFilter] = useState<string>('all');
  
  const mockCampaigns: Campaign[] = [
    {
      id: "1",
      title: "Tratamiento de Cáncer de Mama para María",
      description: "María necesita ayuda para su tratamiento de quimioterapia. Los costos médicos son muy altos y su familia necesita apoyo.",
      beneficiary: "María González",
      condition: "Cáncer de mama",
      location: "Guadalajara, JAL",
      goalPesos: 250000,
      raisedPesos: 187500,
      daysLeft: 22,
      verified: true,
      kycVerified: true,
      medicalDocsVerified: true,
      trustScore: 95,
      category: "Oncología",
      image: "/placeholder.svg",
      lastUpdate: "Hace 2 días"
    },
    {
      id: "2", 
      title: "Cirugía Cardíaca Urgente para Juan",
      description: "Juan requiere una cirugía de bypass cardíaco urgente. Su familia no cuenta con seguro médico privado.",
      beneficiary: "Juan Pérez",
      condition: "Cardiopatía",
      location: "Ciudad de México",
      goalPesos: 450000,
      raisedPesos: 123000,
      daysLeft: 45,
      verified: true,
      kycVerified: true,
      medicalDocsVerified: false,
      trustScore: 82,
      category: "Cardiología",
      image: "/placeholder.svg",
      lastUpdate: "Hace 1 día"
    },
    {
      id: "3",
      title: "Rehabilitación Neurológica para Ana",
      description: "Ana sufrió un accidente y necesita terapia de rehabilitación neurológica intensiva.",
      beneficiary: "Ana Rodríguez",
      condition: "Lesión neurológica",
      location: "Monterrey, NL",
      goalPesos: 180000,
      raisedPesos: 95000,
      daysLeft: 30,
      verified: false,
      kycVerified: true,
      medicalDocsVerified: true,
      trustScore: 78,
      category: "Neurología",
      image: "/placeholder.svg",
      lastUpdate: "Hace 5 días"
    }
  ];

  const filteredCampaigns = mockCampaigns.filter(campaign => {
    if (filter === 'all') return true;
    if (filter === 'verified') return campaign.verified && campaign.medicalDocsVerified;
    if (filter === 'urgent') return campaign.daysLeft <= 30;
    if (filter === 'recent') return campaign.lastUpdate.includes('día');
    return true;
  });

  const formatPesos = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getProgressPercentage = (raised: number, goal: number) => {
    return Math.min((raised / goal) * 100, 100);
  };

  const getTrustScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Campañas Médicas</h1>
            <p className="text-muted-foreground">
              Ayuda a pacientes mexicanos con sus tratamientos médicos
            </p>
          </div>
          
          <Button className="mt-4 md:mt-0 medical-glow">
            Crear Nueva Campaña
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { key: 'all', label: 'Todas' },
            { key: 'verified', label: 'Verificadas' },
            { key: 'urgent', label: 'Urgentes' },
            { key: 'recent', label: 'Recientes' }
          ].map((filterOption) => (
            <Button
              key={filterOption.key}
              variant={filter === filterOption.key ? "default" : "outline"}
              onClick={() => setFilter(filterOption.key)}
            >
              {filterOption.label}
            </Button>
          ))}
        </div>

        {/* Campaigns Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => (
            <Card key={campaign.id} className="medical-card overflow-hidden">
              <div className="relative">
                <img 
                  src={campaign.image} 
                  alt={campaign.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  {campaign.verified && (
                    <Badge className="bg-green-500">
                      <Shield className="w-3 h-3 mr-1" />
                      Verificada
                    </Badge>
                  )}
                  {campaign.daysLeft <= 15 && (
                    <Badge variant="destructive">
                      <Clock className="w-3 h-3 mr-1" />
                      Urgente
                    </Badge>
                  )}
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary">
                    {campaign.category}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg leading-tight mb-2">
                      {campaign.title}
                    </CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {campaign.location}
                    </div>
                  </div>
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={campaign.image} />
                    <AvatarFallback>
                      {campaign.beneficiary.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {campaign.description}
                </p>

                {/* Medical Condition */}
                <div className="flex items-center mb-4 p-2 bg-accent/20 rounded-lg">
                  <Heart className="w-4 h-4 text-primary mr-2" />
                  <span className="text-sm font-medium">{campaign.condition}</span>
                </div>

                {/* Verification Status */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="flex items-center justify-center p-2 rounded bg-secondary-light/30">
                    <Shield className={`w-4 h-4 mr-1 ${campaign.kycVerified ? 'text-green-600' : 'text-gray-400'}`} />
                    <span className="text-xs">KYC</span>
                  </div>
                  <div className="flex items-center justify-center p-2 rounded bg-secondary-light/30">
                    <FileCheck className={`w-4 h-4 mr-1 ${campaign.medicalDocsVerified ? 'text-green-600' : 'text-gray-400'}`} />
                    <span className="text-xs">Médico</span>
                  </div>
                  <div className="flex items-center justify-center p-2 rounded bg-secondary-light/30">
                    <TreePine className="w-4 h-4 mr-1 text-primary" />
                    <span className="text-xs">NFT</span>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">
                      {formatPesos(campaign.raisedPesos)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {getProgressPercentage(campaign.raisedPesos, campaign.goalPesos).toFixed(0)}%
                    </span>
                  </div>
                  <Progress 
                    value={getProgressPercentage(campaign.raisedPesos, campaign.goalPesos)} 
                    className="h-2"
                  />
                  <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                    <span>Meta: {formatPesos(campaign.goalPesos)}</span>
                    <span>{campaign.daysLeft} días restantes</span>
                  </div>
                </div>

                {/* Trust Score */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm">Confianza:</span>
                  <span className={`text-sm font-medium ${getTrustScoreColor(campaign.trustScore)}`}>
                    {campaign.trustScore}/100
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button className="w-full medical-glow">
                    <Heart className="w-4 h-4 mr-2" />
                    Donar Ahora
                  </Button>
                  <Button variant="outline" className="w-full">
                    Ver Detalles
                  </Button>
                </div>

                {/* Last Update */}
                <div className="text-xs text-muted-foreground mt-3 text-center">
                  Última actualización: {campaign.lastUpdate}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredCampaigns.length === 0 && (
          <div className="text-center py-12">
            <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No se encontraron campañas</h3>
            <p className="text-muted-foreground">
              Intenta cambiar los filtros o crear una nueva campaña.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};