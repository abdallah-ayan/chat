import { useState } from "react";
import { ArrowLeft, Camera, UserPlus, Trash2 } from "lucide-react";
import useChatStore from "../../../../../features/store/Home/useChatStore";
import editGroupValidation from "../../../../../features/validation/home/EditGroupValidation";
import { OrbitProgress } from "react-loading-indicators";
export default function EditGroup({ imagePreview, setPage }) {
  const { selectedUser, setAddMembersOpen , groupDeleteLoading , deleteGroup } = useChatStore()

  const [form, setForm] = useState({
    name: selectedUser?.name ?? "",
    description: selectedUser?.description ?? "",
    sendAll: selectedUser?.sendAll ?? "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    editGroupValidation(form);
  };

  const handleDelete = () => {
    deleteGroup();
  }

  return (
    <div className="absolute inset-y-0 left-0 w-full overflow-hidden">

      {/* Header */}

      <div className="flex h-16 items-center px-5">

        <button type="button" onClick={() => setPage("profile")} className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/5 hover:text-white">
          <ArrowLeft size={20} strokeWidth={1.8} />
        </button>

        <h2 className="ml-3 text-lg font-semibold text-slate-100">
          Edit Group
        </h2>

      </div>

      {/* Form */}

      <form onSubmit={handleSubmit} className="flex h-[calc(100%-4rem)] flex-col overflow-y-auto px-5 py-5">

        {/* Image */}

        <div className="flex justify-center">

          <div className="relative">

            <div className="absolute -inset-4 rounded-full bg-blue-500/[0.05] blur-2xl" />

            <img src={imagePreview} alt="Group" className="relative h-32 w-32 rounded-full border-2 border-slate-600/80 object-cover shadow-xl shadow-black/40" />

            <button type="button" onClick={() => setPage("image")} className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border border-slate-600 bg-slate-800 text-slate-300 shadow-lg transition-all duration-200 hover:border-cyan-500 hover:bg-slate-700 hover:text-cyan-300 active:scale-95">
              <Camera size={16} strokeWidth={1.8} />
            </button>

          </div>

        </div>

        {/* Name */}

        <div className="mt-8 w-full">

          <label htmlFor="group-name" className="mb-2 block text-sm font-medium text-slate-300">
            Group name
          </label>

          <input id="group-name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Group name" className="h-11 w-full rounded-xl border border-slate-700 bg-slate-800 px-4 text-sm text-slate-100 outline-none transition-colors placeholder:text-slate-500 focus:border-cyan-600" />

        </div>

        {/* Description */}

        <div className="mt-5 w-full">

          <label htmlFor="group-description" className="mb-2 block text-sm font-medium text-slate-300">
            Description
          </label>

          <textarea id="group-description" name="description" rows={4} value={form.description} onChange={handleChange} placeholder="Group description" className="w-full resize-none rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm leading-6 text-slate-100 outline-none transition-colors placeholder:text-slate-500 focus:border-cyan-600" />

        </div>

        {/* Send Permission */}

        <div className="mt-5 w-full rounded-xl border border-slate-700 bg-slate-800 p-4">

          <div className="flex items-center justify-between gap-4">

            <div className="min-w-0">

              <p className="text-sm font-medium text-slate-200">
                Member messaging
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                {form?.sendAll ? "All members can send messages" : "Only admins can send messages"}
              </p>

            </div>

            <label className="relative h-7 w-12 shrink-0 cursor-pointer">

              <input type="checkbox" name="sendAll" checked={form.sendAll} onChange={handleChange} className="peer absolute h-0 w-0 opacity-0" />

              <span className="absolute inset-0 rounded-full border border-slate-600 bg-slate-700 transition-colors duration-200 peer-checked:border-cyan-600 peer-checked:bg-cyan-700" />

              <span className="absolute left-[3px] top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-slate-100 shadow-md transition-transform duration-200 peer-checked:translate-x-[20px]" />

            </label>

          </div>

        </div>

        {/* Add Members */}

        <button type="button" onClick={() => setAddMembersOpen(true)} className="mt-5 flex h-12 w-full items-center gap-3 rounded-xl border border-slate-700 bg-slate-800 px-4 text-left text-slate-200 transition-all duration-200 hover:border-cyan-600 hover:bg-slate-700">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-700">

            <UserPlus size={17} strokeWidth={1.8} className="text-cyan-300" />

          </div>

          <div>

            <p className="text-sm font-medium">
              Add members
            </p>

            <p className="text-xs text-slate-500">
              Add people to this group
            </p>

          </div>

        </button>

        {/* Submit */}

        <button type="submit" className="mt-8 h-11 w-full rounded-xl bg-cyan-700 text-sm font-semibold text-white transition-colors hover:bg-cyan-600">
          Save changes
        </button>

        {/* Delete Group */}

        <div className="mt-20 border-slate-700/80 pt-6">


          <button
            disabled={groupDeleteLoading}
            onClick={handleDelete}
            type="button"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 text-sm font-semibold text-red-400 transition-all duration-200 hover:border-red-500/50 hover:bg-red-500/15 hover:text-red-300 active:scale-[0.99]"
          >

            {
              groupDeleteLoading 
              ? 
              <OrbitProgress variant="spokes" color="#c5c5c5" style={{fontSize : "6px"}} text="" textColor="" />
              : 
              <div className="flex h-11 w-full items-center justify-center gap-2">
                <Trash2 size={17} strokeWidth={1.8} />
                Delete group
              </div>
            }

          </button>

        </div>
      </form>

    </div>
  );
}