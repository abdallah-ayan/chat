import asyncErrorHandler from "../../error/asyncErrorHandler";
import useAuthSore from "../../store/auth/useAuthSore";

export const editInfoValidation = asyncErrorHandler((form) => {
    console.log(1)
    const { handleEditInfo } = useAuthSore.getState()
    const fullName = form.fullName?.trim();
    const description = form.description?.trim();
    const searchName = form.searchName?.trim();

    // Full Name
    if (!fullName)
        throw new Error("Full name is required");

    if (fullName.length > 20)
        throw new Error("Full name cannot exceed 20 characters");

    // Description
    if (description && description.length > 200)
        throw new Error("Description cannot exceed 200 characters");

    // Search Name
    if (searchName) {

        if (!/^[a-zA-Z][a-zA-Z0-9.]*$/.test(searchName))
            throw new Error(
                "Search name must start with a letter and contain only letters, numbers, and dots"
            );

        if (searchName.length > 20)
            throw new Error("Search name cannot exceed 20 characters");
    }

    handleEditInfo(form);
});