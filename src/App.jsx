import React, { useState, useMemo } from "react";
import { Search, MapPin, Star, CheckCircle2, X, Plus, Phone, Video, User, Globe2, Navigation } from "lucide-react";

const GROUPS = [
  { id: "health", label: "Health", cats: [
    { id: "doctor", label: "Doctor" },
    { id: "nurse", label: "Nurse" },
    { id: "dentist", label: "Dentist" },
    { id: "therapist", label: "Therapist / Counselor" },
    { id: "physio", label: "Physiotherapist" },
    { id: "pharmacist", label: "Pharmacist" },
    { id: "optometrist", label: "Optometrist" },
  ]},
  { id: "home", label: "Home Services", cats: [
    { id: "plumber", label: "Plumber" },
    { id: "electric", label: "Electrician" },
    { id: "clean", label: "Cleaner" },
    { id: "carpenter", label: "Carpenter" },
    { id: "painter", label: "Painter" },
    { id: "gardener", label: "Gardener / Landscaper" },
    { id: "pest", label: "Pest Control" },
    { id: "acrepair", label: "AC / Appliance Repair" },
    { id: "locksmith", label: "Locksmith" },
    { id: "mover", label: "Mover / Logistics" },
  ]},
  { id: "beauty", label: "Beauty & Grooming", cats: [
    { id: "hair", label: "Hairdresser" },
    { id: "barber", label: "Barber" },
    { id: "makeup", label: "Makeup Artist" },
    { id: "nails", label: "Nail Technician" },
    { id: "spa", label: "Massage / Spa Therapist" },
    { id: "tattoo", label: "Tattoo Artist" },
  ]},
  { id: "food", label: "Food & Catering", cats: [
    { id: "chef", label: "Chef / Caterer" },
    { id: "baker", label: "Baker" },
    { id: "bartender", label: "Bartender" },
  ]},
  { id: "events", label: "Events", cats: [
    { id: "event", label: "Event Planner" },
    { id: "photo", label: "Photographer" },
    { id: "video", label: "Videographer" },
    { id: "dj", label: "DJ" },
    { id: "mc", label: "MC / Host" },
    { id: "decor", label: "Decorator" },
  ]},
  { id: "fashion", label: "Fashion", cats: [
    { id: "tailor", label: "Tailor" },
    { id: "designer", label: "Fashion Designer" },
    { id: "cobbler", label: "Shoemaker / Cobbler" },
  ]},
  { id: "education", label: "Education & Training", cats: [
    { id: "tutor", label: "Tutor" },
    { id: "musicteacher", label: "Music Teacher" },
    { id: "driving", label: "Driving Instructor" },
    { id: "language", label: "Language Teacher" },
  ]},
  { id: "professional", label: "Professional Services", cats: [
    { id: "lawyer", label: "Lawyer" },
    { id: "accountant", label: "Accountant" },
    { id: "consultant", label: "Business Consultant" },
    { id: "translator", label: "Translator / Interpreter" },
    { id: "webdev", label: "Web Developer" },
    { id: "graphicdesign", label: "Graphic Designer" },
  ]},
  { id: "auto", label: "Automotive", cats: [
    { id: "mechanic", label: "Mechanic" },
    { id: "detailer", label: "Car Detailer" },
    { id: "driver", label: "Driver / Chauffeur" },
  ]},
  { id: "childcare", label: "Childcare & Family", cats: [
    { id: "babysitter", label: "Babysitter" },
    { id: "nanny", label: "Nanny" },
    { id: "caregiver", label: "Elderly Caregiver" },
  ]},
  { id: "pets", label: "Pet Care", cats: [
    { id: "petgroom", label: "Pet Groomer" },
    { id: "dogwalker", label: "Dog Walker" },
    { id: "vet", label: "Veterinarian" },
  ]},
  { id: "fitness", label: "Fitness & Wellness", cats: [
    { id: "trainer", label: "Personal Trainer" },
    { id: "yoga", label: "Yoga Instructor" },
    { id: "nutritionist", label: "Nutritionist" },
  ]},
  { id: "security", label: "Security", cats: [
    { id: "guard", label: "Security Guard" },
    { id: "bodyguard", label: "Bodyguard" },
  ]},
];

const CAT_INDEX = {};
GROUPS.forEach((g) => g.cats.forEach((c) => { CAT_INDEX[c.id] = { ...c, group: g.id, groupLabel: g.label }; }));

const COUNTRIES = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Argentina","Armenia","Australia","Austria","Azerbaijan",
  "Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia",
  "Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia","Cameroon",
  "Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo (DRC)","Congo (Republic)","Costa Rica",
  "Croatia","Cuba","Cyprus","Czechia","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt",
  "El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France","Gabon",
  "Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana",
  "Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel",
  "Italy","Ivory Coast","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait",
  "Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg",
  "Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico",
  "Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru",
  "Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia","Norway","Oman",
  "Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal",
  "Qatar","Romania","Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe",
  "Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia",
  "South Africa","South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria",
  "Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey",
  "Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu",
  "Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe",
];

const SEED_VENDORS = [
  { id: 1, name: "Amaka's Braids & Weave", cat: "hair", country: "Nigeria", city: "Lagos", area: "", address: "14 Adeniran Ogunsanya St, Surulere", price: 8000, priceMax: 25000, currency: "₦", rating: 4.8, jobs: 132, verified: true, phone: "2348012345601", modes: ["in-person"], blurb: "Specialist in knotless braids and weave installs." },
  { id: 2, name: "Chef Tunde Kitchen", cat: "chef", country: "Nigeria", city: "Lagos", area: "", address: "22 Admiralty Way, Lekki Phase 1", price: 15000, priceMax: 120000, currency: "₦", rating: 4.9, jobs: 87, verified: true, phone: "2348012345602", modes: ["in-person", "video"], blurb: "Small chops, jollof for parties, and private chef service." },
  { id: 3, name: "Bella Events Co.", cat: "event", country: "Nigeria", city: "Abuja", area: "", address: "Plot 5, Aminu Kano Crescent, Wuse 2", price: 100000, priceMax: 2000000, currency: "₦", rating: 4.6, jobs: 41, verified: true, phone: "2348012345603", modes: ["in-person", "video"], blurb: "Weddings, birthdays, and corporate events, full planning." },
  { id: 4, name: "Dr. Ifeoma Nwosu", cat: "doctor", country: "Nigeria", city: "Lagos", area: "", address: "8 Isaac John St, Ikeja GRA", price: 10000, priceMax: 30000, currency: "₦", rating: 4.9, jobs: 210, verified: true, phone: "2348012345604", modes: ["in-person", "video"], blurb: "General practitioner, home visits and telemedicine." },
  { id: 5, name: "Okon Stitch House", cat: "tailor", country: "Nigeria", city: "Port Harcourt", area: "", address: "3 Aba Road, GRA Phase 2", price: 12000, priceMax: 60000, currency: "₦", rating: 4.7, jobs: 98, verified: false, phone: "2348012345605", modes: ["in-person"], blurb: "Native wear, suits, and corporate uniforms." },
  { id: 6, name: "Lens by Sade", cat: "photo", country: "Nigeria", city: "Lagos", area: "", address: "45 Herbert Macaulay Way, Yaba", price: 30000, priceMax: 250000, currency: "₦", rating: 4.8, jobs: 65, verified: true, phone: "2348012345606", modes: ["in-person"], blurb: "Weddings, portraits, and product photography." },
  { id: 7, name: "FixIt Plumbing Services", cat: "plumber", country: "Nigeria", city: "Ibadan", area: "", address: "12 Awolowo Ave, Bodija", price: 5000, priceMax: 40000, currency: "₦", rating: 4.5, jobs: 150, verified: true, phone: "2348012345607", modes: ["in-person"], blurb: "Leak repairs, pipe installs, borehole plumbing." },
  { id: 8, name: "Emeka Electricals", cat: "electric", country: "Nigeria", city: "Lagos", area: "", address: "6 Ado Rd, Ajah", price: 6000, priceMax: 80000, currency: "₦", rating: 4.6, jobs: 173, verified: true, phone: "2348012345608", modes: ["in-person"], blurb: "Wiring, inverter install, and fault diagnosis." },
  { id: 9, name: "SparkleHome Cleaners", cat: "clean", country: "Nigeria", city: "Abuja", area: "", address: "19 Gwarinpa Estate Rd, Gwarinpa", price: 8000, priceMax: 35000, currency: "₦", rating: 4.4, jobs: 60, verified: false, phone: "2348012345609", modes: ["in-person"], blurb: "Deep cleaning, post-construction, and move-in cleaning." },
  { id: 10, name: "Glow by Tobi", cat: "makeup", country: "Nigeria", city: "Lagos", area: "", address: "31 Ikorodu Rd, Ikorodu", price: 10000, priceMax: 50000, currency: "₦", rating: 4.9, jobs: 120, verified: true, phone: "2348012345610", modes: ["in-person"], blurb: "Bridal makeup, gele tying, and photoshoot glam." },
  { id: 11, name: "Peju's Kitchen", cat: "chef", country: "Nigeria", city: "Enugu", area: "", address: "7 Presidential Rd, Independence Layout", price: 10000, priceMax: 90000, currency: "₦", rating: 4.7, jobs: 54, verified: false, phone: "2348012345611", modes: ["in-person"], blurb: "Continental and local dishes for events, small or large." },
  { id: 12, name: "Mide Braids Studio", cat: "hair", country: "Nigeria", city: "Abuja", area: "", address: "10 Aminu Kano Crescent, Garki", price: 7000, priceMax: 20000, currency: "₦", rating: 4.6, jobs: 76, verified: true, phone: "2348012345612", modes: ["in-person"], blurb: "Cornrows, faux locs, kids styling." },
  { id: 13, name: "James Okoro Home Nursing", cat: "nurse", country: "United Kingdom", city: "London", area: "", address: "88 Rye Lane, Peckham", price: 40, priceMax: 90, currency: "£", rating: 4.8, jobs: 58, verified: true, phone: "447012345601", modes: ["in-person", "video"], blurb: "Home nursing care and wound dressing for the diaspora community." },
  { id: 14, name: "Adaeze Style Studio", cat: "makeup", country: "United Kingdom", city: "London", area: "", address: "88 Rye Lane, Peckham", price: 60, priceMax: 200, currency: "£", rating: 4.9, jobs: 74, verified: true, phone: "447012345602", modes: ["in-person"], blurb: "Bridal and gele styling for African weddings across London." },
  { id: 15, name: "Accra Bites Catering", cat: "chef", country: "Ghana", city: "Accra", area: "", address: "2 Lagos Ave, East Legon", price: 300, priceMax: 3000, currency: "GH₵", rating: 4.7, jobs: 39, verified: true, phone: "233201234501", modes: ["in-person"], blurb: "Jollof, waakye, and party catering across Accra." },
  { id: 16, name: "NYC Naija Doctor", cat: "doctor", country: "United States", city: "New York", area: "", address: "1050 Grand Concourse, The Bronx", price: 80, priceMax: 180, currency: "$", rating: 4.8, jobs: 112, verified: true, phone: "12125550101", modes: ["in-person", "video"], blurb: "Primary care and telehealth for the Nigerian community in NYC." },
  { id: 17, name: "Toronto Tots Nanny Agency", cat: "nanny", country: "Canada", city: "Toronto", area: "", address: "40 Ellesmere Rd, Scarborough", price: 25, priceMax: 40, currency: "$", rating: 4.7, jobs: 46, verified: true, phone: "14165550102", modes: ["in-person"], blurb: "Vetted nannies for African and Caribbean families in the GTA." },
  { id: 18, name: "Dubai Deluxe Detailing", cat: "detailer", country: "United Arab Emirates", city: "Dubai", area: "", address: "Warehouse 7, Al Quoz Industrial Area 3", price: 150, priceMax: 600, currency: "AED", rating: 4.8, jobs: 91, verified: true, phone: "971501234501", modes: ["in-person"], blurb: "Full car detailing, ceramic coating, and mobile wash service." },
  { id: 19, name: "Nairobi Fit Coach", cat: "trainer", country: "Kenya", city: "Nairobi", area: "", address: "Ring Rd, Kilimani", price: 1500, priceMax: 5000, currency: "KSh", rating: 4.6, jobs: 68, verified: true, phone: "254701234501", modes: ["in-person", "video"], blurb: "In-person and online personal training and nutrition coaching." },
  { id: 20, name: "Joburg Legal Associates", cat: "lawyer", country: "South Africa", city: "Johannesburg", area: "", address: "14 5th St, Sandton", price: 800, priceMax: 5000, currency: "R", rating: 4.9, jobs: 30, verified: true, phone: "27821234501", modes: ["in-person", "video"], blurb: "Immigration, family, and small business law." },
];

function money(currency, n) {
  return (currency || "") + n.toLocaleString("en-US");
}

function PriceTag({ currency, min }) {
  return (
    <div className="price-tag">
      <span className="price-tag-label">from</span>
      <span className="price-tag-value">{money(currency, min)}</span>
    </div>
  );
}

function VendorCard({ v, onOpen }) {
  const cat = CAT_INDEX[v.cat];
  return (
    <button className="vendor-card" onClick={() => onOpen(v)}>
      <div className="vendor-card-top">
        <div>
          <div className="vendor-name-row">
            <h3>{v.name}</h3>
            {v.verified && <CheckCircle2 size={15} className="verified-icon" aria-label="Verified" />}
          </div>
          <p className="vendor-cat">{cat?.groupLabel} · {cat?.label}</p>
        </div>
        <PriceTag currency={v.currency} min={v.price} />
      </div>
      <p className="vendor-blurb">{v.blurb}</p>
      <div className="vendor-meta">
        <span className="meta-item"><MapPin size={13} /> {v.address ? `${v.address}, ` : ""}{v.city}, {v.country}</span>
        <span className="meta-item"><Star size={13} className="star" /> {v.rating} ({v.jobs} jobs)</span>
      </div>
      {v.modes?.includes("video") && (
        <span className="video-badge"><Video size={12} /> Video call available</span>
      )}
    </button>
  );
}

function VendorModal({ v, onClose }) {
  const [mode, setMode] = useState(null);
  if (!v) return null;
  const cat = CAT_INDEX[v.cat];
  const modes = v.modes || ["in-person"];
  const selectedMode = mode || modes[0];
  const waMessage = encodeURIComponent(
    selectedMode === "video"
      ? `Hi ${v.name}, I found you on SADO and would like to book a video call.`
      : `Hi ${v.name}, I found you on SADO and would like an in-person booking.`
  );
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close"><X size={18} /></button>
        <p className="modal-eyebrow">{cat?.groupLabel} · {cat?.label} · {v.area}, {v.city}, {v.country}</p>
        <div className="vendor-name-row">
          <h2>{v.name}</h2>
          {v.verified && <CheckCircle2 size={18} className="verified-icon" />}
        </div>
        <p className="modal-blurb">{v.blurb}</p>
        {v.address && (
          <div className="address-row">
            <MapPin size={14} className="address-icon" />
            <span>{v.address}, {v.city}, {v.country}</span>
          </div>
        )}
        <div className="modal-stats">
          <div><span className="stat-value">{money(v.currency, v.price)}–{money(v.currency, v.priceMax)}</span><span className="stat-label">price range</span></div>
          <div><span className="stat-value">{v.rating} ★</span><span className="stat-label">{v.jobs} jobs done</span></div>
        </div>

        <p className="field-label">How would you like to meet?</p>
        <div className="mode-row">
          <button type="button" className={`mode-btn ${selectedMode === "in-person" ? "active" : ""}`} onClick={() => setMode("in-person")}>
            <User size={15} /> In person
          </button>
          <button
            type="button"
            className={`mode-btn ${selectedMode === "video" ? "active" : ""} ${!modes.includes("video") ? "disabled" : ""}`}
            onClick={() => modes.includes("video") && setMode("video")}
            disabled={!modes.includes("video")}
          >
            <Video size={15} /> Video call
          </button>
        </div>
        {!modes.includes("video") && (
          <p className="modal-note" style={{ marginTop: "-0.5rem", marginBottom: "1rem" }}>
            This provider currently offers in-person only.
          </p>
        )}

        <a className="contact-btn" href={`https://wa.me/${v.phone}?text=${waMessage}`} target="_blank" rel="noopener noreferrer">
          <Phone size={16} /> {selectedMode === "video" ? "Request video call" : "Contact on WhatsApp"}
        </a>
        {v.address && selectedMode === "in-person" && (
          <a
            className="directions-btn"
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${v.address}, ${v.city}, ${v.country}`)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Navigation size={15} /> Get directions
          </a>
        )}
        <p className="modal-note">This is a demo listing. Real bookings and verified contact will go live once providers register.</p>
      </div>
    </div>
  );
}

function RegisterForm({ onAdd, onClose }) {
  const [form, setForm] = useState({
    name: "", cat: "doctor", country: "Nigeria", city: "", area: "", address: "", price: "", blurb: "", modes: ["in-person"],
  });
  const toggleMode = (m) => {
    setForm((f) => {
      const has = f.modes.includes(m);
      const next = has ? f.modes.filter((x) => x !== m) : [...f.modes, m];
      return { ...f, modes: next.length ? next : f.modes };
    });
  };
  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.country || !form.city || !form.price) return;
    onAdd({
      id: Date.now(),
      name: form.name,
      cat: form.cat,
      country: form.country,
      city: form.city,
      area: form.area,
      address: form.address,
      price: Number(form.price),
      priceMax: Number(form.price) * 3,
      currency: "",
      rating: 5.0,
      jobs: 0,
      verified: false,
      phone: "000000000",
      modes: form.modes,
      blurb: form.blurb || "New provider on SADO.",
    });
    onClose();
  };
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={submit}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close"><X size={18} /></button>
        <p className="modal-eyebrow">Provider sign-up</p>
        <h2>List your service</h2>
        <label className="field">
          <span>Business or your name</span>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Chioma's Kitchen" />
        </label>
        <label className="field">
          <span>Service category</span>
          <select value={form.cat} onChange={(e) => setForm({ ...form, cat: e.target.value })}>
            {GROUPS.map((g) => (
              <optgroup key={g.id} label={g.label}>
                {g.cats.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
              </optgroup>
            ))}
          </select>
        </label>
        <div className="field-row">
          <label className="field">
            <span>Country</span>
            <input list="country-options" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} placeholder="Start typing..." />
          </label>
          <label className="field">
            <span>City</span>
            <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="e.g. Lagos" />
          </label>
        </div>
        <label className="field">
          <span>Area / neighborhood</span>
          <input value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} placeholder="e.g. Yaba" />
        </label>
        <label className="field">
          <span>Street address (so clients can find you or get GPS directions)</span>
          <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="e.g. 12 Herbert Macaulay Way" />
        </label>
        <label className="field">
          <span>Starting price (local currency)</span>
          <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="5000" />
        </label>
        <label className="field">
          <span>Short description</span>
          <input value={form.blurb} onChange={(e) => setForm({ ...form, blurb: e.target.value })} placeholder="What do you offer?" />
        </label>
        <p className="field-label">How do you meet clients?</p>
        <div className="mode-row" style={{ marginBottom: "1.2rem" }}>
          <button type="button" className={`mode-btn ${form.modes.includes("in-person") ? "active" : ""}`} onClick={() => toggleMode("in-person")}>
            <User size={15} /> In person
          </button>
          <button type="button" className={`mode-btn ${form.modes.includes("video") ? "active" : ""}`} onClick={() => toggleMode("video")}>
            <Video size={15} /> Video call
          </button>
        </div>
        <button type="submit" className="contact-btn">List my service</button>
        <p className="modal-note">Demo only — listings live in this session and reset on reload.</p>
      </form>
    </div>
  );
}

export default function SadoApp() {
  const [query, setQuery] = useState("");
  const [activeGroup, setActiveGroup] = useState(null);
  const [activeCat, setActiveCat] = useState(null);
  const [countryQuery, setCountryQuery] = useState("");
  const [cityQuery, setCityQuery] = useState("");
  const [vendors, setVendors] = useState(SEED_VENDORS);
  const [openVendor, setOpenVendor] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  const filtered = useMemo(() => {
    return vendors.filter((v) => {
      const cat = CAT_INDEX[v.cat];
      const matchesQuery =
        !query ||
        v.name.toLowerCase().includes(query.toLowerCase()) ||
        v.blurb.toLowerCase().includes(query.toLowerCase()) ||
        cat?.label.toLowerCase().includes(query.toLowerCase()) ||
        cat?.groupLabel.toLowerCase().includes(query.toLowerCase());
      const matchesGroup = !activeGroup || cat?.group === activeGroup;
      const matchesCat = !activeCat || v.cat === activeCat;
      const matchesCountry = !countryQuery.trim() || v.country.toLowerCase().includes(countryQuery.trim().toLowerCase());
      const matchesCity = !cityQuery.trim() || v.city.toLowerCase().includes(cityQuery.trim().toLowerCase());
      return matchesQuery && matchesGroup && matchesCat && matchesCountry && matchesCity;
    });
  }, [vendors, query, activeGroup, activeCat, countryQuery, cityQuery]);

  const activeGroupObj = GROUPS.find((g) => g.id === activeGroup);
  const locationLabel = [cityQuery.trim(), countryQuery.trim()].filter(Boolean).join(", ");

  return (
    <div className="app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Work+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');

        * { box-sizing: border-box; }
        .app {
          --ink: #F4EFE4;
          --bg: #12161F;
          --bg-raised: #1A1F2B;
          --line: #2A3040;
          --gold: #E3A63C;
          --teal: #2C8C79;
          --coral: #E8654F;
          --muted: #9AA1B2;
          font-family: 'Work Sans', sans-serif;
          background: var(--bg);
          color: var(--ink);
          min-height: 100vh;
          padding: 0 0 4rem;
        }
        .hero {
          padding: 3rem 1.5rem 2rem;
          background:
            radial-gradient(circle at 15% 20%, rgba(227,166,60,0.14), transparent 45%),
            radial-gradient(circle at 85% 0%, rgba(44,140,121,0.16), transparent 50%);
          border-bottom: 1px solid var(--line);
        }
        .hero-inner { max-width: 900px; margin: 0 auto; }
        .brand-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; flex-wrap: wrap; gap: 0.8rem; }
        .brand { font-family: 'Fraunces', serif; font-weight: 700; font-size: clamp(2.2rem, 6vw, 3.2rem); letter-spacing: 0.01em; line-height: 1; }
        .brand span { color: var(--gold); }
        .list-btn {
          display: flex; align-items: center; gap: 0.4rem;
          background: transparent; border: 1px solid var(--line); color: var(--ink);
          padding: 0.5rem 0.9rem; border-radius: 999px; font-size: 0.85rem; font-family: 'Work Sans';
          cursor: pointer; transition: border-color 0.15s ease;
        }
        .list-btn:hover { border-color: var(--gold); }
        .hero h1 {
          font-family: 'Fraunces', serif; font-weight: 500; font-size: clamp(1.8rem, 4.5vw, 2.8rem);
          line-height: 1.12; margin: 0 0 0.6rem; max-width: 640px;
        }
        .hero h1 em { font-style: normal; color: var(--gold); }
        .hero p.sub { color: var(--muted); font-size: 1rem; max-width: 560px; margin: 0 0 1.8rem; }

        .search-row { display: flex; gap: 0.6rem; flex-wrap: wrap; align-items: stretch; }
        .search-box {
          flex: 1 1 220px; display: flex; align-items: center; gap: 0.5rem;
          background: var(--bg-raised); border: 1px solid var(--line); border-radius: 12px;
          padding: 0.7rem 0.9rem;
        }
        .search-box input {
          background: transparent; border: none; outline: none; color: var(--ink);
          font-family: 'Work Sans'; font-size: 0.95rem; width: 100%;
        }
        .search-box input::placeholder { color: var(--muted); }
        .loc-box {
          flex: 1 1 160px; display: flex; align-items: center; gap: 0.45rem;
          background: var(--bg-raised); border: 1px solid var(--line); border-radius: 12px;
          padding: 0.7rem 0.9rem;
        }
        .loc-box input {
          background: transparent; border: none; outline: none; color: var(--ink);
          font-family: 'Work Sans'; font-size: 0.9rem; width: 100%;
        }
        .loc-box input::placeholder { color: var(--muted); }

        .group-row { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 1.2rem; }
        .cat-chip {
          border: 1px solid var(--line); background: transparent; color: var(--muted);
          padding: 0.4rem 0.85rem; border-radius: 999px; font-size: 0.82rem; cursor: pointer;
          font-family: 'Work Sans'; transition: all 0.15s ease;
        }
        .cat-chip.active { background: var(--gold); border-color: var(--gold); color: #1A1408; font-weight: 600; }
        .cat-chip:hover:not(.active) { border-color: var(--gold); color: var(--ink); }
        .subcat-row { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.6rem; }
        .subcat-chip {
          border: 1px solid var(--teal); background: transparent; color: var(--teal);
          padding: 0.3rem 0.7rem; border-radius: 999px; font-size: 0.76rem; cursor: pointer;
          font-family: 'Work Sans'; transition: all 0.15s ease;
        }
        .subcat-chip.active { background: var(--teal); color: #EFFDF9; font-weight: 600; }

        .results-wrap { max-width: 900px; margin: 0 auto; padding: 2rem 1.5rem 0; }
        .results-count { color: var(--muted); font-size: 0.85rem; margin: 0 0 1rem; font-family: 'IBM Plex Mono'; }

        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1rem; }

        .vendor-card {
          text-align: left; background: var(--bg-raised); border: 1px solid var(--line); border-radius: 14px;
          padding: 1.1rem; cursor: pointer; color: var(--ink); font-family: 'Work Sans';
          display: flex; flex-direction: column; gap: 0.7rem; transition: border-color 0.15s ease, transform 0.15s ease;
        }
        .vendor-card:hover { border-color: var(--gold); transform: translateY(-2px); }
        .vendor-card-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 0.6rem; }
        .vendor-name-row { display: flex; align-items: center; gap: 0.4rem; }
        .vendor-name-row h3 { font-family: 'Fraunces', serif; font-weight: 600; font-size: 1.05rem; margin: 0; }
        .vendor-name-row h2 { font-family: 'Fraunces', serif; font-weight: 600; font-size: 1.4rem; margin: 0; }
        .verified-icon { color: var(--teal); flex-shrink: 0; }
        .vendor-cat { color: var(--gold); font-size: 0.75rem; margin: 0.15rem 0 0; text-transform: uppercase; letter-spacing: 0.03em; }
        .vendor-blurb { color: var(--muted); font-size: 0.87rem; line-height: 1.4; margin: 0; }
        .vendor-meta { display: flex; justify-content: space-between; gap: 0.5rem; font-size: 0.76rem; color: var(--muted); border-top: 1px solid var(--line); padding-top: 0.6rem; flex-wrap: wrap; }
        .meta-item { display: flex; align-items: center; gap: 0.3rem; }
        .star { color: var(--gold); fill: var(--gold); }
        .video-badge {
          display: inline-flex; align-items: center; gap: 0.3rem; width: fit-content;
          background: rgba(44,140,121,0.15); color: var(--teal); font-size: 0.72rem;
          padding: 0.25rem 0.55rem; border-radius: 999px; font-family: 'Work Sans'; font-weight: 500;
        }

        .price-tag {
          position: relative; background: var(--coral); color: #1A1408; padding: 0.35rem 0.6rem 0.35rem 0.7rem;
          border-radius: 3px 8px 8px 3px; font-family: 'IBM Plex Mono'; font-size: 0.72rem; text-align: right;
          transform: rotate(2deg); flex-shrink: 0; white-space: nowrap;
        }
        .price-tag::before {
          content: ''; position: absolute; left: -4px; top: 50%; transform: translateY(-50%);
          width: 8px; height: 8px; background: var(--bg-raised); border-radius: 50%;
        }
        .price-tag-label { display: block; font-size: 0.6rem; opacity: 0.75; }
        .price-tag-value { display: block; font-weight: 600; font-size: 0.85rem; }

        .empty { text-align: center; padding: 3rem 1rem; color: var(--muted); }

        .modal-backdrop {
          position: fixed; inset: 0; background: rgba(8,10,15,0.7); backdrop-filter: blur(2px);
          display: flex; align-items: center; justify-content: center; z-index: 50; padding: 1rem;
        }
        .modal {
          background: var(--bg-raised); border: 1px solid var(--line); border-radius: 16px;
          padding: 1.8rem; max-width: 420px; width: 100%; position: relative; max-height: 90vh; overflow-y: auto;
        }
        .modal-close { position: absolute; top: 1rem; right: 1rem; background: transparent; border: none; color: var(--muted); cursor: pointer; }
        .modal-eyebrow { color: var(--gold); font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.04em; margin: 0 0 0.4rem; }
        .modal-blurb { color: var(--muted); font-size: 0.9rem; margin: 0.6rem 0 1.2rem; line-height: 1.5; }
        .address-row {
          display: flex; align-items: flex-start; gap: 0.4rem; color: var(--muted); font-size: 0.82rem;
          margin: -0.6rem 0 1rem; line-height: 1.4;
        }
        .address-icon { color: var(--gold); flex-shrink: 0; margin-top: 0.15rem; }
        .modal-stats { display: flex; gap: 1.5rem; margin-bottom: 1.4rem; }
        .stat-value { display: block; font-family: 'Fraunces', serif; font-weight: 600; font-size: 1.1rem; }
        .stat-label { display: block; color: var(--muted); font-size: 0.75rem; margin-top: 0.15rem; }
        .contact-btn {
          display: flex; align-items: center; justify-content: center; gap: 0.5rem;
          background: var(--teal); color: #EFFDF9; padding: 0.75rem; border-radius: 10px;
          text-decoration: none; font-weight: 600; font-size: 0.9rem; border: none; cursor: pointer; width: 100%;
        }
        .modal-note { color: var(--muted); font-size: 0.75rem; margin-top: 0.9rem; text-align: center; }
        .directions-btn {
          display: flex; align-items: center; justify-content: center; gap: 0.5rem;
          background: transparent; color: var(--gold); padding: 0.7rem; border-radius: 10px;
          text-decoration: none; font-weight: 600; font-size: 0.85rem; border: 1px solid var(--gold);
          width: 100%; margin-top: 0.6rem; transition: background 0.15s ease;
        }
        .directions-btn:hover { background: rgba(227,166,60,0.1); }

        .field { display: flex; flex-direction: column; gap: 0.3rem; margin-bottom: 0.8rem; font-size: 0.85rem; }
        .field span { color: var(--muted); }
        .field input, .field select {
          background: var(--bg); border: 1px solid var(--line); border-radius: 8px; padding: 0.55rem 0.7rem;
          color: var(--ink); font-family: 'Work Sans'; font-size: 0.9rem;
        }
        .field-row { display: flex; gap: 0.7rem; }
        .field-row .field { flex: 1; }

        .field-label { color: var(--muted); font-size: 0.85rem; margin: 0 0 0.5rem; }
        .mode-row { display: flex; gap: 0.6rem; margin-bottom: 1.4rem; }
        .mode-btn {
          flex: 1; display: flex; align-items: center; justify-content: center; gap: 0.4rem;
          background: var(--bg); border: 1px solid var(--line); color: var(--muted);
          padding: 0.6rem; border-radius: 10px; font-family: 'Work Sans'; font-size: 0.85rem;
          cursor: pointer; transition: all 0.15s ease;
        }
        .mode-btn.active { background: var(--teal); border-color: var(--teal); color: #EFFDF9; font-weight: 600; }
        .mode-btn.disabled { opacity: 0.4; cursor: not-allowed; }
        .mode-btn:hover:not(.disabled):not(.active) { border-color: var(--gold); color: var(--ink); }

        @media (max-width: 480px) {
          .brand-row { margin-bottom: 1.4rem; }
          .grid { grid-template-columns: 1fr; }
          .search-row { flex-direction: column; }
        }
      `}</style>

      <datalist id="country-options">
        {COUNTRIES.map((c) => <option key={c} value={c} />)}
      </datalist>

      <div className="hero">
        <div className="hero-inner">
          <div className="brand-row">
            <div className="brand">SA<span>DO</span></div>
            <button className="list-btn" onClick={() => setShowRegister(true)}>
              <Plus size={14} /> List your service
            </button>
          </div>
          <h1>Find a trusted <em>provider</em>, anywhere in the world.</h1>
          <p className="sub">Doctors, hairdressers, chefs, event planners, lawyers, mechanics, and more. Type a country and city, meet in person or by video call.</p>

          <div className="search-row">
            <div className="search-box">
              <Search size={16} color="#9AA1B2" />
              <input
                placeholder="Search for a service, e.g. 'doctor' or 'makeup'"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="loc-box">
              <Globe2 size={14} color="#9AA1B2" />
              <input
                list="country-options"
                placeholder="Country (any country)"
                value={countryQuery}
                onChange={(e) => setCountryQuery(e.target.value)}
              />
            </div>
            <div className="loc-box">
              <MapPin size={14} color="#9AA1B2" />
              <input
                placeholder="City"
                value={cityQuery}
                onChange={(e) => setCityQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="group-row">
            <button className={`cat-chip ${!activeGroup ? "active" : ""}`} onClick={() => { setActiveGroup(null); setActiveCat(null); }}>All</button>
            {GROUPS.map((g) => (
              <button
                key={g.id}
                className={`cat-chip ${activeGroup === g.id ? "active" : ""}`}
                onClick={() => {
                  setActiveGroup(activeGroup === g.id ? null : g.id);
                  setActiveCat(null);
                }}
              >
                {g.label}
              </button>
            ))}
          </div>
          {activeGroupObj && (
            <div className="subcat-row">
              {activeGroupObj.cats.map((c) => (
                <button
                  key={c.id}
                  className={`subcat-chip ${activeCat === c.id ? "active" : ""}`}
                  onClick={() => setActiveCat(activeCat === c.id ? null : c.id)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="results-wrap">
        <p className="results-count">{filtered.length} provider{filtered.length !== 1 ? "s" : ""} found{locationLabel ? ` in ${locationLabel}` : " worldwide"}</p>
        {filtered.length === 0 ? (
          <div className="empty">No providers match that search yet. Try a different category or location.</div>
        ) : (
          <div className="grid">
            {filtered.map((v) => <VendorCard key={v.id} v={v} onOpen={setOpenVendor} />)}
          </div>
        )}
      </div>

      <VendorModal v={openVendor} onClose={() => setOpenVendor(null)} />
      {showRegister && (
        <RegisterForm
          onAdd={(nv) => setVendors((prev) => [nv, ...prev])}
          onClose={() => setShowRegister(false)}
        />
      )}
    </div>
  );
}
