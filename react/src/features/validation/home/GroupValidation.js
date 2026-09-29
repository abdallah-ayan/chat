import asyncErrorHandler from "../../error/asyncErrorHandler";
import useChatStore from "../../store/Home/useChatStore";

const GroupValidation = asyncErrorHandler((form)=> {
  const {handleCreateGroup} = useChatStore.getState();
  const name = form?.name?.trim();
  const users = form?.users;

  if (!name)
      throw new Error("Group name is required");

  if (name.length > 20)
      throw new Error("Group name cannot exceed 20 characters");

  if (!users || !Array.isArray(users))
      throw new Error("Group users are required");

  if (users.length < 2)
      throw new Error("A group must have at least 3 members");


  handleCreateGroup(form);
  
});

export default GroupValidation