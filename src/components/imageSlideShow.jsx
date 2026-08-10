import React, { useState } from 'react';

export default function ImageSlideShow(props){
    const [activeImage, setActiveImage] = useState(0);
    const images = props.images || [];
    return (
        <div className = "w-[500px] h-[500px] flex flex-col">
            {images.length > 0 ? (
                <>
                <img src={images[activeImage]} alt="Product" className = "w-full aspect-square object-cover" />
                <div className = "h-[100px] w-full border-4 flex items-center justify-center gap-2 mt-4">
                    {images.map((image, index) => (
                        <img
                            key={index} 
                            src={image}
                            alt={`Product ${index + 1}`}
                            className = {"w-[90px] h-[90px] object-cover cursor-pointer rounded-2xl" + (index == activeImage ? " border-4 border-accent" : "")}
                            onClick={() => setActiveImage(index)}
                        />
                    ))}
                </div>
                </>
            ) : (
                <p>No images available</p>
            )}
        </div>
    )
}