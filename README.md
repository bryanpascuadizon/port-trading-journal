# 📈 Trading Journal App

A clean and simple web-based Trading Journal to help traders track and analyze their performance. Record trades with details like symbol, entry/exit, position type, lot size, P&L, and upload screenshots for each trade.

---

## 🚀 Features

- Add trade entries (Symbol, Entry, Exit, Date, Lot size, etc.)
- Select position type (Long or Short)
- Upload trade screenshots
- Secure user authentication
- Clean, modern UI using Tailwind CSS and shadcn/ui
- Image storage using Cloudinary

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
- **Auth**: Custom authentication or [NextAuth.js](https://next-auth.js.org/) *(depending on your setup)*
- **Database**: PostgreSQL via [Prisma](https://www.prisma.io/) *(optional)*
- **Image Storage**: [Cloudinary](https://cloudinary.com/)

---

## 📦 Getting Started

```bash
# Clone the repository
git clone https://github.com/bryapascuadizon/trading-journal.git
cd trading-journal

# Install dependencies
npm install

# Start the dev server
npm run dev
