"use client"
import React, { useEffect, useState } from "react"
import AdminLayout from "../AdminLayout"
import { Accordion, AccordionItem, Button, Chip, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, useDisclosure } from "@nextui-org/react"
import { axiosAuth } from "@/lib/axios"
interface CategoryType {
  id: number,
  categoryTitle: string,
  categoryDescription: string,
  createdAt: string
}
const page = () => {
  const [categories, setCategories] = useState<[CategoryType]>();
  const [updateCatId, setUpdateCatId] = useState<number>()
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [categoryTitle, setCategoryTitle] = useState("")
  const [categoryDescription, setCategoryDescrtiption] = useState("")
  const handleNew = () => {
    setCategoryDescrtiption("")
    setCategoryTitle("")
    setUpdateCatId(undefined)
    onOpen();
  }
  const createCategory = async () => {
    const res = await axiosAuth.post("/categories", {
      categoryTitle: categoryTitle,
      categoryDescription: categoryDescription,
    },)
    if (res.status == 201) {
      setCategoryDescrtiption("");
      setCategoryTitle("")
      setUpdateCatId(undefined)
    }
    onClose();
  }
  const updateCategory = async () => {
    const res = await axiosAuth.put(`/categories/${updateCatId}`, {
      categoryTitle: categoryTitle,
      categoryDescription: categoryDescription,
    },)
    if (res.status == 201) {
      setCategoryDescrtiption("");
      setCategoryTitle("")
      setUpdateCatId(undefined)
    }
    onClose();
  }
  const getCategories = async () => {
    const res = await axiosAuth.get("/categories")
    if (res.status == 200) setCategories(res.data)
  }
  const deleteCategory = async (id: number) => {
    const res = await axiosAuth.delete(`/categories/${id}`)
    if (res.status == 200) {
    }
  }

  const handleUpdate = async (category: CategoryType) => {
    setCategoryTitle(category.categoryTitle);
    setCategoryDescrtiption(category.categoryDescription);
    setUpdateCatId(category.id)
    onOpen();
  }
  useEffect(() => {
    setIsFetching(true)
    getCategories();
    setIsFetching(false)
  }, [])
  //fetch categories
  useEffect(() => {
    getCategories()
  }, [categories])
  const columns = [
    { name: "TITLE", uid: "categoryTitle" },
    { name: "DESCRIPTION", uid: "categoryDescription" },
    { name: "CREATED", uid: "createdAt" },
    { name: "ACTIONS", uid: "actions" },
  ]

  // type Category = typeof categories[0];
  const renderCell = React.useCallback((category: CategoryType, columnKey: React.Key) => {
    const cellValue = category[columnKey as keyof CategoryType];
    switch (columnKey) {
      case "categoryTitle":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{category.categoryTitle}</p>
          </div>
        );
      case "categoryDescription":
        return (
          <p>
            {cellValue}
          </p>
        );
      case "createdAt":
        return (
          <Chip className="capitalize" size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <i className="ri-eye-line"></i>
              </span>
            </Tooltip>
            <Tooltip content="Edit category">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <i className="ri-pencil-line" onClick={() => { handleUpdate(category) }}></i>
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete category" >
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <i className="ri-delete-bin-line" onClick={() => deleteCategory(category.id)}></i>
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  return (
    <AdminLayout>
      <div className="flex flex-col gap-4 h-screen">
        <div className="h-10 w-full rounded-md flex justify-end ">
          <Button color="primary" variant="solid" onPress={() => handleNew()}>
            <i className="ri-add-line"></i> <span> Add Categroy</span>
          </Button>
          {/* start modal*/}
          <Modal
            backdrop="opaque"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            classNames={{
              backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
            }}
          >
            <ModalContent>
              <>
                <ModalHeader className="flex flex-col gap-1">Add Category</ModalHeader>
                <ModalBody>

                  <Input
                    key="category name"
                    type="text"
                    label="Category Name"
                    labelPlacement="outside"
                    placeholder="Category name"
                    value={categoryTitle}
                    onChange={(x) => setCategoryTitle(x.target.value)}
                  />
                  <Input
                    key="product descritprion"
                    type="text"
                    label="Category Description"
                    labelPlacement="outside"
                    placeholder="description"
                    description="Short and precise"
                    value={categoryDescription}
                    onChange={(x) => setCategoryDescrtiption(x.target.value)}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={() => updateCatId === undefined ? createCategory() : updateCategory()}>
                    {updateCatId !== undefined ? "Update" : "Create"}
                  </Button>
                </ModalFooter>
              </>
            </ModalContent>
          </Modal>
        </div>
        <div className="h-full flex justify-center">


          {
            !isFetching && categories?.length === 0 ? <div className="flex h-full w-full justify-center items-center "><p className="text-3xl">No Recored Found</p></div> :
              !isFetching && categories?.length > 0 ?
                <Accordion>
                  {categories?.map((cat) =><AccordionItem key={cat.id} title={cat.categoryTitle}>
                    <small>{cat.categoryDescription}</small>
                    <div className="flex flex col">
                      <div className="h-10 w-full bg-gray-200 rounded-md">

                      </div>

                    </div>
                    </AccordionItem>)}

                </Accordion>
                : <Spinner />
          }

        </div>
      </div>
    </AdminLayout>

  )
}

export default page