import { useState } from "react";
import {
  ArrowLeft,
  ImagePlus,
  Trash2,
  Save,
  XIcon,
} from "lucide-react";
import useAuthSore from "../../../../../../features/store/auth/useAuthSore";
import { OrbitProgress } from "react-loading-indicators";


export default function ProfileImageUpdate({
  isEditingPhoto,
  setIsEditingPhoto,
  setOpenProfile
}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const { userAuth, handleEditImage, userImageLoading, handleDeleteImage } = useAuthSore();

  const currentImage =
    previewImage || userAuth.profilePic || "/avatar.png";


  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };


  const handleSavePhoto = () => {
    if (!selectedImage) return;

    const reader = new FileReader();

    reader.readAsDataURL(selectedImage);

    reader.onloadend = async () => {
      await handleEditImage(reader.result);
      setPreviewImage(reader.result);
      setSelectedImage(null);
    };
  };


  // حذف الصورة الجديدة التي اختارها المستخدم فقط
  const handleRemovePhoto = () => {
    setSelectedImage(null);
    setPreviewImage(null);
  };


  // حذف صورة البروفايل الحالية المحفوظة في قاعدة البيانات
  const handleDeleteSavedPhoto = async () => {
    await handleDeleteImage();
    setPreviewImage(null);
    setSelectedImage(null);
  };


  return (
    <div
      className={`absolute inset-0 flex flex-col px-6 pt-5 transition-all duration-300 ease-out ${isEditingPhoto
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0 pointer-events-none"
        }`}
    >

      {/* Close */}



      {/* Header */}

      <div className="flex items-center">
        <button
          type="button"
          onClick={() => {
            setOpenProfile(false)
            setIsEditingPhoto(false)
          }}
          className="absolute right-5 top-6 flex h-9 w-9  items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/5 hover:text-white"
        >
          <XIcon size={20} strokeWidth={1.8} />
        </button>

        <button
          type="button"
          onClick={() => setIsEditingPhoto(false)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/5 hover:text-white"
        >
          <ArrowLeft size={20} strokeWidth={1.8} />
        </button>

        <div className="ml-7 text-center">

          <h2 className="text-lg text-center font-semibold text-slate-100">
            Edit Photo
          </h2>

          <p className="mt-0.5 text-center text-xs text-slate-500">
            Update your profile picture
          </p>

        </div>

      </div>


      {/* Photo Preview */}

      <div className="mt-9 flex justify-center">

        <div className="relative">

          <div className="absolute -inset-3 rounded-full border border-[#30354E]" />

          {userImageLoading ? (

            <div
              className="relative flex h-40 w-40 items-center justify-center rounded-full border-2 border-[#3B425D] shadow-2xl"
            >
              <OrbitProgress
                variant="spokes"
                color="#97A3B3"
                style={{
                  fontSize: "12px",
                  marginTop: "4px"
                }}
                text=""
                textColor=""
              />
            </div>

          ) : (

            <div
              className="relative h-40 w-40 rounded-full border-2 border-[#3B425D] bg-cover bg-center bg-no-repeat shadow-2xl shadow-black/40"
              style={{
                backgroundImage: `url(${currentImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />

          )}

        </div>

      </div>

      {/* Photo Info */}

      <div className="mt-8 text-center">

        <h3 className="text-base font-semibold text-slate-100">
          Profile Picture
        </h3>

        <p className="mt-1.5 px-4 text-xs leading-5 text-slate-500">
          Choose a clear image that represents you.
        </p>

      </div>


      {/* Actions */}

      <div className="mt-8 space-y-3">

        {/* Change / Save Photo */}

        {!selectedImage ? (

          <label className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#414964] bg-[#303750] text-sm font-semibold text-slate-100 shadow-lg shadow-black/20 transition-all duration-200 hover:border-[#515B78] hover:bg-[#39415C] hover:text-white">

            <ImagePlus size={17} strokeWidth={1.8} />

            Choose New Photo

            <input
              disabled={userImageLoading}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

          </label>

        ) : (

          <button
            type="button"
            disabled={userImageLoading}
            onClick={handleSavePhoto}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#414964] bg-[#303750] text-sm font-semibold text-slate-100 shadow-lg shadow-black/20 transition-all duration-200 hover:border-[#515B78] hover:bg-[#39415C] hover:text-white"
          >

            <Save size={16} strokeWidth={1.8} />

            Save New Photo

          </button>

        )}


        {/* Remove Selected Photo */}

        {selectedImage && (

          <button
            type="button"
            onClick={handleRemovePhoto}
            disabled={userImageLoading}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#30354E] bg-[#202338] text-sm font-medium text-slate-400 transition hover:border-[#454B65] hover:bg-[#25283D] hover:text-slate-200"
          >

            <Trash2 size={15} strokeWidth={1.8} />

            Discard New Photo

          </button>

        )}


        {/* Delete Current Saved Photo */}

        {userAuth.profilePic && (

          <div className="mt-5">

            <button
              type="button"
              onClick={handleDeleteSavedPhoto}
              disabled={userImageLoading}
              className="group flex w-full items-center justify-between rounded-lg border border-[#3A303C] bg-[#211E2A] px-4 py-3 text-left transition hover:border-[#5A3A48] hover:bg-[#28202B]"
            >

              <div>

                <p className="text-sm font-medium text-slate-300 transition group-hover:text-red-300">
                  Delete Current Photo
                </p>

                <p className="mt-0.5 text-[11px] text-slate-500">
                  Remove your saved profile picture
                </p>

              </div>

              <Trash2
                size={17}
                strokeWidth={1.8}
                className="text-slate-500 transition group-hover:text-red-400"
              />

            </button>

          </div>

        )}

      </div>

    </div>
  );
}