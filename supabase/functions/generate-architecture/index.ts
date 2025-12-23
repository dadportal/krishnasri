import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ArchitectureRequest {
  prompt: string;
  industry: string;
  securityLevel: 'basic' | 'standard' | 'enterprise' | 'military';
  scaleTier: 'startup' | 'growth' | 'enterprise';
  budget: 'low' | 'medium' | 'high';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, industry, securityLevel, scaleTier, budget } = await req.json() as ArchitectureRequest;
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are an expert cloud architect. Generate a detailed system architecture based on the requirements.

Your response MUST be valid JSON with this exact structure:
{
  "title": "string - architecture name",
  "description": "string - brief description",
  "services": [
    {
      "name": "string",
      "type": "compute" | "database" | "storage" | "networking" | "security" | "ai" | "analytics" | "messaging",
      "provider": "AWS" | "GCP" | "Azure" | "Multi-cloud",
      "description": "string",
      "monthlyEstimate": number
    }
  ],
  "databases": [
    {
      "name": "string",
      "type": "relational" | "document" | "key-value" | "graph" | "time-series" | "vector",
      "technology": "string",
      "purpose": "string"
    }
  ],
  "securityLayers": [
    {
      "name": "string",
      "type": "authentication" | "authorization" | "encryption" | "network" | "monitoring" | "compliance",
      "description": "string"
    }
  ],
  "deploymentTopology": {
    "regions": ["string"],
    "availability": "single" | "multi-az" | "multi-region",
    "disaster_recovery": "string"
  },
  "costEstimate": {
    "monthly": number,
    "yearly": number,
    "breakdown": [
      { "category": "string", "amount": number }
    ]
  },
  "recommendations": ["string"]
}

Consider the following parameters:
- Industry: ${industry}
- Security Level: ${securityLevel}
- Scale Tier: ${scaleTier}
- Budget: ${budget}

Generate realistic cost estimates and appropriate services for the given requirements.`;

    console.log('Calling Lovable AI Gateway for architecture generation...');

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('No response from AI');
    }

    // Parse JSON from response
    let architecture;
    try {
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        architecture = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      // Return a fallback architecture
      architecture = {
        title: 'Generated Architecture',
        description: 'AI-generated system architecture based on your requirements.',
        services: [
          { name: 'API Gateway', type: 'networking', provider: 'AWS', description: 'Request routing and rate limiting', monthlyEstimate: 150 },
          { name: 'Compute Cluster', type: 'compute', provider: 'AWS', description: 'Auto-scaling compute instances', monthlyEstimate: 500 },
          { name: 'Primary Database', type: 'database', provider: 'AWS', description: 'Managed PostgreSQL database', monthlyEstimate: 300 },
        ],
        databases: [
          { name: 'PostgreSQL', type: 'relational', technology: 'Amazon RDS', purpose: 'Primary data store' }
        ],
        securityLayers: [
          { name: 'WAF', type: 'network', description: 'Web Application Firewall for DDoS protection' },
          { name: 'IAM', type: 'authorization', description: 'Identity and Access Management' }
        ],
        deploymentTopology: {
          regions: ['us-east-1', 'us-west-2'],
          availability: 'multi-az',
          disaster_recovery: 'Active-passive failover'
        },
        costEstimate: {
          monthly: 1500,
          yearly: 18000,
          breakdown: [
            { category: 'Compute', amount: 500 },
            { category: 'Database', amount: 300 },
            { category: 'Networking', amount: 200 },
            { category: 'Storage', amount: 150 },
            { category: 'Security', amount: 250 },
            { category: 'Monitoring', amount: 100 }
          ]
        },
        recommendations: [
          'Consider implementing caching layer for improved performance',
          'Set up automated backups with cross-region replication',
          'Implement comprehensive logging and monitoring'
        ]
      };
    }

    console.log('Architecture generated successfully');

    return new Response(
      JSON.stringify({ architecture, rawContent: content }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in generate-architecture:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
