import { useState } from "react";
import { MapPin, ChevronLeft, Navigation, Clock, Phone } from "lucide-react";

// ============================================================
//  ДАННЫЕ МАГАЗИНОВ
//  Заменяй name / address / hours / phone на реальные.
//  gis2 — точная ссылка 2ГИС (уже проставлена).
//  yandex — сгенерирована из координат в ссылке 2ГИС.
// ============================================================
const CITIES = [
  {
    id: "almaty",
    name: "Алматы",
    stores: [
      { name: "EuroMebel — салон 1", address: "Адрес уточняется", hours: "10:00–20:00", phone: "+7 ___ ___ __ __", gis2: "https://2gis.kz/almaty/directions/points/%7C76.947921%2C43.272017%3B9429940000794200", yandex: "https://yandex.kz/maps/?pt=76.947921,43.272017&z=17&l=map" },
      { name: "EuroMebel — салон 2", address: "Адрес уточняется", hours: "10:00–20:00", phone: "+7 ___ ___ __ __", gis2: "https://2gis.kz/almaty/directions/points/%7C76.846899%2C43.236801%3B70000001045037426", yandex: "https://yandex.kz/maps/?pt=76.846899,43.236801&z=17&l=map" },
      { name: "EuroMebel — салон 3", address: "Адрес уточняется", hours: "10:00–20:00", phone: "+7 ___ ___ __ __", gis2: "https://2gis.kz/almaty/directions/points/%7C76.864492%2C43.367372%3B70000001089820228", yandex: "https://yandex.kz/maps/?pt=76.864492,43.367372&z=17&l=map" },
      { name: "EuroMebel — салон 4", address: "Адрес уточняется", hours: "10:00–20:00", phone: "+7 ___ ___ __ __", gis2: "https://2gis.kz/almaty/directions/points/%7C77.024235%2C43.315395%3B70000001080894442?m=76.970079%2C43.2778%2F12", yandex: "https://yandex.kz/maps/?pt=77.024235,43.315395&z=17&l=map" },
    ],
  },
  {
    id: "shymkent",
    name: "Шымкент",
    stores: [
      { name: "EuroMebel — салон 1", address: "Адрес уточняется", hours: "10:00–20:00", phone: "+7 ___ ___ __ __", gis2: "https://2gis.kz/shymkent/directions/points/%7C69.636013%2C42.340015%3B70000001079860196", yandex: "https://yandex.kz/maps/?pt=69.636013,42.340015&z=17&l=map" },
      { name: "EuroMebel — салон 2", address: "Адрес уточняется", hours: "10:00–20:00", phone: "+7 ___ ___ __ __", gis2: "https://2gis.kz/shymkent/directions/points/%7C69.574046%2C42.327987%3B70000001025997338", yandex: "https://yandex.kz/maps/?pt=69.574046,42.327987&z=17&l=map" },
      { name: "EuroMebel — салон 3", address: "Адрес уточняется", hours: "10:00–20:00", phone: "+7 ___ ___ __ __", gis2: "https://2gis.kz/shymkent/directions/points/%7C69.619349%2C42.312969%3B70000001026034551", yandex: "https://yandex.kz/maps/?pt=69.619349,42.312969&z=17&l=map" },
    ],
  },
  {
    id: "taraz",
    name: "Тараз",
    stores: [
      { name: "EuroMebel — салон 1", address: "Адрес уточняется", hours: "10:00–20:00", phone: "+7 ___ ___ __ __", gis2: "https://2gis.kz/taraz/directions/points/%7C71.384395%2C42.90616%3B70000001056624135", yandex: "https://yandex.kz/maps/?pt=71.384395,42.90616&z=17&l=map" },
      { name: "EuroMebel — салон 2", address: "Адрес уточняется", hours: "10:00–20:00", phone: "+7 ___ ___ __ __", gis2: "https://2gis.kz/taraz/directions/points/%7C71.327099%2C42.898945%3B70000001051490947", yandex: "https://yandex.kz/maps/?pt=71.327099,42.898945&z=17&l=map" },
      { name: "EuroMebel — салон 3", address: "Адрес уточняется", hours: "10:00–20:00", phone: "+7 ___ ___ __ __", gis2: "https://2gis.kz/taraz/directions/points/%7C71.345125%2C42.891276%3B70000001051838330", yandex: "https://yandex.kz/maps/?pt=71.345125,42.891276&z=17&l=map" },
    ],
  },
  {
    id: "taldykorgan",
    name: "Талдыкорган",
    stores: [
      { name: "EuroMebel — салон 1", address: "Адрес уточняется", hours: "10:00–20:00", phone: "+7 ___ ___ __ __", gis2: "https://2gis.kz/almaty/directions/points/%7C78.377306%2C45.022941%3B70000001060004741?m=78.389274%2C45.014107%2F13.86", yandex: "https://yandex.kz/maps/?pt=78.377306,45.022941&z=17&l=map" },
      { name: "EuroMebel — салон 2", address: "Адрес уточняется", hours: "10:00–20:00", phone: "+7 ___ ___ __ __", gis2: "https://2gis.kz/almaty/directions/points/%7C78.382838%2C45.021118%3B70000001080354344?m=78.405207%2C45.026033%2F13.05", yandex: "https://yandex.kz/maps/?pt=78.382838,45.021118&z=17&l=map" },
    ],
  },
  {
    id: "ust-kamenogorsk",
    name: "Усть-Каменогорск",
    stores: [
      { name: "EuroMebel — салон 1", address: "Адрес уточняется", hours: "10:00–20:00", phone: "+7 ___ ___ __ __", gis2: "https://2gis.kz/ust-kamenogorsk/directions/points/%7C82.580606%2C49.965494%3B70000001028389877", yandex: "https://yandex.kz/maps/?pt=82.580606,49.965494&z=17&l=map" },
      { name: "EuroMebel — салон 2", address: "Адрес уточняется", hours: "10:00–20:00", phone: "+7 ___ ___ __ __", gis2: "https://2gis.kz/ust-kamenogorsk/directions/points/%7C82.634662%2C49.960886%3B12807639721343631", yandex: "https://yandex.kz/maps/?pt=82.634662,49.960886&z=17&l=map" },
    ],
  },
];

const LOGO = "data:image/png;base64,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";
const BRAND = "#0055A4";   // синий EuroMebel — основной акцент (кнопки, иконки)
const BRAND_RED = "#E30613"; // красный EuroMebel

export default function App() {
  const [cityId, setCityId] = useState(null);
  const city = CITIES.find((c) => c.id === cityId);

  return (
    <div style={{ minHeight: "100vh", background: "#f4f6f9", display: "flex", justifyContent: "center", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ width: "100%", maxWidth: 460, padding: "28px 18px 48px" }}>
        {/* Шапка */}
        <div style={{
          background: "#fff", borderRadius: 18, padding: "22px 20px 18px",
          textAlign: "center", marginBottom: 26,
          border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(20,50,90,0.05)",
        }}>
          <img
            src={LOGO}
            alt="EuroMebel"
            style={{ height: 44, width: "auto", display: "inline-block" }}
          />
          <div style={{ fontSize: 12.5, color: "#7a8494", marginTop: 10, textTransform: "uppercase", letterSpacing: "0.14em" }}>
            Мебельные салоны
          </div>
        </div>

        {!city ? (
          // ---------- ЭКРАН 1: ГОРОДА ----------
          <div>
            <p style={{ textAlign: "center", fontSize: 15, color: "#5a6675", marginBottom: 20 }}>
              Выберите город
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {CITIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCityId(c.id)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16,
                    padding: "18px 20px", cursor: "pointer", textAlign: "left",
                    boxShadow: "0 1px 3px rgba(20,50,90,0.05)", transition: "transform .1s, box-shadow .15s",
                  }}
                  onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.985)")}
                  onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <MapPin size={20} color={BRAND} />
                    <span style={{ fontSize: 17, fontWeight: 600, color: "#1e2530" }}>{c.name}</span>
                  </span>
                  <span style={{ fontSize: 13, color: "#94a0b0", fontWeight: 500 }}>
                    {c.stores.length} {plural(c.stores.length)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          // ---------- ЭКРАН 2: МАГАЗИНЫ ----------
          <div>
            <button
              onClick={() => setCityId(null)}
              style={{
                display: "flex", alignItems: "center", gap: 4, background: "none",
                border: "none", cursor: "pointer", color: BRAND, fontSize: 14,
                fontWeight: 600, marginBottom: 18, padding: "4px 0",
              }}
            >
              <ChevronLeft size={18} /> Все города
            </button>

            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1e2530", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 4, height: 22, background: BRAND_RED, borderRadius: 2, display: "inline-block" }} />
              {city.name}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {city.stores.map((s, i) => (
                <div
                  key={i}
                  style={{
                    background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16,
                    padding: 18, boxShadow: "0 1px 3px rgba(20,50,90,0.05)",
                  }}
                >
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#1e2530", marginBottom: 8 }}>
                    {s.name}
                  </div>
                  <Row icon={<MapPin size={15} />} text={s.address} />
                  <Row icon={<Clock size={15} />} text={s.hours} />
                  <Row icon={<Phone size={15} />} text={s.phone} />

                  <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                    <MapBtn href={s.gis2} label="2ГИС" filled />
                    <MapBtn href={s.yandex} label="Яндекс.Карты" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: 36, fontSize: 12, color: "#a0abbb" }}>
          © EuroMebel · euromebel.kz
        </div>
      </div>
    </div>
  );
}

function Row({ icon, text }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#5a6675", fontSize: 13.5, marginTop: 3 }}>
      <span style={{ color: "#a0abbb", display: "flex" }}>{icon}</span>
      <span>{text}</span>
    </div>
  );
}

function MapBtn({ href, label, filled }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
        padding: "11px 8px", borderRadius: 12, fontSize: 14, fontWeight: 600,
        textDecoration: "none", cursor: "pointer",
        background: filled ? BRAND : "#fff",
        color: filled ? "#fff" : BRAND,
        border: filled ? "none" : `1.5px solid ${BRAND}`,
      }}
    >
      <Navigation size={15} /> {label}
    </a>
  );
}

function plural(n) {
  const a = Math.abs(n) % 100, b = n % 10;
  if (a > 10 && a < 20) return "салонов";
  if (b > 1 && b < 5) return "салона";
  if (b === 1) return "салон";
  return "салонов";
}
