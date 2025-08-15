import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useState } from "react";
import { BarChart3 } from "lucide-react";

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

interface PatternChartProps {
  entries: SymptomEntry[];
}

const symptomColors = {
  acne: '#ec4899',
  moonFace: '#a855f7',
  bloating: '#06b6d4',
  stress: '#f97316',
  eczema: '#eab308',
  fatigue: '#6b7280',
};

export default function PatternChart({ entries }: PatternChartProps) {
  const [selectedSymptom, setSelectedSymptom] = useState<string>("stress");
  
  const chartData = entries
    .slice(-30) // Last 30 days
    .map(entry => ({
      date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      fullDate: entry.date,
      cycleDay: entry.cycleDay,
      cyclePhase: entry.cyclePhase,
      displayLabel: `${new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}${entry.cyclePhase ? ` (${entry.cyclePhase})` : ''}`,
      ...entry.symptoms,
    }));

  const allSymptomsData = entries
    .slice(-14) // Last 14 days for better visibility
    .map(entry => ({
      date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      cyclePhase: entry.cyclePhase,
      displayLabel: `${new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}${entry.cyclePhase ? ` (${entry.cyclePhase})` : ''}`,
      ...entry.symptoms,
    }));

  return (
    <div className="space-y-6">
      {/* Individual Symptom Chart */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-health-primary" />
            Symptom Patterns
          </CardTitle>
          <div className="flex items-center gap-4">
            <Select value={selectedSymptom} onValueChange={setSelectedSymptom}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select symptom" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stress">Stress</SelectItem>
                <SelectItem value="bloating">Bloating</SelectItem>
                <SelectItem value="acne">Acne</SelectItem>
                <SelectItem value="moonFace">Moon Face</SelectItem>
                <SelectItem value="eczema">Eczema</SelectItem>
                <SelectItem value="fatigue">Fatigue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {chartData.length === 0 ? (
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              No data available. Start logging symptoms to see patterns!
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="displayLabel" 
                  tick={{ fontSize: 10 }}
                  className="text-muted-foreground"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  domain={[0, 10]} 
                  tick={{ fontSize: 12 }}
                  className="text-muted-foreground"
                />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                          <p className="font-medium">{label}</p>
                          <p className="text-sm text-muted-foreground">
                            {selectedSymptom.charAt(0).toUpperCase() + selectedSymptom.slice(1)}: {payload[0].value}/10
                          </p>
                           {data.cycleDay && (
                             <p className="text-sm text-health-secondary">
                               Cycle: {data.cycleDay}
                             </p>
                           )}
                           {data.cyclePhase && (
                             <p className="text-sm text-health-accent">
                               Phase: {data.cyclePhase}
                             </p>
                           )}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey={selectedSymptom}
                  stroke={symptomColors[selectedSymptom as keyof typeof symptomColors]}
                  strokeWidth={3}
                  dot={{ fill: symptomColors[selectedSymptom as keyof typeof symptomColors], strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: symptomColors[selectedSymptom as keyof typeof symptomColors], strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* All Symptoms Overview */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>All Symptoms Overview (Last 14 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          {allSymptomsData.length === 0 ? (
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              No data available for overview chart.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={allSymptomsData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="displayLabel" 
                  tick={{ fontSize: 10 }}
                  className="text-muted-foreground"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  domain={[0, 10]} 
                  tick={{ fontSize: 12 }}
                  className="text-muted-foreground"
                />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                          <p className="font-medium mb-2">{data.date}</p>
                          {data.cyclePhase && (
                            <p className="text-sm text-health-accent mb-1">
                              Phase: {data.cyclePhase}
                            </p>
                          )}
                          {payload.map((entry, index) => (
                            <p key={index} className="text-sm" style={{ color: entry.color }}>
                              {entry.dataKey?.toString().charAt(0).toUpperCase() + entry.dataKey?.toString().slice(1)}: {entry.value}/10
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                {Object.entries(symptomColors).map(([symptom, color]) => (
                  <Line
                    key={symptom}
                    type="monotone"
                    dataKey={symptom}
                    stroke={color}
                    strokeWidth={2}
                    dot={{ fill: color, strokeWidth: 1, r: 3 }}
                    name={symptom.charAt(0).toUpperCase() + symptom.slice(1).replace(/([A-Z])/g, ' $1')}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}