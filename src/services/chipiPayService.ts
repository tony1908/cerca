/**
 * ChipiPay API Service
 * Handles bill payment transactions through ChipiPay
 */

const CHIPIPAY_BASE_URL = '';
const CHIPIPAY_AUTH_TOKEN = 'your-auth-token-here'; // Replace with actual token or load from env

export interface ChipiPayPaymentRequest {
  service: string;
  serviceNumber: string;
  amount: string;
  paymentMethod: 'account' | 'loan';
  timestamp?: string;
  currency?: string;
}

export interface ChipiPayPaymentResponse {
  success: boolean;
  transactionId: string;
  message?: string;
  timestamp?: string;
}

/**
 * Send payment to ChipiPay API
 */
export const sendPaymentToChipiPay = async (
  paymentData: ChipiPayPaymentRequest
): Promise<ChipiPayPaymentResponse> => {
  try {
    console.log('💳 Sending payment to ChipiPay:', paymentData);

    const response = await fetch(`${CHIPIPAY_BASE_URL}/pay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CHIPIPAY_AUTH_TOKEN}`,
      },
      body: JSON.stringify({
        service: paymentData.service,
        serviceNumber: paymentData.serviceNumber,
        amount: paymentData.amount,
        paymentMethod: paymentData.paymentMethod,
        currency: paymentData.currency || 'PYUSD',
        timestamp: paymentData.timestamp || new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`ChipiPay API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ ChipiPay payment successful:', data);

    return {
      success: true,
      transactionId: data.transactionId || data.id || `TXN${Date.now()}`,
      message: data.message || 'Payment processed successfully',
      timestamp: data.timestamp || new Date().toISOString(),
    };
  } catch (error: any) {
    console.error('❌ ChipiPay payment failed:', error);

    // Return error response
    return {
      success: false,
      transactionId: '',
      message: error.message || 'Payment failed',
    };
  }
};
