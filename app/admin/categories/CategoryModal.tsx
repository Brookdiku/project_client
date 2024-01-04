"use client"
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import React from 'react'
import { createCategory, updateCategory } from './actions/categories.actions'

const CategoryModal = ({ isOpen, onOpenChange, categoryTitle, setCategoryTitle, categoryDescription, setCategoryDescrtiption, updateCatId, onClose,clear,axiosAuth }) => {
    return (
        <>
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
                            <Button color="primary" onPress={() => updateCatId === undefined ? createCategory({categoryTitle,categoryDescription,clear,axiosAuth,onClose}) : updateCategory({categoryTitle,categoryDescription,updateCatId,clear,axiosAuth,onClose})}>
                                {updateCatId !== undefined ? "Update" : "Create"}
                            </Button>
                        </ModalFooter>
                    </>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CategoryModal