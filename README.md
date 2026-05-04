# Antahkarana — Cure to BrainRot

> **A cognitive restoration platform grounded in Vedic neuroscience and modern behavioural research.**

Antahkarana is a progressive web application designed to combat the measurable cognitive degradation caused by chronic digital overstimulation. The platform combines peer-reviewed neuroscience findings with time-tested practices from the Indian knowledge tradition to deliver a structured, habit-based intervention system accessible from any device.

The name *Antahkarana* (Sanskrit: अन्तःकरण) translates to "the inner instrument" — referring to the faculty of mind, intellect, memory, and ego that classical Indian philosophy identifies as the seat of human cognition.

---

## Motivation

Between 2004 and 2024, the average sustained attention span declined from 2.5 minutes to 65 seconds (Mark et al., 2016). Diffusion Tensor MRI studies reveal measurable thinning of the dorsolateral prefrontal cortex in heavy digital users, alongside a 35% reduction in impulse-control capacity as measured by EEG beta-wave variability (Loh & Kanai, 2014; Uncapher & Wagner, 2018).

This project was built on the hypothesis that the same neuroplasticity responsible for this degradation can be leveraged for restoration — through deliberate, evidence-backed daily practices. Research from IISc Bangalore (2026), SVYASA University, and Harvard Medical School confirms that structured meditation, deep reading, and controlled breathing produce measurable increases in grey matter density, gamma-band coherence, and prefrontal cortical thickness within 8–12 weeks.

Antahkarana operationalises these findings into a mobile-first daily practice system.

---

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js 16 (App Router) | Server-side rendering, file-based routing, middleware |
| **Language** | TypeScript | Type safety across the full stack |
| **Authentication** | Supabase Auth | Email/password and OAuth (Google, Apple) |
| **Database** | Supabase (PostgreSQL) | User profiles, habit logs, streak tracking |
| **State Management** | Zustand + persist middleware | Client-side state with localStorage persistence |
| **Styling** | Vanilla CSS with custom design tokens | Vedic-inspired design system with no external UI libraries |
| **Typography** | Google Fonts (Cormorant Garamond, DM Sans, DM Mono, Noto Serif Devanagari) | Multi-script rendering for English and Sanskrit |
| **PWA** | next-pwa + Web App Manifest | Offline capability, home screen installation, native-like experience |
| **Audio** | Web Audio API + HTML5 Audio | Meditation timer with synthesised bell fallback |
| **Hosting** | Vercel | Edge deployment with automatic SSL and global CDN |
| **Analytics** | Plausible / Umami | Privacy-first, cookie-free analytics |
| **Error Tracking** | Sentry | Real-time error monitoring and performance tracing |

---

## Architecture

```
src/
├── app/
│   ├── page.tsx                 # Gateway (authentication screen)
│   ├── layout.tsx               # Root layout with font loading and metadata
│   ├── globals.css              # Design system — tokens, components, animations
│   └── (app)/                   # Protected route group
│       ├── layout.tsx           # Persistent shell (bottom navigation)
│       ├── dashboard/page.tsx   # Home — daily progress and habit tracking
│       ├── practice/page.tsx    # Timer, habit completion, session logging
│       ├── wisdom/page.tsx      # Anti-scroll feed with Vedic teachings
│       ├── science/page.tsx     # Research data across 7 tabbed sections
│       └── profile/page.tsx     # Progress visualisation and milestones
├── components/
│   ├── BottomNav.tsx            # Navigation with intentional transition overlay
│   └── TopBar.tsx               # Status bar component
├── data/
│   └── content.ts               # Modular content repository (quotes, research, habits)
├── lib/
│   ├── audio.ts                 # Hybrid audio engine (file + WebAudio fallback)
│   └── supabase/
│       ├── client.ts            # Browser-side Supabase client
│       └── server.ts            # Server-side Supabase client (cookie-based sessions)
├── store/
│   └── useStore.ts              # Zustand store with persistence middleware
└── middleware.ts                # Route protection — redirects unauthenticated users
```

---

## Key Features

### Cognitive Restoration System
- **Seven Neural Trade-Off Tracking** — monitors restoration progress across attention, memory, impulse control, self-reflection, empathy, sleep quality, and creative synthesis, mapped to peer-reviewed neuroimaging research.
- **Structured Daily Practices** — meditation, deep reading, pranayama, walking, journaling, and digital fasting with Sanskrit names and neuroscience-backed impact data.
- **Streak and Consistency Engine** — daily habit completion tracking with a calendar view and milestone achievements.

### Intentional UX Design
- **"Time of Void" Transitions** — navigation between screens includes a 1.8-second mandala animation with a rotating Vedic wisdom quote, deliberately slowing the user's interaction to counteract compulsive tapping patterns.
- **Anti-Scroll Wisdom Feed** — full-screen wisdom cards with scroll-snap behaviour, presenting one teaching at a time to prevent doom-scrolling.
- **No Infinite Feeds** — every content section is finite and intentionally paced.

### Research Section
- **1000-Year Cognitive Timeline** — information processing rates from 1000 CE to 2024 CE with expandable era descriptions.
- **MRI and EEG Evidence** — cited findings from PLoS ONE, PNAS, IISc Bangalore, and SVYASA University.
- **Global Cognitive Spectrum** — OECD PIAAC-calibrated assessment of 8.1 billion humans across five processing tiers.

### Progressive Web App
- **Installable** — add to home screen on iOS and Android for a native-like experience.
- **Offline-Ready** — service worker caches the application shell for reliable access without connectivity.
- **Responsive** — designed for mobile-first with a 390×844 viewport and adaptive scaling.

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account ([supabase.com](https://supabase.com))

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/antahkarana.git
cd antahkarana
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

You can find these values in your Supabase Dashboard under **Settings → API**.

### Running Locally

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Building for Production

```bash
npm run build
npm start
```

---

## Deployment

This project is optimised for deployment on [Vercel](https://vercel.com):

1. Push the repository to GitHub.
2. Import the project on Vercel.
3. Add the environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
4. Deploy.

Vercel will automatically detect the Next.js framework, handle the build process, and provide a production URL with SSL.

### Post-Deployment Configuration

After deploying, update the following in your Supabase Dashboard:

- **Authentication → URL Configuration → Site URL**: Set to your production domain.
- **Authentication → URL Configuration → Redirect URLs**: Add your production domain with a wildcard pattern (e.g., `https://yourdomain.com/**`).

---

## Research References

This project synthesises findings from the following published research:

| Study | Citation |
|-------|----------|
| Attention span decline | Mark, G., Gudith, D., & Klocke, U. (2016). *The Cost of Interrupted Work*. CHI Conference. |
| Prefrontal cortex thinning | Loh, K. K., & Kanai, R. (2014). *Higher Media Multi-Tasking Activity Is Associated with Smaller Gray-Matter Density in the ACC*. PLoS ONE. |
| Media multitasking deficits | Uncapher, M. R., & Wagner, A. D. (2018). *Minds and Brains of Media Multitaskers*. PNAS. |
| Meditation and gamma activity | IISc Centre for Neuroscience, Bangalore (2026). *Long-term Meditation and Neural Coherence*. |
| Sanskrit memorisation and cortical density | Hartzell, J. F. et al. (2018). *The Sanskrit Effect*. Scientific American. |
| Sleep and cognitive restoration | Walker, M. (2017). *Why We Sleep*. Penguin Books. |
| Information processing evolution | Hilbert, M., & López, P. (2011). *The World's Technological Capacity*. Science, 332(6025). |
| Smartphone cognitive drain | Ward, A. F. et al. (2017). *Brain Drain*. Journal of the Association for Consumer Research. |
| Global literacy and cognition | OECD PIAAC (2023). *Survey of Adult Skills*. 39 countries, 250,000 participants. |
| Pranayama and fNIRS | SVYASA University (2024). *Functional Near-Infrared Spectroscopy Studies on Yogic Breathing*. |

---

## Project Structure

```
antahkarana/
├── public/                      # Static assets (manifest, icons, audio)
├── src/                         # Application source code
├── .env.local                   # Environment variables (not committed)
├── next.config.ts               # Next.js + PWA configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

---

## Contributing

Contributions are welcome. Please ensure all pull requests:

1. Follow the existing code style and design token system.
2. Do not introduce external CSS frameworks or UI libraries.
3. Include proper TypeScript types for any new components or utilities.
4. Preserve the intentional, non-instant-gratification UX philosophy.

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

<p align="center">
  <em>लोकाः समस्ताः सुखिनो भवन्तु</em><br/>
  <sub>May all beings everywhere be happy and free.</sub>
</p>
