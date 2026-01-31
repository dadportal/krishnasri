import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  CalendarDays, 
  Clock, 
  Plus, 
  Video,
  MapPin,
  Users
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30"
];

export default function Appointments() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    title: "",
    description: "",
    startTime: "10:00",
    duration: "30",
    location: "",
    meetingLink: "",
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: appointments = [], isLoading } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];
      
      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .eq("user_id", user.id)
        .order("start_time", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const createAppointment = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const [hours, minutes] = newAppointment.startTime.split(":").map(Number);
      const startTime = new Date(selectedDate);
      startTime.setHours(hours, minutes, 0, 0);

      const endTime = new Date(startTime);
      endTime.setMinutes(endTime.getMinutes() + parseInt(newAppointment.duration));

      const { error } = await supabase.from("appointments").insert({
        user_id: user.id,
        title: newAppointment.title,
        description: newAppointment.description,
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        location: newAppointment.location || null,
        meeting_link: newAppointment.meetingLink || null,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      setIsDialogOpen(false);
      setNewAppointment({
        title: "",
        description: "",
        startTime: "10:00",
        duration: "30",
        location: "",
        meetingLink: "",
      });
      toast({ title: "Appointment created!" });
    },
    onError: () => {
      toast({ title: "Failed to create appointment", variant: "destructive" });
    },
  });

  const selectedDateAppointments = appointments.filter((apt) => {
    const aptDate = new Date(apt.start_time);
    return aptDate.toDateString() === selectedDate.toDateString();
  });

  const generateGoogleMeetLink = () => {
    setNewAppointment({ 
      ...newAppointment, 
      meetingLink: "https://meet.google.com/new" 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 bg-grid-pattern bg-grid opacity-30 pointer-events-none" />
      
      <div className="flex min-h-screen relative">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex-1 flex flex-col lg:ml-0">
          <Header onMenuClick={() => setSidebarOpen(true)} />

          <main className="flex-1 p-4 lg:p-6 overflow-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-display text-3xl font-bold mb-1">
                    Appointment <span className="gradient-text">Booking</span>
                  </h1>
                  <p className="text-muted-foreground">
                    Schedule and manage your appointments
                  </p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="w-4 h-4" />
                      New Appointment
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Appointment</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Title</label>
                        <Input
                          value={newAppointment.title}
                          onChange={(e) => setNewAppointment({ ...newAppointment, title: e.target.value })}
                          placeholder="Meeting title"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Description</label>
                        <Textarea
                          value={newAppointment.description}
                          onChange={(e) => setNewAppointment({ ...newAppointment, description: e.target.value })}
                          placeholder="Meeting description"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Time</label>
                          <Select
                            value={newAppointment.startTime}
                            onValueChange={(v) => setNewAppointment({ ...newAppointment, startTime: v })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {timeSlots.map((slot) => (
                                <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Duration</label>
                          <Select
                            value={newAppointment.duration}
                            onValueChange={(v) => setNewAppointment({ ...newAppointment, duration: v })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="15">15 minutes</SelectItem>
                              <SelectItem value="30">30 minutes</SelectItem>
                              <SelectItem value="45">45 minutes</SelectItem>
                              <SelectItem value="60">1 hour</SelectItem>
                              <SelectItem value="90">1.5 hours</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Location</label>
                        <Input
                          value={newAppointment.location}
                          onChange={(e) => setNewAppointment({ ...newAppointment, location: e.target.value })}
                          placeholder="Meeting location"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Meeting Link</label>
                        <div className="flex gap-2">
                          <Input
                            value={newAppointment.meetingLink}
                            onChange={(e) => setNewAppointment({ ...newAppointment, meetingLink: e.target.value })}
                            placeholder="https://meet.google.com/..."
                          />
                          <Button type="button" variant="outline" onClick={generateGoogleMeetLink}>
                            <Video className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <Button 
                        onClick={() => createAppointment.mutate()}
                        disabled={!newAppointment.title || createAppointment.isPending}
                        className="w-full"
                      >
                        {createAppointment.isPending ? "Creating..." : "Create Appointment"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Calendar */}
              <div className="lg:col-span-1">
                <div className="glass rounded-xl p-4">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    className="rounded-md"
                  />
                </div>
              </div>

              {/* Appointments for selected date */}
              <div className="lg:col-span-2">
                <div className="glass rounded-xl p-6">
                  <h2 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-primary" />
                    {format(selectedDate, "EEEE, MMMM d, yyyy")}
                  </h2>

                  {isLoading ? (
                    <div className="text-center py-8 text-muted-foreground">Loading...</div>
                  ) : selectedDateAppointments.length === 0 ? (
                    <div className="text-center py-12">
                      <CalendarDays className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                      <p className="text-muted-foreground">No appointments for this day</p>
                      <Button 
                        variant="link" 
                        onClick={() => setIsDialogOpen(true)}
                        className="mt-2"
                      >
                        Create one now
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {selectedDateAppointments.map((apt) => (
                        <motion.div
                          key={apt.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="p-4 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium">{apt.title}</h3>
                              {apt.description && (
                                <p className="text-sm text-muted-foreground mt-1">{apt.description}</p>
                              )}
                              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {format(new Date(apt.start_time), "HH:mm")} - {format(new Date(apt.end_time), "HH:mm")}
                                </span>
                                {apt.location && (
                                  <span className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {apt.location}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Badge variant={apt.status === "scheduled" ? "default" : "secondary"}>
                                {apt.status}
                              </Badge>
                              {apt.meeting_link && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => window.open(apt.meeting_link, "_blank")}
                                >
                                  <Video className="w-4 h-4 mr-1" />
                                  Join
                                </Button>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
