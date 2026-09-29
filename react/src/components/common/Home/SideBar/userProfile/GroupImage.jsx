import { useState } from "react";
import { ArrowLeft, ImagePlus, Trash2 } from "lucide-react";
import useChatStore from "../../../../../features/store/Home/useChatStore";
import { OrbitProgress } from "react-loading-indicators";

export default function GroupImage({
    imagePreview,
    setPage, 
    setImagePreview
}) {

    const [preview, setPreview] = useState(imagePreview);
    const [form, setForm] = useState({
        image: "",
    });

    const { editGroupImage, editGroupImageLoading , deleteGroupImage } = useChatStore()
    const handleImageChange = (e) => {

        const file = e.target.files?.[0];

        if (!file)
            return;

        const reader = new FileReader();

        reader.onload = () => {

            const base64 = reader.result;

            setPreview(base64);

            setForm({
                image: base64,
            });

        };

        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        const state = editGroupImage(form.image);
        if(state) {
            setImagePreview(form.image);
        }
    };

    const handleDeleteImage = async () => {
        const state = await deleteGroupImage();
        if(state) setPreview(null);
    };

    return (
        <div className="absolute inset-y-0 left-0 w-full overflow-hidden">

            <div className="flex h-16 items-center px-5">

                <button type="button" onClick={() => setPage("edit")} className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/5 hover:text-white">
                    <ArrowLeft size={20} strokeWidth={1.8} />
                </button>

                <h2 className="ml-3 text-lg font-semibold text-slate-100">
                    Group Image
                </h2>

            </div>

            <form onSubmit={handleSubmit} className="flex h-[calc(100%-4rem)] flex-col items-center px-5 py-8">

                {
                    editGroupImageLoading ?
                        <div className="relative h-48 w-48 flex justify-center rounded-full border-2 border-slate-600 object-cover shadow-2xl shadow-black/50" style={{ alignItems: "center" }}>

                            <div className="absolute -inset-6 rounded-full bg-blue-500/[0.05] blur-2xl" />
                            <OrbitProgress variant="spokes" color="#c5c5c5" size="medium" text="" textColor="" />


                        </div>
                        :

                        <div className="relative">

                            <div className="absolute -inset-6 rounded-full bg-blue-500/[0.05] blur-2xl" />

                            <img src={preview || "/avatar.png"} alt="Group preview" className="relative h-48 w-48 rounded-full border-2 border-slate-600 object-cover shadow-2xl shadow-black/50" />

                        </div>
                }

                <label className="mt-10 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 text-sm font-medium text-slate-200 transition-all duration-200 hover:border-cyan-600 hover:bg-slate-700">

                    <ImagePlus size={18} strokeWidth={1.8} className="text-cyan-300" />

                    <span>
                        Choose image
                    </span>

                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />

                </label>

                <button type="button" onClick={handleDeleteImage} className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-red-900/60 bg-red-950/30 text-sm font-semibold text-red-300 transition-colors hover:border-red-700 hover:bg-red-900/40 hover:text-red-200">
                    <Trash2 size={17} strokeWidth={1.8} />
                    Delete current image
                </button>

                <button type="submit" disabled={!form.image} className="mt-4 h-11 w-full rounded-xl bg-cyan-700 text-sm font-semibold text-white transition-colors hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-40">
                    Save image
                </button>

            </form>

        </div>
    );
}