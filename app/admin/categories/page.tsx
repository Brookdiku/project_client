"use client";
import {
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  getKeyValue,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import { useSession } from "next-auth/react";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
export const users = [
  {
    key: "1",
    name: "Tony Reichert",
    role: "CEO",
    status: "Active",
  },
  {
    key: "2",
    name: "Zoey Lang",
    role: "Technical Lead",
    status: "Paused",
  },
  {
    key: "3",
    name: "Jane Fisher",
    role: "Senior Developer",
    status: "Active",
  },
  {
    key: "4",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
  {
    key: "5",
    name: "Emily Collins",
    role: "Marketing Manager",
    status: "Active",
  },
  {
    key: "6",
    name: "Brian Kim",
    role: "Product Manager",
    status: "Active",
  },
  {
    key: "7",
    name: "Laura Thompson",
    role: "UX Designer",
    status: "Active",
  },
  {
    key: "8",
    name: "Michael Stevens",
    role: "Data Analyst",
    status: "Paused",
  },
  {
    key: "9",
    name: "Sophia Nguyen",
    role: "Quality Assurance",
    status: "Active",
  },
  {
    key: "10",
    name: "James Wilson",
    role: "Front-end Developer",
    status: "Vacation",
  },
  {
    key: "11",
    name: "Ava Johnson",
    role: "Back-end Developer",
    status: "Active",
  },
  {
    key: "12",
    name: "Isabella Smith",
    role: "Graphic Designer",
    status: "Active",
  },
  {
    key: "13",
    name: "Oliver Brown",
    role: "Content Writer",
    status: "Paused",
  },
  {
    key: "14",
    name: "Lucas Jones",
    role: "Project Manager",
    status: "Active",
  },
  {
    key: "15",
    name: "Grace Davis",
    role: "HR Manager",
    status: "Active",
  },
  {
    key: "16",
    name: "Elijah Garcia",
    role: "Network Administrator",
    status: "Active",
  },
  {
    key: "17",
    name: "Emma Martinez",
    role: "Accountant",
    status: "Vacation",
  },
  {
    key: "18",
    name: "Benjamin Lee",
    role: "Operations Manager",
    status: "Active",
  },
  {
    key: "19",
    name: "Mia Hernandez",
    role: "Sales Manager",
    status: "Paused",
  },
  {
    key: "20",
    name: "Daniel Lewis",
    role: "DevOps Engineer",
    status: "Active",
  },
  {
    key: "21",
    name: "Amelia Clark",
    role: "Social Media Specialist",
    status: "Active",
  },
  {
    key: "22",
    name: "Jackson Walker",
    role: "Customer Support",
    status: "Active",
  },
  {
    key: "23",
    name: "Henry Hall",
    role: "Security Analyst",
    status: "Active",
  },
  {
    key: "24",
    name: "Charlotte Young",
    role: "PR Specialist",
    status: "Paused",
  },
  {
    key: "25",
    name: "Liam King",
    role: "Mobile App Developer",
    status: "Active",
  },
];

const page = () => {
  const { data: session } = useSession();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [categories, setCategories] = useState<[CategoryType]>();
  const axiosAuth = useAxiosAuth();
  //   const getCategories = async () => {
  //     const res = await axiosAuth.get("/categories");
  //     if (res.status == 200) setCategories(res.data);
  //   };
  const deleteCategory = async (id: number) => {
    const res = await axiosAuth.delete(`/categories/${id}`);
    if (res.status == 200) {
    }
  };
  const handleUpdate = async (category: CategoryType) => {};
  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      if (session?.user?.token?.accessToken) {
        try {
          const res = await axiosAuth.get("/categories");
          if (res.status === 200) {
            setCategories(res.data);
          }
        } catch (error) {
          console.error("Error fetching categories:", error);
        } finally {
          setIsFetching(false);
        }
      }
    };
    fetchData();
  }, [session]);

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
