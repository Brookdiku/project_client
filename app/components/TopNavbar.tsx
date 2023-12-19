"use client"
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useTheme } from 'next-themes';
export default function TopNavBar({ handleToggle }) {
    const { theme, setTheme } = useTheme()
    const { data: session } = useSession();
    return (<>
        <div className={`bg-background py-2 px-6 flex items-center justify-between shadow-md shadow-black/5 sticky top-0 left-0 z-30`}>
            <div className="flex">
                <Button isIconOnly className="bg-transparent" onClick={() => handleToggle()}>
                    <i className="ri-menu-fold-fill text-xl" ></i>
                </Button>
                <Button isIconOnly className="bg-transparent" onClick={() => { theme == 'dark' ? setTheme('light') : setTheme('dark') }}>
                    {theme === "light" ? <i className="ri-moon-line text-xl"></i> : < i className="ri-sun-line text-xl"></i>}
                </Button>

                <ul className="flex items-center text-sm ml-4">
                    <li className="mr-2">
                        <a href="#" className="text-gray-400 hover:text-gray-600 font-medium">Dashboard</a>
                    </li>
                    <li className="text-gray-600 mr-2 font-medium">/</li>
                    <li className="text-gray-600 mr-2 font-medium">Categories</li>
                </ul>
            </div>
            <div className="flex items-center gap-4">
                <Input
                    classNames={{
                        // base: "max-w-full sm:max-w-[10rem] h-10",
                        mainWrapper: "h-full",
                        input: "text-small",
                        inputWrapper:
                            "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                    }}
                    className=" w-full "
                    placeholder="Type to search..."
                    size="lg"
                    //   startContent="x"
                    type="search"
                />
                <Dropdown>
                    <DropdownTrigger>
                        <Button variant="bordered">
                            {session?.user.role}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                        <DropdownItem key="new">Home</DropdownItem>
                        <DropdownItem key="copy">Setting</DropdownItem>
                        <DropdownItem key="edit">Lists</DropdownItem>
                        <DropdownItem key="delete" className="text-danger" color="danger">
                            Delete file
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div >

    </>)
}