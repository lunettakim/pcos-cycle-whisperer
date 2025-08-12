import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Heart, Brain, Droplets, Zap, Thermometer } from "lucide-react";

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
}

interface SymptomLoggerProps {
  onLogEntry: (entry: SymptomEntry) => void;
}

const symptoms = [
  { key: 'acne', label: 'Acne', icon: Droplets, color: 'text-health-warning' },
  { key: 'moonFace', label: 'Moon Face', icon: Heart, color: 'text-health-secondary' },
  { key: 'bloating', label: 'Bloating', icon: Zap, color: 'text-health-accent' },
  { key: 'stress', label: 'Stress', icon: Brain, color: 'text-health-primary' },
  { key: 'eczema', label: 'Eczema', icon: Thermometer, color: 'text-health-warning' },
  { key: 'fatigue', label: 'Fatigue', icon: Calendar, color: 'text-muted-foreground' },
];

export default function SymptomLogger({ onLogEntry }: SymptomLoggerProps) {
  const [symptoms_state, setSymptoms] = useState({
    acne: 0,
    moonFace: 0,
    bloating: 0,
    stress: 0,
    eczema: 0,
    fatigue: 0,
  });
  
  const [emotionalEvent, setEmotionalEvent] = useState("");
  const [cycleDay, setCycleDay] = useState("");
  const [notes, setNotes] = useState("");

  const handleSymptomChange = (symptom: string, value: number[]) => {
    setSymptoms(prev => ({ ...prev, [symptom]: value[0] }));
  };

  const handleSubmit = () => {
    const entry: SymptomEntry = {
      date: new Date().toISOString().split('T')[0],
      symptoms: symptoms_state,
      emotionalEvent,
      cycleDay,
      notes,
    };
    
    onLogEntry(entry);
    
    // Reset form
    setSymptoms({
      acne: 0,
      moonFace: 0,
      bloating: 0,
      stress: 0,
      eczema: 0,
      fatigue: 0,
    });
    setEmotionalEvent("");
    setCycleDay("");
    setNotes("");
  };

  return (
    <Card className="shadow-health border-health-primary/20">
      <CardHeader className="bg-gradient-primary text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5" />
          Daily Symptom Log
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">How are you feeling today?</h3>
          
          {symptoms.map(({ key, label, icon: Icon, color }) => (
            <div key={key} className="space-y-2">
              <div className="flex items-center gap-2">
                <Icon className={`h-4 w-4 ${color}`} />
                <Label className="font-medium">{label}</Label>
                <span className="ml-auto text-sm text-muted-foreground">
                  {symptoms_state[key as keyof typeof symptoms_state]}/10
                </span>
              </div>
              <Slider
                value={[symptoms_state[key as keyof typeof symptoms_state]]}
                onValueChange={(value) => handleSymptomChange(key, value)}
                max={10}
                step={1}
                className="w-full"
              />
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="emotional-event">Emotional Event/Trigger</Label>
            <Textarea
              id="emotional-event"
              placeholder="Describe any emotional events or triggers today..."
              value={emotionalEvent}
              onChange={(e) => setEmotionalEvent(e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cycle-day">Birth Control Cycle</Label>
            <Select value={cycleDay} onValueChange={setCycleDay}>
              <SelectTrigger>
                <SelectValue placeholder="Select cycle day" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 21 }, (_, i) => (
                  <SelectItem key={`day-${i + 1}`} value={`Day ${i + 1}`}>
                    Day {i + 1}
                  </SelectItem>
                ))}
                <SelectItem value="Break Day 1">Break Day 1</SelectItem>
                <SelectItem value="Break Day 2">Break Day 2</SelectItem>
                <SelectItem value="Break Day 3">Break Day 3</SelectItem>
                <SelectItem value="Break Day 4">Break Day 4</SelectItem>
                <SelectItem value="Break Day 5">Break Day 5</SelectItem>
                <SelectItem value="Break Day 6">Break Day 6</SelectItem>
                <SelectItem value="Break Day 7">Break Day 7</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any additional observations or notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[60px]"
            />
          </div>
        </div>

        <Button 
          onClick={handleSubmit} 
          className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
          size="lg"
        >
          Log Today's Entry
        </Button>
      </CardContent>
    </Card>
  );
}