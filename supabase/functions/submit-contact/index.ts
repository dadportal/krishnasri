import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, company, message, source } = await req.json();

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Name, email, and message are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid email address" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert lead into database
    const { data: lead, error: insertError } = await supabase
      .from("leads")
      .insert({
        name,
        email,
        company: company || null,
        message,
        source: source || "contact_form",
        score: calculateLeadScore({ company, message }),
      })
      .select()
      .single();

    if (insertError) {
      console.error("Error inserting lead:", insertError);
      throw insertError;
    }

    // Note: Email notification would be sent here via Resend if configured
    // For now, we just log the lead submission
    console.log("New lead submitted:", { name, email, company, source });

    return new Response(JSON.stringify({ success: true, leadId: lead.id }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error in submit-contact:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

function calculateLeadScore({ company, message }: { company?: string; message: string }): number {
  let score = 10; // Base score

  // Company provided
  if (company) score += 20;

  // Message length indicates interest
  if (message.length > 100) score += 15;
  if (message.length > 300) score += 10;

  // Keywords indicating high intent
  const highIntentKeywords = ["pricing", "demo", "trial", "enterprise", "team", "urgent", "asap", "budget"];
  const messageLC = message.toLowerCase();
  highIntentKeywords.forEach((kw) => {
    if (messageLC.includes(kw)) score += 10;
  });

  return Math.min(score, 100);
}
