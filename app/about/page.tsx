"use client";

import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { useRouter } from 'next/navigation'
import React, { useState } from "react";

const page = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const router = useRouter();
  const [me, setMe] = useState();
  const axiosAuth = useAxiosAuth();
  const fetchPost = async () => {
    const res = await axiosAuth.get("/suppliers/me");
    if (res.status == 200) {
      setMe(res.data);
    } else {
      router.push("/")
    }
  };
  return (
    <>
      <button onClick={fetchPost}>fetch me</button>
      <button onClick={() => setMe(undefined)}>clear</button>
      <div>
        {me === undefined ? " you are not authorized " : JSON.stringify(me)}
      </div>

      <Button onPress={onOpen}>Open Modal</Button>
            <Modal
              backdrop="opaque"
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              classNames={{
                backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
              }}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                    <ModalBody>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam pulvinar risus non risus hendrerit venenatis.
                        Pellentesque sit amet hendrerit risus, sed porttitor quam.
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam pulvinar risus non risus hendrerit venenatis.
                        Pellentesque sit amet hendrerit risus, sed porttitor quam.
                      </p>
                      <p>
                        Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                        dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.
                        Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
                        Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur
                        proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                      </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                      <Button color="primary" onPress={onClose}>
                        Action
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
            {/* end */}
    </>
  );
};

export default page;
