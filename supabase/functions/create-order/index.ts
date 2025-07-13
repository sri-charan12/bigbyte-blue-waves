import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderRequest {
  product_id: string;
  product_name: string;
  product_price: number;
  quantity: number;
  customer_email: string;
  customer_name?: string;
  shipping_address?: any;
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

    // Get user from auth header if available
    let user = null;
    const authHeader = req.headers.get("Authorization");
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      const { data: userData } = await supabaseClient.auth.getUser(token);
      user = userData.user;
    }

    const orderData: OrderRequest = await req.json();

    // Validate required fields
    if (!orderData.product_id || !orderData.product_name || !orderData.product_price || !orderData.customer_email) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    const totalAmount = orderData.product_price * (orderData.quantity || 1);

    // Create order in database
    const { data: order, error: orderError } = await supabaseClient
      .from("orders")
      .insert({
        user_id: user?.id || null,
        product_id: orderData.product_id,
        product_name: orderData.product_name,
        product_price: orderData.product_price,
        quantity: orderData.quantity || 1,
        total_amount: totalAmount,
        customer_email: orderData.customer_email,
        customer_name: orderData.customer_name,
        shipping_address: orderData.shipping_address,
        status: "pending",
      })
      .select()
      .single();

    if (orderError) {
      console.error("Database error:", orderError);
      return new Response(
        JSON.stringify({ error: "Failed to create order" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        order_id: order.id,
        message: "Order created successfully",
        order: order
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );

  } catch (error) {
    console.error("Error creating order:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});