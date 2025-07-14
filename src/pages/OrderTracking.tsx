import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  MapPin, 
  CreditCard,
  ArrowLeft,
  RefreshCw,
  Phone,
  Mail
} from "lucide-react";

interface Order {
  id: string;
  customer_email: string;
  customer_name?: string;
  product_name: string;
  product_price: number;
  quantity: number;
  total_amount: number;
  status: string;
  created_at: string;
  shipping_address?: any;
  stripe_session_id?: string;
}

const OrderTracking = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const statusSteps = [
    { key: 'pending', label: 'Order Placed', icon: Package, description: 'Order has been received' },
    { key: 'paid', label: 'Payment Confirmed', icon: CreditCard, description: 'Payment processed successfully' },
    { key: 'processing', label: 'Processing', icon: Clock, description: 'Order is being prepared' },
    { key: 'shipped', label: 'Shipped', icon: Truck, description: 'Order is on the way' },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle, description: 'Order has been delivered' },
    { key: 'completed', label: 'Completed', icon: CheckCircle, description: 'Order completed successfully' }
  ];

  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          toast({
            title: "Order Not Found",
            description: "The order ID you're looking for doesn't exist.",
            variant: "destructive",
          });
          return;
        }
        throw error;
      }

      setOrder(data);
    } catch (error) {
      console.error('Error fetching order:', error);
      toast({
        title: "Error",
        description: "Failed to fetch order details",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getCurrentStepIndex = (status: string) => {
    const stepIndex = statusSteps.findIndex(step => step.key === status);
    return stepIndex >= 0 ? stepIndex : 0;
  };

  const getProgressPercentage = (status: string) => {
    const currentStep = getCurrentStepIndex(status);
    return ((currentStep + 1) / statusSteps.length) * 100;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'paid': return 'bg-blue-500';
      case 'processing': return 'bg-purple-500';
      case 'shipped': return 'bg-orange-500';
      case 'delivered': return 'bg-green-500';
      case 'completed': return 'bg-green-600';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-64 bg-muted rounded-lg"></div>
            <div className="h-48 bg-muted rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-6">
        <div className="max-w-4xl mx-auto text-center py-16">
          <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Order Not Found</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't find an order with the ID you provided.
          </p>
          <Button asChild>
            <Link to="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" asChild>
              <Link to="/products">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Order Tracking</h1>
              <p className="text-muted-foreground">Order ID: {order.id.slice(0, 8)}...</p>
            </div>
          </div>
          <Button variant="outline" onClick={fetchOrder}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>

        {/* Order Status Card */}
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  {order.product_name}
                </CardTitle>
                <p className="text-muted-foreground mt-1">
                  Quantity: {order.quantity} • Total: ₹{order.total_amount.toLocaleString('en-IN')}
                </p>
              </div>
              <Badge className={getStatusColor(order.status)}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Order Progress</h3>
                <span className="text-sm text-muted-foreground">
                  {Math.round(getProgressPercentage(order.status))}% Complete
                </span>
              </div>
              <Progress value={getProgressPercentage(order.status)} className="h-2" />
            </div>

            {/* Status Steps */}
            <div className="space-y-4">
              {statusSteps.map((step, index) => {
                const currentStep = getCurrentStepIndex(order.status);
                const isCompleted = index <= currentStep;
                const isCurrent = index === currentStep;
                
                return (
                  <div key={step.key} className={`flex items-center gap-4 p-3 rounded-lg transition-all ${
                    isCurrent ? 'bg-primary/10 border border-primary/20' : isCompleted ? 'bg-green-50 dark:bg-green-950' : 'bg-muted/30'
                  }`}>
                    <div className={`rounded-full p-2 ${
                      isCompleted ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'
                    }`}>
                      <step.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${isCurrent ? 'text-primary' : isCompleted ? 'text-green-700 dark:text-green-300' : 'text-muted-foreground'}`}>
                        {step.label}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                    {isCurrent && (
                      <div className="animate-pulse">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Order Details */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{order.customer_name || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{order.customer_email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Order Date</p>
                <p className="font-medium">{new Date(order.created_at).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</p>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              {order.shipping_address ? (
                <div className="space-y-2">
                  <p className="font-medium">{order.shipping_address.address}</p>
                  <p>{order.shipping_address.city}, {order.shipping_address.zipCode}</p>
                </div>
              ) : (
                <p className="text-muted-foreground">Shipping address not provided</p>
              )}
              
              {order.stripe_session_id && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-muted-foreground">Payment ID</p>
                  <p className="font-mono text-sm">{order.stripe_session_id}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Support Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Need Help?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium mb-2">Customer Support</p>
                <p className="text-sm text-muted-foreground mb-2">
                  If you have any questions about your order, feel free to contact us.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/contact">
                    Contact Support
                  </Link>
                </Button>
              </div>
              <div>
                <p className="font-medium mb-2">Order Issues</p>
                <p className="text-sm text-muted-foreground mb-2">
                  Report any issues with your order or delivery.
                </p>
                <Button variant="outline" size="sm">
                  Report Issue
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Continue Shopping */}
        <div className="text-center">
          <Button asChild>
            <Link to="/products">
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;