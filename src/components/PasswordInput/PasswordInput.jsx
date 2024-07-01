import { useState } from "react";
import { Input } from "@nextui-org/react";
import { EyeSlashFilledIcon } from "./icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "./icons/EyeFilledIcon";

function PasswordInput({ value, onChange, onBlur }) {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <Input
            id="password"
            name="password"
            label="Password"
            variant="bordered"
            endContent={
                <button className="focus:outline-none my-auto" type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                </button>
            }
            type={isVisible ? "text" : "password"}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
        />
    );
}

export default PasswordInput;
