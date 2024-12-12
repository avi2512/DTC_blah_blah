import React, { useState } from 'react';

const NotificationPage = () => {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'delay',
            title: 'New Delay Reported',
            message: 'Route A is experiencing a 15-minute delay',
            timestamp: '2024-03-20T10:30:00',
            read: false,
            priority: 'high'
        },
        {
            id: 2,
            type: 'schedule',
            title: 'Schedule Update',
            message: 'New schedule published for Route B',
            timestamp: '2024-03-20T09:15:00',
            read: true,
            priority: 'medium'
        },
        {
            id: 3,
            type: 'crew',
            title: 'Crew Assignment',
            message: 'New crew assigned to Route C',
            timestamp: '2024-03-20T08:45:00',
            read: false,
            priority: 'low'
        }
    ]);

    const markAsRead = (id) => {
        setNotifications(notifications.map(notif =>
            notif.id === id ? { ...notif, read: true } : notif
        ));
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'border-red-500 bg-red-50';
            case 'medium': return 'border-yellow-500 bg-yellow-50';
            case 'low': return 'border-green-500 bg-green-50';
            default: return 'border-gray-200';
        }
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'delay':
                return '⏰';
            case 'schedule':
                return '📅';
            case 'crew':
                return '👥';
            default:
                return '📌';
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Notifications</h2>
                <div className="flex gap-2">
                    <span className="text-sm text-gray-600">
                        {notifications.filter(n => !n.read).length} unread
                    </span>
                    <button 
                        className="text-blue-600 hover:text-blue-800 text-sm"
                        onClick={() => setNotifications(notifications.map(n => ({...n, read: true})))}
                    >
                        Mark all as read
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className={`p-4 border-l-4 rounded-lg shadow-sm ${getPriorityColor(notification.priority)} 
                            ${notification.read ? 'opacity-75' : ''}`}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                                <span className="text-2xl" role="img" aria-label={notification.type}>
                                    {getTypeIcon(notification.type)}
                                </span>
                                <div>
                                    <h3 className="font-semibold">{notification.title}</h3>
                                    <p className="text-gray-600">{notification.message}</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {new Date(notification.timestamp).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                            {!notification.read && (
                                <button
                                    onClick={() => markAsRead(notification.id)}
                                    className="text-sm text-blue-600 hover:text-blue-800"
                                >
                                    Mark as read
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotificationPage;