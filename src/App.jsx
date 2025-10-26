import { motion } from 'framer-motion';
import EmotionCanvas from './components/EmotionCanvas.jsx';

function IconHeartOpen(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21s-5.5-4.26-7.9-8.1C2.3 10.2 3.1 6.5 6.2 6.5c2.2 0 3.2 1.3 3.8 2.4.6-1.1 1.6-2.4 3.8-2.4 3.1 0 3.9 3.7 2.1 6.4C17.5 16.74 12 21 12 21z"
      />
    </svg>
  );
}

function IconHandsTogether(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 11 4 8.2c-.8-.8-.8-2.1 0-2.9.8-.8 2.1-.8 2.9 0l2.4 2.4M17 11l3-2.8c.8-.8.8-2.1 0-2.9s-2.1-.8-2.9 0l-2.4 2.4M9 21l-4-4.5c-.8-.9-.7-2.2.1-3 .8-.7 2-.7 2.7.1L11 19M15 21l4-4.5c.8-.9.7-2.2-.1-3-.8-.7-2-.7-2.7.1L13 19"
      />
    </svg>
  );
}

function IconOliveBranch(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 20c6-2 10-6 12-12" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 7c0 1.7-1.3 3-3 3 0-1.7 1.3-3 3-3Zm5-3c0 1.9 1.6 3.5 3.5 3.5C15.5 5.6 13.9 4 12 4Zm5 6c0 1.7 1.3 3 3 3 0-1.7-1.3-3-3-3Z"
      />
    </svg>
  );
}

function IconSparkPrayer(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m6-3-1.5 2.6M6 3l1.5 2.6M4 11h3m-3 6 2.6-1.5M20 11h-3m3 6-2.6-1.5M12 21v-3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m9 14 3-3 3 3v4a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-4Z" />
    </svg>
  );
}

const storyBeats = [
  {
    id: 'kukiri',
    title: 'Najua Nilikosea',
    swahili: 'Najua niko vibaya, na moyo wangu unakiri hili bila kujitetea.',
    subtitle: 'Kila neno la ukimya lililokuumiza sasa linasikika ndani yangu kama mlio wa farasi.',
    body: `Nilijificha nyuma ya woga badala ya kushika mkono wako. Nilipuuzia machozi yako ya kimya,
na sasa ninatembea hatua kwa hatua kuelekea ukweli: nilikuacha peke yako wakati ulihitaji bega langu.`,
    variant: 'regret',
    icon: IconHeartOpen,
  },
  {
    id: 'kusikiliza',
    title: 'Sitaki Kukata Tena',
    swahili: 'Nitakusikiliza kwa subira yote, hata kama makosa yangu yatachoma.',
    subtitle: 'Saute yako ndiyo dira yangu; naja kwako nikiwa mtulivu, nikiwa tayari kupokea kila neno.',
    body: `Nitaweka chini sauti yangu, nitazima kelele za nje, na nitahifadhi kila pumzi utakayoitoa.
Mapigo yangu yatangoja ruhusa yako kabla ya kukukaribia, kwa sababu najua heshima huanza kwa kusikia.`,
    variant: 'love',
    icon: IconHandsTogether,
  },
  {
    id: 'msamaha',
    title: 'Safari ya Msamaha',
    swahili: 'Naomba msamaha, si kama haki, bali kama zawadi utakayotamani kutoa.',
    subtitle: 'Nataka tujenge utulivu mpya, wenye mizizi ya uaminifu na uhai wa matumaini mapya.',
    body: `Nitashona pengo niliotengeneza kwa vitendo vya upole kila siku.
Nikikumbatia mwanga wa kesho kutwa, ninashikilia imani kuwa tukikumbatia msamaha, tutatengeneza dunia yetu upya.`,
    variant: 'forgiveness',
    icon: IconOliveBranch,
  },
];

const gestures = [
  {
    id: 'kusikiza',
    title: 'Nitakusikiliza mwisho',
    detail: 'Hakuna kukatiza, hakuna kujitetea—masikio yangu yatakuwa mapana kama anga ya jioni.',
    icon: IconHandsTogether,
  },
  {
    id: 'kulinda',
    title: 'Nitailinda sauti yako',
    detail: 'Nitahifadhi mipaka yako na kuilinda hadithi yako kama zawadi ninayokabidhiwa.',
    icon: IconSparkPrayer,
  },
  {
    id: 'kujifunza',
    title: 'Nitajifunza kila siku',
    detail: 'Nitafuatilia tiba, vitabu, na mazungumzo yatakayonionyesha namna bora ya kukupenda.',
    icon: IconHeartOpen,
  },
  {
    id: 'kuponya',
    title: 'Nitafanya makazi kuwa laini',
    detail: 'Nyumba yetu itakuwa hema la amani—hakuna shinikizo, ni pumzi yako ndiyo kipaumbele.',
    icon: IconOliveBranch,
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
            Barua hii ya msamaha ni pumzi iliyojaa upendo, majuto, na matumaini mapya. Najua niko vibaya, na ninainama
            mbele yako nikikuomba unisikilize tena.
          </motion.p>
          <motion.div
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 shadow-xl max-w-3xl space-y-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Tamko la Msamaha</p>
            <p className="text-slate-100 text-lg">
              Ninapumua neno moja tu: <span className="text-blush font-semibold">samahani</span>. Najua nilivunja utulivu wako, najua najikuta
              nikiomba mlango wa kurudi. Nataka maneno haya yawe mwanzo wa uponyaji, si kumbukumbu ya maumivu.
            </p>
          </motion.div>
          <motion.div
            className="grid w-full max-w-4xl grid-cols-1 sm:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {gestures.slice(0, 2).map((gesture, idx) => {
              const Icon = gesture.icon;
              return (
                <motion.div
                  key={gesture.id}
                  variants={textVariants}
                  custom={idx}
                  className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur p-5 flex flex-col items-center gap-3"
                >
                  <Icon className="w-12 h-12 text-blush drop-shadow-[0_0_12px_rgba(244,114,182,0.6)]" />
                  <h3 className="font-semibold text-lg">{gesture.title}</h3>
                  <p className="text-slate-300 text-sm">{gesture.detail}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </header>

      <main className="relative space-y-24 pb-24">
        <section className="relative max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gestures.map((gesture) => {
              const Icon = gesture.icon;
              return (
                <motion.div
                  key={gesture.id}
                  className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg p-6 flex flex-col gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                  <Icon className="w-10 h-10 text-blush" />
                  <h3 className="font-semibold">{gesture.title}</h3>
                  <p className="text-sm text-slate-300">{gesture.detail}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

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
                <motion.div className="flex items-center gap-3" variants={textVariants}>
                  {beat.icon && (
                    <beat.icon className="w-10 h-10 text-blush drop-shadow-[0_0_12px_rgba(244,114,182,0.6)]" />
                  )}
                  <span className="text-xs uppercase tracking-[0.4em] text-slate-300">{`Sura ${index + 1}`}</span>
                </motion.div>
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
        <p>Ninaomba msamaha wako kwa unyenyekevu na matumaini. - Nitathibitisha kwa vitendo, kila siku.</p>
      </footer>
    </div>
  );
}
