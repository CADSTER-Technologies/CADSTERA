export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

const BACKEND_URL = 'https://backend-production-2648.up.railway.app';

export const sendContactEmail = async (
  data: ContactFormData
): Promise<{ success: boolean; message: string }> => {
  try {
    console.log('📤 Sending email via Resend backend...');

    const response = await fetch(`${BACKEND_URL}/api/send-contact-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        company: data.company || '',
        message: data.message,
      }),
    });

    const result = await response.json();

    if (result.success) {
      console.log('✅ Email sent successfully');
      return {
        success: true,
        message: 'Thank you for contacting us! We\'ll get back to you soon.',
      };
    } else {
      console.error('❌ Email sending failed:', result.message);
      return {
        success: false,
        message: result.message || 'Failed to send email. Please try again.',
      };
    }
  } catch (error: any) {
    console.error('❌ Email sending error:', error);
    return {
      success: false,
      message: 'Network error. Please check your connection and try again.',
    };
  }
};

export const sendDemoRequest = async (name: string, email: string) => {
  return sendContactEmail({
    name,
    email,
    message: '🎯 [DEMO REQUEST] Please contact me to schedule a personalized demo.',
  });
};
