import { useQueryState, parseAsBoolean } from 'nuqs';

export const useCreateProjectsModal = () => {
    const [isOpen, setIsOpen] = useQueryState(
        "create-project",
        parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
    );

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return {
        isOpen,
        open,
        close,
        setIsOpen
    };
};