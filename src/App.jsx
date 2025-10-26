import { motion } from 'framer-motion';
import EmotionCanvas from './components/EmotionCanvas.jsx';

const storyBeats = [
  {
    id: 'love',
    title: 'Whispers of the First Sunrise',
    swahili: 'Nilipoiona sura yako, moyo wangu ulipiga ngoma ya furaha.',
    subtitle: 'Kila tabasamu lako lilikuwa ahadi ya kesho nzuri.',
    body: `Under the violet skies of Bangkok, we chased neon dreams and quiet sunsets.
I remember how your laughter painted constellations above us, how every moment felt suspended in golden light.`,
    variant: 'love',
  },
  {
    id: 'regret',
    title: 'Echoes in the Space Between Us',
    swahili: 'Samahani, moyo wangu uliharibika kwa ukimya niliokupa.',
    subtitle: 'Nilipotea kwenye kivuli cha hofu yangu na nikakuacha ukisubiri mwanga.',
    body: `I let distance bloom between our hands. Words I never said weighed heavier than any storm.
The city kept moving while I stood still, rehearsing apologies in every passing reflection.`,
    variant: 'regret',
  },
  {
    id: 'forgiveness',
    title: 'Homecoming of the Heart',
    swahili: 'Ninakusihi, Asia, tusimame tena katika mwanga wa msamaha.',
    subtitle: 'We can learn to breathe together again, to trust the dawn we once shared.',
    body: `If you can hear this prayer carried on monsoon winds, know that my hands are open.
I am ready to listen, to hold the softest parts of your heart with reverence.`,
    variant: 'forgiveness',
  },
];

const textVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.9, ease: 'easeOut' },
  }),
};

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-twilight via-dusk to-black text-white">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_top,_rgba(244,114,182,0.35),_transparent_60%)]" />
        <div className="relative max-w-6xl mx-auto px-6 py-20 flex flex-col gap-12 items-center text-center">
          <motion.h1
            className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-wide"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            Forgive Me, Asia
          </motion.h1>
          <motion.p
            className="max-w-3xl text-lg sm:text-xl text-slate-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease: 'easeOut' }}
          >
            An immersive letter of love, regret, and hope—woven through light, sound, and motion. Safari hii ya hisia
            inatembea kupitia kumbukumbu zetu, ikitafuta msamaha wako wa thamani.
          </motion.p>
          <motion.div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 shadow-xl max-w-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-slate-300 mb-4">Soundtrack</p>
            <p className="text-slate-100 mb-4">
              Press play and let the melody carry these words to you. <span className="italic">Cheza wimbo huu, usikie moyo
              wangu ukiongea.</span>
            </p>
            <audio
              controls
              className="w-full"
              src="https://cdn.pixabay.com/download/audio/2023/03/01/audio_4cff8b6b5c.mp3?filename=calm-piano-144998.mp3"
            >
              Your browser does not support the audio element.
            </audio>
          </motion.div>
        </div>
      </header>

      <main className="relative space-y-24 pb-24">
        {storyBeats.map((beat, index) => (
          <section key={beat.id} className="relative">
            <div className="absolute inset-0 blur-3xl opacity-30" aria-hidden>
              <div
                className={`h-full w-full ${
                  beat.variant === 'regret'
                    ? 'bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.2),_transparent_65%)]'
                    : beat.variant === 'forgiveness'
                    ? 'bg-[radial-gradient(circle_at_center,_rgba(163,230,53,0.18),_transparent_65%)]'
                    : 'bg-[radial-gradient(circle_at_center,_rgba(244,114,182,0.25),_transparent_65%)]'
                }`}
              />
            </div>
            <div className="relative max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                className="flex flex-col gap-5"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                transition={{ staggerChildren: 0.12 }}
              >
                <motion.span
                  className="text-sm uppercase tracking-[0.4em] text-slate-300"
                  variants={textVariants}
                >
                  {`Chapter ${index + 1}`}
                </motion.span>
                <motion.h2
                  className="font-display text-3xl sm:text-4xl text-white"
                  variants={textVariants}
                  custom={1}
                >
                  {beat.title}
                </motion.h2>
                <motion.p className="text-lg text-slate-200" variants={textVariants} custom={2}>
                  {beat.subtitle}
                </motion.p>
                <motion.blockquote className="text-blush/90 italic" variants={textVariants} custom={3}>
                  “{beat.swahili}”
                </motion.blockquote>
                <motion.p className="text-base leading-relaxed text-slate-300 whitespace-pre-line" variants={textVariants} custom={4}>
                  {beat.body}
                </motion.p>
              </motion.div>
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1, ease: 'easeOut' }}
              >
                <div className="absolute -inset-6 rounded-3xl bg-white/5 blur-3xl" aria-hidden />
                <div className="relative rounded-3xl border border-white/10 bg-black/40 backdrop-blur-lg shadow-2xl overflow-hidden">
                  <EmotionCanvas variant={beat.variant} />
                </div>
              </motion.div>
            </div>
          </section>
        ))}
      </main>

      <footer className="py-16 text-center text-slate-400 text-sm">
        <p>Imeandikwa kwa upendo, kwa matumaini ya msamaha. — Naomba unitazame tena, Asia.</p>
      </footer>
    </div>
  );
}
