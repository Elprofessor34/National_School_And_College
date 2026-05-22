# National School And College — Admin Portal

A private student management web app for National School And College.

## Features

- Up to 500+ students across 13 classes (Play through Class Ten)
- Student photos
- Monthly tuition, session fee, and 3 term exam fees tracking
- Classwise and master CSV exports for Google Sheets
- Password-protected admin access
- Year-end class promotion tool

## Important — where your data lives

All data is stored in your browser (IndexedDB) on whatever device you sign in from. Data on one device is separate from another device. If you clear browser data, you lose your records.

**Always export CSV backups regularly** from the Export tab.

## Local development

```
npm install
npm run dev
```

Then visit http://localhost:5173

## Production build

```
npm run build
```

Output goes to the `dist/` folder.

## Deployment

Auto-deployed via Vercel on every push to the main branch.
