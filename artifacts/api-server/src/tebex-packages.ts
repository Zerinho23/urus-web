/**
 * Mapeo de productos de la tienda a IDs de paquetes de Tebex.
 *
 * CÓMO LLENAR ESTO:
 * 1. Entra a https://creator.tebex.io → tu tienda → Packages
 * 2. Crea un paquete por cada fila (nombre sugerido = la key de abajo)
 * 3. Copia el ID numérico de cada paquete y reemplaza el 0 correspondiente
 *
 * El ID aparece en la URL al editar el paquete:
 *   https://creator.tebex.io/packages/XXXXXXX/edit
 *
 * Mientras el ID sea 0, ese producto se saltará en el checkout de Tebex.
 */
export const TEBEX_PACKAGES: Record<string, number> = {
  // ── Panel Xtreme ──────────────────────────────────────────────────────────
  "Panel Xtreme — 7 días":   0,
  "Panel Xtreme — 14 días":  0,
  "Panel Xtreme — 30 días":  0,
  "Panel Xtreme — 60 días":  0,
  "Panel Xtreme — 90 días":  0,
  "Panel Xtreme — 365 días": 0,

  // ── Panel Supreme ─────────────────────────────────────────────────────────
  "Panel Supreme — 7 días":   0,
  "Panel Supreme — 14 días":  0,
  "Panel Supreme — 30 días":  0,
  "Panel Supreme — 60 días":  0,
  "Panel Supreme — 90 días":  0,
  "Panel Supreme — 365 días": 0,

  // ── Panel Básico ──────────────────────────────────────────────────────────
  "Panel Básico — 3 días":  0,
  "Panel Básico — 7 días":  0,
  "Panel Básico — 14 días": 0,
  "Panel Básico — 30 días": 0,
  "Panel Básico — 60 días": 0,

  // ── Emulador Competitivo ──────────────────────────────────────────────────
  "Emulador Competitivo — 1 mes":    0,
  "Emulador Competitivo — 2 meses":  0,

  // ── Chams ESP ─────────────────────────────────────────────────────────────
  "Chams ESP — 1 día":   0,
  "Chams ESP — 3 días":  0,
  "Chams ESP — 7 días":  0,
  "Chams ESP — 15 días": 0,
  "Chams ESP — 1 mes":   0,

  // ── Bypass APK ────────────────────────────────────────────────────────────
  "Bypass APK — 1 día":    7531342,
  "Bypass APK — 7 días":   0,
  "Bypass APK — 30 días":  0,
  "Bypass APK — 90 días":  0,
  "Bypass APK — 180 días": 0,
  "Bypass APK — 360 días": 0,

  // ── Bypass UID ────────────────────────────────────────────────────────────
  "Bypass UID — 7 días":   0,
  "Bypass UID — 30 días":  0,
  "Bypass UID — 90 días":  0,
  "Bypass UID — 180 días": 0,
  "Bypass UID — 360 días": 0,

  // ── Bypass Tela ───────────────────────────────────────────────────────────
  "Bypass Tela — 7 días":  0,
  "Bypass Tela — 30 días": 0,

  // ── Bypass Panel ──────────────────────────────────────────────────────────
  "Bypass Panel — 7 días":   0,
  "Bypass Panel — 30 días":  0,
  "Bypass Panel — 90 días":  0,
  "Bypass Panel — 180 días": 0,
  "Bypass Panel — 360 días": 0,

  // ── Panel iOS ─────────────────────────────────────────────────────────────
  "Panel iOS — 1 día":   0,
  "Panel iOS — 7 días":  0,
  "Panel iOS — 15 días": 0,
  "Panel iOS — 30 días": 0,
  "Panel iOS — 60 días": 0,

  // ── Panel Undetected ──────────────────────────────────────────────────────
  "Panel Undetected — 7 días":  0,
  "Panel Undetected — 30 días": 0,

  // ── Panel Blood Supreme ───────────────────────────────────────────────────
  "Panel Blood Supreme — 7 días":  0,
  "Panel Blood Supreme — 15 días": 0,
  "Panel Blood Supreme — 30 días": 0,

  // ── Panel Blood Private ───────────────────────────────────────────────────
  "Panel Blood Private — 7 días":  0,
  "Panel Blood Private — 14 días": 0,
  "Panel Blood Private — 30 días": 0,
};
