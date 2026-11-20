import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { mockChatMessages } from '../../data/mockData';
import { ChatMessage } from '../../types';
import { Bot, Send, Sparkles, AlertCircle, User, FileText, CheckCircle2 } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

export const AIHealthAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { showToast } = useNotifications();

  const suggestedQueries = [
    'Summarize my latest blood report',
    'What does high RBC count indicate?',
    'Explain my current prescription dosage',
    'Are my cholesterol levels within target?',
  ];

  const handleSend = (queryText?: string) => {
    const textToSend = queryText || inputText;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!queryText) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let assistantMsg: ChatMessage;

      if (textToSend.toLowerCase().includes('blood') || textToSend.toLowerCase().includes('report')) {
        assistantMsg = {
          id: `msg-ai-${Date.now()}`,
          sender: 'assistant',
          content: 'Here is a clinical breakdown of your latest Complete Blood Count (CBC) & Lipid Profile from ABC Hospital (24 Sep 2026):',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          reportAnalysis: {
            testName: 'Complete Blood Count & Lipid Panel',
            highlights: [
              { parameter: 'Hemoglobin', result: '13.2 g/dL (Normal)', status: 'normal' },
              { parameter: 'WBC Count', result: '7,400 /µL (Normal)', status: 'normal' },
              { parameter: 'Platelets', result: '2.8 lakh/µL (Normal)', status: 'normal' },
              { parameter: 'Serum Cholesterol', result: '178 mg/dL (Desirable)', status: 'normal' },
            ],
            summary: 'All key parameters are well within standard reference ranges. No systemic anomalies detected.',
            recommendations: [
              'Continue prescribed balanced hydration',
              'Next routine wellness panel recommended in March 2027',
            ],
          },
        };
      } else {
        assistantMsg = {
          id: `msg-ai-${Date.now()}`,
          sender: 'assistant',
          content: `Regarding "${textToSend}": In healthy adult patients with B+ blood profiles, maintaining stable biological vitals requires adequate hydration, balanced diet, and adherence to medical consultation. Always consult Dr. Priya Sharma before adjusting any active pharmaceuticals.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
      }

      setMessages(prev => [...prev, assistantMsg]);
    }, 900);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
      <PageHeader
        title="AI Health Assistant"
        subtitle="AI clinical assistant designed to summarize reports and explain diagnostic markers"
      />

      {/* Suggested Quick Prompt Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
        {suggestedQueries.map((query, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(query)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-borderLight text-navy hover:border-primary hover:text-primary whitespace-nowrap shadow-xs transition-colors"
          >
            <Sparkles className="w-3 h-3 text-primary" />
            <span>{query}</span>
          </button>
        ))}
      </div>

      {/* Main Chat Box */}
      <div className="bg-white rounded-3xl border border-borderLight shadow-card flex-1 flex flex-col overflow-hidden">
        {/* Chat Conversation Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                  msg.sender === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-blue-100 text-primary border border-blue-200'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] sm:max-w-xl rounded-2xl p-4 text-xs space-y-2 leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-primary text-white rounded-tr-none'
                    : 'bg-slate-50 text-navy border border-slate-200 rounded-tl-none'
                }`}
              >
                <p>{msg.content}</p>

                {/* Structured Report Analysis if available (Matching Panel 17) */}
                {msg.reportAnalysis && (
                  <div className="mt-3 bg-white p-4 rounded-xl border border-slate-200 space-y-3 text-navy">
                    <div className="font-bold text-xs border-b pb-1.5 flex items-center justify-between">
                      <span>{msg.reportAnalysis.testName}</span>
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                        Normal Result
                      </span>
                    </div>

                    <div className="space-y-1">
                      {msg.reportAnalysis.highlights.map((h, i) => (
                        <div key={i} className="flex items-center justify-between py-0.5 text-[11px]">
                          <span className="font-medium text-textSecondary">{h.parameter}:</span>
                          <strong className="text-navy">{h.result}</strong>
                        </div>
                      ))}
                    </div>

                    <p className="text-[11px] text-textSecondary pt-1 border-t italic">
                      {msg.reportAnalysis.summary}
                    </p>
                  </div>
                )}

                <div
                  className={`text-[10px] mt-1 text-right ${
                    msg.sender === 'user' ? 'text-blue-100' : 'text-textSecondary'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-textSecondary">
              <Bot className="w-4 h-4 text-primary animate-bounce" />
              <span>AAROVYA Assistant is analyzing clinical records...</span>
            </div>
          )}
        </div>

        {/* Disclaimer Bar */}
        <div className="px-4 py-2 bg-slate-50 border-t border-borderLight text-[11px] text-textSecondary text-center">
          AAROVYA AI provides informational clinical summaries only. Never substitute AI output for certified physician medical advice.
        </div>

        {/* Input Field */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 sm:p-4 bg-white border-t border-borderLight flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask about your health records, lab markers, or prescriptions..."
            className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-borderLight rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={!inputText.trim() || isTyping}
            leftIcon={<Send className="w-4 h-4" />}
          >
            Ask
          </Button>
        </form>
      </div>
    </div>
  );
};

