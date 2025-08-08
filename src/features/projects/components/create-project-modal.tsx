'use client'
import ResponsiveModal from "@/components/responsive-modal";
import CreateProjectForm from "./create-project-form";
import { useCreateProjectsModal } from "../hooks/use-create-project-modal";

const CreateProjectModal = () => {
    const { isOpen, setIsOpen, close } = useCreateProjectsModal();

    return (
        <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
            <CreateProjectForm onCancel={close} />
        </ResponsiveModal>
    )
}

export default CreateProjectModal
