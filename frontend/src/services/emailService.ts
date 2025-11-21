import emailjs from '@emailjs/browser';

// Replace with your actual Public Key from EmailJS
emailjs.init('SxOVkv3P3YS_h6JG5');

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export const sendContactEmail = async (
  data: ContactFormData
): Promise<{ success: boolean; message: string }> => {
  try {
    console.log('📤 Sending email via EmailJS...');

    const response = await emailjs.send(
      'service_dtzp5cf',      // Replace with your Service ID
      'template_d3jegxp',     // Replace with your Template ID
      {
        name: data.name,
        from_email: data.email,
        company: data.company || 'N/A',
        message: data.message,
      }
    );

    console.log('✅ Email sent successfully:', response);
    return {
      success: true,
      message: 'Thanks! We will contact you soon.',
    };
  } catch (error: any) {
    console.error('❌ Email sending failed:', error);
    return {
      success: false,
      message: 'Failed to send email. Please try again.',
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
