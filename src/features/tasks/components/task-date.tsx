import { differenceInDays, format } from "date-fns";

import { cn } from "@/lib/utils";

interface TaskDateProp {
    value: string,
    className?: string,
}
const TaskDate = ({ value, className }: TaskDateProp) => {
    const today = new Date();
    const endDate = new Date(value);
    const diffInDays = differenceInDays(endDate, today);

    let textColor = 'text-muted-foreground';

    if (diffInDays <= 3) {
        textColor = "text-red-500";
    } else if (diffInDays <= 7) {
        textColor = "text-orange-500";
    } else if (diffInDays <= 14) {
        textColor = "text-yellow-500";
    }
    return (
        <div className={textColor}>
            <span className={cn("truncate", className)}>{format(value, "PPP")}</span>
        </div>
    )
}

export default TaskDate
