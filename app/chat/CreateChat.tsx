import Link from "next/link";


// interface CreateChatProps {
//     user: {
//         id: string,
//         email: string
//     },

// }

export function CreateChat() {
    //const [displayUserSearch, setDisplayUserSearch] = useState(false);

    // const createChatCallback = async (item: any) => {
    //     console.log('chat', item.objectID, item.email, user?.id, user?.email)

    //     fetch(`/api/chat/create`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ toUserId: item.objectID, fromUserId: user?.id }),
    //     });

    //    // setDisplayUserSearch(false);
    // }

    return (
        <>
            {
                <Link href='#' className="rounded bg-blue-400" >Start a new chat</Link>
            }
        </>
    )      

}