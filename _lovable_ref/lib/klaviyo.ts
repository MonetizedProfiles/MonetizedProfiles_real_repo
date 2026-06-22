const KLAVIYO_LIST_ID = "R4JpCy";

export async function subscribeToKlaviyo(email: string, properties: Record<string, any> = {}) {
  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/klaviyo-subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "subscribe",
        email,
        listId: KLAVIYO_LIST_ID,
        properties,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to subscribe");
    }

    return await response.json();
  } catch (error) {
    console.error("Klaviyo subscribe error:", error);
    throw error;
  }
}

export async function trackKlaviyoEvent(
  email: string,
  event: string,
  properties: Record<string, any> = {}
) {
  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/klaviyo-subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "track",
        email,
        event,
        properties,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to track event");
    }

    return await response.json();
  } catch (error) {
    console.error("Klaviyo track event error:", error);
    throw error;
  }
}
