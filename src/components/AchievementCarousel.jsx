import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { motion } from 'framer-motion';

export default function AchievementCarousel({ achievements }) {
  if (!achievements || achievements.length === 0) {
    return (
      <p className="text-center text-slate-400 py-12">
        No achievements to display
      </p>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        pagination={{
          clickable: true,
          bulletActiveClass: 'bg-sky-blue',
          bulletClass: 'bg-slate-400 rounded-full w-3 h-3',
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        effect="coverflow"
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        slidesPerView={'auto'}
        centeredSlides={true}
        className="relative py-8"
      >
        {achievements.map((achievement) => (
          <SwiperSlide key={achievement.id} className="!w-auto">
            <motion.div
              className="relative h-96 w-96 rounded-2xl overflow-hidden group cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              {/* Image */}
              <img
                src={achievement.media_url}
                alt={achievement.title}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold mb-2 font-poppins">
                    {achievement.title}
                  </h3>
                  <p className="text-blue-100 text-sm line-clamp-2">
                    {achievement.description}
                  </p>
                </motion.div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 smooth-transition shadow-glow" />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <motion.button
        className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-gradient-to-r from-sky-blue to-cyan-glow text-white flex items-center justify-center hover:shadow-glow smooth-transition -translate-x-6 md:-translate-x-12"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        ←
      </motion.button>
      <motion.button
        className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-gradient-to-r from-sky-blue to-cyan-glow text-white flex items-center justify-center hover:shadow-glow smooth-transition translate-x-6 md:translate-x-12"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        →
      </motion.button>
    </motion.div>
  );
}
