import instanceAxios from "../../../lib/instanceAxios"
import asyncErrorHandler from "../../error/asyncErrorHandler"

export const getChatLogic = (asyncErrorHandler(async () => {
   const res = await instanceAxios.get("/message/chat" ) 
   return res.data.data.users
}))

export const getContactsLogic = (asyncErrorHandler(async () => {
   const res = await instanceAxios.get("/message/concat" ) 
   return res.data.data.users
}))

export const getGroupsLogic = (asyncErrorHandler(async () => {
   const res = await instanceAxios.get("/group" ) 
   return res.data.data.groups
}))

export const getSearchLogic = (asyncErrorHandler(async (name) => {
   const res = await instanceAxios.post(`/users?searchName=${name}` ) 
   return res.data.data.users
}))

export const getMessageByIdLogic = (asyncErrorHandler(async (id) => {
   const res = await instanceAxios.get(`/message/${id}` ) 
   return res.data.data.messages
}))

export const sendMessageLogic = (asyncErrorHandler(async ({form , id}) => {
   const res = await instanceAxios.post(`/message/${id}` , form ); 
   return res.data.data.message
}))

export const editUserInfoLogic = (asyncErrorHandler(async (form) => {
   const res = await instanceAxios.patch(`/users` , form ); 
   return res.data.data.user
}))

export const editUserImageLogic = (asyncErrorHandler(async (base32) => {
   const res = await instanceAxios.patch(`/users/pic` , {profilePic : base32} ); 
   return res.data.data.user
}))

export const deleteUserImageLogic = (asyncErrorHandler(async (base32) => {
   const res = await instanceAxios.delete(`/users/pic` , {profilePic : base32} ); 
   return res.data.data.user
}))

export const createGroupLogic =  (asyncErrorHandler(async (form) => {
   await instanceAxios.post(`/group` ,  form); 
   return true
}))

export const getGroupDataLogic =  (asyncErrorHandler(async (id) => {
   const res = await instanceAxios.get(`/group/${id}`); 
   return res.data.data
}))


export const removeUserLogic = (asyncErrorHandler(async ({userId , groupId }) => {
   const res = await instanceAxios.delete(`/group/delete/${groupId}` , {data : { userId } }); 
   return res.data.data.group
}))


export const leaveFromGroupLogic = (asyncErrorHandler(async (id) => {
   const res = await instanceAxios.delete(`/group/delete/me/${id}`); 
   return res.data.data
}))

export const editFromGroupLogic = (asyncErrorHandler(async (form , id) => {
   const res = await instanceAxios.patch(`/group/${id}` , form);
   return res.data.data
}))

export const editGroupImageLogic =  (asyncErrorHandler(async (image , id) => {
   const res = await instanceAxios.patch(`/group/pic/${id}` , {profilePic : image});
   return res.data.data
}))

export const deleteGroupImageLogic =  (asyncErrorHandler(async (id) => {
   const res = await instanceAxios.delete(`/group/pic/${id}`);
   return res.data.data
}))


export const addUsersToGroupLogic =  (asyncErrorHandler(async (form , id) => {
   const res = await instanceAxios.post(`group/add/${id}` , {users : form.users});
   return res.data.data
}))

export const deleteGroupLogic = (asyncErrorHandler(async (id) => {
   await instanceAxios.delete(`group/${id}`);
   return true
}))
