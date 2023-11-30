"use client"

import { Button, Chip, ChipProps, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, User, useDisclosure } from "@nextui-org/react"
import AdminLayout from "../AdminLayout"
import React from "react";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};
const columns = [
  { name: "PRODUCT", uid: "name" },
  { name: "CATEGORY", uid: "category" },
  { name: "STATUS", uid: "status" },
  { name: "STOCK", uid: "stock" },
  { name: "ACTIONS", uid: "actions" },
]
// const columns = [
//   { name: "NAME", uid: "name" },
//   { name: "ROLE", uid: "role" },
//   { name: "STATUS", uid: "status" },
//   { name: "ACTIONS", uid: "actions" },
// ];


const products = [
  {
    id: 1,
    name: "Samsung S23",
    category: "electronics",
    sub_category: "mobile",
    status: "active",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    stock: 200,
  },
  {
    id: 2,
    name: "Luxury Sofa",
    category: "Houshold",
    sub_category: "Appliance",
    status: "paused",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    stock: 10,
  },
  {
    id: 3,
    name: "Rib Meat",
    category: "Food",
    sub_category: "Meat",
    status: "active",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    stock: 15,
  },
  {
    id: 4,
    name: "Jacket",
    category: "Cloth",
    sub_category: "Men Cloth",
    status: "active",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    stock: 85,
  },
  {
    id: 5,
    name: "Jacket",
    category: "Cloth",
    sub_category: "Men Cloth",
    status: "active",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    stock: 85,
  },
  {
    id: 6,
    name: "Rib Meat",
    category: "Food",
    sub_category: "Meat",
    status: "active",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    stock: 15,
  },
]

type Product = typeof products[0];




const page = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["category"]));
  const [selectedSubKeys, setSelectedSubKeys] = React.useState(new Set(["subCategory"]));
  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
  const selectedSubValue = React.useMemo(
    () => Array.from(selectedSubKeys).join(", ").replaceAll("_", " "),
    [selectedSubKeys]
  );
  const renderCell = React.useCallback((product: Product, columnKey: React.Key) => {
    const cellValue = product[columnKey as keyof Product];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: product.avatar }}
            //description={product.name}
            name={cellValue}
          >
          </User>
        );
      case "category":
        return (
          <div className="flex flex-col">

            <p className="text-bold text-sm capitalize text-default-400">{product.category}</p>
            <p className="text-bold text-sm capitalize">{product.sub_category}</p>
            {/* <p className="text-bold text-sm capitalize text-default-400">{product.sub_category}</p> */}
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[product.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "stock":
        return (
          <Chip className="capitalize" color={statusColorMap[product.stock]} size="sm" variant="flat">
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
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <i className="ri-pencil-line"></i>
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <i className="ri-delete-bin-line"></i>
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  // end
  return (
    <AdminLayout>
      <div className="flex flex-col gap-4">
        <div className="h-10 w-full rounded-md flex justify-end ">
          <Button color="primary" variant="solid"  onPress={onOpen}>
            <i className="ri-add-line"></i> <span> Add Product</span>
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
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Add Product</ModalHeader>
                  <ModalBody>

                    <Input
                      key="product name"
                      type="text"
                      label="Product Name"
                      labelPlacement="outside"
                      placeholder="Product name"

                    />
                    <Input
                      key="product stock"
                      type="text"
                      label="Stock Quantity"
                      labelPlacement="outside"
                      placeholder="Available stock quantity"

                    />
                    <Input
                      key="product price"
                      type="text"
                      label="Price"
                      labelPlacement="outside"
                      placeholder="product price"
                      description="Single quantity"
                    />
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
                        <DropdownItem key="category">Category</DropdownItem>
                        <DropdownItem key="number">Electronics</DropdownItem>
                        <DropdownItem key="date">Food</DropdownItem>
                        <DropdownItem key="single_date">Home Appliances</DropdownItem>
                        <DropdownItem key="iteration">Cloth</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    <p>Sub Category</p>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button
                          variant="bordered"
                          className="capitalize"
                        >
                          {selectedSubKeys}
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Single selection example"
                        variant="flat"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={selectedSubKeys}
                        onSelectionChange={setSelectedSubKeys}
                      >
                        <DropdownItem key="subCategory">Sub Category</DropdownItem>
                        <DropdownItem key="sub1">Sub1</DropdownItem>
                        <DropdownItem key="sub2">Sub2</DropdownItem>
                        <DropdownItem key="sub3">Sub3</DropdownItem>
                        <DropdownItem key="sub4">Sub4</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Save
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>


          {/* end modal */}
        </div>
        <Table aria-label="Example table with custom cells">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={products}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex justify-center">
        <Pagination isCompact showControls total={10} initialPage={1} />
        </div>
       
      </div>

    </AdminLayout>
  )
}

export default page