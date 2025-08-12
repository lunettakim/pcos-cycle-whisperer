import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, BarChart3, Calendar } from "lucide-react";
import SymptomLogger from "@/components/SymptomLogger";
import Dashboard from "@/components/Dashboard";
import PatternChart from "@/components/PatternChart";

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
  notes: string;
  photo?: string;
}

const Index = () => {
  const [entries, setEntries] = useState<SymptomEntry[]>([]);

  const handleLogEntry = (entry: SymptomEntry) => {
    setEntries(prev => [...prev, entry]);
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            PCOS Symptom Tracker
          </h1>
          <p className="text-xl text-muted-foreground">
            Track your symptoms, understand your patterns, take control of your health
          </p>
        </header>

        <Tabs defaultValue="log" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="log" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Log Symptoms
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="patterns" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Patterns
            </TabsTrigger>
          </TabsList>

          <TabsContent value="log" className="space-y-6">
            <SymptomLogger onLogEntry={handleLogEntry} />
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-6">
            <Dashboard entries={entries} />
          </TabsContent>

          <TabsContent value="patterns" className="space-y-6">
            <PatternChart entries={entries} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
