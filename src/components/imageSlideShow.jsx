import React, { useState, useEffect } from 'react';

export default function ImageSlideShow(props) {
    const [activeImage, setActiveImage] = useState(0);
    const images = props.images || [];

    // Reset to the primary image when switching products
    useEffect(() => {
        setActiveImage(0);
    }, [props.images]);

    return (
        <div className="w-full max-w-[520px] flex flex-col">
            {images.length > 0 ? (
                <>
                    <div 
                        className="w-full aspect-square rounded-2xl overflow-hidden flex items-center justify-center p-4 transition-all"
                        style={{ background: "#0F1623", border: "1px solid #1E2D45" }}
                    >
                        <img 
                            src={images[activeImage]} 
                            alt="Product preview" 
                            className="w-full h-full object-contain transition-transform duration-300 hover:scale-105" 
                        />
                    </div>
                    {images.length > 1 && (
                        <div className="w-full flex items-center justify-center gap-2 mt-4 overflow-x-auto pb-2">
                            {images.map((image, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => setActiveImage(index)}
                                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden p-1 transition-all shrink-0 cursor-pointer ${
                                        index === activeImage
                                            ? "ring-2 ring-[#4F8EF7] shadow-lg shadow-[#4F8EF7]/20"
                                            : "opacity-60 hover:opacity-100"
                                    }`}
                                    style={{
                                        background: "#151D2E",
                                        border: index === activeImage ? "1px solid #4F8EF7" : "1px solid #1E2D45",
                                    }}
                                    aria-label={`View image ${index + 1}`}
                                >
                                    <img
                                        src={image}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="w-full h-full object-contain"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <div 
                    className="w-full aspect-square rounded-2xl flex items-center justify-center text-sm"
                    style={{ background: "#0F1623", border: "1px solid #1E2D45", color: "#7A8BA3" }}
                >
                    No images available
                </div>
            )}
        </div>
    );
}
