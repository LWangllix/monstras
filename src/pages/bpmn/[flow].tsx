import React from "react";
import dynamic from 'next/dynamic'
import { useRouter } from "next/router";

const BPMNEditor = dynamic(() => import('../../BPMN'), { ssr: false })
const Test = () => {
    const router = useRouter();
    const entityId = router.query.entityId as string;
    const actorId = router.query.actorId as string;
    return (
        <div>
            <BPMNEditor
                entityId={entityId}
                actorId={actorId}
                id={useRouter().query.flow} />
        </div>
    );
};


export default Test;
