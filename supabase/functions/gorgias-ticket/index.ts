import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContactFormData {
  name: string;
  email: string;
  orderNumber?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, orderNumber, message }: ContactFormData = await req.json();
    
    console.log('Creating Gorgias ticket for:', email);

    const gorgiasApiKey = Deno.env.get('GORGIAS_API_KEY');
    const gorgiasDomain = Deno.env.get('GORGIAS_DOMAIN');
    const gorgiasAdminEmail = Deno.env.get('GORGIAS_ADMIN_EMAIL');

    if (!gorgiasApiKey || !gorgiasDomain || !gorgiasAdminEmail) {
      throw new Error('Gorgias credentials not configured');
    }

    // Create ticket in Gorgias
    const ticketData = {
      channel: "email",
      via: "web-form",
      customer: {
        email: email,
        name: name,
      },
      messages: [
        {
          channel: "email",
          via: "web-form",
          from: {
            address: email,
            name: name,
          },
          subject: orderNumber ? `Contact Form - Order #${orderNumber}` : 'Contact Form Submission',
          body_text: message,
          body_html: `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${orderNumber ? `<p><strong>Order Number:</strong> ${orderNumber}</p>` : ''}
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          `,
        }
      ],
    };

    const gorgiasResponse = await fetch(`https://${gorgiasDomain}/api/tickets`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(`${gorgiasAdminEmail}:${gorgiasApiKey}`)}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticketData),
    });

    if (!gorgiasResponse.ok) {
      const errorText = await gorgiasResponse.text();
      console.error('Gorgias API error:', gorgiasResponse.status, errorText);
      throw new Error(`Gorgias API error: ${gorgiasResponse.status}`);
    }

    const ticketResult = await gorgiasResponse.json();
    console.log('Ticket created successfully:', ticketResult.id);

    return new Response(
      JSON.stringify({ success: true, ticketId: ticketResult.id }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error('Error creating Gorgias ticket:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);
