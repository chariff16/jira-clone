"use client";
import { DottedSeprator } from '@/components/dotted-seprator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useJoinWorkspace } from '../api/use-join-workspace';
import { useInviteCode } from '../hooks/use-invite-code';
import { useWorkspaceId } from '../hooks/workspace-id';
import { useRouter } from 'next/navigation';

interface JoinWorkspaceFormProps {
    initialValues: {
        name: string
    }
}

const JoinWorkspaceForm = ({
    initialValues
}: JoinWorkspaceFormProps) => {
    const router = useRouter();
    const workspaceId = useWorkspaceId();
    const inviteCode = useInviteCode();
    const { mutate, isPending } = useJoinWorkspace();

    const onSubmit = () => {
        console.log("workspaceID:", workspaceId);
        console.log("inviteCode:", inviteCode);

        mutate({
            param: { workspaceId },
            json: { code: inviteCode }
        }, {
            onSuccess: ({ data }) => {
                router.push(`/workspaces/${data.$id}`)
            },
        })
    };

    return (
        <Card className='w-full h-full border-none shadow-none'>
            <CardHeader className='p-7'>
                <CardTitle className='text-xl font-bold'>
                    Join Workspace
                </CardTitle>
                <CardDescription>
                    You&apos;ve been to Join <strong>{initialValues.name}</strong> workspace
                </CardDescription>
            </CardHeader>
            <div className='px-7'>
                <DottedSeprator />
            </div>
            <CardContent className='p-7'>
                <div className='flex flex-col lg:flex-row gap-2 items-center justify-between'>
                    <Button
                        className='w-full lg:w-fit'
                        variant='secondary'
                        type='button'
                        size='lg'
                        asChild
                        disabled={isPending}
                    >
                        <Link href='/'>
                            Cancel
                        </Link>
                    </Button>
                    <Button
                        className='w-full lg:w-fit'
                        size='lg'
                        type='button'
                        onClick={onSubmit}
                        disabled={isPending}
                    >
                        Join Workspace
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default JoinWorkspaceForm
