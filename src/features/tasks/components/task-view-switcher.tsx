import { DottedSeprator } from "@/components/dotted-seprator"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusIcon } from "lucide-react"

const TaskViewSwitcher = () => {
    return (
        <Tabs className="flex-1 w-full border rounded-lg">
            <div className="h-full flex flex-col overflow-auto p-4">
                <div className="flex flex-col lg:flex-row gap-y-2 justify-between items-center">
                    <TabsList className="w-full lg:w-auto">
                        <TabsTrigger className="h-8 w-full lg:w-auto" value="table">
                            table
                        </TabsTrigger>
                        <TabsTrigger className="h-8 w-full lg:w-auto" value="kanban">
                            kanban
                        </TabsTrigger>
                        <TabsTrigger className="h-8 w-full lg:w-auto" value="calendar">
                            calendar
                        </TabsTrigger>
                    </TabsList>
                    <Button size={'sm'} className="w-full lg:w-auto">
                        <PlusIcon className=" size-4 mr-2" />
                        New Task
                    </Button>
                    <DottedSeprator className="my-4" />
                    Data filters
                    <DottedSeprator className="my-4" />
                    <>
                        <TabsContent value="table" className="mt-0">
                            data Table
                        </TabsContent>
                        <TabsContent value="kanban" className="mt-0">
                            data Kanban
                        </TabsContent>
                        <TabsContent value="calendar" className="mt-0">
                            data Calendar
                        </TabsContent>
                    </>
                </div>
            </div>

        </Tabs>
    )
}

export default TaskViewSwitcher
