"use client";

import Image from "next/image";

export function Details({ skill_details, onClose }) {
  // replace backlaches
  // const imageUrl = skill_details.image.replace(/\\/g, "/");

  const imageUrl = skill_details.image
    ? `${process.env.NEXT_PUBLIC_API_URL}${skill_details.image}`
    : null;
  
  console.log("Imageurl :",imageUrl)

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/65 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
        {/* Image */}
        {imageUrl && (
          <img
            src={imageUrl} // full URL is fine now
            alt={skill_details.name}
            width={500}
            height={300}
            className="object-cover w-full h-auto"
          />
        )}


        {/* Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{skill_details.name}</h2>
          <p className="text-gray-600 mb-4">{skill_details.description}</p>

          {/* Info */}
          <div className="space-y-3 text-sm">
            <p>
              <span className="font-semibold">ID:</span> {skill_details.id}
            </p>
            {skill_details.video && (
              <a
                href={`/${skill_details.video}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-600 hover:underline"
              >
                🎥 Watch Video
              </a>
            )}
            {skill_details.document && (
              <a
                href={`/${skill_details.document}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-green-600 hover:underline"
              >
                📄 View Document
              </a>
            )}
            {skill_details.link && (
              <a
                href={skill_details.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-purple-600 hover:underline"
              >
                🔗 Visit Link
              </a>
            )}
          </div>

          {/* Level Badge */}
          {skill_details.level && (
            <span className="inline-block mt-4 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
              {skill_details.level}
            </span>
          )}

          {/* Close Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
