import { isToday, isFuture, isPast, addDays, compareAsc } from "date-fns";


function Sort(arr) {
    arr.sort((a, b) => {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        const priorityA = priorityOrder[a.priority] || 4;
        const priorityB = priorityOrder[b.priority] || 4;

        if (priorityA !== priorityB) {
            return priorityA - priorityB;
        }

        return compareAsc(new Date(a.dueDate), new Date(b.dueDate));
    });
}


export function allTodos() {
    const today = [];
    const late = [];
    const upcoming = [];
    const completed = [];

    const projects = JSON.parse(localStorage.getItem("projects"));

    projects.forEach(project => {
        project.todos.forEach(todo => {
            const modified = {...todo, projectId: project.id}
            const dueDate = addDays(new Date(modified.dueDate), 1);

            if (modified.status === "completed") {
                completed.push(modified);
            } else if (isToday(dueDate)) { 
                today.push(modified);
            } else if (isPast(dueDate)) { 
                late.push(modified);
            } else if (isFuture(dueDate)) { 
                upcoming.push(modified);
            }

        });
    });

    Sort(today);
    Sort(late);
    Sort(upcoming);
    Sort(completed);
    
    return { today, late, upcoming, completed };
}