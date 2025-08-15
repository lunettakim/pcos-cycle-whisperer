import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingUp, Heart, Brain } from "lucide-react";

interface SymptomEntry {
  date: string;
  symptoms: {
    acne: number;
    moonFace: number;
    bloating: number;
    stress: number;
    eczema: number;
    fatigue: number;
  };
  emotionalEvent: string;
  cycleDay: string;
  cyclePhase: string;
  notes: string;
  photo?: string;
}

interface DashboardProps {
  entries: SymptomEntry[];
}

export default function Dashboard({ entries }: DashboardProps) {
  const recentEntries = entries.slice(-7); // Last 7 days
  
  const getAverageSymptom = (symptom: keyof SymptomEntry['symptoms']) => {
    if (entries.length === 0) return 0;
    const sum = entries.reduce((acc, entry) => acc + entry.symptoms[symptom], 0);
    return Math.round(sum / entries.length * 10) / 10;
  };

  const getSeverityColor = (value: number) => {
    if (value <= 3) return "bg-health-success text-white";
    if (value <= 6) return "bg-health-warning text-white";
    return "bg-destructive text-destructive-foreground";
  };

  const getSeverityLabel = (value: number) => {
    if (value === 0) return "None";
    if (value <= 3) return "Mild";
    if (value <= 6) return "Moderate";
    return "Severe";
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-health-primary/10 rounded-lg">
                <Calendar className="h-5 w-5 text-health-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Entries</p>
                <p className="text-2xl font-bold">{entries.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-health-secondary/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-health-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Stress</p>
                <p className="text-2xl font-bold">{getAverageSymptom('stress')}/10</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-health-accent/10 rounded-lg">
                <Heart className="h-5 w-5 text-health-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Bloating</p>
                <p className="text-2xl font-bold">{getAverageSymptom('bloating')}/10</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Entries */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-health-primary" />
            Recent Entries
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentEntries.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No entries yet. Start logging your symptoms to see patterns!
            </p>
          ) : (
            recentEntries.map((entry, index) => (
              <div key={index} className="border border-border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{new Date(entry.date).toLocaleDateString()}</p>
                  {entry.cycleDay && (
                    <Badge variant="outline" className="bg-health-accent/10 text-health-accent border-health-accent/20">
                      {entry.cycleDay}
                    </Badge>
                  )}
                </div>
                
                {entry.photo && (
                  <div className="w-full">
                    <img 
                      src={entry.photo} 
                      alt="Daily photo" 
                      className="w-full h-32 object-cover rounded-lg border"
                    />
                  </div>
                )}
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {Object.entries(entry.symptoms).map(([symptom, value]) => (
                    <div key={symptom} className="flex items-center justify-between text-sm">
                      <span className="capitalize">{symptom.replace(/([A-Z])/g, ' $1').trim()}:</span>
                      <Badge className={`text-xs ${getSeverityColor(value)}`}>
                        {getSeverityLabel(value)}
                      </Badge>
                    </div>
                  ))}
                </div>
                
                {entry.emotionalEvent && (
                  <p className="text-sm text-muted-foreground">
                    <strong>Event:</strong> {entry.emotionalEvent}
                  </p>
                )}
                
                {entry.notes && (
                  <p className="text-sm text-muted-foreground">
                    <strong>Notes:</strong> {entry.notes}
                  </p>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}