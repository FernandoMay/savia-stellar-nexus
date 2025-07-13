import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { TreePine, Heart, DollarSign, Shield, Star, Info, CheckCircle } from "lucide-react";
import { useState } from "react";

interface TreeStage {
  name: string;
  minPesos: number;
  maxPesos: number;
  icon: string;
  description: string;
}

export const DonationFlow = () => {
  const [donationAmount, setDonationAmount] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [mintNFT, setMintNFT] = useState(true);
  const [selectedCampaign] = useState({
    id: "1",
    title: "Tratamiento de Cáncer de Mama para María",
    beneficiary: "María González",
    goalPesos: 250000,
    raisedPesos: 187500,
    pesoRate: 18.0 // 1 XLM = 18 MXN
  });

  const treeStages: TreeStage[] = [
    { name: "Semilla", minPesos: 0, maxPesos: 499, icon: "🌱", description: "Comenzando tu árbol de generosidad" },
    { name: "Brote", minPesos: 500, maxPesos: 1499, icon: "🌿", description: "Tu generosidad está creciendo" },
    { name: "Plántula", minPesos: 1500, maxPesos: 4999, icon: "🌲", description: "Un árbol joven de esperanza" },
    { name: "Árbol Joven", minPesos: 5000, maxPesos: 9999, icon: "🌳", description: "Tu impacto es notable" },
    { name: "Árbol Maduro", minPesos: 10000, maxPesos: 24999, icon: "🌲", description: "Generosidad establecida" },
    { name: "Árbol Poderoso", minPesos: 25000, maxPesos: Infinity, icon: "🌲", description: "Máximo nivel de impacto" }
  ];

  const pesoAmount = parseFloat(donationAmount) || 0;
  const xlmAmount = pesoAmount / selectedCampaign.pesoRate;
  const platformFee = xlmAmount * 0.02; // 2% fee
  const netXlmAmount = xlmAmount - platformFee;
  const netPesoAmount = netXlmAmount * selectedCampaign.pesoRate;

  const getCurrentTreeStage = (totalPesos: number) => {
    return treeStages.find(stage => 
      totalPesos >= stage.minPesos && totalPesos <= stage.maxPesos
    ) || treeStages[0];
  };

  const getNextTreeStage = (totalPesos: number) => {
    const currentStageIndex = treeStages.findIndex(stage => 
      totalPesos >= stage.minPesos && totalPesos <= stage.maxPesos
    );
    return currentStageIndex < treeStages.length - 1 ? treeStages[currentStageIndex + 1] : null;
  };

  // Mock user's current total donations
  const userTotalDonated = 3200; // pesos
  const newTotal = userTotalDonated + netPesoAmount;
  const currentStage = getCurrentTreeStage(userTotalDonated);
  const newStage = getCurrentTreeStage(newTotal);
  const nextStage = getNextTreeStage(newTotal);

  const formatPesos = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatXLM = (amount: number) => {
    return `${amount.toFixed(4)} XLM`;
  };

  const handleDonate = () => {
    if (!donationAmount || pesoAmount <= 0) {
      alert("Por favor ingresa una cantidad válida");
      return;
    }

    // Here would call the smart contract donate function
    console.log("Making donation:", {
      campaignId: selectedCampaign.id,
      xlmAmount: netXlmAmount,
      pesoAmount: netPesoAmount,
      anonymous: isAnonymous,
      mintNFT
    });

    alert("¡Donación exitosa! Tu NFT dinámico ha sido actualizado.");
  };

  return (
    <div className="py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Hacer una Donación</h1>
          <p className="text-muted-foreground">
            Ayuda a pacientes mexicanos y haz crecer tu árbol de generosidad
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Donation Form */}
          <div className="space-y-6">
            <Card className="medical-card">
              <CardHeader>
                <CardTitle>Campaña Seleccionada</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">{selectedCampaign.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Beneficiario: {selectedCampaign.beneficiary}
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Progreso</span>
                      <span className="text-sm">{((selectedCampaign.raisedPesos / selectedCampaign.goalPesos) * 100).toFixed(0)}%</span>
                    </div>
                    <Progress value={(selectedCampaign.raisedPesos / selectedCampaign.goalPesos) * 100} />
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>{formatPesos(selectedCampaign.raisedPesos)}</span>
                      <span>{formatPesos(selectedCampaign.goalPesos)}</span>
                    </div>
                  </div>

                  <Badge variant="secondary" className="w-full justify-center py-2">
                    <Shield className="w-3 h-3 mr-1" />
                    Campaña Verificada
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="medical-card">
              <CardHeader>
                <CardTitle>Detalles de Donación</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Cantidad en Pesos Mexicanos</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="amount"
                        type="number"
                        placeholder="0.00"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    {pesoAmount > 0 && (
                      <div className="text-sm text-muted-foreground">
                        Equivalente: {formatXLM(xlmAmount)} ({selectedCampaign.pesoRate} MXN/XLM)
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {[100, 500, 1000, 2500].map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        size="sm"
                        onClick={() => setDonationAmount(amount.toString())}
                      >
                        ${amount}
                      </Button>
                    ))}
                  </div>

                  {pesoAmount > 0 && (
                    <div className="p-4 bg-secondary-light/20 rounded-lg space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Donación:</span>
                        <span>{formatPesos(pesoAmount)} ({formatXLM(xlmAmount)})</span>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Comisión Plataforma (2%):</span>
                        <span>{formatXLM(platformFee)}</span>
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex justify-between font-medium">
                          <span>Total al Beneficiario:</span>
                          <span>{formatPesos(netPesoAmount)}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="anonymous">Donación Anónima</Label>
                        <p className="text-sm text-muted-foreground">
                          Tu nombre no aparecerá públicamente
                        </p>
                      </div>
                      <Switch
                        id="anonymous"
                        checked={isAnonymous}
                        onCheckedChange={setIsAnonymous}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="nft">Recibir/Actualizar NFT</Label>
                        <p className="text-sm text-muted-foreground">
                          Haz crecer tu árbol de generosidad
                        </p>
                      </div>
                      <Switch
                        id="nft"
                        checked={mintNFT}
                        onCheckedChange={setMintNFT}
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={handleDonate}
                    className="w-full medical-glow"
                    disabled={!donationAmount || pesoAmount <= 0}
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Donar {pesoAmount > 0 ? formatPesos(pesoAmount) : ""}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* NFT Preview */}
          <div className="space-y-6">
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TreePine className="w-5 h-5 mr-2" />
                  Tu Árbol de Generosidad
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Current Stage */}
                  <div className="text-center p-6 bg-secondary-light/20 rounded-lg">
                    <div className="text-4xl mb-2">{currentStage.icon}</div>
                    <h3 className="font-medium">{currentStage.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {currentStage.description}
                    </p>
                    <div className="text-lg font-bold mt-2">
                      {formatPesos(userTotalDonated)} donados
                    </div>
                  </div>

                  {/* Stage Progression */}
                  {newStage && newStage !== currentStage && (
                    <Alert>
                      <Star className="h-4 w-4" />
                      <AlertDescription>
                        ¡Esta donación elevará tu árbol a: <strong>{newStage.name} {newStage.icon}</strong>
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Progress to Next Stage */}
                  {nextStage && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progreso a {nextStage.name}</span>
                        <span>{formatPesos(newTotal)} / {formatPesos(nextStage.minPesos)}</span>
                      </div>
                      <Progress 
                        value={Math.min((newTotal / nextStage.minPesos) * 100, 100)} 
                        className="h-2"
                      />
                      <div className="text-xs text-muted-foreground text-center">
                        {nextStage.minPesos - newTotal > 0 ? 
                          `Faltan ${formatPesos(nextStage.minPesos - newTotal)} para el siguiente nivel` :
                          "¡Has alcanzado el siguiente nivel!"
                        }
                      </div>
                    </div>
                  )}

                  {/* All Stages */}
                  <div className="space-y-2">
                    <h4 className="font-medium">Etapas del Árbol</h4>
                    {treeStages.map((stage, index) => (
                      <div 
                        key={index}
                        className={`flex items-center justify-between p-2 rounded ${
                          newTotal >= stage.minPesos && newTotal <= stage.maxPesos
                            ? 'bg-primary/10 border border-primary/20'
                            : userTotalDonated >= stage.minPesos && userTotalDonated <= stage.maxPesos
                            ? 'bg-secondary/10'
                            : 'opacity-50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{stage.icon}</span>
                          <div>
                            <div className="text-sm font-medium">{stage.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {formatPesos(stage.minPesos)}
                              {stage.maxPesos !== Infinity ? ` - ${formatPesos(stage.maxPesos)}` : '+'}
                            </div>
                          </div>
                        </div>
                        {newTotal >= stage.minPesos && newTotal <= stage.maxPesos && (
                          <CheckCircle className="w-4 h-4 text-primary" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="medical-card">
              <CardHeader>
                <CardTitle>Información de Pago</CardTitle>
              </CardHeader>
              <CardContent>
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Los pagos se procesan a través de EtherFuse para conversión directa a pesos mexicanos. 
                    Tu donación llegará al beneficiario en MXN.
                  </AlertDescription>
                </Alert>
                
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Red:</span>
                    <span>Stellar (XLM)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Procesador:</span>
                    <span>EtherFuse</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tiempo estimado:</span>
                    <span>5-10 segundos</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Comisión de red:</span>
                    <span>~0.001 XLM</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};