import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const KLAVIYO_API_KEY = Deno.env.get("KLAVIYO_PRIVATE_API_KEY");
const KLAVIYO_API_URL = "https://a.klaviyo.com/api";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SubscribeRequest {
  email: string;
  listId: string;
  properties?: Record<string, any>;
}

interface TrackEventRequest {
  email: string;
  event: string;
  properties?: Record<string, any>;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!KLAVIYO_API_KEY) {
      throw new Error("KLAVIYO_PRIVATE_API_KEY is not configured");
    }

    const body = await req.json();
    const { action } = body;

    if (action === "subscribe") {
      const { email, listId, properties = {} }: SubscribeRequest = body;
      
      console.log(`Subscribing ${email} to list ${listId}`);

      // Create or update profile
      const profileResponse = await fetch(`${KLAVIYO_API_URL}/profile-subscription-bulk-create-jobs/`, {
        method: "POST",
        headers: {
          "Authorization": `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
          "Content-Type": "application/json",
          "revision": "2024-10-15",
        },
        body: JSON.stringify({
          data: {
            type: "profile-subscription-bulk-create-job",
            attributes: {
              profiles: {
                data: [
                  {
                    type: "profile",
                    attributes: {
                      email,
                      properties,
                    }
                  }
                ]
              }
            },
            relationships: {
              list: {
                data: {
                  type: "list",
                  id: listId
                }
              }
            }
          }
        }),
      });

      if (!profileResponse.ok) {
        const errorText = await profileResponse.text();
        console.error("Klaviyo subscription error:", profileResponse.status, errorText);
        throw new Error(`Failed to subscribe: ${errorText}`);
      }

      const result = await profileResponse.json();
      console.log("Subscription successful:", result);

      return new Response(JSON.stringify({ success: true, data: result }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "track") {
      const { email, event, properties = {} }: TrackEventRequest = body;
      
      console.log(`Tracking event "${event}" for ${email}`);

      // Track event
      const eventResponse = await fetch(`${KLAVIYO_API_URL}/events/`, {
        method: "POST",
        headers: {
          "Authorization": `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
          "Content-Type": "application/json",
          "revision": "2024-10-15",
        },
        body: JSON.stringify({
          data: {
            type: "event",
            attributes: {
              profile: {
                data: {
                  type: "profile",
                  attributes: {
                    email,
                  }
                }
              },
              metric: {
                data: {
                  type: "metric",
                  attributes: {
                    name: event,
                  }
                }
              },
              properties,
              time: new Date().toISOString(),
            }
          }
        }),
      });

      if (!eventResponse.ok) {
        const errorText = await eventResponse.text();
        console.error("Klaviyo event tracking error:", eventResponse.status, errorText);
        throw new Error(`Failed to track event: ${errorText}`);
      }

      const result = await eventResponse.json();
      console.log("Event tracked successfully:", result);

      return new Response(JSON.stringify({ success: true, data: result }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    throw new Error("Invalid action. Use 'subscribe' or 'track'");

  } catch (error: any) {
    console.error("Error in klaviyo-subscribe function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
