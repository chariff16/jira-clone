import { getCurrent } from "@/features/auth/actions";
import { redirect } from "next/navigation";
import SignUpCard from "@/features/auth/components/sign-up-card"

const SignUp = async () => {
    const user = await getCurrent();

    if (user) redirect('/');
    return (
        <>
            <SignUpCard />
        </>
    )
}

export default SignUp
