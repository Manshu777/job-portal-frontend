'use client'
import { useState } from "react";
import { FaLaptop, FaGamepad, FaBook, FaCamera, FaHeadphones, FaPalette, FaGuitar, FaDumbbell } from "react-icons/fa";
import { motion } from "framer-motion";

const Browsercategory = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      id: "1",
      name: "Electronics",
      icon: <FaLaptop className="text-4xl" />,
      backgroundColor: "bg-blue-100",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661"
    },
    {
      id: "2",
      name: "Gaming",
      icon: <FaGamepad className="text-4xl" />,
      backgroundColor: "bg-purple-100",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f"
    },
    {
      id: "3",
      name: "Books",
      icon: <FaBook className="text-4xl" />,
      backgroundColor: "bg-yellow-100",
      image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d"
    },
    {
      id: "4",
      name: "Photography",
      icon: <FaCamera className="text-4xl" />,
      backgroundColor: "bg-green-100",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32"
    },
    {
      id: "5",
      name: "Audio",
      icon: <FaHeadphones className="text-4xl" />,
      backgroundColor: "bg-red-100",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },
    {
      id: "6",
      name: "Art",
      icon: <FaPalette className="text-4xl" />,
      backgroundColor: "bg-pink-100",
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f"
    },
    {
      id: "7",
      name: "Music",
      icon: <FaGuitar className="text-4xl" />,
      backgroundColor: "bg-indigo-100",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d"
    },
    {
      id: "8",
      name: "Fitness",
      icon: <FaDumbbell className="text-4xl" />,
      backgroundColor: "bg-orange-100",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438"
    }
  ];

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    console.log(`Category ${categoryId} selected`);
  };

  return (
    <div className="mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Browse Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={() => handleCategoryClick(category.id)}
            className={`
              ${category.backgroundColor}
              rounded-lg p-6
              cursor-pointer
              transition-all duration-300
              hover:shadow-lg
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              relative overflow-hidden
            `}
            tabIndex="0"
            role="button"
            aria-label={`Select ${category.name} category`}
          >
            <div className="relative z-10 flex flex-col items-center justify-center space-y-4">
              {category.icon}
              <h3 className="text-lg font-semibold text-gray-800 text-center">{category.name}</h3>
            </div>
            <div 
              className="absolute inset-0 opacity-10 bg-cover bg-center z-0"
              style={{
                backgroundImage: `url(${category.image})`
              }}
              aria-hidden="true"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Browsercategory;