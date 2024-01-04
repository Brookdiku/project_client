"use client";
import {
  Button,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import { useSession } from "next-auth/react";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import CategoryModal from "./CategoryModal";
import { createCategory, updateCategory } from "./actions/categories.actions";
const page = () => {
  const { data: session } = useSession();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [categories, setCategories] = useState<[CategoryType]>();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [categoryTitle, setCategoryTitle] = useState("")
  const [categoryDescription, setCategoryDescrtiption] = useState("")
  const [updateCatId, setUpdateCatId] = useState<number>()
  const clear = () => {
    setCategoryDescrtiption("")
    setCategoryTitle("")
    setUpdateCatId(undefined)
  }
  const axiosAuth = useAxiosAuth();
  const handleNew = () => {
    clear();
    onOpen();
  }


  const deleteCategory = async (id: number) => {
    const res = await axiosAuth.delete(`/categories/${id}`);
    if (res.status == 200) {
    }
  };
  const getCategories = async () => {
    const res = await axiosAuth.get("/categories")
    if (res.status == 200) setCategories(res.data)
  }
  const handleUpdate = async (category: CategoryType) => { };
  
  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      if (session?.user?.token?.accessToken) {
        try {
          getCategories();
        } catch (error) {
          console.error("Error fetching categories:", error);
        } finally {
          setIsFetching(false);
        }
      }
    };
    fetchData();
  }, [session,categories]);


  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;
  const pages = Math.ceil((categories?.length || 1) / rowsPerPage);
  const items = React.useMemo(() => {
    if (!categories) {
      return [];
    }
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return categories.slice(start, end);
  }, [page, categories]);
  return (
    <AdminLayout>
      {/* modal for creating and updating the category */}
      <CategoryModal 
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      categoryTitle={categoryTitle}
      setCategoryTitle={setCategoryTitle}
      categoryDescription={categoryDescription}
      setCategoryDescrtiption={setCategoryDescrtiption}
      updateCatId={updateCatId}
      onClose={onClose}
      clear={clear}
      axiosAuth={axiosAuth}
      />
      <div className="h-10 w-full rounded-md flex justify-end mb-4 ">
      <Button color="primary" variant="solid" onPress={() => handleNew()}>
        <i className="ri-add-line"></i> <span> Add Categroy</span>
      </Button>
      </div>
      {isFetching ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <>
          {categories?.length === 0 && <p>No records found.</p>}
          {categories && categories.length > 0 && (
            // <Table
            //   aria-label="Example table with client side pagination"
            //   bottomContent={
            //     <div className="flex w-full justify-center">
            //       <Pagination
            //         isCompact
            //         showControls
            //         showShadow
            //         color="primary"
            //         page={page}
            //         total={pages}
            //         initialPage={1}
            //         onChange={(page) => setPage(page)}
            //       />
            //     </div>
            //   }
            //   classNames={{
            //     wrapper: "min-h-[222px]",
            //   }}
            // >
            //   <TableHeader>
            //     <TableColumn key="categoryTitle">Title</TableColumn>
            //     <TableColumn key="categoryDescription">Description</TableColumn>
            //     <TableColumn key="actoins">Action</TableColumn>
            //   </TableHeader>
            //   <TableBody items={items}>
            //     {(item) => (
            //       <TableRow key={item.id}>
            //         <TableCell>{item.categoryTitle}</TableCell>
            //         <TableCell>{item.categoryDescription}</TableCell>
            //         <TableCell>
            //           {/* Edit Button */}
            //           <Tooltip content="Edit category" >
            //             <span className="text-lg text-default-400 cursor-pointer active:opacity-50 mr-5">
            //               <i
            //                 className="ri-pencil-line"
            //                 onClick={() => {
            //                   handleUpdate(item);
            //                 }}
            //               ></i>
            //             </span>
            //           </Tooltip>
            //           {/* Delete Button */}
            //           <Tooltip color="danger" content="Delete category">
            //             <span className="text-lg text-danger cursor-pointer active:opacity-50">
            //               <i
            //                 className="ri-delete-bin-line"
            //                 onClick={() => deleteCategory(item.id)}
            //               ></i>
            //             </span>
            //           </Tooltip>
            //         </TableCell>
            //       </TableRow>
            //     )}
            //   </TableBody>
            // </Table>
            <Table
              aria-label="Example table with client side pagination"
              bottomContent={
                <div className="flex w-full justify-center">
                  <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    initialPage={1}
                    onChange={(page) => setPage(page)}
                  />
                </div>
              }
              classNames={{
                wrapper: "min-h-[222px]",
              }}

            >

              <TableHeader>
                <TableColumn key="categoryTitle" className="lg:w-1/4">
                  Title
                </TableColumn>
                <TableColumn key="categoryDescription" className="lg:w-2/4">
                  Description
                </TableColumn>
                <TableColumn key="actions" className="lg:w-1/4">
                  Action
                </TableColumn>
              </TableHeader>
              <TableBody items={items}>
                {(item) => (
                  <TableRow key={item.id}>
                    <TableCell className="lg:w-1/4">
                      {item.categoryTitle}
                    </TableCell>
                    <TableCell className="lg:w-2/4">
                      {item.categoryDescription}
                    </TableCell>
                    <TableCell className="lg:w-1/4">
                      {/* Edit Button */}
                      <Tooltip content="Edit category">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50 mr-5">
                          <i
                            className="ri-pencil-line"
                            onClick={() => {
                              handleUpdate(item);
                            }}
                          ></i>
                        </span>
                      </Tooltip>
                      {/* Delete Button */}
                      <Tooltip color="danger" content="Delete category">
                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                          <i
                            className="ri-delete-bin-line"
                            onClick={() => deleteCategory(item.id)}
                          ></i>
                        </span>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </>
      )}
    </AdminLayout>
  );
};
export default page;
