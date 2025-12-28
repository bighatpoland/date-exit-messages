# Oh No, Emergency! 💥

A mobile-first web app to simulate incoming emergency messages, helping you politely exit awkward dates. **This is purely fictional and for entertainment purposes only.**

[![CI](https://github.com/bighatpoland/date-exit-messages/actions/workflows/ci.yml/badge.svg)](https://github.com/bighatpoland/date-exit-messages/actions/workflows/ci.yml)

## Concept

For: people on bad dates who need a socially acceptable escape without committing to full dishonesty themselves.

Core idea: The app sends alarming, semi-plausible emergency messages on demand or automatically, allowing the user to say: “Oh my God… I’m so sorry, I have to go.” The app becomes the villain. The user remains polite.

How it works (absurdly simple): User sets a “date session”, chooses relationship (mom/dog/roommate/boss/plant sitter), severity level, taps PANIC, receives an incoming message that looks urgent and disruptive.

Why this is absurd but needed: Everyone lies on bad dates. People hate being the bad person. This externalizes guilt into software. It’s a lie-as-a-service app — beautifully uncomfortable.

Narrow target group: serial first-daters, conflict-avoidant people, people too polite to leave, people who rehearse exits in the bathroom.

## Features

- **Mobile-First Design:** Optimized for phones with large, easy-to-tap buttons.
- **Customizable Scenarios:** 15+ pre-built templates (mild, dramatic, nuclear) with placeholders for personalization.
- **Instant or Scheduled Messages:** Panic button for immediate triggers or set delays (minutes).
- **Realistic UI:** Messages display like chat bubbles with sender, timestamp, and body.
- **Persistence:** Sessions and history saved in localStorage; countdowns resume on page reload.
- **Post-Escape Scripts:** Suggested responses to say after triggering.
- **History View:** Review past messages.
- **Plausibility Slider:** Choose message severity (Believable, Dramatic, Nuclear Exit).

## Tech Stack

- **Frontend:** React 18, TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Testing:** Vitest + @testing-library/react
- **Deployment:** Static site (e.g., GitHub Pages, Vercel)

## Prerequisites

- Node.js (v18 or later) and npm (comes with Node)
- Git

## Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/bighatpoland/date-exit-messages.git
   cd date-exit-messages
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the dev server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

Quick setup script (installs deps, checks types, runs tests):
```bash
chmod +x ./setup.sh
./setup.sh
```

## Usage

1. **Setup Session:** Choose a scenario, sender, severity, and delivery mode (instant or scheduled).
2. **Activate:** Tap "Start Session" to enter active mode.
3. **Panic:** Hit the big red PANIC button for an immediate message, or wait for scheduled triggers.
4. **Respond:** Use suggested scripts to exit gracefully.
5. **History:** View past messages in the History tab.

### Example Scenarios
- **Dog Sick:** "Milo's thrown up — can you come?"
- **Plumber Disaster:** "Burst pipe flooding the flat. Need help now."
- **Work Call:** "Emergency with a client — must handle this."

## Development

- **Build:** `npm run build`
- **Preview:** `npm run preview`
- **Lint/Typecheck:** `npx tsc --noEmit`
- **Tests:** `npm run test`

### Project Structure
```
src/
├── components/     # React components (Home, Session, etc.)
├── data/           # Templates and seed data
├── types.ts        # TypeScript interfaces
├── utils/          # Helper functions
└── __tests__/      # Unit tests
```

## Testing

Run tests with Vitest:
```bash
npm run test
```

Tests cover:
- Template placeholder replacement
- Message generation logic
- Basic component rendering

## Contributing

Contributions welcome! Please:
1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Ensure tests pass and add new tests for features.

## License

MIT License - see [LICENSE](LICENSE) file.

## Disclaimer

This app is a joke/tool for fun and awkward situations. It simulates messages but has no real communication capabilities. Do not rely on it for emergencies. The creators are not responsible for misuse. Stay safe!
