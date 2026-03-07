// Notification System
class NotificationManager {
    constructor() {
        this.container = null;
        this.notifications = [];
        this.init();
    }

    init() {
        // Create container if it doesn't exist
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.className = 'notification-container';
            document.body.appendChild(this.container);
        }
    }

    show(options) {
        const {
            type = 'info',
            title = '',
            message = '',
            duration = 4000,
            icon = null
        } = options;

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;

        // Icon
        const iconElement = document.createElement('div');
        iconElement.className = 'notification-icon';
        
        if (icon === 'spinner') {
            iconElement.innerHTML = '<div class="spinner"></div>';
        } else {
            const iconMap = {
                info: 'ℹ️',
                success: '✅',
                warning: '⚠️',
                error: '❌'
            };
            iconElement.textContent = icon || iconMap[type] || 'ℹ️';
        }

        // Content
        const content = document.createElement('div');
        content.className = 'notification-content';
        
        if (title) {
            const titleElement = document.createElement('div');
            titleElement.className = 'notification-title';
            titleElement.textContent = title;
            content.appendChild(titleElement);
        }

        if (message) {
            const messageElement = document.createElement('div');
            messageElement.className = 'notification-message';
            messageElement.textContent = message;
            content.appendChild(messageElement);
        }

        // Assemble notification
        notification.appendChild(iconElement);
        notification.appendChild(content);

        // Add to container
        this.container.appendChild(notification);
        this.notifications.push(notification);

        // Auto remove after duration
        if (duration > 0) {
            setTimeout(() => {
                this.hide(notification);
            }, duration);
        }

        return notification;
    }

    hide(notification) {
        notification.classList.add('hiding');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
            this.notifications = this.notifications.filter(n => n !== notification);
        }, 300);
    }

    hideAll() {
        this.notifications.forEach(notification => {
            this.hide(notification);
        });
    }

    // Convenience methods
    info(title, message, duration) {
        return this.show({ type: 'info', title, message, duration });
    }

    success(title, message, duration) {
        return this.show({ type: 'success', title, message, duration });
    }

    warning(title, message, duration) {
        return this.show({ type: 'warning', title, message, duration });
    }

    error(title, message, duration) {
        return this.show({ type: 'error', title, message, duration });
    }

    loading(title, message) {
        return this.show({ 
            type: 'info', 
            title, 
            message, 
            duration: 0,
            icon: 'spinner'
        });
    }
}

// Create global instance
const notify = new NotificationManager();
