// EmailJS utility for sending emails from the contact form
import emailjs from '@emailjs/browser';

export const sendEmail = async (formData: { name: string; email: string; subject: string; message: string }) => {
  const serviceId = 'service_xbj5566';
  const templateId = 'template_ubtaupb';
  const publicKey = 'frKQQmeN5eZmNfMIV';

  const templateParams = {
    from_name: formData.name,
    from_email: formData.email,
    subject: formData.subject,
    message: formData.message,
  };

  return emailjs.send(serviceId, templateId, templateParams, publicKey);
};
