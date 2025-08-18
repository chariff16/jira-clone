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
                        title="Total Tasks"
                        value={data.taskCount}
                        variant={data.taskDifference > 0 ? 'up' : 'down'}
                        increaseValue={data.taskDifference}
                    />
                    <DottedSeprator direction="vertical" />
                </div>
                <div className="flex items-center flex-1">
                    <AnalyticsCard
                        title="Assigned Tasks"
                        value={data.assignedTaskCount}
                        variant={data.assignedTAskDifference > 0 ? 'up' : 'down'}
                        increaseValue={data.assignedTAskDifference}
                    />
                    <DottedSeprator direction="vertical" />
                </div>
                <div className="flex items-center flex-1">
                    <AnalyticsCard
                        title="Completed Tasks"
                        value={data.completeTaskCount}
                        variant={data.completeTAskDifference > 0 ? 'up' : 'down'}
                        increaseValue={data.completeTAskDifference}
                    />
                    <DottedSeprator direction="vertical" />
                </div>
                <div className="flex items-center flex-1">
                    <AnalyticsCard
                        title="Overdue Tasks"
                        value={data.overdueTaskCount}
                        variant={data.overdueTAskDifference > 0 ? 'up' : 'down'}
                        increaseValue={data.overdueTAskDifference}
                    />
                    <DottedSeprator direction="vertical" />
                </div>
                <div className="flex items-center flex-1">
                    <AnalyticsCard
                        title="Incompeleted Tasks"
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
