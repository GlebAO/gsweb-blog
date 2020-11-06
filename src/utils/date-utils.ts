export function getFormattedDate(timestamp: string) {
    return new Date(timestamp).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function getFormattedDateTime(timestamp: string) {
    const dateObj = new Date(timestamp);
    return dateObj.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) + ' ' + dateObj.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })
}