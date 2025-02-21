'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSwipeable } from 'react-swipeable'; // برای سوایپ گالری تصاویر
import AOS from 'aos'; // برای انیمیشن اسکرول
import 'aos/dist/aos.css'; // برای انیمیشن‌های AOS
import { motion } from 'framer-motion'; // برای انیمیشن‌های React
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // آیکن‌های فلش

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); // برای مدیریت اندیس تصویر فعلی
  const modalRef = useRef(null); // به مودال ارجاع می‌دهیم

  // تصاویر نمونه
  const images = [
    '/images/sample-1.jpg',
    '/images/sample-2.jpg',
    '/images/sample-3.jpg',
    '/images/sample-4.jpg',
    '/images/sample-5.jpg',
    '/images/sample-6.jpg',
    '/images/sample-7.jpg',
    '/images/sample-8.jpg'
  ];

  useEffect(() => {
    AOS.init();
  }, []);

  const openModal = useCallback((index) => {
    setIsOpen(true);
    setCurrentImage(images[index]);
    setCurrentIndex(index);
    if (modalRef.current) {
      modalRef.current.focus(); // مودال را فوکوس می‌کنیم
    }
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setCurrentImage(null);
  }, []);

  // قابلیت سوایپ برای موبایل
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setCurrentImage(images[(currentIndex + 1) % images.length]);
    },
    onSwipedRight: () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
      setCurrentImage(images[(currentIndex - 1 + images.length) % images.length]);
    }
  });

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setCurrentImage(images[(currentIndex + 1) % images.length]);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    setCurrentImage(images[(currentIndex - 1 + images.length) % images.length]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 text-gray-900 font-sans">
      {/* هدر */}
      <header className="text-white py-12 text-center shadow-md transition-all duration-500 ease-in-out">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-wider">خدمات ناخن امیری</h1>
        <p className="mt-4 text-lg sm:text-xl opacity-80">09028498525 | تهران، جنت آباد جنوبی، خیابان بهمنی نژاد</p>
      </header>

      {/* بخش معرفی */}
      <section className="pt-16 pb-12 px-8 bg-gradient-to-r from-white to-gray-50 rounded-xl shadow-lg max-w-5xl mx-auto mt-16 fade-in transition-all" data-aos="fade-up">
        <h2 className="text-3xl font-medium text-gray-900 mb-4">درباره من</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          من [نام ناخنکار] هستم و در این سالن خدمات مختلفی برای ناخن‌ها ارائه می‌کنم. برای نوبت‌گیری و اطلاعات بیشتر تماس بگیرید.
        </p>
      </section>

      {/* بخش نمونه کارها */}
      <section className="py-12 px-8 bg-gradient-to-r from-gray-50 via-white to-gray-100">
        <h2 className="text-3xl font-medium text-gray-900 text-center mb-8">نمونه کارها</h2>
        
        {/* گالری تصاویر */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {images.map((image, index) => (
            <div key={index} className="group relative rounded-xl shadow-xl transition-all transform hover:scale-105 hover:shadow-2xl">
              <img
                src={image}
                alt={`نمونه کار ${index + 1}`}
                className="rounded-xl shadow-lg w-full h-80 object-cover transition-all group-hover:scale-110 cursor-pointer"
                onClick={() => openModal(index)}
                data-aos="zoom-in"
              />
            </div>
          ))}
        </div>
      </section>

      {/* بخش تماس */}
      <section className="py-12 px-8 bg-gradient-to-r from-white to-gray-50 rounded-xl shadow-lg max-w-5xl mx-auto mt-16 fade-in transition-all" data-aos="fade-up">
        <h2 className="text-3xl font-medium text-gray-900 mb-4">تماس با ما</h2>
        <p className="text-lg text-gray-700 mb-4">آدرس: تهران، جنت آباد جنوبی، خیابان بهمنی نژاد</p>
        <a href="tel:+982828498525" className="text-white bg-blue-600 hover:bg-blue-700 rounded-full py-2 px-6 transition-colors duration-300">
          تماس بگیرید: 09028498525
        </a>
        <div className="w-full mt-8 rounded-xl overflow-hidden shadow-lg">
          <iframe 
            src="https://www.google.com/maps/embed?pb=..." 
            width="100%" 
            height="400" 
            style={{border: 0}} 
            allowFullScreen="" 
            loading="lazy">
          </iframe>
        </div>
      </section>

      {/* دکمه بازگشت به بالا */}
      <button 
        onClick={() => window.scrollTo(0, 0)} 
        className="fixed bottom-10 right-10 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition duration-300 transform hover:scale-110">
        ↑
      </button>

      {/* Modal (برای نمایش تصویر بزرگ‌تر) */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: isOpen ? 1 : 0 }} 
        exit={{ opacity: 0 }} 
        transition={{ duration: 0.5 }}
        className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ${isOpen ? 'block' : 'hidden'}`}
        {...handlers} // اضافه کردن قابلیت سوایپ به مودال
      >
        {/* مودال با قابلیت زوم و نمایش تصویر در سایز اصلی */}
        <div ref={modalRef} className="relative bg-white p-8 rounded-lg w-auto max-w-3xl overflow-hidden">
          
          {/* دکمه بستن بزرگتر */}
          <button 
            onClick={closeModal} // به دکمه عملکرد "بستن" اضافه می‌شود
            className="absolute top-4 right-4 p-6 bg-red-600 text-white rounded-full text-lg z-50 hover:bg-red-700 transition-all">
            بستن
          </button>
          
          {/* دکمه‌های فلش برای جابه‌جایی تصاویر */}
          <button 
            onClick={prevImage}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 p-6 bg-gray-600 text-white rounded-full shadow-lg hover:bg-gray-700">
            <FaArrowLeft />
          </button>

          <button 
            onClick={nextImage}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 p-6 bg-gray-600 text-white rounded-full shadow-lg hover:bg-gray-700">
            <FaArrowRight />
          </button>
          
          {/* تصویر با سایز اصلی و زوم */}
          <img 
            src={currentImage} 
            alt="نمونه کار" 
            className="max-h-screen max-w-full object-contain transition-transform transform hover:scale-105" 
          />
        </div>
      </motion.div>
    </div>
  );
}
