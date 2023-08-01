import { GetServerSidePropsContext } from "next"


export default function Redirect() {
    return null;
}

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {

    return { redirect: { permanent: false, destination: "/feedback-form" } };
}