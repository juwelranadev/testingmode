import React, { useState } from 'react';
import { MessageCircle, Mail, Headphones, Phone, Send } from 'lucide-react';

interface ContactComponentProps {
  onSubmitTicket: (ticket: TicketForm) => void;
}

interface ContactMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  responseTime: string;
  available: boolean;
  action: string;
}

interface TicketForm {
  subject: string;
  category: string;
  priority: string;
  message: string;
}

const ContactComponent: React.FC<ContactComponentProps> = ({ onSubmitTicket }) => {
  const [ticketForm, setTicketForm] = useState<TicketForm>({
    subject: '',
    category: '',
    priority: 'medium',
    message: ''
  });

  const contactMethods: ContactMethod[] = [
    {
      id: 'telegram',
      name: 'Telegram Support',
      icon: <MessageCircle className="w-6 h-6" />,
      description: 'Chat with our support team on Telegram',
      responseTime: 'Usually within 1 hour',
      available: true,
      action: 'Open Telegram'
    },
    {
      id: 'email',
      name: 'Email Support',
      icon: <Mail className="w-6 h-6" />,
      description: 'Send us an email for detailed inquiries',
      responseTime: 'Usually within 24 hours',
      available: true,
      action: 'Send Email'
    },
    {
      id: 'live-chat',
      name: 'Live Chat',
      icon: <Headphones className="w-6 h-6" />,
      description: 'Real-time chat support',
      responseTime: 'Available 9 AM - 6 PM UTC',
      available: false,
      action: 'Start Chat'
    },
    {
      id: 'phone',
      name: 'Phone Support',
      icon: <Phone className="w-6 h-6" />,
      description: 'Call our support hotline',
      responseTime: 'Available 9 AM - 5 PM UTC',
      available: false,
      action: 'Call Now'
    }
  ];

  const handleSubmitTicket = () => {
    if (ticketForm.subject && ticketForm.category && ticketForm.message) {
      onSubmitTicket(ticketForm);
      setTicketForm({ subject: '', category: '', priority: 'medium', message: '' });
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-white font-bold text-lg mb-2">Get in Touch</h3>
        <p className="text-gray-400 text-sm">
          Choose your preferred way to contact us
        </p>
      </div>

      <div className="space-y-3">
        {contactMethods.map((method) => (
          <div
            key={method.id}
            className={`bg-gray-800/50 rounded-lg p-4 border border-gray-700 ${
              method.available ? 'hover:border-cyan-400/50 cursor-pointer' : 'opacity-60'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="text-cyan-400">{method.icon}</div>
                <div>
                  <div className="text-white font-bold">{method.name}</div>
                  <div className="text-gray-400 text-sm">{method.description}</div>
                </div>
              </div>
              {!method.available && (
                <span className="text-red-400 text-xs font-bold">OFFLINE</span>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-xs">{method.responseTime}</span>
              <button
                disabled={!method.available}
                className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${
                  method.available
                    ? 'bg-cyan-600 hover:bg-cyan-500 text-white'
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
                onClick={
                  method.id === 'telegram' && method.available
                    ? () => window.open('https://t.me/zikrulislam84', '_blank', 'noopener,noreferrer')
                    : method.id === 'email' && method.available
                      ? () => window.open('mailto:itonzi.finance@gmail.com')
                      : undefined
                }
              >
                {method.action}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Contact Form */}
      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 mt-6">
        <h4 className="text-white font-bold mb-3">Quick Message</h4>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Subject"
            value={ticketForm.subject}
            onChange={(e) => setTicketForm({...ticketForm, subject: e.target.value})}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
          />
          <select
            value={ticketForm.category}
            onChange={(e) => setTicketForm({...ticketForm, category: e.target.value})}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
          >
            <option value="">Select Category</option>
            <option value="technical">Technical Issue</option>
            <option value="payment">Payment Problem</option>
            <option value="account">Account Issue</option>
            <option value="general">General Question</option>
          </select>
          <textarea
            placeholder="Describe your issue..."
            value={ticketForm.message}
            onChange={(e) => setTicketForm({...ticketForm, message: e.target.value})}
            rows={3}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none resize-none"
          />
          <button
            onClick={handleSubmitTicket}
            className="w-full bg-cyan-600 hover:bg-cyan-500 py-2 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactComponent; 