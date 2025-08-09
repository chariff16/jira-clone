import { getCurrent } from "@/features/auth/queries"
import EditeProjectForm from "@/features/projects/components/edit-project-form";
import { getProject } from "@/features/projects/queries";
import { redirect } from "next/navigation";

interface ProjectIdSettingPageProp {
    params: {
        projectId: string
    }
}


const ProjectIdSettingPage = async ({ params }: ProjectIdSettingPageProp) => {
    const user = await getCurrent();
    if (!user) {
        redirect('/sign-in');
    };


    const initialValues = await getProject({
        projectId: params.projectId
    });



    return (
        <div className="w-full xl:max-w-xl">
            <EditeProjectForm initialValues={initialValues} />
        </div>
    )
}

export default ProjectIdSettingPage
