import { ProjectAnalyticsResponseType } from "@/features/projects/api/use-get-project-analytics";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import AnalyticsCard from "./analytics-card";
import { DottedSeprator } from "./dotted-seprator";


const Analytics = ({ data }: ProjectAnalyticsResponseType) => {



    return (
        <ScrollArea className="border rounded-lg w-full whitespace-nowrap shrink-0">
            <div className="w-full flex flex-row">
                <div className="flex items-center flex-1">
                    <AnalyticsCard
                        title="Total Taks"
                        value={data.taskCount}
                        variant={data.taskDifference > 0 ? 'up' : 'down'}
                        increaseValue={data.taskDifference}
                    />
                    <DottedSeprator direction="vertical" />
                </div>
                <div className="flex items-center flex-1">
                    <AnalyticsCard
                        title="Assigned Taks"
                        value={data.assignedTaskCount}
                        variant={data.assignedTAskDifference > 0 ? 'up' : 'down'}
                        increaseValue={data.assignedTAskDifference}
                    />
                    <DottedSeprator direction="vertical" />
                </div>
                <div className="flex items-center flex-1">
                    <AnalyticsCard
                        title="Completed Taks"
                        value={data.completeTaskCount}
                        variant={data.completeTAskDifference > 0 ? 'up' : 'down'}
                        increaseValue={data.completeTAskDifference}
                    />
                    <DottedSeprator direction="vertical" />
                </div>
                <div className="flex items-center flex-1">
                    <AnalyticsCard
                        title="Overdue Taks"
                        value={data.overdueTaskCount}
                        variant={data.overdueTAskDifference > 0 ? 'up' : 'down'}
                        increaseValue={data.overdueTAskDifference}
                    />
                    <DottedSeprator direction="vertical" />
                </div>
                <div className="flex items-center flex-1">
                    <AnalyticsCard
                        title="Incompeleted Taks"
                        value={data.incompleteTaskCount}
                        variant={data.incompleteTAskDifference > 0 ? 'up' : 'down'}
                        increaseValue={data.incompleteTAskDifference}
                    />
                    <DottedSeprator direction="vertical" />
                </div>
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    )
}

export default Analytics
