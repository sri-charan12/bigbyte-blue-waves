import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PaymentRequest {
  order_id: string;
  amount: number;
  customer_email: string;
  customer_name?: string;
  product_name: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client with service role key for full access
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const paymentData: PaymentRequest = await req.json();

    // Validate required fields
    if (!paymentData.order_id || !paymentData.amount || !paymentData.customer_email) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Simulate payment processing (replace with actual payment gateway)
    const paymentSuccessful = Math.random() > 0.1; // 90% success rate for demo
    const paymentId = `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    if (paymentSuccessful) {
      // Update order status to 'paid'
      const { error: updateError } = await supabaseClient
        .from("orders")
        .update({ 
          status: "paid",
          stripe_session_id: paymentId 
        })
        .eq('id', paymentData.order_id);

      if (updateError) {
        console.error("Error updating order:", updateError);
        return new Response(
          JSON.stringify({ error: "Failed to update order status" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
        );
      }

      return new Response(
        JSON.stringify({ 
          success: true,
          payment_id: paymentId,
          order_id: paymentData.order_id,
          message: "Payment processed successfully",
          redirect_url: `/order-tracking/${paymentData.order_id}`
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    } else {
      // Payment failed
      return new Response(
        JSON.stringify({ 
          success: false,
          error: "Payment failed. Please try again.",
          order_id: paymentData.order_id
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

  } catch (error) {
    console.error("Error processing payment:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});