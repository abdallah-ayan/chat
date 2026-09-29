import asyncErrorHandler from "../../error/asyncErrorHandler";
import useChatStore from "../../store/Home/useChatStore";

const editGroupValidation = asyncErrorHandler((form) => {
    const { handleEditGroup } = useChatStore.getState();

    const name = form?.name?.trim();
    const description = form?.description?.trim();
    const sendAll = form?.sendAll;

    if (!name)
        throw new Error("Group name is required");

    if (name.length > 20)
        throw new Error("Group name cannot exceed 20 characters");

    if (description && description.length > 200)
        throw new Error("Description cannot exceed 200 characters");

    if (typeof sendAll !== "boolean")
        throw new Error("sendAll must be a boolean");

    handleEditGroup(form);

});

export default editGroupValidation