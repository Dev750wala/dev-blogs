// dateString: 2024-05-20T02:19:55.490Z
export default function calculateJoinTime(dateString) {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
    const day = date.getDate();

    return {
        year: year,
        month: month,
        date: day,
    };
}
