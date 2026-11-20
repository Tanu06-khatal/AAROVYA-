import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { useNotifications } from '../../context/NotificationContext';
import { Bell, CheckCheck, Calendar, FileText, UserCheck, Shield, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NotificationsPage: React.FC = () => {
  const { notifications, markAsRead, markAllAsRead } = useNotifications();
  const [activeTab, setActiveTab] = useState<'all' | 'appointment' | 'record' | 'system'>('all');

  const filtered = notifications.filter(n =>
    activeTab === 'all' ? true : n.category === activeTab
  );

  const icons: Record<string, React.ReactNode> = {
    appointment: <Calendar className="w-4 h-4 text-sky-600" />,
    record: <FileText className="w-4 h-4 text-emerald-600" />,
    access: <UserCheck className="w-4 h-4 text-amber-600" />,
    system: <Shield className="w-4 h-4 text-primary" />,
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Notifications"
        subtitle="Clinical alerts, verification updates, appointment reminders, and access authorizations"
        action={
          <Button
            variant="outline"
            size="sm"
            onClick={markAllAsRead}
            leftIcon={<CheckCheck className="w-4 h-4" />}
          >
            Mark All as Read
          </Button>
        }
      />

      {/* Tabs matching Panel 21: All, Appointments, Records, System */}
      <div className="flex border-b border-borderLight gap-4 text-xs font-bold">
        {(['all', 'appointment', 'record', 'system'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 capitalize transition-all border-b-2 ${
              activeTab === tab
                ? 'border-primary text-primary font-extrabold'
                : 'border-transparent text-textSecondary hover:text-navy'
            }`}
          >
            {tab === 'all' ? 'All Alerts' : `${tab}s`}
          </button>
        ))}
      </div>

      {/* Notifications List matching Panel 21 */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => markAsRead(item.id)}
            className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
              !item.read
                ? 'bg-primary-50/20 border-primary-light shadow-xs'
                : 'bg-white border-borderLight hover:bg-slate-50'
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-slate-100 flex-shrink-0 mt-0.5">
                {icons[item.category] || <Bell className="w-4 h-4" />}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-navy text-sm">{item.title}</h4>
                  {!item.read && (
                    <span className="w-2 h-2 rounded-full bg-primary" />
                  )}
                </div>
                <p className="text-xs text-textSecondary leading-relaxed">{item.message}</p>
                <span className="text-[11px] text-textSecondary font-medium block pt-1">
                  {item.timestamp}
                </span>
              </div>
            </div>

            {item.link && (
              <Link to={item.link} className="p-1 rounded-lg text-primary hover:bg-primary-50 self-center">
                <ChevronRight className="w-5 h-5" />
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

