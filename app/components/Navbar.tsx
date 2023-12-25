import React from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenu,
  NavbarMenuItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarMenuToggle,
  Input,
} from "@nextui-org/react";
import { useSession, signOut } from "next-auth/react";

import ThemeSwitch from "./ThemeSwitch";

export default function AppNavBar({handleLocalChange}) {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["English"]));
  const menuItems = ["Home", "Docs", "About"];

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  return (
    <Navbar>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className=" flex flex-grow-0 ">
          <p className="font-bold text-inherit">ACMERA</p>
        </NavbarBrand>
        <div className="flex flex-row items-center flex-grow  ">
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
        </div>
      </NavbarContent>

      {/* <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Docs
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/about">
            About
          </Link>
        </NavbarItem>
      </NavbarContent> */}

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
      {session?.user ? (
        <NavbarContent  as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">{session.user.role}</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem
                onPress={() => signOut()}
                key="logout"
                color="danger"
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      ) : (
        <NavbarContent className="hidden sm:flex gap-4" justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="/auth/signin" >
              Sign In
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Button variant="flat">Sign Out</Button>
          </NavbarItem>
        </NavbarContent>
      )}
      <NavbarContent className="hidden sm:flex gap-4">
      <NavbarItem>
            <ThemeSwitch />
          </NavbarItem>
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered" className="capitalize">
              {selectedValue}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Single selection example"
            variant="flat"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
          >
            <DropdownItem key="English">English</DropdownItem>
            <DropdownItem key="አማርኛ">አማርኛ</DropdownItem>
            <DropdownItem key="ኦሮምኛ">ኦሮምኛ</DropdownItem>
            <DropdownItem key="ትግረኛ">ትግረኛ</DropdownItem>
            <DropdownItem key="ሶማልኛ">ሶማልኛ</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
