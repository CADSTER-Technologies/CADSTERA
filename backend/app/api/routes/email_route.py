import os
from flask import Blueprint, request, jsonify
from loguru import logger
import resend

email_bp = Blueprint("email", __name__)

@email_bp.route("/send-contact-email", methods=["POST", "OPTIONS"])
def send_contact_email():
    """Send contact form email via Resend"""
    
    # Handle preflight OPTIONS request
    if request.method == "OPTIONS":
        return "", 204
    
    try:
        data = request.get_json()
        
        # Validate required fields
        if not all(k in data for k in ["name", "email", "message"]):
            return jsonify({
                "success": False,
                "message": "Missing required fields"
            }), 400
        
        # Get Resend API key from environment
        resend_api_key = os.getenv("RESEND_API_KEY")
        if not resend_api_key:
            logger.error("RESEND_API_KEY not found in environment")
            return jsonify({
                "success": False,
                "message": "Email service not configured"
            }), 500
        
        resend.api_key = resend_api_key
        
        logger.info(f"📧 Sending contact email from {data['name']} <{data['email']}>")
        
        # Email to services@cadster.in
        try:
            params_to_admin = {
                "from": "Contact Form <noreply@cadster.in>",
                "to": ["services@cadster.in"],
                "subject": f"New Contact: {data['name']}",
                "html": f"""
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #ea5c2a;">New Contact Form Submission</h2>
                        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
                            <p><strong>Name:</strong> {data['name']}</p>
                            <p><strong>Email:</strong> {data['email']}</p>
                            <p><strong>Company:</strong> {data.get('company', 'N/A')}</p>
                            <p><strong>Message:</strong></p>
                            <p style="white-space: pre-wrap;">{data['message']}</p>
                        </div>
                    </div>
                """
            }
            
            admin_response = resend.Emails.send(params_to_admin)
            logger.info(f"✅ Admin email sent: {admin_response}")
            
        except Exception as admin_err:
            logger.error(f"❌ Failed to send admin email: {admin_err}")
            return jsonify({
                "success": False,
                "message": "Failed to send notification email"
            }), 500
        
        # Auto-reply to user
        try:
            params_to_user = {
                "from": "Cadster Team <noreply@cadster.in>",
                "to": [data['email']],
                "subject": "Thank you for contacting Cadster Technologies",
                "html": f"""
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <div style="background: #ea5c2a; padding: 20px; border-radius: 8px 8px 0 0;">
                            <h2 style="color: white; margin: 0;">Thank you for reaching out!</h2>
                        </div>
                        <div style="background: #f5f5f5; padding: 20px; border-radius: 0 0 8px 8px;">
                            <p>Hi {data['name']},</p>
                            <p>We've received your message and our team will get back to you shortly.</p>
                            <p>In the meantime, feel free to explore our <a href="https://www.cadster.in/products" style="color: #ea5c2a;">products</a> and <a href="https://www.cadster.in/solutions" style="color: #ea5c2a;">solutions</a>.</p>
                            <p style="margin-top: 30px;">Best regards,<br><strong>Cadster Technologies Team</strong></p>
                        </div>
                    </div>
                """
            }
            
            user_response = resend.Emails.send(params_to_user)
            logger.info(f"✅ User auto-reply sent: {user_response}")
            
        except Exception as user_err:
            logger.error(f"⚠️ Failed to send auto-reply (non-critical): {user_err}")
            # Don't fail the request if auto-reply fails
        
        return jsonify({
            "success": True,
            "message": "Email sent successfully"
        }), 200
        
    except Exception as e:
        logger.error(f"❌ Contact email error: {e}")
        return jsonify({
            "success": False,
            "message": "Internal server error"
        }), 500
