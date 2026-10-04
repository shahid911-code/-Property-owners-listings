import React, { useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { UploadedPhoto } from '../types';

interface PhotoUploaderProps {
  photos: UploadedPhoto[];
  onChange: (photos: UploadedPhoto[]) => void;
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  photos,
  onChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    fileArray.forEach((file) => {
      // Basic check: must be image
      if (!file.type.startsWith('image/')) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          const newPhoto: UploadedPhoto = {
            id: Math.random().toString(36).substring(2, 9),
            name: file.name,
            url: result,
            size: file.size,
          };
          onChange([...photos, newPhoto]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(photos.filter((p) => p.id !== id));
  };

  return (
    <div className="w-full space-y-3">
      {/* Upload Zone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="w-full border-2 border-dashed border-neutral-300 hover:border-black rounded-xl p-5 sm:p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-neutral-50/60 hover:bg-neutral-50 group text-center"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            handleFiles(e.target.files);
            // Reset input so same file can be picked again if removed
            if (e.target) e.target.value = '';
          }}
        />

        <div className="w-11 h-11 rounded-full bg-white border border-neutral-200 shadow-xs flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
          <Upload className="w-5 h-5 text-neutral-700 group-hover:text-black transition-colors" />
        </div>

        <p className="text-sm font-semibold text-black">
          Property ki tasveerein upload karein
        </p>
        <p className="text-xs text-neutral-500 mt-1">
          Tap karein ya gallery se select karein (JPG, PNG, WebP)
        </p>
      </div>

      {/* Previews Grid */}
      {photos.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-neutral-500 px-1 font-medium">
            <span>Selected Photos ({photos.length})</span>
            <button
              type="button"
              onClick={() => onChange([])}
              className="text-neutral-400 hover:text-red-600 transition-colors"
            >
              Clear all
            </button>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="relative aspect-square rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100 group shadow-xs"
              >
                <img
                  src={photo.url}
                  alt={photo.name}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={(e) => removePhoto(photo.id, e)}
                  className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center shadow-md transition-transform active:scale-95"
                  aria-label="Remove image"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Helpful Hint */}
      <div className="p-3 bg-neutral-100/70 rounded-lg flex items-start gap-2.5 text-left border border-neutral-200/80">
        <ImageIcon className="w-4 h-4 text-neutral-600 shrink-0 mt-0.5" />
        <p className="text-xs text-neutral-600 leading-relaxed">
          <span className="font-semibold text-neutral-900">Note:</span> Photos abhi upload karna optional hai. Form submit karne ke baad aap direct WhatsApp chat par bhi tasveerein bhej saktay hain.
        </p>
      </div>
    </div>
  );
};
