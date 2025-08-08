'use client';

import Link from 'next/link';
import MemberAvatar from '@/features/members/components/member-avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useWorkspaceId } from '../hooks/workspace-id';
import { useConfirm } from '@/hooks/use-confirm';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, MoreVerticalIcon } from 'lucide-react';
import { DottedSeprator } from '@/components/dotted-seprator';
import { useGetMembers } from '@/features/members/api/use-get-members';
import { Fragment } from 'react';
import { Separator } from '@/components/ui/separator';
import { useDeleteMember } from '@/features/members/api/use-delete-member';
import { useUpdateMember } from '@/features/members/api/use-update-member';
import { MemberRole } from '@/features/members/types';

const MembersList = () => {
    const workspaceId = useWorkspaceId();
    const { data } = useGetMembers({ workspaceId });
    const { mutate: deleteMember, isPending: isDeletingMember } = useDeleteMember();
    const { mutate: updateMember, isPending: isUpdatingMember } = useUpdateMember();
    const [ConfirmDialog, confirm] = useConfirm(
        "Remove Member",
        "This member will be removed from the workspace",
        "destructive"
    )

    const handleUpdateMember = (memberId: string, role: MemberRole) => {
        updateMember({
            json: { role },
            param: { memberId }
        })
    };

    const handelDeleteMember = async (memberId: string) => {
        const ok = await confirm();

        if (!ok) return;

        deleteMember({ param: { memberId } }, {
            onSuccess: () => {
                window.location.reload();
            }
        });
    }

    return (
        <Card className='w-full h-full border-none shadow-none'>
            <ConfirmDialog />
            <CardHeader className='flex flex-row items-center gap-x-4 p-7 space-y-0'>
                <Button asChild variant="secondary" size="sm">
                    <Link href={`/workspaces/${workspaceId}`}>
                        <ArrowLeftIcon className='size-4 mr-2' />
                        Back
                    </Link>
                </Button>
                <CardTitle className='text-xl font-bold'>
                    Members List
                </CardTitle>
            </CardHeader>
            <div className='px-7'>
                <DottedSeprator />
            </div>
            <CardContent className='p-7'>
                {data?.documents.map((member, index) => (
                    <Fragment key={index}>
                        <div className='flex items-center gap-2'>
                            <MemberAvatar name={member.name} className='size-10' fullBackClassName='text-lg' />
                            <div className='flex flex-col'>
                                <p className='text-sm font-medium'>{member.name}</p>
                                <p className='text-xs text-muted-foreground'>{member.email}</p>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className='ml-auto' variant='secondary' size='icon'>
                                        <MoreVerticalIcon className='size-4 text-muted-foreground' />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side='bottom' align='end'>
                                    <DropdownMenuItem onClick={() => handleUpdateMember(member.$id, MemberRole.ADMIN)} disabled={isUpdatingMember} className='font-medium '>
                                        Set as Administrator
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleUpdateMember(member.$id, MemberRole.MEMBER)} disabled={isUpdatingMember} className='font-medium '>
                                        Set as Member
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handelDeleteMember(member.$id)} disabled={isDeletingMember} className='font-medium text-amber-700'>
                                        Remove {member.name}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        {index < data.documents.length - 1 && (
                            <Separator className='my-2.5' />
                        )}
                    </Fragment>
                ))}
            </CardContent>
        </Card>
    )
}

export default MembersList
