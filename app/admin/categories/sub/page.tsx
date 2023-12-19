"use client"
import React, { useEffect, useState } from "react"
import AdminLayout from "../../AdminLayout"
import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, useDisclosure } from "@nextui-org/react"
import Toast from "@/app/components/Toast"
import useAxiosAuth from "@/lib/hooks/useAxiosAuth"

interface subCategoryType {
  id: number,
  subCategoryTitle: string,
  subCategoryDescription: string,
  category: {
    id: number,
    categoryTitle: string,
    categoryDescription: string,
    createdAt: string
  }
  createdAt: string
}
interface CategoryType {
  id: number,
  categoryTitle: string,
  categoryDescription: string,
  createdAt: string
}

const page = () => {
  const axiosAuth = useAxiosAuth();
  const [subCategories, setSubCategories] = useState<[subCategoryType]>();
  const [updateCatId, setUpdateCatId] = useState<number>()
  const [categoryId, setCategoryId] = useState<number>()
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [categories, setCategories] = useState<[CategoryType]>();
  const [subCategoryTitle, setSubCategoryTitle] = useState("")
  const [subCategoryDescription, setSubCategoryDescrtiption] = useState("")
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["0"]));
  const handleNew = () => {
    setSubCategoryDescrtiption("")
    setSubCategoryTitle("")
    setCategoryId(undefined)
    setUpdateCatId(undefined)
    onOpen();
  }

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
  const getCategories = async () => {
    const res = await axiosAuth.get("/categories").then((res) => {
      if (res.status == 200) setCategories(res.data)
    }).catch((e) => {
      console.log("this si the status");

    })



    //if (res. == "ERR_NETWORK") return <Toast message={"Server is Down!"} type={"danger"} />
  }
  const createCategory = async () => {
    const res = await axiosAuth.post("/sub", {
      categoryTitle: subCategoryTitle,
      categoryDescription: subCategoryDescription,
      categoryId: categoryId
    },)
    if (res.status == 201) {
      clear();
    } else if (res.status == 401) {
      console.log("not found broski");

      alert("unauthorize")
    } else if (res.status == 400) {
      alert("not full file")
    } else {

    }
    onClose();
  }
  const clear = () => {
    setSubCategoryDescrtiption("");
    setSubCategoryTitle("")
    setCategoryId(undefined)
  }
  const updateCategory = async () => {
    // const res = await axiosAuth.put(`/categories/${updateCatId}`, {
    //   categoryTitle: categoryTitle,
    //   categoryDescription: categoryDescription,
    // },)
    // if (res.status == 201) {
    //   setCategoryDescrtiption("");
    //   setCategoryTitle("")
    //   setUpdateCatId(undefined)
    // }
    onClose();
  }
  const getSubCategories = async () => {
    const res = await axiosAuth.get("/sub")
    if (res.status == 200) setSubCategories(res.data)

  }
  const deleteCategory = async (id: number) => {
    const res = await axiosAuth.delete(`/categories/${id}`)
    if (res.status == 200) {
    }
  }

  const handleUpdate = async (category: subCategoryType) => {
    // setCategoryTitle(category.categoryTitle);
    // setCategoryDescrtiption(category.categoryDescription);
    // setUpdateCatId(category.id)
    onOpen();
  }
  useEffect(() => {
    setIsFetching(true)
    getSubCategories();
    getCategories();
    setIsFetching(false)
  }, [])
  //fetch categories
  useEffect(() => {
    getCategories()
  }, [subCategories])
  const columns = [
    { name: "CATEGORY", uid: "category" },
    { name: "TITLE", uid: "categoryTitle" },
    { name: "DESCRIPTION", uid: "categoryDescription" },
    { name: "CREATED", uid: "createdAt" },
    { name: "ACTIONS", uid: "actions" },
  ]

  // type Category = typeof categories[0];
  const renderCell = React.useCallback((subCategory: subCategoryType, columnKey: React.Key) => {
    const cellValue = subCategory[columnKey as keyof subCategoryType];
    switch (columnKey) {
      case "category":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{subCategory.category.categoryTitle}</p>
            <p className="text-bold text-sm capitalize text-default-400">{subCategory.category.categoryDescription}</p>

            {/* <p className="text-bold text-sm capitalize text-default-400">{product.sub_category}</p> */}
          </div>
        );
      case "categoryTitle":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{subCategory.subCategoryTitle}</p>
          </div>
        );
      case "categoryDescription":
        return (
          <p>
            {subCategory.subCategoryDescription}
          </p>
        );
      case "createdAt":
        return (
          <Chip className="capitalize" size="sm" variant="flat">
            {subCategory.createdAt}
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
                <i className="ri-pencil-line" onClick={() => { handleUpdate(subCategory) }}></i>
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete category" >
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <i className="ri-delete-bin-line" onClick={() => deleteCategory(subCategory.id)}></i>
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
            <i className="ri-add-line"></i> <span> Add Sub Categroy</span>
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
                  <p>Category</p>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        variant="bordered"
                        className="capitalize"
                      >
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
                      <DropdownItem key="0">Select Category</DropdownItem>
                      {
                        categories?.map((cat) => <DropdownItem key={cat.categoryTitle}>{cat.categoryTitle}</DropdownItem>)
                      }

                    </DropdownMenu>
                  </Dropdown>
                  <Input
                    key="category name"
                    type="text"
                    label="Category Name"
                    labelPlacement="outside"
                    placeholder="Category name"
                    value={subCategoryTitle}
                    onChange={(x) => setSubCategoryTitle(x.target.value)}
                  />
                  <Input
                    key="product descritprion"
                    type="text"
                    label="Category Description"
                    labelPlacement="outside"
                    placeholder="description"
                    description="Short and precise"
                    value={subCategoryDescription}
                    onChange={(x) => setSubCategoryDescrtiption(x.target.value)}
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
            !isFetching && subCategories?.length === 0 ? <div className="flex h-full w-full justify-center items-center "><p className="text-3xl">No Recored Found</p></div> :
              !isFetching && subCategories?.length > 0 ?
                <Table aria-label="Example table with custom cells">
                  <TableHeader columns={columns}>
                    {(column) => (
                      <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                        {column.name}
                      </TableColumn>
                    )}
                  </TableHeader>

                  <TableBody items={subCategories}>
                    {(item) => (
                      <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                : <Spinner />
          }

        </div>
      </div>
    </AdminLayout>

  )
}

export default page