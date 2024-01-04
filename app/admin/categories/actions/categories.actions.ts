export const createCategory = async ({ categoryTitle, categoryDescription, clear, axiosAuth,onClose }) => {
    try {
        const res = await axiosAuth.post("/categories", {
            categoryTitle,
            categoryDescription,
        });
        clear();
        onClose();
        return res;
    
    } catch (error) {
        console.error("Error creating category:", error);
    }
};

export const updateCategory = async ({ categoryTitle, categoryDescription, updateCatId, clear, axiosAuth,onClose }) => {
    try {
        const res = await axiosAuth.put(`/categories/${updateCatId}`, {
            categoryTitle,
            categoryDescription,
        });
        clear()
        onClose();
        return res;
    } catch (error) {
        console.error("Error updating category:", error);
    }
};

export const getCategories = async ({ setIsFetching, session, setCategories, axiosAuth }) => {
    try {
        setIsFetching(true);
        if (session?.user?.token?.accessToken) {
            const res = await axiosAuth.get("/categories");
            if (res.status === 200) setCategories(res.data);
        }
    } catch (error) {
        console.error("Error getting categories:", error);
    } finally {
        setIsFetching(false);
    }
};
export const deleteCategory = async (id: number, axiosAuth) => {
    try {
        const res = await axiosAuth.delete(`/categories/${id}`);
        if (res.status === 200) {
            // Handle success
        }
    } catch (error) {
        console.error("Error deleting category:", error);
    }
};
export const handleResponse = (res: any, { setFlag, setMessage, setType, updateCatId, clear, onClose }) => {
    if (res.status === 201 || res.status === 200) {
        setFlag(true);
        setMessage("Category " + (updateCatId !== undefined ? "Updated." : "Created."));
        setType("success");
    } else if (res.status === 401) {
        setMessage("Not authorized.");
        setType("warning");
    } else if (res.status === 403) {
        setMessage("Forbidden.");
        setType("danger");
    }
    setTimeout(() => {
        setFlag(false);
    }, 1000);
    clear();
    onClose();
};