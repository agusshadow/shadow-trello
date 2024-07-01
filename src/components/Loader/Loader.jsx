import { Spinner } from "@nextui-org/react";

function Loader() {

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <Spinner size="lg" color="warning"/>
        </div>
    )
}

export default Loader;