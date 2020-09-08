export function getFormattedDate(timestamp: string) {
    return new Date(timestamp).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })
}