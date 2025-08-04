import { getCurrent } from '@/features/auth/actions';
import CreateWorkspaceForm from '@/features/workspaces/components/create-workspace-form';
import { redirect } from 'next/navigation';


const WorkspaceCreatePage = () => {

    const user = getCurrent();

    if (!user) redirect('/sign-in');
    return (
        <div className='w-full lg:max-w-xl' >
            <CreateWorkspaceForm />
        </div>
    )
}

export default WorkspaceCreatePage
